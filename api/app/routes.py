import json
import csv
import io
from tempfile import TemporaryFile, NamedTemporaryFile

from flask import make_response, request

from app import app
from app.cadc import tap_client as client
from app.resolver import get_coordinate


@app.route('/')
def hello_world():
    return 'hello world'


@app.route('/coordinates', methods=['POST'])
def coordinates():
    """
    Endpoint for search bar. Given object name or coordinates in reasonable format, returns coordinates
    :return: Decimal coordinates representing
    """
    search_string = request.form['search_string']
    coord = get_coordinate(search_string)
    if coord is not None:
        return coord
    else:
        return make_response('Search failed', 400)


@app.route('/catalogs/', methods=['GET'])
def get_catalog_names():
    """
    Endpoint for retrieving all catalog names
    :return: List of catalog names in json format
    """
    return json.dumps(app.config['CATALOG_LIST'])


@app.route('/catalogs/<catalog_name>/principle_columns')
def get_principle_column_names(catalog_name):
    """
    Endpoint for retrieving principle column names of table
    :param catalog_name: name of catalog table
    :return: List of principle column names in json format
    """
    return json.dumps(get_table_schema_names(catalog_name, principle_only=True))


@app.route('/catalogs/<catalog_name>/columns')
def get_column_names(catalog_name):
    """
    Endpoint for retrieving column names of table
    :param catalog_name: name of catalog table
    :return: List of column names in json format
    """
    return json.dumps(get_table_schema_names(catalog_name))


@app.route('/catalogs/<catalog_name>/query')
def query_catalog(catalog_name):
    """
    Endpoint for retrieving object name and location
    :param catalog_name:
    :return: json object with object name as key and coordinates as value
    """
    # TODO: verify first column in table is the identifier, will need to change this line if not.
    id_column_name = get_table_schema_names(catalog_name)[0]
    # TODO: currently queries entire catalog, filters will need to be added
    query_string = f'SELECT {id_column_name}, principleRA, principleDec FROM {catalog_name}'
    with NamedTemporaryFile(mode='r+') as temp_file:
        client.query(query_string, output_file=temp_file.name, response_format='csv', data_only=True)
        rows = csv.reader(temp_file)
        next(rows)
        return {row[0]: [row[2], row[1]] for row in rows}


@app.route('/catalogs/<catalog_name>/query_object/<object_id>')
def query_all_for_object(catalog_name, object_id):
    id_column_name = get_table_schema_names(catalog_name)[0]
    query_string = f"SELECT * FROM {catalog_name} WHERE {id_column_name} = '{object_id}'"
    print(query_string)
    with NamedTemporaryFile(mode='r+') as temp_file:
        client.query(query_string, output_file=temp_file.name, response_format='csv', data_only=True)
        data = list(csv.reader(temp_file))
        keys = data[0]
        values = data[1]
        return dict(zip(keys, values))


def get_table_schema_names(table_name, principle_only=False):
    """
    Returns a list of
    :param table_name: name of table to retrieve column names from
    :param principle_only: If True, returns only column names containing the substring "principle" (case insensitive)
    :return: List containing names of columns in table
    """
    table_schema = client.get_table_schema(table_name)[0].rows
    if principle_only:
        return [t[0] for t in table_schema if "principle" in t[0].lower()]
    return [t[0] for t in table_schema]

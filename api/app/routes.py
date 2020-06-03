import json

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
def get_catalog_header(catalog_name):
    """
    Endpoint for retrieving principle column names of table
    :param catalog_name: name of catalog table
    :return: List of principle column names in json format
    """
    table_schema = client.get_table_schema(catalog_name)[0].rows
    principle_column_names = [t[0] for t in table_schema if "principle" in t[0].lower()]
    return json.dumps(principle_column_names)

@app.route('/catalogs/<catalog_name>/query')
def query_catalog(catalog_name):
    query_string = f'SELECT principleRA, principleDec FROM {catalog_name}'

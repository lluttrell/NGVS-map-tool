import json
import csv
import re
from tempfile import NamedTemporaryFile

from flask import make_response, request

from app import app
from app.cadc import tap_client as client
from app.resolver import get_coordinate


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


@app.route('/catalogs/names', methods=['GET'])
def get_catalog_names():
    """
    Endpoint for retrieving all catalog names
    :return: List of catalog names in json format
    """
    return json.dumps(app.config['CATALOG_LIST'])


@app.route('/catalogs/')
def get_catalogs_objects():
    """
    Endpoint for retrieving all information about catalogs
    :return:
    """
    catalog_list = []
    for catalog in app.config['CATALOG_LIST']:
        catalog_obj = {'name': catalog, 'principleColumns': get_table_schema_names(catalog, principle_only=True)}
        catalog_list.append(catalog_obj)
    return json.dumps(catalog_list)


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


@app.route('/catalogs/<catalog_name>/query', methods=['POST'])
def query_catalog(catalog_name):
    """
    Endpoint for retrieving object name and location from tables. Filters for parameters can be
    sent in the request body in json form. eg { "principleRA" : "187-189", "principleDec" : "<12" }
    :param catalog_name: catalog to query from
    :return: json object with object name as key and coordinates as value
    """
    # TODO: verify first column in table is the identifier, will need to change this line if not.
    id_column_name = get_table_schema_names(catalog_name)[0]

    query_string = f'SELECT {id_column_name}, principleRA, principleDec FROM {catalog_name}'
    parameter_filters = request.form.to_dict(flat=True)
    print(parameter_filters)
    has_constraints = False
    where_clause = ' WHERE '
    for key in parameter_filters:
        if parameter_filters[key] != '':
            has_constraints = True
            where_clause += f'({parse_selection_to_conditions(parameter_filters[key],key)}) AND '
    if has_constraints:
        query_string += where_clause[:-4]

    print(query_string)

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


def parse_selection_to_conditions(selection_string, attribute_name):
    """
    Takes a string representing conditions and the attribute to which the conditions belong
    and returns SQL conditions for use in an SQL where clause.
    :param selection_string: raw string in an acceptable format
    :param attribute_name: attribute to which selections belong to
    :return: string to be used in where clause of an sql statement
    """

    # strip all whitespace from string
    stripped_string = re.sub(r"\s+", "", selection_string)

    # split input string on commas and remove any empty elements
    tokens = [x for x in stripped_string.split(",") if x != [""]]

    # extract certain tokens based on simple regex matches
    ranges = [x for x in tokens if re.search("to", x)]
    lt = [x for x in tokens if re.search("<(?!=)", x)]
    lte = [x for x in tokens if re.search("<=", x)]
    gt = [x for x in tokens if re.search(">(?!=)", x)]
    gte = [x for x in tokens if re.search(">=", x)]
    singles = [x for x in tokens if not re.search("[to<>=]", x)]

    # create new array from previously extracted arrays, and reformat into sql syntax
    constructed_array = []
    constructed_array += [f"{attribute_name} = {x}" for x in singles]
    constructed_array += [f"({attribute_name} >= {x.split('to')[0]} AND {attribute_name} <= {x.split('to')[1]})" for x in ranges]
    constructed_array += [f"{attribute_name} < {x.split('<')[1]}" for x in lt]
    constructed_array += [f"{attribute_name} <= {x.split('<=')[1]}" for x in lte]
    constructed_array += [f"{attribute_name} > {x.split('>')[1]}" for x in gt]
    constructed_array += [f"{attribute_name} >= {x.split('>=')[1]}" for x in gte]

    # join arrays together into a single string
    return_string = ""
    for index, element in enumerate(constructed_array):
        return_string += element
        if index < len(constructed_array) - 1:
            return_string += " OR "

    return return_string

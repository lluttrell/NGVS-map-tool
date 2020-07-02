import json
import csv
from tempfile import NamedTemporaryFile

from flask import make_response, request, send_file

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


@app.route('/query/')
def send_query():
    """
    Sends a query to TAP. Currently this should be the only endpoint used by the application as it transitions
    away from the flask API
    :return:
    """
    query_string = request.args.get('QUERY')
    with NamedTemporaryFile(mode='r+') as temp_file:
        client.query(query_string, output_file=temp_file.name, response_format='csv', data_only=False)
        return send_file(temp_file.name)


@app.route('/overlays')
def get_overlays():
    """
    Endpoint for filter overlays. Returns a json object with list of square paths for
    each filter category.
    :return: json object with field outlines
    """
    my_dict = {}
    with open('api/app/static/list.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        next(reader)
        for row in reader:
            outlines = [[row[0], row[1]],
                        [row[2], row[3]],
                        [row[4], row[5]],
                        [row[6], row[7]]]
            wavelength = row[8]
            if wavelength not in my_dict:
                my_dict[wavelength] = [outlines]
            else:
                my_dict[wavelength].append(outlines)
    return json.dumps(my_dict)


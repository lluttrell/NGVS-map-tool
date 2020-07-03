import json
import csv
from tempfile import NamedTemporaryFile

from flask import make_response, request, send_file

from app import app
from app.cadc import tap_client as client
from app.resolver import get_coordinate


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


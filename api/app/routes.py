from flask import request, make_response

from app import app
from app.cadc import tap_client as client
from app.resolver import get_coordinate


@app.route('/')
def hello_world():
    return 'hello world'


@app.route('/coordinates/', methods=['POST'])
def coordinates():
    """
    Endpoint for search bar. Given object name or coordinates in reasonable format, returns coordinates
    :return:
    """
    search_string = request.form['search_string']
    coord = get_coordinate(search_string)
    if coord is not None:
        return coord
    else:
        return make_response('Search failed', 400)


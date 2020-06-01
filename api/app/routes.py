from flask import render_template

from app import app
from app.cadc import tap_client as client

@app.route('/')
def hello_world():
    return 'hello world'



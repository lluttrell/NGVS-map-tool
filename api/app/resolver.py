import requests
import json
import sys
import re
import logging


def get_coordinate(target_name):
    """
    Given a string that represents a target name or a coordinate pair in some reasonable
    syntax return a dictionary that holds the RA/Dec in decimal format.

    param target_name: A name of an astronomical target or coordinates in any reasonable format
    ptype target_name: str

    return: A dictionary with the resolve position
    rtype: dict
    """

    end_point = 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/AdvancedSearch/unitconversion/Plane.position.bounds'

    params = {'term': target_name,
              'resolver': 'all'}

    try:
        response = requests.get(end_point, params)
        response.raise_for_status()
        result = json.loads(response.content)
        if result['resolveStatus'] != 'GOOD':
            raise ValueError("Failed trying to parse: {}".format(target_name))
    except Exception as ex:
        logging.error(str(ex))
        return None

    # Build a regular expression based on the json content that a successful
    # call to Plane.position.bounds will return.  If Plane.position.bounds
    # changes then we will need to modify this chunk.

    regex = ""
    for key in ['target', 'Dec', 'RA']:
        regex += "{0}: (?P<{0}>.+)\n".format(key)

    # use the regex to strip out the coordinates from the result json object
    # and return the RA/Dec as floating point values in dictionary.
    coord = {}
    try:
        f = re.match(regex, result['resolveValue'])
        coord['RA'] = float(f['RA'])
        coord['Dec'] = float(f['Dec'])
    except Exception as ex:
        logger.error("Failed trying to parse: {}".format(result))
        logger.error(str(ex))
        return None

    return coord


if __name__ == '__main__':
    print(get_coordinate(sys.argv[1]))

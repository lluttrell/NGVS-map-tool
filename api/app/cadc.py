"""
Find an identity and create the 'subject' object that CADC connections need.
"""
import os
from cadcutils.net import auth
from cadctap import CadcTapClient
import config

HOMEDIR = os.getenv('HOME', '.')

# Possible identity filenames
NETRC_FILENAMES = ['.netrc', 'netrc']
PEM_FILENAMES = ['cadcproxy.pem', 'vospaceproxy.pem']

# Possible identity filepaths
NETRC_PATHS = ['.', HOMEDIR]
PEM_PATHS = ['.', os.path.join(HOMEDIR, '.ssl'), '.ssl', HOMEDIR]


def get_subject(cadcproxy=None, netrc=None):
    """
    User the provided identity solutions or loop over some reasonable guesses and return an auth.Subject

    :param cadcproxy: filename of a local cadcproxy file.
    :param netrc: filename of a local .netrc formated file.
    :return: an identity subject.
    :rtype: auth.Subject
    """

    if cadcproxy is not None:
        return auth.Subject(certificate=cadcproxy)
    if netrc is not None:
        return auth.Subject(netrc=netrc)

    identity_map = {'netrc': {'filenames': NETRC_FILENAMES, 'paths': NETRC_PATHS},
                    'certificate': {'filenames': PEM_FILENAMES, 'paths': PEM_PATHS}
                    }

    for argtype in identity_map:
        for filename in identity_map[argtype]['filenames']:
            for path in identity_map[argtype]['paths']:
                argvalue = os.path.join(path, filename)
                if os.access(argvalue, os.R_OK):
                    return auth.Subject(**{argtype: argvalue})

    raise FileNotFoundError("Could not find an identity file.")


tap_client = CadcTapClient(get_subject(), resource_id=config.Config().DEFAULT_TAP_SERVICE)

import os

class Config(object):
    """
    This class holds some default parameters needed elsewhere.
    """
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    TEMPLATES_AUTO_RELOAD = True
    DEFAULT_COLORMAP = 'Set2'
    DEFAULT_TAP_SERVICE = 'ivo://cadc.nrc.ca/youcat'
    DEFAULT_MAP_LOCATION = [10.425,-7.037387]
    DEFAULT_FIELD_OUTLINES = ['u', 'g', 'r', 'i', 'z', 'k']
    DEFAULT_OVERLAYS = ['skyUrl', 'ngvsUrl', 'vectors']
    DEFAULT_ZOOM_LEVEL = 6
    MAX_ZOOM_LEVEL = 14
    MIN_ZOOM_LEVEL = 5
    CATALOG_LIST = ['cfht.ngvsCatalog','cfht.ngvsGCXDCatalog','cfht.ngvsStarsXDCatalog']
    SKY_TILE_URL = "https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg"  # google background tiles
    NGVS_TILE_URL ="https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png"
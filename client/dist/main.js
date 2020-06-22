/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "header, main, footer {\n    padding-left: 320px;\n}\n\nul.sidenav {\n    width: 320px;\n}\n\n@media only screen and (max-width : 600px) {\n    header, main, footer {\n      padding-left: 0;\n    }\n}\n\n@media only screen and (min-width: \n600px) {\n    .sidenav.sidenav-fixed {\n           transform: translateX(0) !important;\n    }\n}\n\n#map-container {\n    height: 100%;\n}\n\n.container {\n    width: 95%\n}\n\n.leaflet-fade-anim .leaflet-tile {\n    will-change: unset;\n  }\n  \n.leaflet-zoom-anim .leaflet-zoom-animated {\nwill-change: unset;\n}\n\n.input-field {\n    position: relative;\n    margin-top: 0.1rem;\n    margin-bottom: 0.1rem;\n}\n\n.refine-btns {\n    display: flex;\n    justify-content: space-around;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_main_css__WEBPACK_IMPORTED_MODULE_0__);


const DEFAULT_MAP_LOCATION = [10.425,-7.037387]
const DEFAULT_ZOOM = 6
const COLORS = ['yellow','red','blue','orange','teal','purple','lightgreen'] 
const GOOGLE_SKY_TILESET = L.tileLayer("https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg")
const NGVS_TILE_TILESET = L.tileLayer("https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png")

document.addEventListener('DOMContentLoaded', async function() {
    await createCatalogQueryMenu();
    await createFilterOverlays();
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.Tabs.init(document.getElementById('query-tab'));
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.updateTextFields();
});

let tileLayers = L.layerGroup([GOOGLE_SKY_TILESET, NGVS_TILE_TILESET])

let myMap = L.map('map-container', {
    center: DEFAULT_MAP_LOCATION,
    zoom: DEFAULT_ZOOM,
    minZoom: 5,
    maxZoom: 14,
    selectArea: true,
    layers: [GOOGLE_SKY_TILESET, NGVS_TILE_TILESET],
    renderer: L.canvas()
})

myMap.on('areaselected', (e) => {
    selectionBounds = e.bounds.toBBoxString();
    downloadSelection(selectionBounds);
  });

const downloadSelection = (bounds) => {
    alert(`this should popup with available fits files for ${bounds}`)
}

/**
 * Returns a leaflet marker icon
 * @param {*} color icon color (red, blue, green, yellow, black)
 */
const createMarkerIcon = (color) => {
    return new L.Icon({
        iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}

let searchMarker = L.marker([0,0], {
    "opacity" : 0.0,
    "icon": createMarkerIcon('yellow')}).addTo(myMap);

let baseMaps = {
    "GoogleSky" : GOOGLE_SKY_TILESET,
    "NGVSTile" : NGVS_TILE_TILESET
}

let mainLayerControl = L.control.layers(null,baseMaps, {
    collapsed : false
})

mainLayerControl.addTo(myMap)

const toLatLng = (coordinates) => {
    let dec = coordinates['Dec']
    let ra = coordinates['RA'];
    if (ra > 180) { ra = 180 - ra};
    return L.latLng([dec,ra]);
}

const moveSearchMarker = (coordinates) => {
    searchMarker.setLatLng(toLatLng(coordinates));
    searchMarker.setOpacity(1.0);
}

const clearSearchMarker = () => {
    searchMarker.setOpacity(0.0);
}

const decimal_ra_formatter = (num) => {
    if(num < 0) { num = (num*-1)+180;} 
    return L.Util.formatNum(num, 3);
};

const decimal_dec_formatter = (num) => {
    return L.Util.formatNum(num, 3);
};

const dms_formatter = (num) => {
    var deg = Math.floor(num) ;
    var frac = Math.abs(num - deg);
    var min = Math.floor(frac * 60);
    var sec = Math.floor(frac * 3600 - min * 60 );
    var fsec = Math.floor((frac * 3600 - min * 60 - sec ) * 10) ;
    return ("00" + deg).slice(-2) + ":" + ("00" + min).slice(-2) + ":" + ( "00" + sec).slice(-2) + "." + fsec;
};

const hms_formatter = (num) => {
    if(num < 0) { num = (num*-1)+180;}
    var hour = Math.floor(num / 15);
    var minute = Math.floor((num/15 - hour)*60);
    var sec = Math.floor(hour * 3600 - minute * 60 );
    var fsec = Math.floor(( hour * 3600 - minute * 60 - sec ) * 100) ;
    return ("00" + hour).slice(-2) + ":" + ("00" + minute).slice(-2) + ":" + ("00" + sec).slice(-2) + "." + fsec;
}

L.control.mousePosition({
    position: 'bottomright',
    separator: ' | ',
    lngFormatter: decimal_ra_formatter,
    latFormatter: decimal_dec_formatter
}).addTo(myMap);

L.control.mousePosition({
    position: 'bottomright',
    separator: ' | ',
    lngFormatter: hms_formatter,
    latFormatter: dms_formatter
}).addTo(myMap);

// adds search functionality to the searchbar
const objectSearchForm = document.getElementById('search-form');
objectSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(objectSearchForm);
    objectSearchForm.reset();
    fetch('http://127.0.0.1:5000/coordinates' , {
        method: 'post',
        body: formData
    }).then((response) => {
        return response.json();  
    }).then((json) => {
        moveSearchMarker(json);
    }).catch((error) => {
        clearSearchMarker();
    })
});

/**
 * Creates the overlays for the field outlines
 */
const createFilterOverlays = async () => {
    fetch('http://127.0.0.1:5000/overlays')
        .then(results => results.json())
        .then(filters => {
            let i = 0
            let layersControl = L.control.layers(null,null,{collapsed: false});
            for (const [key,value] of Object.entries(filters)) {
                let latlngs = value;
                let layers = L.layerGroup();
                const color = COLORS[i];
                i++;
                const polygon = L.polygon(latlngs, {color: color, fillOpacity: 0.0})
                polygon.addTo(layers)
                layersControl.addOverlay(layers,key);
            }
            layersControl.addTo(myMap);
        })
}


/**
 * Adds a catalog name to the query-tab-select-menu
 * @param {string} catalogName Catalog name to add to menu
 */
const addCatalogToSelectMenu = (catalogName) => {
    const selectMenu = document.getElementById('query-tab-select-menu');
    let optionElement = document.createElement('option');
    optionElement.setAttribute('value', catalogName);
    optionElement.innerHTML = catalogName;
    selectMenu.appendChild(optionElement);
    M.FormSelect.init(selectMenu);
}


/**
 * Initializes the menu for selecting catalogs in the 'query' tab
 */
const initSelectMenu = () => {
    const selectMenu = document.getElementById('query-tab-select-menu');
    let defaultSelect = document.createElement('option');
    defaultSelect.setAttribute('disabled',true);
    defaultSelect.setAttribute('selected', true)
    defaultSelect.setAttribute('value','')
    defaultSelect.innerText = 'Select Catalog';
    selectMenu.appendChild(defaultSelect);
    selectMenu.addEventListener('change', changeCatalog);
    M.FormSelect.init(selectMenu);
}


/**
 * Switches view of refine forms to the form selected in the query-tab-select-menu
 */
const changeCatalog = () => {
    let selectMenu = document.getElementById('query-tab-select-menu');
    let currentCatalogName = selectMenu.value;
    let divs = document.getElementsByClassName('refine-form');
    for (let div of divs) {
        div.classList.add("hide");
        if (div.id === `${currentCatalogName}-form`) {
            div.classList.remove("hide");
        }
    }
}


/**
 * Creates a slider to be used for setting the marker size in the query menu
 * @param {String} catalogName Catalog name to create slider for
 */
const createMarkerSizeSlider = (catalogName) => {
    let markerSizeDiv = document.createElement('div');
    markerSizeDiv.setAttribute('class','col s12');
    let markerSizeSlider = document.createElement('input');
    markerSizeSlider.setAttribute('type','range');
    markerSizeSlider.setAttribute('min','100');
    markerSizeSlider.setAttribute('max','5000');
    markerSizeSlider.setAttribute('value','500');
    markerSizeSlider.setAttribute('id',`${catalogName}-markerSizeSlider`);
    let markerSizeLabel = document.createElement('label');
    markerSizeLabel.setAttribute('for',`${catalogName}-markerSizeSlider`);
    markerSizeLabel.innerHTML = 'Marker Size';
    markerSizeDiv.appendChild(markerSizeSlider);
    markerSizeDiv.appendChild(markerSizeLabel);
    return markerSizeDiv;
}


/**
 * Creates an input field for an individual principle column from an individual catalog
 * @param {*} catalogName catalog name for input field 
 * @param {*} principleColumn principle column name fo input field
 */
const createRefineField = (catalogName, principleColumn) => {
    let inputField = document.createElement('div')
    inputField.setAttribute('class', 'input-field col s6')
    let input = document.createElement('input')
    input.setAttribute('name', principleColumn)
    input.setAttribute('type', 'text')
    input.setAttribute('id', `${catalogName}-${principleColumn}`)
    let label = document.createElement('label')
    label.setAttribute('for', `${catalogName}-${principleColumn}`)
    label.innerHTML = `${principleColumn.slice(9)}`
    inputField.appendChild(label)
    inputField.appendChild(input)
    return inputField
}


/**
 * Creates the apply, clear, and download buttons for the refine section
 * @param {*} catalogName Catalog name for buttons
 * @param {*} refineForm 
 * @param {*} catalogLayer 
 */
const  createButtonDiv = (catalogName, refineForm, catalogLayer) => {
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'col s12 refine-btns')
    let submitButton = document.createElement('button')
    submitButton.innerText = "apply"
    submitButton.setAttribute('class', "btn-small")
    submitButton.setAttribute('name', 'apply')
    let downloadButton = document.createElement('input')
    downloadButton.setAttribute('value', 'download')
    downloadButton.setAttribute('type', 'button')
    downloadButton.setAttribute('class', 'btn-small orange lighten-2')
    downloadButton.addEventListener('click', () => downloadQuery(catalogName, refineForm))
    let clearButton = document.createElement('input')
    clearButton.setAttribute('type', 'button')
    clearButton.setAttribute('value', 'clear')
    clearButton.setAttribute('class', 'btn-small red lighten-2')
    clearButton.addEventListener('click', () => resetQueryForm(catalogName, catalogLayer))
    buttonDiv.appendChild(submitButton)
    buttonDiv.appendChild(downloadButton)
    buttonDiv.appendChild(clearButton)
    return buttonDiv
}

/**
 * Creates the whole query form and adds it to the DOM
 */
const createCatalogQueryMenu = async () => {
    const catalogList = await downloadCatalogInformation();
    const queryTabBody = document.getElementById('query-tab-body');
    initSelectMenu();
    
    let counter = 0;
    for (let catalog of catalogList) {
        const color = COLORS[counter];
        const catalogName = catalog.name;
        addCatalogToSelectMenu(catalogName);
        let catalogLayer = L.layerGroup();
        let refineForm = document.createElement('form');
        refineForm.setAttribute('id',`${catalogName}-form`);
        refineForm.setAttribute('class','refine-form hide row');
        refineForm.addEventListener('submit', (event) => {
            const formData = new FormData(refineForm);
            event.preventDefault();
            fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query`, {
                method: 'post',
                body: formData
            })
            .then(response => response.json())
            .then((object) => {
                catalogLayer.clearLayers();
                let markerSize = document.getElementById(`${catalogName}-markerSizeSlider`).value;
                mainLayerControl.removeLayer(catalogLayer);
                mainLayerControl.addOverlay(catalogLayer, catalogName);
                for (let [name,coordinates] of Object.entries(object)) {
                    let myMarker = L.circle(coordinates, {
                        radius: markerSize,
                        color: color,
                        weight: 1})
                    myMarker.bindTooltip(`${name} (${catalogName})`)                   
                    myMarker.on('click', () => displayObjectInformation(catalogName,name));
                    myMarker.addTo(catalogLayer);
                }  
            })
        })
        refineForm.appendChild(createMarkerSizeSlider(catalogName));
        for (let principleColumn of catalog.principleColumns) {
            refineForm.appendChild(createRefineField(catalogName, principleColumn));
        }
        refineForm.appendChild(createButtonDiv(catalogName, refineForm, catalogLayer));
        queryTabBody.appendChild(refineForm);
        counter++;
    }
    M.updateTextFields();
}


/**
 * Downloads all entries from catalogName that match the constraints in refineform
 * @param {*} catalogName 
 * @param {*} refineForm 
 */
const downloadQuery = (catalogName, refineForm) => {
    const formData = new FormData(refineForm);
    fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/download`, {
                method: 'post',
                body: formData
    })
    .then(response => response.text())
    .then((data) => {
        let currentDate = Date.now();
        let blob = new Blob([data]);
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download =`${catalogName}-${currentDate}.csv`;
        link.click();
    })
}

const resetQueryForm = (catalogName, catalogLayer) => {
    document.getElementById(`${catalogName}-form`).reset();
    mainLayerControl.removeLayer(catalogLayer);
    catalogLayer.clearLayers();

}

/**
 * Queries the database to obtain catalog names and principle column names
 */
const downloadCatalogInformation = async () => {
    const response = await fetch('http://127.0.0.1:5000/catalogs')
    return response.json();
}

/**
 * Displays information about a single object in a modal popup window
 * @param {*} catalogName 
 * @param {*} objectID 
 */
const displayObjectInformation = (catalogName, objectID) => {
    fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query_object/${objectID}`)
        .then(response => response.json())
        .then(objectInformation => {
            let elem = document.getElementById('object-modal')
            document.getElementById('modal-object-name').innerText = objectID;
            const instance = M.Modal.init(elem, {dismissible: true});

            const tableBody = document.getElementById('object-table-body')
            for(let [key,value] of Object.entries(objectInformation)) {
                const row = document.createElement('tr');
                const property = document.createElement('th');
                property.innerHTML = key;
                const propertyValue = document.createElement('th');
                propertyValue.innerHTML = value;
                row.appendChild(property);
                row.appendChild(propertyValue);
                tableBody.appendChild(row);
            }
            instance.open();
        })
}

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLmNzcz9lODBhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBLGtDQUFrQyxtQkFBTyxDQUFDLHdHQUFtRDtBQUM3RjtBQUNBO0FBQ0EsY0FBYyxRQUFTLHlCQUF5QiwwQkFBMEIsR0FBRyxnQkFBZ0Is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RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsQzs7Ozs7Ozs7Ozs7QUNoWkEsVUFBVSxtQkFBTyxDQUFDLHNKQUEyRTtBQUM3RiwwQkFBMEIsbUJBQU8sQ0FBQywwSEFBd0Q7O0FBRTFGOztBQUVBO0FBQ0EsMEJBQTBCLFFBQVM7QUFDbkM7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7OztBQUlBLHNDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJoZWFkZXIsIG1haW4sIGZvb3RlciB7XFxuICAgIHBhZGRpbmctbGVmdDogMzIwcHg7XFxufVxcblxcbnVsLnNpZGVuYXYge1xcbiAgICB3aWR0aDogMzIwcHg7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6IDYwMHB4KSB7XFxuICAgIGhlYWRlciwgbWFpbiwgZm9vdGVyIHtcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDA7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiBcXG42MDBweCkge1xcbiAgICAuc2lkZW5hdi5zaWRlbmF2LWZpeGVkIHtcXG4gICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKSAhaW1wb3J0YW50O1xcbiAgICB9XFxufVxcblxcbiNtYXAtY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDk1JVxcbn1cXG5cXG4ubGVhZmxldC1mYWRlLWFuaW0gLmxlYWZsZXQtdGlsZSB7XFxuICAgIHdpbGwtY2hhbmdlOiB1bnNldDtcXG4gIH1cXG4gIFxcbi5sZWFmbGV0LXpvb20tYW5pbSAubGVhZmxldC16b29tLWFuaW1hdGVkIHtcXG53aWxsLWNoYW5nZTogdW5zZXQ7XFxufVxcblxcbi5pbnB1dC1maWVsZCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbWFyZ2luLXRvcDogMC4xcmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwLjFyZW07XFxufVxcblxcbi5yZWZpbmUtYnRucyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbn1cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiBidG9hKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlcy9tYWluLmNzcydcblxuY29uc3QgREVGQVVMVF9NQVBfTE9DQVRJT04gPSBbMTAuNDI1LC03LjAzNzM4N11cbmNvbnN0IERFRkFVTFRfWk9PTSA9IDZcbmNvbnN0IENPTE9SUyA9IFsneWVsbG93JywncmVkJywnYmx1ZScsJ29yYW5nZScsJ3RlYWwnLCdwdXJwbGUnLCdsaWdodGdyZWVuJ10gXG5jb25zdCBHT09HTEVfU0tZX1RJTEVTRVQgPSBMLnRpbGVMYXllcihcImh0dHBzOi8vbXcxLmdvb2dsZS5jb20vbXctcGxhbmV0YXJ5L3NreS9za3l0aWxlc192MS97eH1fe3l9X3t6fS5qcGdcIilcbmNvbnN0IE5HVlNfVElMRV9USUxFU0VUID0gTC50aWxlTGF5ZXIoXCJodHRwczovL3d3dy5jYWRjLWNjZGEuaGlhLWloYS5ucmMtY25yYy5nYy5jYS9kYXRhL3B1Yi9HU0tZL00ue3h9Lnt5fS57en0ucG5nXCIpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBhd2FpdCBjcmVhdGVDYXRhbG9nUXVlcnlNZW51KCk7XG4gICAgYXdhaXQgY3JlYXRlRmlsdGVyT3ZlcmxheXMoKTtcbiAgICBNLkNvbGxhcHNpYmxlLmluaXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNpYmxlJykpO1xuICAgIE0uVGFicy5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVyeS10YWInKSk7XG4gICAgTS5TaWRlbmF2LmluaXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGVuYXYnKSk7XG4gICAgTS51cGRhdGVUZXh0RmllbGRzKCk7XG59KTtcblxubGV0IHRpbGVMYXllcnMgPSBMLmxheWVyR3JvdXAoW0dPT0dMRV9TS1lfVElMRVNFVCwgTkdWU19USUxFX1RJTEVTRVRdKVxuXG5sZXQgbXlNYXAgPSBMLm1hcCgnbWFwLWNvbnRhaW5lcicsIHtcbiAgICBjZW50ZXI6IERFRkFVTFRfTUFQX0xPQ0FUSU9OLFxuICAgIHpvb206IERFRkFVTFRfWk9PTSxcbiAgICBtaW5ab29tOiA1LFxuICAgIG1heFpvb206IDE0LFxuICAgIHNlbGVjdEFyZWE6IHRydWUsXG4gICAgbGF5ZXJzOiBbR09PR0xFX1NLWV9USUxFU0VULCBOR1ZTX1RJTEVfVElMRVNFVF0sXG4gICAgcmVuZGVyZXI6IEwuY2FudmFzKClcbn0pXG5cbm15TWFwLm9uKCdhcmVhc2VsZWN0ZWQnLCAoZSkgPT4ge1xuICAgIHNlbGVjdGlvbkJvdW5kcyA9IGUuYm91bmRzLnRvQkJveFN0cmluZygpO1xuICAgIGRvd25sb2FkU2VsZWN0aW9uKHNlbGVjdGlvbkJvdW5kcyk7XG4gIH0pO1xuXG5jb25zdCBkb3dubG9hZFNlbGVjdGlvbiA9IChib3VuZHMpID0+IHtcbiAgICBhbGVydChgdGhpcyBzaG91bGQgcG9wdXAgd2l0aCBhdmFpbGFibGUgZml0cyBmaWxlcyBmb3IgJHtib3VuZHN9YClcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGVhZmxldCBtYXJrZXIgaWNvblxuICogQHBhcmFtIHsqfSBjb2xvciBpY29uIGNvbG9yIChyZWQsIGJsdWUsIGdyZWVuLCB5ZWxsb3csIGJsYWNrKVxuICovXG5jb25zdCBjcmVhdGVNYXJrZXJJY29uID0gKGNvbG9yKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBMLkljb24oe1xuICAgICAgICBpY29uVXJsOiBgaHR0cHM6Ly9jZG4ucmF3Z2l0LmNvbS9wb2ludGhpL2xlYWZsZXQtY29sb3ItbWFya2Vycy9tYXN0ZXIvaW1nL21hcmtlci1pY29uLTJ4LSR7Y29sb3J9LnBuZ2AsXG4gICAgICAgIHNoYWRvd1VybDogJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2xlYWZsZXQvMC43LjcvaW1hZ2VzL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgICAgaWNvblNpemU6IFsyNSwgNDFdLFxuICAgICAgICBpY29uQW5jaG9yOiBbMTIsIDQxXSxcbiAgICAgICAgcG9wdXBBbmNob3I6IFsxLCAtMzRdLFxuICAgICAgICBzaGFkb3dTaXplOiBbNDEsIDQxXVxuICAgIH0pO1xufVxuXG5sZXQgc2VhcmNoTWFya2VyID0gTC5tYXJrZXIoWzAsMF0sIHtcbiAgICBcIm9wYWNpdHlcIiA6IDAuMCxcbiAgICBcImljb25cIjogY3JlYXRlTWFya2VySWNvbigneWVsbG93Jyl9KS5hZGRUbyhteU1hcCk7XG5cbmxldCBiYXNlTWFwcyA9IHtcbiAgICBcIkdvb2dsZVNreVwiIDogR09PR0xFX1NLWV9USUxFU0VULFxuICAgIFwiTkdWU1RpbGVcIiA6IE5HVlNfVElMRV9USUxFU0VUXG59XG5cbmxldCBtYWluTGF5ZXJDb250cm9sID0gTC5jb250cm9sLmxheWVycyhudWxsLGJhc2VNYXBzLCB7XG4gICAgY29sbGFwc2VkIDogZmFsc2Vcbn0pXG5cbm1haW5MYXllckNvbnRyb2wuYWRkVG8obXlNYXApXG5cbmNvbnN0IHRvTGF0TG5nID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgbGV0IGRlYyA9IGNvb3JkaW5hdGVzWydEZWMnXVxuICAgIGxldCByYSA9IGNvb3JkaW5hdGVzWydSQSddO1xuICAgIGlmIChyYSA+IDE4MCkgeyByYSA9IDE4MCAtIHJhfTtcbiAgICByZXR1cm4gTC5sYXRMbmcoW2RlYyxyYV0pO1xufVxuXG5jb25zdCBtb3ZlU2VhcmNoTWFya2VyID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgc2VhcmNoTWFya2VyLnNldExhdExuZyh0b0xhdExuZyhjb29yZGluYXRlcykpO1xuICAgIHNlYXJjaE1hcmtlci5zZXRPcGFjaXR5KDEuMCk7XG59XG5cbmNvbnN0IGNsZWFyU2VhcmNoTWFya2VyID0gKCkgPT4ge1xuICAgIHNlYXJjaE1hcmtlci5zZXRPcGFjaXR5KDAuMCk7XG59XG5cbmNvbnN0IGRlY2ltYWxfcmFfZm9ybWF0dGVyID0gKG51bSkgPT4ge1xuICAgIGlmKG51bSA8IDApIHsgbnVtID0gKG51bSotMSkrMTgwO30gXG4gICAgcmV0dXJuIEwuVXRpbC5mb3JtYXROdW0obnVtLCAzKTtcbn07XG5cbmNvbnN0IGRlY2ltYWxfZGVjX2Zvcm1hdHRlciA9IChudW0pID0+IHtcbiAgICByZXR1cm4gTC5VdGlsLmZvcm1hdE51bShudW0sIDMpO1xufTtcblxuY29uc3QgZG1zX2Zvcm1hdHRlciA9IChudW0pID0+IHtcbiAgICB2YXIgZGVnID0gTWF0aC5mbG9vcihudW0pIDtcbiAgICB2YXIgZnJhYyA9IE1hdGguYWJzKG51bSAtIGRlZyk7XG4gICAgdmFyIG1pbiA9IE1hdGguZmxvb3IoZnJhYyAqIDYwKTtcbiAgICB2YXIgc2VjID0gTWF0aC5mbG9vcihmcmFjICogMzYwMCAtIG1pbiAqIDYwICk7XG4gICAgdmFyIGZzZWMgPSBNYXRoLmZsb29yKChmcmFjICogMzYwMCAtIG1pbiAqIDYwIC0gc2VjICkgKiAxMCkgO1xuICAgIHJldHVybiAoXCIwMFwiICsgZGVnKS5zbGljZSgtMikgKyBcIjpcIiArIChcIjAwXCIgKyBtaW4pLnNsaWNlKC0yKSArIFwiOlwiICsgKCBcIjAwXCIgKyBzZWMpLnNsaWNlKC0yKSArIFwiLlwiICsgZnNlYztcbn07XG5cbmNvbnN0IGhtc19mb3JtYXR0ZXIgPSAobnVtKSA9PiB7XG4gICAgaWYobnVtIDwgMCkgeyBudW0gPSAobnVtKi0xKSsxODA7fVxuICAgIHZhciBob3VyID0gTWF0aC5mbG9vcihudW0gLyAxNSk7XG4gICAgdmFyIG1pbnV0ZSA9IE1hdGguZmxvb3IoKG51bS8xNSAtIGhvdXIpKjYwKTtcbiAgICB2YXIgc2VjID0gTWF0aC5mbG9vcihob3VyICogMzYwMCAtIG1pbnV0ZSAqIDYwICk7XG4gICAgdmFyIGZzZWMgPSBNYXRoLmZsb29yKCggaG91ciAqIDM2MDAgLSBtaW51dGUgKiA2MCAtIHNlYyApICogMTAwKSA7XG4gICAgcmV0dXJuIChcIjAwXCIgKyBob3VyKS5zbGljZSgtMikgKyBcIjpcIiArIChcIjAwXCIgKyBtaW51dGUpLnNsaWNlKC0yKSArIFwiOlwiICsgKFwiMDBcIiArIHNlYykuc2xpY2UoLTIpICsgXCIuXCIgKyBmc2VjO1xufVxuXG5MLmNvbnRyb2wubW91c2VQb3NpdGlvbih7XG4gICAgcG9zaXRpb246ICdib3R0b21yaWdodCcsXG4gICAgc2VwYXJhdG9yOiAnIHwgJyxcbiAgICBsbmdGb3JtYXR0ZXI6IGRlY2ltYWxfcmFfZm9ybWF0dGVyLFxuICAgIGxhdEZvcm1hdHRlcjogZGVjaW1hbF9kZWNfZm9ybWF0dGVyXG59KS5hZGRUbyhteU1hcCk7XG5cbkwuY29udHJvbC5tb3VzZVBvc2l0aW9uKHtcbiAgICBwb3NpdGlvbjogJ2JvdHRvbXJpZ2h0JyxcbiAgICBzZXBhcmF0b3I6ICcgfCAnLFxuICAgIGxuZ0Zvcm1hdHRlcjogaG1zX2Zvcm1hdHRlcixcbiAgICBsYXRGb3JtYXR0ZXI6IGRtc19mb3JtYXR0ZXJcbn0pLmFkZFRvKG15TWFwKTtcblxuLy8gYWRkcyBzZWFyY2ggZnVuY3Rpb25hbGl0eSB0byB0aGUgc2VhcmNoYmFyXG5jb25zdCBvYmplY3RTZWFyY2hGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1mb3JtJyk7XG5vYmplY3RTZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKG9iamVjdFNlYXJjaEZvcm0pO1xuICAgIG9iamVjdFNlYXJjaEZvcm0ucmVzZXQoKTtcbiAgICBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAwL2Nvb3JkaW5hdGVzJyAsIHtcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTsgIFxuICAgIH0pLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgbW92ZVNlYXJjaE1hcmtlcihqc29uKTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY2xlYXJTZWFyY2hNYXJrZXIoKTtcbiAgICB9KVxufSk7XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgb3ZlcmxheXMgZm9yIHRoZSBmaWVsZCBvdXRsaW5lc1xuICovXG5jb25zdCBjcmVhdGVGaWx0ZXJPdmVybGF5cyA9IGFzeW5jICgpID0+IHtcbiAgICBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAwL292ZXJsYXlzJylcbiAgICAgICAgLnRoZW4ocmVzdWx0cyA9PiByZXN1bHRzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZmlsdGVycyA9PiB7XG4gICAgICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgICAgIGxldCBsYXllcnNDb250cm9sID0gTC5jb250cm9sLmxheWVycyhudWxsLG51bGwse2NvbGxhcHNlZDogZmFsc2V9KTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSx2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsdGVycykpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF0bG5ncyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGxldCBsYXllcnMgPSBMLmxheWVyR3JvdXAoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IENPTE9SU1tpXTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9seWdvbiA9IEwucG9seWdvbihsYXRsbmdzLCB7Y29sb3I6IGNvbG9yLCBmaWxsT3BhY2l0eTogMC4wfSlcbiAgICAgICAgICAgICAgICBwb2x5Z29uLmFkZFRvKGxheWVycylcbiAgICAgICAgICAgICAgICBsYXllcnNDb250cm9sLmFkZE92ZXJsYXkobGF5ZXJzLGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXllcnNDb250cm9sLmFkZFRvKG15TWFwKTtcbiAgICAgICAgfSlcbn1cblxuXG4vKipcbiAqIEFkZHMgYSBjYXRhbG9nIG5hbWUgdG8gdGhlIHF1ZXJ5LXRhYi1zZWxlY3QtbWVudVxuICogQHBhcmFtIHtzdHJpbmd9IGNhdGFsb2dOYW1lIENhdGFsb2cgbmFtZSB0byBhZGQgdG8gbWVudVxuICovXG5jb25zdCBhZGRDYXRhbG9nVG9TZWxlY3RNZW51ID0gKGNhdGFsb2dOYW1lKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVyeS10YWItc2VsZWN0LW1lbnUnKTtcbiAgICBsZXQgb3B0aW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdGlvbkVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGNhdGFsb2dOYW1lKTtcbiAgICBvcHRpb25FbGVtZW50LmlubmVySFRNTCA9IGNhdGFsb2dOYW1lO1xuICAgIHNlbGVjdE1lbnUuYXBwZW5kQ2hpbGQob3B0aW9uRWxlbWVudCk7XG4gICAgTS5Gb3JtU2VsZWN0LmluaXQoc2VsZWN0TWVudSk7XG59XG5cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgbWVudSBmb3Igc2VsZWN0aW5nIGNhdGFsb2dzIGluIHRoZSAncXVlcnknIHRhYlxuICovXG5jb25zdCBpbml0U2VsZWN0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3RNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXJ5LXRhYi1zZWxlY3QtbWVudScpO1xuICAgIGxldCBkZWZhdWx0U2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgZGVmYXVsdFNlbGVjdC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJyx0cnVlKTtcbiAgICBkZWZhdWx0U2VsZWN0LnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKVxuICAgIGRlZmF1bHRTZWxlY3Quc2V0QXR0cmlidXRlKCd2YWx1ZScsJycpXG4gICAgZGVmYXVsdFNlbGVjdC5pbm5lclRleHQgPSAnU2VsZWN0IENhdGFsb2cnO1xuICAgIHNlbGVjdE1lbnUuYXBwZW5kQ2hpbGQoZGVmYXVsdFNlbGVjdCk7XG4gICAgc2VsZWN0TWVudS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGFuZ2VDYXRhbG9nKTtcbiAgICBNLkZvcm1TZWxlY3QuaW5pdChzZWxlY3RNZW51KTtcbn1cblxuXG4vKipcbiAqIFN3aXRjaGVzIHZpZXcgb2YgcmVmaW5lIGZvcm1zIHRvIHRoZSBmb3JtIHNlbGVjdGVkIGluIHRoZSBxdWVyeS10YWItc2VsZWN0LW1lbnVcbiAqL1xuY29uc3QgY2hhbmdlQ2F0YWxvZyA9ICgpID0+IHtcbiAgICBsZXQgc2VsZWN0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVyeS10YWItc2VsZWN0LW1lbnUnKTtcbiAgICBsZXQgY3VycmVudENhdGFsb2dOYW1lID0gc2VsZWN0TWVudS52YWx1ZTtcbiAgICBsZXQgZGl2cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JlZmluZS1mb3JtJyk7XG4gICAgZm9yIChsZXQgZGl2IG9mIGRpdnMpIHtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICBpZiAoZGl2LmlkID09PSBgJHtjdXJyZW50Q2F0YWxvZ05hbWV9LWZvcm1gKSB7XG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqXG4gKiBDcmVhdGVzIGEgc2xpZGVyIHRvIGJlIHVzZWQgZm9yIHNldHRpbmcgdGhlIG1hcmtlciBzaXplIGluIHRoZSBxdWVyeSBtZW51XG4gKiBAcGFyYW0ge1N0cmluZ30gY2F0YWxvZ05hbWUgQ2F0YWxvZyBuYW1lIHRvIGNyZWF0ZSBzbGlkZXIgZm9yXG4gKi9cbmNvbnN0IGNyZWF0ZU1hcmtlclNpemVTbGlkZXIgPSAoY2F0YWxvZ05hbWUpID0+IHtcbiAgICBsZXQgbWFya2VyU2l6ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1hcmtlclNpemVEaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsJ2NvbCBzMTInKTtcbiAgICBsZXQgbWFya2VyU2l6ZVNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbWFya2VyU2l6ZVNsaWRlci5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYW5nZScpO1xuICAgIG1hcmtlclNpemVTbGlkZXIuc2V0QXR0cmlidXRlKCdtaW4nLCcxMDAnKTtcbiAgICBtYXJrZXJTaXplU2xpZGVyLnNldEF0dHJpYnV0ZSgnbWF4JywnNTAwMCcpO1xuICAgIG1hcmtlclNpemVTbGlkZXIuc2V0QXR0cmlidXRlKCd2YWx1ZScsJzUwMCcpO1xuICAgIG1hcmtlclNpemVTbGlkZXIuc2V0QXR0cmlidXRlKCdpZCcsYCR7Y2F0YWxvZ05hbWV9LW1hcmtlclNpemVTbGlkZXJgKTtcbiAgICBsZXQgbWFya2VyU2l6ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBtYXJrZXJTaXplTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLGAke2NhdGFsb2dOYW1lfS1tYXJrZXJTaXplU2xpZGVyYCk7XG4gICAgbWFya2VyU2l6ZUxhYmVsLmlubmVySFRNTCA9ICdNYXJrZXIgU2l6ZSc7XG4gICAgbWFya2VyU2l6ZURpdi5hcHBlbmRDaGlsZChtYXJrZXJTaXplU2xpZGVyKTtcbiAgICBtYXJrZXJTaXplRGl2LmFwcGVuZENoaWxkKG1hcmtlclNpemVMYWJlbCk7XG4gICAgcmV0dXJuIG1hcmtlclNpemVEaXY7XG59XG5cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGlucHV0IGZpZWxkIGZvciBhbiBpbmRpdmlkdWFsIHByaW5jaXBsZSBjb2x1bW4gZnJvbSBhbiBpbmRpdmlkdWFsIGNhdGFsb2dcbiAqIEBwYXJhbSB7Kn0gY2F0YWxvZ05hbWUgY2F0YWxvZyBuYW1lIGZvciBpbnB1dCBmaWVsZCBcbiAqIEBwYXJhbSB7Kn0gcHJpbmNpcGxlQ29sdW1uIHByaW5jaXBsZSBjb2x1bW4gbmFtZSBmbyBpbnB1dCBmaWVsZFxuICovXG5jb25zdCBjcmVhdGVSZWZpbmVGaWVsZCA9IChjYXRhbG9nTmFtZSwgcHJpbmNpcGxlQ29sdW1uKSA9PiB7XG4gICAgbGV0IGlucHV0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdpbnB1dC1maWVsZCBjb2wgczYnKVxuICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBwcmluY2lwbGVDb2x1bW4pXG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKVxuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtjYXRhbG9nTmFtZX0tJHtwcmluY2lwbGVDb2x1bW59YClcbiAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBgJHtjYXRhbG9nTmFtZX0tJHtwcmluY2lwbGVDb2x1bW59YClcbiAgICBsYWJlbC5pbm5lckhUTUwgPSBgJHtwcmluY2lwbGVDb2x1bW4uc2xpY2UoOSl9YFxuICAgIGlucHV0RmllbGQuYXBwZW5kQ2hpbGQobGFiZWwpXG4gICAgaW5wdXRGaWVsZC5hcHBlbmRDaGlsZChpbnB1dClcbiAgICByZXR1cm4gaW5wdXRGaWVsZFxufVxuXG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgYXBwbHksIGNsZWFyLCBhbmQgZG93bmxvYWQgYnV0dG9ucyBmb3IgdGhlIHJlZmluZSBzZWN0aW9uXG4gKiBAcGFyYW0geyp9IGNhdGFsb2dOYW1lIENhdGFsb2cgbmFtZSBmb3IgYnV0dG9uc1xuICogQHBhcmFtIHsqfSByZWZpbmVGb3JtIFxuICogQHBhcmFtIHsqfSBjYXRhbG9nTGF5ZXIgXG4gKi9cbmNvbnN0ICBjcmVhdGVCdXR0b25EaXYgPSAoY2F0YWxvZ05hbWUsIHJlZmluZUZvcm0sIGNhdGFsb2dMYXllcikgPT4ge1xuICAgIGxldCBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGJ1dHRvbkRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbCBzMTIgcmVmaW5lLWJ0bnMnKVxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSBcImFwcGx5XCJcbiAgICBzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiYnRuLXNtYWxsXCIpXG4gICAgc3VibWl0QnV0dG9uLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhcHBseScpXG4gICAgbGV0IGRvd25sb2FkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGRvd25sb2FkQnV0dG9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnZG93bmxvYWQnKVxuICAgIGRvd25sb2FkQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKVxuICAgIGRvd25sb2FkQnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYnRuLXNtYWxsIG9yYW5nZSBsaWdodGVuLTInKVxuICAgIGRvd25sb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZG93bmxvYWRRdWVyeShjYXRhbG9nTmFtZSwgcmVmaW5lRm9ybSkpXG4gICAgbGV0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGNsZWFyQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKVxuICAgIGNsZWFyQnV0dG9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnY2xlYXInKVxuICAgIGNsZWFyQnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYnRuLXNtYWxsIHJlZCBsaWdodGVuLTInKVxuICAgIGNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVzZXRRdWVyeUZvcm0oY2F0YWxvZ05hbWUsIGNhdGFsb2dMYXllcikpXG4gICAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbilcbiAgICBidXR0b25EaXYuYXBwZW5kQ2hpbGQoZG93bmxvYWRCdXR0b24pXG4gICAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKGNsZWFyQnV0dG9uKVxuICAgIHJldHVybiBidXR0b25EaXZcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSB3aG9sZSBxdWVyeSBmb3JtIGFuZCBhZGRzIGl0IHRvIHRoZSBET01cbiAqL1xuY29uc3QgY3JlYXRlQ2F0YWxvZ1F1ZXJ5TWVudSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjYXRhbG9nTGlzdCA9IGF3YWl0IGRvd25sb2FkQ2F0YWxvZ0luZm9ybWF0aW9uKCk7XG4gICAgY29uc3QgcXVlcnlUYWJCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXJ5LXRhYi1ib2R5Jyk7XG4gICAgaW5pdFNlbGVjdE1lbnUoKTtcbiAgICBcbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgZm9yIChsZXQgY2F0YWxvZyBvZiBjYXRhbG9nTGlzdCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IENPTE9SU1tjb3VudGVyXTtcbiAgICAgICAgY29uc3QgY2F0YWxvZ05hbWUgPSBjYXRhbG9nLm5hbWU7XG4gICAgICAgIGFkZENhdGFsb2dUb1NlbGVjdE1lbnUoY2F0YWxvZ05hbWUpO1xuICAgICAgICBsZXQgY2F0YWxvZ0xheWVyID0gTC5sYXllckdyb3VwKCk7XG4gICAgICAgIGxldCByZWZpbmVGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICByZWZpbmVGb3JtLnNldEF0dHJpYnV0ZSgnaWQnLGAke2NhdGFsb2dOYW1lfS1mb3JtYCk7XG4gICAgICAgIHJlZmluZUZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsJ3JlZmluZS1mb3JtIGhpZGUgcm93Jyk7XG4gICAgICAgIHJlZmluZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShyZWZpbmVGb3JtKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo1MDAwL2NhdGFsb2dzLyR7Y2F0YWxvZ05hbWV9L3F1ZXJ5YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhdGFsb2dMYXllci5jbGVhckxheWVycygpO1xuICAgICAgICAgICAgICAgIGxldCBtYXJrZXJTaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2F0YWxvZ05hbWV9LW1hcmtlclNpemVTbGlkZXJgKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBtYWluTGF5ZXJDb250cm9sLnJlbW92ZUxheWVyKGNhdGFsb2dMYXllcik7XG4gICAgICAgICAgICAgICAgbWFpbkxheWVyQ29udHJvbC5hZGRPdmVybGF5KGNhdGFsb2dMYXllciwgY2F0YWxvZ05hbWUpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IFtuYW1lLGNvb3JkaW5hdGVzXSBvZiBPYmplY3QuZW50cmllcyhvYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBteU1hcmtlciA9IEwuY2lyY2xlKGNvb3JkaW5hdGVzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpdXM6IG1hcmtlclNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDF9KVxuICAgICAgICAgICAgICAgICAgICBteU1hcmtlci5iaW5kVG9vbHRpcChgJHtuYW1lfSAoJHtjYXRhbG9nTmFtZX0pYCkgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIG15TWFya2VyLm9uKCdjbGljaycsICgpID0+IGRpc3BsYXlPYmplY3RJbmZvcm1hdGlvbihjYXRhbG9nTmFtZSxuYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIG15TWFya2VyLmFkZFRvKGNhdGFsb2dMYXllcik7XG4gICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICByZWZpbmVGb3JtLmFwcGVuZENoaWxkKGNyZWF0ZU1hcmtlclNpemVTbGlkZXIoY2F0YWxvZ05hbWUpKTtcbiAgICAgICAgZm9yIChsZXQgcHJpbmNpcGxlQ29sdW1uIG9mIGNhdGFsb2cucHJpbmNpcGxlQ29sdW1ucykge1xuICAgICAgICAgICAgcmVmaW5lRm9ybS5hcHBlbmRDaGlsZChjcmVhdGVSZWZpbmVGaWVsZChjYXRhbG9nTmFtZSwgcHJpbmNpcGxlQ29sdW1uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVmaW5lRm9ybS5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b25EaXYoY2F0YWxvZ05hbWUsIHJlZmluZUZvcm0sIGNhdGFsb2dMYXllcikpO1xuICAgICAgICBxdWVyeVRhYkJvZHkuYXBwZW5kQ2hpbGQocmVmaW5lRm9ybSk7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9XG4gICAgTS51cGRhdGVUZXh0RmllbGRzKCk7XG59XG5cblxuLyoqXG4gKiBEb3dubG9hZHMgYWxsIGVudHJpZXMgZnJvbSBjYXRhbG9nTmFtZSB0aGF0IG1hdGNoIHRoZSBjb25zdHJhaW50cyBpbiByZWZpbmVmb3JtXG4gKiBAcGFyYW0geyp9IGNhdGFsb2dOYW1lIFxuICogQHBhcmFtIHsqfSByZWZpbmVGb3JtIFxuICovXG5jb25zdCBkb3dubG9hZFF1ZXJ5ID0gKGNhdGFsb2dOYW1lLCByZWZpbmVGb3JtKSA9PiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEocmVmaW5lRm9ybSk7XG4gICAgZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9jYXRhbG9ncy8ke2NhdGFsb2dOYW1lfS9kb3dubG9hZGAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICBib2R5OiBmb3JtRGF0YVxuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBibG9iID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGxpbmsuaHJlZiA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBsaW5rLmRvd25sb2FkID1gJHtjYXRhbG9nTmFtZX0tJHtjdXJyZW50RGF0ZX0uY3N2YDtcbiAgICAgICAgbGluay5jbGljaygpO1xuICAgIH0pXG59XG5cbmNvbnN0IHJlc2V0UXVlcnlGb3JtID0gKGNhdGFsb2dOYW1lLCBjYXRhbG9nTGF5ZXIpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjYXRhbG9nTmFtZX0tZm9ybWApLnJlc2V0KCk7XG4gICAgbWFpbkxheWVyQ29udHJvbC5yZW1vdmVMYXllcihjYXRhbG9nTGF5ZXIpO1xuICAgIGNhdGFsb2dMYXllci5jbGVhckxheWVycygpO1xuXG59XG5cbi8qKlxuICogUXVlcmllcyB0aGUgZGF0YWJhc2UgdG8gb2J0YWluIGNhdGFsb2cgbmFtZXMgYW5kIHByaW5jaXBsZSBjb2x1bW4gbmFtZXNcbiAqL1xuY29uc3QgZG93bmxvYWRDYXRhbG9nSW5mb3JtYXRpb24gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAwL2NhdGFsb2dzJylcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG4vKipcbiAqIERpc3BsYXlzIGluZm9ybWF0aW9uIGFib3V0IGEgc2luZ2xlIG9iamVjdCBpbiBhIG1vZGFsIHBvcHVwIHdpbmRvd1xuICogQHBhcmFtIHsqfSBjYXRhbG9nTmFtZSBcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0SUQgXG4gKi9cbmNvbnN0IGRpc3BsYXlPYmplY3RJbmZvcm1hdGlvbiA9IChjYXRhbG9nTmFtZSwgb2JqZWN0SUQpID0+IHtcbiAgICBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo1MDAwL2NhdGFsb2dzLyR7Y2F0YWxvZ05hbWV9L3F1ZXJ5X29iamVjdC8ke29iamVjdElEfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4ob2JqZWN0SW5mb3JtYXRpb24gPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2JqZWN0LW1vZGFsJylcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vYmplY3QtbmFtZScpLmlubmVyVGV4dCA9IG9iamVjdElEO1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBNLk1vZGFsLmluaXQoZWxlbSwge2Rpc21pc3NpYmxlOiB0cnVlfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvYmplY3QtdGFibGUtYm9keScpXG4gICAgICAgICAgICBmb3IobGV0IFtrZXksdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdEluZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgICAgICAgICAgIHByb3BlcnR5LmlubmVySFRNTCA9IGtleTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0eVZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKHByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zdGFuY2Uub3BlbigpO1xuICAgICAgICB9KVxufSIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiKTtcblxuICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQuX19lc01vZHVsZSA/IGNvbnRlbnQuZGVmYXVsdCA6IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgfVxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307Il0sInNvdXJjZVJvb3QiOiIifQ==
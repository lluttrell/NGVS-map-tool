# NGVS Graphical Search Tool

The NGVS graphical search tool is an interactive tool used for locating and downloading data collected from the NGVS. It aims to implement all features of the [current tool](http://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/community/ngvs/), as well as add additional functionalities.

The tool uses a [Leaflet](https://leafletjs.com/) map to display an interactive map of the Virgo Supercluster. The map includes a layer control in the corner of the map that allows users to toggle overlays on the map. There are overlays that display the NGVS pointings, the field outlines for each available filter, as well as any catalogs queries that have been added to the map (described below).

The tool has a sidebar that provides an additional set of functionalities:

1. A searchbar is used to quickly identify objects or locations on the map using te CADC name resolving service. If a search is succesful it adds a marker to the map.

2. The query tab is used to plot and download information from the various catalogs. After selecting a catalog the user is presented with a list of principle values that they may constrain to certain values. The user can view the query results on the map, or directly download them. If plotted on the map, each object is represented as a circle. Clicking on the circle displays all of the catalog information about the object, as well as a link to download tailored FITS images if they exist.


## Installation
The application uses npm and webpack for asset management. Node (and npm) must be installed to build the app. The build instrucrions are as followed

1. Install the dependencies (listed in package.json) by running `npm install`
2. To build the application using webpack run the command `npm run build`. This should bundle all of the source files and dependicies into a web application in the `dist` folder.
3. To run the application through the webpack development server run the command `npm start`. The application must be built at least once before doing this, as there are static assets that are created when building the application.

## Configuration
`app.config.js` contains a list of configuration options for changing things such as color/line styles, the catalog list members, etc. 


## Testing
There is a very limited unit test suite. To run the suite use the command `npm test`.

//leaflet

var map = L.map('map').setView([5.508736199227212, 7.039585420419388], 13);

var osm= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);


var Dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
});
//Dark.addTo(map);

var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
//googleSat.addTo(map);





// var myIcon = L.icon({
//     iconUrl: 'marker-icon.png',
//     iconSize: [38, 95],
//     iconAnchor: [22, 94],
//     popupAnchor: [-3, -76],
//     shadowSize: [68, 95],
//     shadowAnchor: [22, 94]
// });
var marker = L.marker([5.508736199227212, 7.039585420419388]).addTo(map)
    .bindPopup('Welcome to Imo!')
    .openPopup();




// var overlayMaps = {
//     "Marker1":marker
// };


baseLayers = {
    "osm": osm,
    "dark":Dark,
    "GS":googleStreets,
    "GH":googleHybrid,
    "GS":googleSat
};

var overlays = {
    "Marker": marker,
};

L.control.layers(baseLayers, overlays).setPosition("topright").addTo(map);

 //mouse on move=====================
 map.on("mousemove" ,function(e){
    $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(4)}, Lng:${e.latlng.lng.toFixed(4)}`)
})
 //add scale
 L.control.scale({position:"bottomleft"}).addTo(map);
//routing=============================
//  L.Routing.control({
//     waypoints: [
//       L.latLng(6.424151475676185, 7.493759858053406),
//       L.latLng(6.472083171842147, 7.470242248842608)
//     ]
//     ,position:"bottomright"}).addTo(map);

 //zoom position

 map.zoomControl.setPosition("bottomright");
 //geocode

L.Control.geocoder({position:"topleft"}).addTo(map);
// geojson

// const church1 = new L.geoJSON(church, {
//     onEachFeature: (feature = {}, layer) => {
//       const { properties = {} } = feature;
//       const { name } = properties;

//       if ( !name ) return;

//       layer.bindPopup(`<p>${name}</p>`);
//     }
//   });
// church1.addTo(map);

var markerOption = {
    radius:10,
    fillColor: '#fff',
    color:'#000',
    weight:1,
    opacity: 1,
    fillOpacity: 0.8
    };

var markers = L.markerClusterGroup();

L.geoJSON(church, {
    onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { name } = properties;
  
        if ( !name ) return;
  
        layer.bindPopup(`<p>${name}</p>`);
      },
    pointToLayer: function (feature, latlng) {
        return markers.addLayer(L.circleMarker(latlng, markerOption));
    }
}).addTo(map);

// clustermaker

map.addLayer(markers);



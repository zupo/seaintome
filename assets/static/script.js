var map;
var markersArray = [];
var image = 'img/';
var bounds = new google.maps.LatLngBounds();
var loc;

function initMap({pois, max_initial_zoom}={}){

    // map styling
    var mapOptions = { mapTypeId: google.maps.MapTypeId.HYBRID};

    // #map div is expected to exist in template
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // prepare the info box shown when clicking on a marker
    var infowindow = new google.maps.InfoWindow();

    // do not zoom in too much when initializing the map
    google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        if (this.getZoom() > max_initial_zoom) {
            this.setZoom(max_initial_zoom);
        }
    });

    // close infowindow if clicking outside it
    google.maps.event.addListener(map, "click", function(event) {
        infowindow.close();
    });

    // create a marker for each POI
    $.each(pois, function( index, poi ) {

        // expand pipe-delimited string into variables
        poi = poi.split('|');
        lat = poi[0];
        lng = poi[1];
        title = poi[2];
        description = poi[3];

        // add a marker
        loc = new google.maps.LatLng(lat, lng);
        bounds.extend(loc);
        var marker = new addMarker(loc, title, 'active');

        // show info box when clicking on marker
        var infoBoxString = '<div style="max-width: 250pt">' +
            '<div style="font-size: 14px; font-weight: 500;">' + title + '</div>' +
            '<div id="bodyContent">' +
            '<p>' + description + '</p>' +
            '</div>' +
            '</div>';

        marker.addListener('click', function() {
          infowindow.setContent(infoBoxString);
          infowindow.open(map, marker);
        });
    });

    map.fitBounds(bounds);
}


function addMarker(location, name, active) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: name,
        status: active
    });
    return marker;
}

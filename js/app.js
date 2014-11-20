/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

var mapOptions = {
	center: {lat: 47.655, lng:-122.308},
	zoom: 14
}

var mapElem = document.getElementById('map');

var map = new google.maps.Map(mapElem, mapOptions);

//marker position
//note that values must be numbers, not strings!
var position = {
 lat: 47.655, //latitude
 lng: -122.3080 //longitude
};

//create a marker on the map
var marker = new google.maps.Marker({
 position: position,
 map: map
});

//removes marker
//marker.setMap(null);

//read the marker, from memory
//marker.setMap(map)

var infoWin = new google.maps.InfoWindow();

function onGeoPos(position) {
	//position.coords.latitude = current latitude
	//position.coords.longitude = current longitude
	//position.coords.altitude = current altitude (if avail)
	console.log("Lat " + position.coords.latitude);
	console.log("Lng " + position.coords.longitude);

	var myLocPos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	}
	var myLocation = new google.maps.Marker ({
		position: myLocPos,
		map: map
	});

	infoWin.setContent('<p>Hello World! My lat is '
	 + position.coords.latitude 
	 + ' and my lng is ' 
	 + position.coords.longitude 
	 + '<p>');

	google.maps.event.addListener(myLocation, 'click', onMarkerClick)
} //onGeoPos()

function onGeoErr(error) {
 //error.code == error.PERMISSION_DENIED (user denied)
 //error.code == error.TIMEOUT (request timed out)
 //error.code == error.POSITION_UNAVAILABLE (unavailable)
} //onGeoErr

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(onGeoPos, onGeoErr, 
		{enableHighAccuracy: true, maximumAge: 30000});
} else {
	console.log("geolocation not supported");
}

function onMarkerClick() {
	// 'this' will refer to marker object

	//pan map so marker is in the center
	map.panTo(this.getPosition());
	infoWin.open(map, this);
}










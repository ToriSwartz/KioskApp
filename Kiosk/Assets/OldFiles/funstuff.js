window.addEventListener('load', function() {
  initMap();
  setTimeout(function(){getSelectValues();}, 300);


});

//values for check box
let getSelectValues = function() {
  let checkInputs = $('.multiselect-container.dropdown-menu').find('input');

  for (let index = 0; checkInputs.length > index; index++) {

    $(checkInputs[index]).change(function() {
      //allMarkers[0].setMap(null);


        //If a marker is checked
        if(this.checked) {
            if(index === 0){
              // var returnVal = alert("one?");
              // $(this).prop("checked", returnVal);
              console.log("YOOOOOO")
            }
            if(index === 1){
              // var returnVal = alert("two?");
              // $(this).prop("checked", returnVal);
            }
            if(index === 2){
              // var returnVal = alert("three?");
              // $(this).prop("checked", returnVal);
            }


            // var cats = $(this).attr('id');
            // console.log(cats);

        }
    });
  }

  //start the filtering processes my good sir
  var filterMarkers = function(){
    var cat = ['Pottery', 'Music', 'Other'];

  }

}


var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");

//An image to overlay
$overlay.append($image);

//Add overlay
$("body").append($overlay);

console.log('tori',$("#photo-gallery a").attr("href"));

//click the image and a scaled version of the full size image will appear
$("#photo-gallery").on("click", "a", function (event) {
  event.preventDefault();
  var imageLocation = $(this).attr("href");

  //update overlay with the image linked in the link
  $image.attr("src", imageLocation);

  //show the overlay
  $overlay.show();
} );

$("#overlay").click(function() {
  $( "#overlay" ).hide();
});

let initMap = function initMapImpl() {

// Create a new StyledMapType object, passing it an array of styles,
// and the name to be displayed on the map type control.
let styledMapType = new google.maps.StyledMapType(
  [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "lightness": 65
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#1cafd9"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#1cafd9"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#1cafd9"
        },
        {
          "lightness": 75
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2a3d63"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ],

  {name: 'Styled Map'});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.217, lng: -74.742},
    zoom: 13,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      'styled_map']
    },
    disableDefaultUI: true
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  dynamicallyPopulateMap(map);
}

let allMarkers = [];

let dynamicallyPopulateMap = function(map) {

  let data = JSON.parse(document.getElementById("data").innerHTML);
  let dataLength = data.length;


  for (let index = 0; index < data.length; index++) {

    let _current = data[index];
    buildMarker(index, _current, map);

  }

  //index contentString

  // let marker1 = new google.maps.Marker({
  //   position: {lat: 40.230, lng: -74.800},
  //   map: map
  // });
  //
  //
  //
  // marker1.addListener('click', function() {
  //   infowindow.open(map, marker1);
  //   $("#sidebar-wrapper").addClass("active")
  //   map.setZoom(13.5);
  //   map.setCenter(marker1.getPosition());
  // });
  //

}

let _makeContentString = function(title, origin) {
  return `<div id="content">
    <h5 id="name">${title}</h5>
    <p id="Origin">${origin}</p>
  </div>`;
}

let activeTooltip = undefined;

let populateSideNav = function populateSideNavImpl(data) {
  $("#name").text(data.name);
  $('#origin').text(data.origin);
  $('#location').text(data.location);
  $('#description').text(data.description);
  $('#significance').text(data.significance);
  let _gallery = $('#photo-gallery');

  // remove all li's each time
  _gallery.empty();

  let buildImageContent = function(url) {
    return `<li>
      <a href="${url}" >
        <img src="${url}">
      </a>
    </li>`
  }


  // iterate through all images
  for (let image = 0; image < data.images.length; image++) {
    console.log('image', data.images[image]);
    _gallery.append(buildImageContent(data.images[image]));
  }
}



let buildMarker = function buildMarkerImpl(index, _current, map) {

  allMarkers[index] = {
    tooltip: new google.maps.InfoWindow({
      content: _makeContentString(_current.name, _current.origin),
      maxWidth: 200
    }),
    data: _current,
    content: new google.maps.Marker({
      position: {lat: _current.lat, lng: _current.long},
      map: map
    })
  }


  allMarkers[index].content.addListener('click', function() {

    allMarkers[index].tooltip.open(map, allMarkers[index].content);

    if (activeTooltip !== undefined) {
      allMarkers[activeTooltip].tooltip.close(map, allMarkers[activeTooltip].tooltip);
    }


    $("#sidebar-wrapper").addClass("active");
    populateSideNav(allMarkers[index].data)
    map.setZoom(13.5);
    map.setCenter(allMarkers[index].content.getPosition());
    activeTooltip = index;

  });

}


///

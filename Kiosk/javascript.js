window.addEventListener('load', function() {
  initMap();
});

//BELOW IS THE CODE USED FOR FILTERING
var activeMaterial= "";
var activeFeild="";
var activeMedium="";
filterMarkersMat = function (category) {
  activeMaterial = category;
  console.log(activeMaterial);
  for (i = 0; i < allMarkers.length; i++) {
    marker = allMarkers[i].content;

    // If is same category or category not picked
    if ( (marker.material === category || category.length === 0) && (marker.feild === activeFeild || activeFeild.length === 0) && (marker.medium === activeMedium || activeMedium.length === 0)) {
      marker.setVisible(true);
    }
    // Categories don't match
    else{
      marker.setVisible(false);
    }
  }
}
filterMarkersFe = function (category) {
  activeFeild = category;
  console.log(activeFeild);
  for (i = 0; i < allMarkers.length; i++) {
    marker = allMarkers[i].content;

    // If is same category or category not picked
    if (marker.feild == category || category.length === 0 && (marker.material === activeMaterial || activeMaterial.length === 0) && (marker.medium === activeMedium || activeMedium.length === 0)) {
      marker.setVisible(true);
    }
    // Categories don't match
    else{
      marker.setVisible(false);
    }
  }
}
filterMarkersMed = function (category) {
  activeMedium = category;
  console.log(activeMedium);
  for (i = 0; i < allMarkers.length; i++) {
    marker = allMarkers[i].content;

    // If is same category or category not picked
    if (marker.medium == category || category.length === 0 && (marker.feild === activeFeild || activeFeild.length === 0) && (marker.material === activeMaterial || activeMaterial.length === 0)) {
      marker.setVisible(true);
    }
    // Categories don't match
    else{
      marker.setVisible(false);
    }
  }
}

//CODE TO FILTER VIA THE SEARCH BAR
searchObject = function(text){

  // text = text.replace(/\s/g, '');
  temp = text.toLowerCase();

  //console.log(text);
  for (i = 0; i < allMarkers.length; i++) {
    marker = allMarkers[i].content;

    // If is same category or category not picked
    title = marker.title.toLowerCase();

    if (title.match(temp) || text.length === 0) {
      marker.setVisible(true);
    }
    // Categories don't match
    else{
      marker.setVisible(false);
    }
  }

}


//CODE TO GENERATE THE OVERLAY FOR THE GALLERY OF THE SIDE MENU
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");

//An image to overlay
$overlay.append($image);

//Add overlay
$("body").append($overlay);

//console.log('tori',$("#photo-gallery a").attr("href"));

//click the image and a scaled version of the full size image will appear
$("#photo-gallery").on("click", "a", function (event) {
  event.preventDefault();
  var imageLocation = $(this).attr("href");

  //update overlay with the image linked in the link
  $image.attr("src", imageLocation);

  console.log(this);

  if(this.id === "videoImg"){
    console.log("Hi!");
    $overlay.append(document.getElementById("video"));
    document.getElementById("video").style.height = 1;
    document.getElementById("video").style.width = "";
  }else{
    document.getElementById("video").style.height = 0;
    document.getElementById("video").style.width = 0;
  }

  //show the overlay
  $overlay.show();
  if(this.id === "videoImg"){
    document.getElementById("video").style.height = "";
  }
  console.log(document.getElementById("video"));
} );

$("#overlay").click(function() {
  console.log("Pepper");
  $( "#overlay" ).hide();

});

//CREATES THE MAP AND MARKERS
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
      <a id="noVideo" href="${url}" >
      <img src="${url}">
      </a>
      </li>`
    }

    let buildVideoContent = function(videoURL, imageURL) {
      return `<li>
      <a id="videoImg" href="" >
      <img src="${imageURL}">
      </a>
      </li>
      <iframe id="video" width="1648" height="619" src="${videoURL}" frameborder="0"; encrypted-media" allowfullscreen></iframe>`
    }


    // iterate through all images
    for (let image = 0; image < data.images.length; image++) {
      console.log('image', data.images[image]);
      _gallery.append(buildImageContent(data.images[image]));
    }
    if(data.video.length>1){
      _gallery.append(buildVideoContent(data.video[0], data.video[1]));
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
        title: _current.name,
        feild: _current.feild,
        material:_current.material,
        medium:_current.medium,

        map: map
      })
    }





    allMarkers[index].content.addListener('click', function() {

      //allMarkers[index].tooltip.open(map, allMarkers[index].content);

      if (activeTooltip !== undefined) {
        allMarkers[activeTooltip].tooltip.close(map, allMarkers[activeTooltip].tooltip);
      }
      if(document.getElementById("video")){
        document.getElementById("video").remove();
      }

      $("#sidebar-wrapper").addClass("active");
      populateSideNav(allMarkers[index].data)
      map.setZoom(13.5);
      map.setCenter(allMarkers[index].content.getPosition());
      activeTooltip = index;

    });

  }

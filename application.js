$(function() {

  _500px.init({
    sdk_key: '03c22e999b471972d2a71321f2cd722225f5973f'
  });

  var vancouver = {lat: 49.281545, lng: -123.120152};

  var photos_arr = [];

  function get500pxData(lat, lng) {

    $.getJSON('https://api.500px.com/v1/photos/search?geo=' + lat + ',' + lng + ',30km&image_size=600&sdk_key=03c22e999b471972d2a71321f2cd722225f5973f', function(data) {
      // console.log(data.photos);
      data.photos.forEach(function(photo) {
        photos_arr.push([photo.latitude, photo.longitude, photo.image_url, photo.name, photo.url, photo.user.username]);
      })
      renderMarkers(photos_arr);
    })

  }

  var renderMarkers = function(arr) {

    arr.forEach(function(point) {
      var marker = new google.maps.Marker({
        position: {lat: point[0], lng: point[1]},
        map: map,
        title: 'Photo: ' + point[3]
      });

      var infowindow = new google.maps.InfoWindow({
        content: '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">' + point[3] + '</h1>'+
        '<img src="' + point[2] + '">' +
        '<div id="bodyContent">'+
        '<p><b>Added by: </b>' + point[5] + '</p>'+
        '<p>URl: <a href="http://www.500px.com/' + point[4] + '">'+
        'http://www.500px.com/'+ point[4] + '</a></p>'+
        '</div>'+
        '</div>'
      });

      var prev_infoWindow = false;

      marker.addListener('click', function() {
        if (prev_infoWindow) {
          prev_infoWindow.close();
        };
        infowindow.open(map, marker);
        prev_infoWindow = infowindow;
      });

    })

  }

  get500pxData(vancouver.lat, vancouver.lng);

})


// http://stackoverflow.com/questions/4338490/google-map-event-bounds-changed-triggered-multiple-times-when-dragging

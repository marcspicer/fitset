var access_token = 'pk.eyJ1IjoienViYWlyODEyIiwiYSI6ImNqZHlxbDBkZzJwZW0yd211ejh2dWt3a2oifQ.JLO-2btd1Wl4KI522plbBw';
var markers = [];
var mymap = null;
var markerGroup = null;
var defaultIcon = L.icon({
    iconUrl: '/css/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [-3, -76],
    shadowUrl: '/css/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});
var highlightIcon = L.icon({
    iconUrl: '/css/images/marker-icon-2x.png',
    iconSize: [50, 82],
    iconAnchor: [25, 82],
    popupAnchor: [-3, -76],
    shadowUrl: '/css/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});

var highlighted_marker = null;

$(document).ready(function(){
    // Load locations on activity click
    $("#api-activities").on('click', '.item', function(){
        var category_id = $(this).attr('data-id');
        $("#api-activities .item").removeClass('active');
        $(this).addClass('active');

        getCategoryLocations(category_id);
    });

    //Highlight marker on mouse hover

    $("#api-locations").on('mouseover', 'li', function(){
        var marker_index = highlighted_marker = $(this).attr('data-index');
        markers[marker_index].setIcon(highlightIcon);
    });
    $("#api-locations").on('mouseleave', 'li', function(){
        var marker_index = highlighted_marker;
        markers[marker_index].setIcon(defaultIcon);
    });

    $("#api-activities").html('<img src="/images/loading.svg" class="loading-image" />');
    $("#api-locations").html('<img src="/images/loading.svg" class="loading-image" />');
    $(".owl-carousel").show();
    $.ajax({
        url: '/api/get-activities',
        method: 'GET',
        success: function(res){
            if(res.length > 0) {
                var activities = '';
                $.each(res, function(i, activity){
                    activities += `<div class="item" data-id="${activity._id}">
                    <a href="javascript:void(0)">
                      <img src="/images/yoga-img.png" alt="" title="">
                      <span>${activity.name}</span>
                    </a>
                  </div>`;
                });
                $("#api-activities").html(activities);
                $("#api-activities .item:first").addClass('active');

                applyCarousel();
                getCategoryLocations(res[0]._id);
            }
        }
    });

    mymap = L.map('mapid').setView([43.654239, -79.388242], 9);
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+access_token, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: access_token
    }).addTo(mymap);
    // Create layer for markers
    markerGroup = L.layerGroup().addTo(mymap); 

    
});

function getCategoryLocations(category_id){
    if(markerGroup){
        markerGroup.clearLayers();
    }
    $("#api-locations").html('<img src="/images/loading.svg" class="loading-image" />');
    $.ajax({
        url: '/api/get-locations/' + category_id,
        method: 'GET',
        success: function(res){
            markers = [];
            if(res.length > 0){
                var locations = '';
                $.each(res, function(i, loc){
                    if(loc.latitude && loc.longitude){
                        var marker = L.marker([loc.latitude, loc.longitude], {
                            location_url: '/location/' + loc._id
                        });
                        marker.addTo(markerGroup);
                        marker.on('click', goToURL);
                        markers.push(marker);
                        locations += `<li data-index="${i}">
                            <a href="/location/${loc._id}">${loc.name}</a>
                        </li>`;
                    }
                    
                });
                $("#api-locations").html(locations);
                drawMarkers();
            } else {
                $("#api-locations").html('');
            }
        }
    });
}

function drawMarkers(){
    var group = new L.featureGroup(markers);

    mymap.fitBounds(group.getBounds());
}

function goToURL(e){
    location.href = this.options.location_url;
}
function applyCarousel(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          600: {
            items: 3,
            nav: false
          },
          1000: {
            items: 5,
            nav: true,
            loop: false,
            margin: 20
          }
        }
    });
}
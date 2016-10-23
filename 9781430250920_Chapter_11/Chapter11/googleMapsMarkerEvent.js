function loadMapAPI(){	  
 var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB1bNEYHBBRLgP0NUGHE8BHW_KENj0EQeU&sensor=true&callback=initialize";
  document.body.appendChild(script);	  
	  	
	
}



  function initialize() {  
	var myLatlng = new google.maps.LatLng(35.8617, 139.6453 );
	var mapOptions = {
	  center: myLatlng,
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
	
		
	
var contentString = '<div id="content">'+
    '<p><b>Saitama</b> is the capital and the most populous city '+
	'of Saitama Prefecture in Japan, situated in the south-east of the prefecture.'+
	'Being in the Greater Tokyo Area and lying 15 - 30 kilometres north of central Tokyo,'+
	 'many of its residents commute into Tokyo.</p>'+
    '<p>Source: <a href="http://en.wikipedia.org/wiki/Saitama,_Saitama">'+
    'http://en.wikipedia.org/wiki/Saitama,_Saitama</a>.</p>'+
    '</div>';	
	
	var infowindow = new google.maps.InfoWindow({
   		 content: contentString
	});
	var marker = new google.maps.Marker({
      position: myLatlng,
	  animation: google.maps.Animation.DROP,
      map: map
  	});
	
	google.maps.event.addListener(marker, 'click', function() {
 		 infowindow.open(map,marker);
	});
  }
  
document.addEventListener("DOMContentLoaded",loadMapAPI,false);
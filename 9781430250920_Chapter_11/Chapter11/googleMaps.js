function loadMapAPI(){	  
 var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB1bNEYHBBRLgP0NUGHE8BHW_KENj0EQeU&sensor=true&callback=initialize";
  document.body.appendChild(script);	  
	  	
	
}



  function initialize() {
	var mapOptions = {
	  center: new google.maps.LatLng(35.8617, 139.6453 ),
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
	
	
  }
  
  document.addEventListener("DOMContentLoaded",loadMapAPI,false);
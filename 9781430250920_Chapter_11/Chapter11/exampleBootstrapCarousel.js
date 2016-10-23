// JavaScript Document
$(document).ready(function(e) {
    $(document).off('.data-api');
	$('.carousel-control').click(function(e){
		//alert(e.target.getAttribute("data-slide"));
		switch(e.target.getAttribute("data-slide")){
			case 'prev': 
				$('.carousel').carousel('prev');
			break;
			
			case "next":
				$('.carousel').carousel('next');
			break;
		}
	});
	
	$('.carousel-indicators').click( function(e){
		
		//alert(e.target.getAttribute("data-slide-to"));
		switch(e.target.getAttribute("data-slide-to")){
			case '0': 
				$('.carousel').carousel(0);
			break;
			
			case "1":
				$('.carousel').carousel(1);
			break;
			
			case "2":
				$('.carousel').carousel(2);
			break;			
		}	
	});
});
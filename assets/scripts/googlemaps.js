/*--------------------------------------------------------------------
JAVASCRIPT "contactos"

Version: 	2.0 - 2009/2010
author: 	Burocratik (alexandre gomes)
email: 		alex@burocratik.com
website: 	http://www.burocratik.com
-----------------------------------------------------------------------
=Abrir e fechar de endereços
-----------------------------------------------------------------------*/
$(document).ready(function(){
/*-----------------------------------------------------------------------
=GOOGLE MAPS v3 (uso jquery para iniciar se nao usar o onload
-----------------------------------------------------------------------*/
	var myOptions = {
	    zoom: 18,
	    center: new google.maps.LatLng(40.2075,-8.426),
		// Tipo de controles e tipo de mapa
	    navigationControl: false,
	  	navigationControlOptions: {style: google.maps.NavigationControlStyle.NORMAL},
	    streetViewControl: false,
	    //
	    scrollwheel: false,
	    panControl: false,
	    zoomControl: true,
	    zoomControlOptions: {
	      style: google.maps.ZoomControlStyle.LARGE,
	      position: google.maps.ControlPosition.TOP_LEFT
	    },
	    //
		mapTypeControl: true,
	    mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
	      	position: google.maps.ControlPosition.TOP_RIGHT,
			mapTypeIds: [google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
		},
	};
  
	var map = new google.maps.Map($("#mapaID")[0], myOptions);
  	map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
	map.setTilt(45);

/////////////////***************
// Criar marker icon
	var icon = new google.maps.MarkerImage("/imgs/gmap-icon.png",
	new google.maps.Size(22, 32),
	new google.maps.Point(0, 0), //definir ponto de origem da imagem
	new google.maps.Point(11, 32));

// Funcao Criar Marker com Info Windows
  	function fMarker(point,iconMarker, id){
		var marker = new google.maps.Marker({
    	position: point,
      	map: map,
		icon: iconMarker
	});
    //
	google.maps.event.addListener(marker, 'click', function() {
		map.setCenter(point);
    	map.panTo(point);
    	map.setZoom(20);
  	});
  	return marker;
	}//criar marker

//*Coimbra
  	var point = new google.maps.LatLng(40.207762, -8.425138);
	fMarker(point,icon);

	
	$("#btnMapaMaior").click(function(){
		var altura = $(window).height();
		$("html, body").stop().animate({"scrollTop": $("#mapaID").offset().top}, 800, "easeInOutQuint", function(){
			$("#mapaID").animate({"height": altura}, 300);
		});
	});//end click
	
	
	

////////////////
});//end load document
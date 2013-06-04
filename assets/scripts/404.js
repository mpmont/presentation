/*--------------------------------------------------------------------
JAVASCRIPT "index"

Version: 	1.0 - 2012
author: 	Burocratik (alexandre gomes)
email: 		alex@burocratik.com
website: 	http://www.burocratik.com
-----------------------------------------------------------------------*/

$(document).ready(function(){
/*-----------------------------------------------------------------------
 =PRELOAD
-----------------------------------------------------------------------*/
	var preloadPics = $("#preload").imagesLoaded();
	preloadPics.always( function(){
    $("#lightBoxWrapper").fadeTo(800,0, function(){
    	
    	console.log("start");
    	startAnimation();
    	
    	$(this).hide();
    });
    });//end images load

/*-----------------------------------------------------------------------
 =ANIMATION START
-----------------------------------------------------------------------*/
function startAnimation(){
	$("#local1").animatePNG(100, 6, 80, 0);//start1
  	$.doTimeout(480, function(){
    	$("#local2").animatePNG(51, 3, 80, 0);//start2
    	$.doTimeout(240, function(){
			$("#local3").animatePNG(82, 5, 80, 0);//start3
			$.doTimeout(400, function(){
				$("#local3 .pin").addClass("active");
		  		$("#local4").animatePNG(72, 6, 80, 0);//start4
				$.doTimeout(480, function(){
					$("#local5").animatePNG(259, 24, 80, 0);//start5
					$.doTimeout(1920, function(){
						$("#local7").animatePNG(90, 6, 80, 0);//start7
						$.doTimeout(480, function(){
							$("#local7 .pin").addClass("active");
							$("#local8").animatePNG(166, 9, 80, 0);//start8
							$.doTimeout(720, function(){
								$("#local9").animatePNG(187, 21, 80, 0);//start9
								$.doTimeout(1680, function(){
									$("#local9 .pin").addClass("active");
									$("#local10").animatePNG(156, 9, 80, 0);//start10
								})//end time9
							})//end time8
						})//end time7
					})//end time5
				})//end time4
			})//end time3
    	})//end time2
	})//end time1
}//end function animate

/////////////////////////
})//end load document


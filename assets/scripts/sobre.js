/*--------------------------------------------------------------------
JAVASCRIPT "sobre"

Version: 	1.0 - 2012
author: 	Burocratik (alexandre gomes)
email: 		alex@burocratik.com
website: 	http://www.burocratik.com
-----------------------------------------------------------------------*/

$(document).ready(function(){
/*-----------------------------------------------------------------------
 =NAVIGATION SECULOS
-----------------------------------------------------------------------*/
  var $secLink=$("#timeline nav .container li a");
  var anc0=$(".time01").offset().top-118, anc1=$(".time02").offset().top-118,  anc2=$(".time03").offset().top-118;
  var click=null;

  $secLink.click(function(){
    $secLink.parent().removeClass("on");
    $(this).parent().addClass("on");
    //
    var index=$(this).parent().index();
    whereTo(index);
    click=true;
    return false;
  }); //end click menu

  function whereTo(index){
  	var aux=null;
    switch(index){
      case 0:
        aux=anc0;
        break;
      case 1:
        aux=anc1;
        break;
      case 2:
        aux=anc2;
        break;
      default:
        aux=anc0;
    }; //end switch
    $("html, body").stop().animate({"scrollTop": aux}, 700, "easeInOutQuint", function(){click=null;});
  }//

/*-----------------------------------------------------------------------
 =FIXED MENU + NEVIGATION SECULOS
-----------------------------------------------------------------------*/
//funcao colores do menu datas
  function fmenudatas(y){
    $("#timeline nav li").removeClass("on");
    if(y<anc1){$("#timeline nav li:eq(0)").addClass("on");}
    if(anc1<=y && y<anc2){$("#timeline nav li:eq(1)").addClass("on");}
    if(y>=anc2){$("#timeline nav li:eq(2)").addClass("on");}
  }; //end function

///
  var $navFixed=$("#timeline nav .container");
  var yTopNav=$navFixed.offset().top, yStart=$(window).scrollTop();
  var y = $(this).scrollTop();
  fmenudatas(y);
  (yStart >= yTopNav) ? $navFixed.addClass("fixed"):$navFixed.removeClass("fixed");
// on scroll
  $(window).scroll(function (event) {
    var y = $(this).scrollTop();
    (y >= yTopNav) ? $navFixed.addClass("fixed"):$navFixed.removeClass("fixed");
     //seculos
    if(click==true) return false;
    fmenudatas(y);
  });//end window scroll


/*-----------------------------------------------------------------------
 =ANIMATION ON DATES
-----------------------------------------------------------------------*/
function openViewport(){
  fViewport();
  $(window).bind("scroll", function(event) {fViewport();}); //end scroll
  $(window).resize(function(){fViewport();});

  function fViewport(){
    $(".animate:in-viewport").each(function() {$(this).addClass("goAnim");});
    $(".animate2:in-viewport2").each(function() {$(this).addClass("goAnim");});
  };//end function  fViewport()
  
  //mobile
  if($("html").hasClass("mobile")){
	  $(".animate, .animate2").addClass("goAnim");
  }

};//end function openViewoirt()

openViewport()


/*-----------------------------------------------------------------------
=TIMELINE - Add class .right
-----------------------------------------------------------------------*/
$("#timeline article ul li:odd").addClass("right");
/*
$("#timeline article.time01 ul li:nth-child(even)").addClass("right");
$("#timeline article.time02 ul li:nth-child(odd)").addClass("right");
$("#timeline article.time03 ul li:nth-child(even)").addClass("right");
*/


/////////////////////////
})//end load document


/*-------------------------------------------------------------------------------------------
JAVASCRIPT "UNESCO"

Version:  1.0 - 2013
author:   Burocratik (alexandre gomes)
email:    alex@burocratik.com
website:  http://www.burocratik.com
--------------------------------------------------------------------------------------------*/

$(document).ready(function(){
/*-------------------------------------------------------------------------------------------
=OPEN NEW WINDOW and PRINT
 NOTE: detect if is mac, mobile, js, safari etc > javascript on plugins.js > css_browser_selector
--------------------------------------------------------------------------------------------*/
//IE6,7,8  detect IE<=8 with css properties
if (document.createElement("detect").style.boxShadow=== "") {document.getElementsByTagName("html")[0].className += " boxShadow";}
if( !$("html").hasClass("boxShadow") ) {
  var $outdated=$("#outdated"), $btnOutdated=$("#outdated .btnClose");
  $outdated.show().delay(1000).animate({"top": 0}, 1200, "easeOutExpo");
  $btnOutdated.click(function(){
    $outdated.animate({"top": -333}, 1200, "easeOutExpo");
    return false;
  });
}

//Open new window
$("a[rel=external]").click(function(){
  var linkExterno = window.open($(this).attr("href"));
    return linkExterno.closed;
})
//Mandar Imprimir
$("a[rel=print]").click(function(){
    var imprimir = window.print();
    return false;
})

/*-------------------------------------------------------------------------------------------
 =LIMPAR FORMULARIOS
So limpa nos forms os Input Text com class txtLimpar
--------------------------------------------------------------------------------------------*/
$('input[type=text], textarea').each(function() {
  if( !$(this).hasClass("textLimpar") ) return;  //se nao tem a class sai
  var defeito = this.defaultValue; //this pois defaultValue é propriedade de javascript e nao jquery
  $(this).focus(function() {
    if($(this).val() == defeito) {$(this).val("")}
  });
  $(this).blur(function() {
    if($(this).val() == "") {$(this).val(defeito)}
  });
})

/*-------------------------------------------------------------------------------------------
=Inserir E-mails correctos: Obrigatorio class="email", e [-at-]
--------------------------------------------------------------------------------------------*/
$("a.email").each(function(){
    var mailReal = $(this).text().replace("[-at-]","@");
    $(this).text(mailReal);
    $(this).attr("href", "mailto:"+mailReal);
})

/*-------------------------------------------------------------------------------------------
=IF is NOT mobil href="tel" does not work
--------------------------------------------------------------------------------------------*/
$("a[href^='tel:']").click(function(){
  if( !$("body").hasClass("mobile") )  return false;
});

/*-------------------------------------------------------------------------------------------
=PRELOAD PAGE
--------------------------------------------------------------------------------------------*/
if ( $("body").hasClass("hasloading") ){
    $("#lightBoxExit").show();
    stopPlayScroll(true);
    $("#preload").imagesLoaded( function( $images, $proper, $broken ) {
        var fPreload= $(this).imagesLoaded();
        fPreload.always(function(){
            $("#lightBoxExit").fadeTo(700,0, function(){$(this).hide();});
            stopPlayScroll(false);
        });//end preload image*/
    });//end preload start
}

/*-------------------------------------------------------------------------------------------
=FANCY EXIT - exit page with fade
--------------------------------------------------------------------------------------------*/
$(".fancy_exit").on("clickTouchEvent",function(event){
    var $this=$(this), newContent = $this.attr("href");
    if( $(this).hasClass("extLink") ) {return true;}; //exception if needed
    event.stopPropagation(); event.preventDefault();
    fancyExit(newContent,200);
});//end click




/////////////////////////
})//end load document

/********************************************************************************************
=FUNCTIONS
*********************************************************************************************/


/*-------------------------------------------------------------------------------------------
=STOP SCROLL
--------------------------------------------------------------------------------------------*/
function stopPlayScroll(yesno){
  if(yesno){
    var aux = $(document).scrollTop();
    $(document).bind("scroll", function(evt){
      $(document).scrollTop(aux);
      evt.preventDefault();
    });
  }else{
    $(document).unbind("scroll");
  }//end if
}//end function

/*-------------------------------------------------------------------------------------------
=EXIT page with Fade
--------------------------------------------------------------------------------------------*/
function fancyExit(adress, speed){
    var $elemento=$("#lightBoxExit");
    $elemento.show().fadeTo(speed,1, function(){
      if( $("html").hasClass("mobile") ) $("html").hide(); //For ipad refresh page bug
      window.location = adress;
    });

};//end
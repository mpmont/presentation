/*--------------------------------------------------------------------
JAVASCRIPT "visit"

Version:    1.0 - 2012
author:     Burocratik (alexandre gomes)
email:      alex@burocratik.com
website:    http://www.burocratik.com
-----------------------------------------------------------------------*/

$(document).ready(function(){
/*-----------------------------------------------------------------------
 =OPEN NEW WINDOW and PRINT
 NOTE: detect if is mac, mobile, js, safari etc > javascript on plugins.js > css_browser_selector
-----------------------------------------------------------------------*/
    //IE6,7,8  detect IE<=8 with css properties
    if (document.createElement("detect").style.backgroundSize=== "") {document.getElementsByTagName("html")[0].className += " background-size";}
    if( !$("html").hasClass("background-size") ) {window.top.location = "http://burocratik.com/error/ie6-please-no.html";}
    //Open new window
    $("a[rel=external]").click(function(){
        var linkExterno = window.open($(this).attr("href"));
        return linkExterno.closed;
    });
    //Mandar Imprimir
    $("a[rel=print]").click(function(){
        var imprimir = window.print();
        return false;
    });
/*-----------------------------------------------------------------------
 =LIMPAR FORMULARIOS
So limpa nos forms os Input Text com class txtLimpar
-----------------------------------------------------------------------*/
    $('input[type=text], textarea').each(function() {
        if( !$(this).hasClass("textLimpar") ) return;  //se nao tem a class sai
        var defeito = this.defaultValue; //this pois defaultValue é propriedade de javascript e nao jquery
        $(this).focus(function() {
            if($(this).val() == defeito) {$(this).val("")}
        });
        $(this).blur(function() {
            if($(this).val() == "") {$(this).val(defeito)}
        });
    });
/*-----------------------------------------------------------------------
=Inserir E-mails correctos: Obrigatorio class="email", e [-at-]
-----------------------------------------------------------------------*/
    $("a.email").each(function(){
        var mailReal = $(this).text().replace("[-at-]","@");
        $(this).text(mailReal);
    $(this).attr("href", "mailto:"+mailReal);
    })
/*-----------------------------------------------------------------------
=IF is NOT mobil href="tel" does not work
-----------------------------------------------------------------------*/
    $("a[href^='tel:']").click(function(){
        if( !$("body").hasClass("mobile") )  return false;
     });

/*-----------------------------------------------------------------------
=IPOD app LINKS
-----------------------------------------------------------------------*/
    $("#mainNav").on("click","a.app", function(event){  //for stand alone app
        event.preventDefault();
        location.href = $( event.target ).attr( "href" );
    });//end on

/*-----------------------------------------------------------------------
=LINGUAS
-----------------------------------------------------------------------*/
$("ul.ling").hover(
    function(){$(this).animate({height: "72"}, 150);},
    /* function(){$(this).animate({height: "48"}, 100);}, */
    function(){$(this).animate({height: "24"}, 50);}
); //end over

/*-----------------------------------------------------------------------
=RESIZE adjust content
-----------------------------------------------------------------------*/
    $(window).resize($.debounce( 500, function(){
        if( $("body").hasClass("visit") || $("body").hasClass("sobre") ){
            if( $("html").hasClass("ie") || $("html").hasClass("mobile") )return false;
            var url = window.location.href;
            window.location.href = url;
            window.location.reload(false);
        }
    }));//end resize

/***********************************************************************
 * FULL IMAGE - 360 with flash
 ***********************************************************************/
    var stageW = $(window).width();
    var stageHwrap = $(window).height();
    $("#headerPicFull, .center").css({"height": stageHwrap})


//------- RESIZE IMAGES --------//
    function fResize(){
        //stage
        var stageW = $(window).width();
        var stageH = $(window).height();
        var stageWH = stageW/stageH;
        //Fotos (neste caso width é sempre maior k height)
        $("#fullImg").each(function(){
            var picW = $(this).width();
            var picH = $(this).height();
            var picWH = picW/picH;
            if(stageW>stageH && stageWH>=picWH) {
                var aux = stageW/picWH
                $(this).css({width:stageW, height: aux});
                var difH=parseInt($(this).css("height"))-stageH; //Centrar fotos - Y
                var auxH=parseInt(difH/2);
                $("#fullImg").css({"top": -auxH, "left":0});
            } else {
                var aux2 = stageH*picWH;
                $(this).css({width:aux2, height: stageH});
                var difW=parseInt($(this).css("width"))-stageW; //Centrar fotos - X
                var auxW=parseInt(difW/2);
                $("#fullImg").css({"left": -auxW, "top":0});
            }
        });//end each
    }//end function resize
    fResize();

    $(window).resize(function(){ fResize(); })

//------- BTN Saber Mais e Setas --------//
    $("#btnMais").click(function(){
        var $elemento=$(".gotoHere");
        goTo($elemento);
        return false;
    });//end click

    function goTo($elemento){
        $("html, body").stop().animate({"scrollTop": $elemento.offset().top}, 700, "easeInOutQuint");
    };//end goTo


//setas nex prev
    var $btnNext=$("#headerPicFull #nextVisit"), $btnPrev=$("#headerPicFull #prevVisit");
    var wNext= $btnNext.width(), wPrev= $btnPrev.width();
    var xiNext= wNext-60, xiPrev=wPrev-60;

    $btnNext.css("right", -xiNext);
    $btnPrev.css("left", -xiPrev);

    $btnNext.hover(
        function () { $(this).stop().animate({"right":"0px"}, 500, "easeOutExpo") },
        function () { $(this).stop().animate({"right":-xiNext}, 250, "easeOutExpo") }
    );//end over

    $btnPrev.hover(
        function () { $(this).stop().animate({"left":"0px"}, 500, "easeOutExpo") },
        function () { $(this).stop().animate({"left":-xiPrev}, 250, "easeOutExpo") }
    );//end over





/*-----------------------------------------------------------------------
 =PRELOAD
-----------------------------------------------------------------------*/
    //$("#lightBoxWrapper").show().fadeTo(800,1);
    var preloadPics = $("#preload").imagesLoaded();
    preloadPics.always( function(){
        $("#lightBoxWrapper").fadeTo(800,0, function(){$(this).hide();});
    });//end images load


//on click faz preloading
    $("#headerPicFull #nextVisit, #headerPicFull #prevVisit").click(function(){
        if( $(this).is(":hidden") ) return false;
        //start loading animation
        $("#headerPicFull .icon").hide();
        $("#loadingAnim").fadeTo(250,1).animatePNG(91, 30, 70, 1);
        //
        var newContent = $(this).children("a").attr("href");
        fLerNextVisit(newContent);
        //
        return false;
    });//end click

    function fLerNextVisit(newContent){
        var aux=newContent + '  '+ '#fullImg';
        $("#holderLoad").load(aux, function() {
            var preloadPic = $("#holderLoad").imagesLoaded();
            preloadPic.always( function(){
                $("#loadingAnim").fadeTo(100,0).animatePNG(null, 13, 190, 1);
                $("#lightBoxWrapper").show().fadeTo(800,1, function(){
                    $("html").hide(); //For ipad refresh page bug
                    window.location = newContent;
                });
            });//end images load
        });//end load html
    }//end function


// MAIN nav + Header ID
    $("header h1 a, #mainNav a").click(function(event){
        event.stopPropagation();
        event.preventDefault();
        if($(this).parent().hasClass("extLink")) {return false;}
        var newContent = $(this).attr("href");
        $("#lightBoxWrapper").show().fadeTo(800,1, function(){
            $("html").hide(); //For ipad refresh page bug
            window.location = newContent;
        });
    });//end click


/*-----------------------------------------------------------------------
 =LIGHTBOX and Flash
-----------------------------------------------------------------------*/
    var $btn360=$("#headerPicFull .icon"), $light360=$("#overFlash");
    var $btnClose=$("#closeFlash");
    $light360.fadeTo(0,0).hide();
    //over
    $btn360.hover(
        function () { $light360.stop().show().animate({"opacity":1}, 250, "linear") },
        function () { $light360.stop().animate({"opacity":0}, 250, "linear", function(){$(this).hide();}) }
    );//end over

//open Flash
    $btn360.click(function(){
        fOpenFlash();
        var newUrl = $(this).find("a").attr("href");
        $("#overBlack").after('<iframe src='+newUrl+'></iframe>');
        return false;
    });

//close flash
    $btnClose.click(function(){
        fCloseFlash();
        $("#headerPicFull iframe").remove();
        return false;
    });

// Function open and Close Flash
    function fOpenFlash(){
        $("#overBlack").show();
        $btnClose.show();
        $("header").addClass("off");
        $("html, body").stop().animate({"scrollTop": 0}, 700, "easeInOutQuint", function(){ stopPlayScroll(true,0); });
    };//end close flash

// Function close and Close Flash
    function fCloseFlash(){
        $("#overBlack").hide();
        $btnClose.hide();
        $("header").removeClass("off");
        stopPlayScroll(false,0);
        $(document).unbind("scroll");
    };//end close flash

//function stop/playscroll
function stopPlayScroll(yesno, val){
    if(yesno){
    $(document).bind("scroll", function(evt){
      $(document).scrollTop(val);
      evt.preventDefault();
    });
    }else{
    $(document).unbind("scroll");
    }//end if
}//end function


///escape key
$(document).live("keydown",function(event){//escape key /*alex*/
    switch(event.which){
    case 27:
      $btnClose.click();
      return false;
      break;
    case 37:
      $("#headerPicFull #prevVisit").click();
      return false;
      break;
    case 39:
      $("#headerPicFull #nextVisit").click();
      return false;
      break;
    case 40://down
      $("#btnMais").click();
      return false;
      break;
    case 38://up
      var $elemento=$("html");
      goTo($elemento);
      return false;
      break;
    default:
      break;
  }//end switch
});//end keypress

//SWIPE
    $("#headerPicFull .swipe").swipe({
        swipeLeft: function(){ $("#headerPicFull #nextVisit").click(); },
        swipeRight: function(){ $("#headerPicFull #prevVisit").click(); }
    });//end swipe

    function arrowsVisit(direcao){
        var url = $("#headerPicFull #"+direcao+"Visit a").attr("href");
        if($("#headerPicFull #"+direcao+"Visit").is(':visible')){ window.location.href = url; }
        else { return false; }
    }






/////////////////////////
})//end load document


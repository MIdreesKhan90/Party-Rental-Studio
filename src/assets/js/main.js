jQuery(function ($) {
  $('.js-phone_us').mask('000-000-0000');

  /*--------------------------------------
     Mobile Menu
     --------------------------------------*/

  var $parentElementToMenu = $("body"),
    $mobileMenuTriggerClass = $(".toggle-nav"),
    $mobileActiveClass = "menu-active";

  $mobileMenuTriggerClass.click(function (e) {
    $(this).toggleClass("active");
    $parentElementToMenu.toggleClass($mobileActiveClass);
    $("html,body").toggleClass("noScroll");

    //window.setTimeout(function(){
    //
    //}, 1000);

    /*
         if ($('body').hasClass($mobileActiveClass)) {
         $('body').css({'overflow-y': 'hidden', 'position': 'fixed'});
         //$('#nav nav').css({'overflow-y': 'auto',  '-webkit-overflow-scrolling': 'touch'});
         } else {
         $('body').css({'overflow-y': 'auto', 'position': 'relative'});
         }*/

    return false;
  });

  //ESC key to remove mobile menu
  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      $parentElementToMenu.toggleClass($mobileActiveClass);
    }
  });

  /*--------------------------------------
     Equal Height
     --------------------------------------*/

  function setEqualHeight(columns) {
    var tallestcolumn = 0;
    columns.each(function () {
      currentHeight = $(this).height();
      if (currentHeight > tallestcolumn) {
        tallestcolumn = currentHeight;
      }
    });
    columns.height(tallestcolumn);
  }

  $(document).ready(function () {
    //setEqualHeight($(".container  > div"));
    //setEqualHeight($(".articlebox"));
  });

  /*--------------------------------------
     Sticky Header
     --------------------------------------*/

  /*

     var shrinkHeader = 75;

     $(window).scroll(function () {

     var scroll = getCurrentScroll();
     if (scroll >= shrinkHeader) {
     $('nav').addClass('sticky');
     //$('.form-tabs').css('margin-top', '185px');
     }
     else {
     $('nav').removeClass('sticky');
     //$('.form-tabs').css('margin-top', '20px');
     }
     });

     function getCurrentScroll() {
     return window.pageYOffset || document.documentElement.scrollTop;
     }

     */

  $(".contact-form").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    var btn = $('#formSubmitBtn');
    btn.text('Submitting..');
    $.ajax({
      type: "post",
      url: "https://phplaravel-795550-2996798.cloudwaysapps.com/api/weblead/store",
      data: data,
      dataType: "JSON",
      success: function (res) {
        btn.text('Submit');
      },
      error: function (xhr, status, error) {
        console.log(xhr, status, error);
        btn.text('Submit');
      },
    });
  });
});

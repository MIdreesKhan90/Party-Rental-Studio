jQuery(function ($) {
  // $(".js-phone_us").mask("000-000-0000");
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
  //   var shrinkHeader = 0.5 * $(window).height();
  //   var shrinkHeaderBottom = 0.5 * $(window).height();

  //   $(window).scroll(function () {
  //     var scroll = getCurrentScroll();
  //     if (scroll >= shrinkHeader) {
  //       $("nav").addClass("sticky");
  //       //$('.form-tabs').css('margin-top', '185px');
  //     } else if(scroll <= shrinkHeaderBottom) {
  //       $("nav").addClass("animate-up");
  //       $("nav").removeClass("sticky");
  //       //$('.form-tabs').css('margin-top', '20px');
  //     }
  //     if(scroll == 0){
  //         $("nav").removeClass("animate-up");
  //     }
  //   });

  var shrinkHeader = 0.5 * $(window).height();
  var lastScrollTop = 0;
  var slideUpAnimationDuration = 300; // Duration of slide-up animation in milliseconds

  $(window).scroll(function () {
    var currentScrollTop = $(this).scrollTop();

    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      if (currentScrollTop >= shrinkHeader) {
        $("nav").addClass("sticky").removeClass("animate-up");
      }
    } else {
      // Scrolling up
      if (currentScrollTop <= shrinkHeader) {
        $("nav").addClass("animate-up");

        // Delay the removal of the 'sticky' class until after the slide-up animation
        setTimeout(function () {
          if ($("nav").hasClass("animate-up")) {
            $("nav").removeClass("sticky");
          }
        }, slideUpAnimationDuration);
      }
    }

    // At the top of the page, remove animate-up class
    if (currentScrollTop == 0) {
      $("nav").removeClass("animate-up");
    }

    lastScrollTop = currentScrollTop;
  });

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  function errorAlert(target, msg) {
    $(target).after('<p class="error">' + msg + "</p>");
    setTimeout(function () {
      $(target).next(".error").remove();
    }, 3000);
  }

  // url: "https://phplaravel-795550-2996798.cloudwaysapps.com/api/weblead/store",
  $(".contact-form").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var btn = $("#formSubmitBtn");
    btn.text("Submitting..");

    var firstNameIndex = data.findIndex((item) => item.name === "firstName");
    var lastNameIndex = data.findIndex((item) => item.name === "lastName");

    var fullName = data[firstNameIndex].value + " " + data[lastNameIndex].value;

    data.splice(firstNameIndex, 1, { name: "name", value: fullName });
    data.splice(lastNameIndex, 1);

    $.ajax({
      type: "post",
      url: "https://phplaravel-795550-2996798.cloudwaysapps.com/api/weblead/store",
      data: data,
      dataType: "JSON",
      success: function (res) {
        btn.text("Submit");
        if (res.code && res.code == 202) {
          errorAlert("#formSubmitBtn", res.message[0]);
        }
        if (res.success && res.success == true) {
          window.location.href = "/confirmation";
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr, status, error);
        btn.text("Submit");
      },
    });
  });

  function getReferralData(id) {
    $.ajax({
      type: "get",
      url: "https://app.kreetiv.com/api/prs/referred_customers/" + id,
      dataType: "JSON",
      success: function (res) {
        console.log(res);
        if (res.status == "success") {
          $('input[name="referral_id"]').val(res.cust_id);
          $('input[name="source"]').val("referral");
          $(".freetrial").prepend(`<h3 id="referredBy">Referred By ${res.first_name} ${res.last_name}</h3>`);
        } else {
          $('input[name="referral_id"]').val(0);
          $('input[name="source"]').val("website");
          $(".freetrial").find("#referredBy").remove();
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr, status, error);
      },
    });
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get("code");
  const referringPage = window.location.href;
  $('input[name="referring_page"]').val(referringPage);

  if (code) {
    getReferralData(code);
  } else {
    $('input[name="referral_id"]').val(0);
    $('input[name="source"]').val("website");
    $(".freetrial").find("#referredBy").remove();
  }

  // popup
  $("#inventory-video-btn").click(function () {
    $(".inventory-video").fadeIn();
    window._wq = window._wq || [];
    _wq.push({
      id: "z898hd3ozr",
      onReady: function (video) {
        video.play();
      },
    });
  });

  $(".popup-close").click(function () {
    $(".inventory-video").hide();
  });
});

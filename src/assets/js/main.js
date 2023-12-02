document.addEventListener("DOMContentLoaded", function () {
  /*--------------------------------------
         Mobile Menu
         --------------------------------------*/

  let parentElementToMenu = document.body;
  let mobileMenuTriggerClass = document.querySelector(".toggle-nav");
  let mobileActiveClass = "menu-active";

  mobileMenuTriggerClass.addEventListener("click", function (e) {
    this.classList.toggle("active");
    parentElementToMenu.classList.toggle(mobileActiveClass);

    // Toggle noScroll class for html and body
    document.documentElement.classList.toggle("noScroll");
    document.body.classList.toggle("noScroll");

    /*
               if (document.body.classList.contains(mobileActiveClass)) {
                   document.body.style.overflowY = 'hidden';
                   document.body.style.position = 'fixed';
               } else {
                   document.body.style.overflowY = 'auto';
                   document.body.style.position = 'relative';
               }
               */

    e.preventDefault();
  });

  //ESC key to remove mobile menu
  document.addEventListener("keyup", function (e) {
    if (e.keyCode == 27) {
      parentElementToMenu.classList.toggle(mobileActiveClass);
    }
  });

  /*--------------------------------------
         Equal Height
         --------------------------------------*/

  function setEqualHeight(columns) {
    let tallestcolumn = 0;
    columns.forEach((column) => {
      let currentHeight = column.offsetHeight;
      if (currentHeight > tallestcolumn) {
        tallestcolumn = currentHeight;
      }
    });
    columns.forEach((column) => {
      column.style.height = tallestcolumn + "px";
    });
  }

  // document.addEventListener("DOMContentLoaded", function () {
  //setEqualHeight(document.querySelectorAll(".container > div"));
  //setEqualHeight(document.querySelectorAll(".articlebox"));
  // });

  // Sticky Header
  let shrinkHeader = 0.5 * window.innerHeight;
  let lastScrollTop = 0;
  let slideUpAnimationDuration = 300; // Duration of slide-up animation in milliseconds

  window.addEventListener("scroll", function () {
    let currentScrollTop = window.pageYOffset;

    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      if (currentScrollTop >= shrinkHeader) {
        document.querySelector("#primaryNav").classList.add("sticky");
        document.querySelector("#primaryNav").classList.remove("animate-up");
      }
    } else {
      // Scrolling up
      if (currentScrollTop <= shrinkHeader) {
        document.querySelector("#primaryNav").classList.add("animate-up");
        // Delay the removal of the 'sticky' class until after the slide-up animation
        setTimeout(function () {
          document.querySelector("#primaryNav").classList.remove("sticky");
          // if (document.querySelector("#primaryNav").classList.contains("animate-up")) {
          // }
        }, slideUpAnimationDuration);
      }
    }

    // At the top of the page, remove animate-up class
    if (currentScrollTop == 0) {
      document.querySelector("#primaryNav").classList.remove("sticky");
      document.querySelector("#primaryNav").classList.remove("animate-up");
    }

    lastScrollTop = currentScrollTop;
  });

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  function errorAlert(target, msg) {
    let targetElement = document.getElementById(target);
    let errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent = msg;
    targetElement.parentNode.insertBefore(errorElement, targetElement.nextSibling);
    setTimeout(function () {
      errorElement.remove();
    }, 3000);
  }

  // url: "https://phplaravel-795550-2996798.cloudwaysapps.com/api/weblead/store",
  document.querySelector(".contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let btn = document.getElementById("formSubmitBtn");
    btn.textContent = "Submitting..";

    let dataObj = {};

    for (let [key, value] of formData.entries()) {
      dataObj[key] = value;
    }

    if (!dataObj["name"]) {
      dataObj["name"] = `${dataObj["firstName"]} ${dataObj["lastName"]}`;
      delete dataObj["firstName"];
      delete dataObj["lastName"];
    }

    fetch("https://phplaravel-795550-2996798.cloudwaysapps.com/api/weblead/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((response) => response.json())
      .then((res) => {
        btn.textContent = "Submit";
        if (res.code && res.code == 202) {
          errorAlert("formSubmitBtn", res.message[0]);
        }
        if (res.success && res.success == true) {
          window.location.href = "/confirmation";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        btn.textContent = "Submit";
      });
  });

  function getReferralData(id) {
    fetch("https://app.kreetiv.com/api/prs/referred_customers/" + id)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "success") {
          document.querySelector('input[name="referral_id"]').value = res.cust_id;
          document.querySelector('input[name="source"]').value = "referral";
          let referredByElement = document.createElement("h3");
          referredByElement.id = "referredBy";
          referredByElement.textContent = `Referred By ${res.first_name} ${res.last_name}`;
          document
            .querySelector(".freetrial")
            .insertBefore(referredByElement, document.querySelector(".freetrial").firstChild);
        } else {
          document.querySelector('input[name="referral_id"]').value = 0;
          document.querySelector('input[name="source"]').value = "website";
          let referredByElement = document.getElementById("referredBy");
          if (referredByElement) {
            referredByElement.remove();
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get("code");
  const referringPage = window.location.href;
  document.querySelector('input[name="referring_page"]').value = referringPage;

  if (code) {
    getReferralData(code);
  } else {
    document.querySelector('input[name="referral_id"]').value = 0;
    document.querySelector('input[name="source"]').value = "website";
    let referredByElement = document.getElementById("referredBy");
    if (referredByElement) {
      referredByElement.remove();
    }
  }

  function sendForm() {
    document.getElementById("contactForm").submit();
  }

  // Function that loads recaptcha on form input focus
  function reCaptchaOnFocus() {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.google.com/recaptcha/api.js";
    head.appendChild(script);

    // remove focus to avoid js error:
    document.getElementById("emailaddress").removeEventListener("focus", reCaptchaOnFocus);
  }

  // add initial event listener to the form inputs
  document.getElementById("emailaddress").addEventListener("focus", reCaptchaOnFocus, false);



});
$(document).ready(function(){
    var $slider = $('.reviews-carousel');

    // Initialize Slick Slider

    $slider.slick({
        infinite: true,
        centerMode: true,
        centerPadding: 0,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="icon-prev"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-next"></i></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

    function updateNavigationButtons() {
        var currentSlide = $slider.slick('slickCurrentSlide');
        var slideCount = $slider.slick('getSlick').slideCount;
        var slidesToShow = $slider.slick('slickGetOption', 'slidesToShow');

        $('.slick-prev').prop('disabled', currentSlide === 0);
        $('.slick-next').prop('disabled', currentSlide >= slideCount - slidesToShow);
    }

    // Initial check
    updateNavigationButtons();

    // Bind to the afterChange event
    $slider.on('afterChange', function(event, slick, currentSlide){
        updateNavigationButtons();
    });
});

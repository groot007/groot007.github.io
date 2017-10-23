//import("../js/libs/jquery-ui.min.js");
//import("../js/libs/jquery-bar-rating.min.js");



// ================**********=============



// ================== main js =========

$(function() {
    $( ".price-filter__slider" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 10, 450 ],
      create: function( event, ui ) {
        $( ".price-filter .min-input" ).val( 10 );
        $( ".price-filter .max-input" ).val( 450 );
    },
    slide: function( event, ui ) {
        $( ".price-filter .min-input" ).val( ui.values[ 0 ] );
        $( ".price-filter .max-input" ).val( ui.values[ 1 ] );
    }
});


    // ====== YOUTUBE ======

    $(".youtube").each(function(i, el) {
        // Based on the YouTube ID, we can easily find the thumbnail image
        $(el).css('background-image', 'url(http://i.ytimg.com/vi/' + el.id + '/sddefault.jpg)');

        // Overlay the Play icon to make it look like a video player
        $(el).append($('<img/>', {'class': 'play'}));

        $(document).on( 'click','#' + el.id, function() {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + el.id + "?autoplay=1&autohide=1";
            if ($(el).data('params')) iframe_url+='&'+$(el).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(el).width(), 'height': $(el).outerHeight() })

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(el).append(iframe);
        });
    });

// ======================
if($('.phone-mask').length){
    $('.phone-mask').inputmask('+38 (099) 999-99-99', { "onincomplete": function(){
        $(this).val('');
    } });
}


    //  ========= SLIDERs  ========
    $('.slider-brands').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        waitForAnimate: false,
        // variableWidth:true,
        infinite: true,
        nextArrow: "<div class='slick-arrows arrow-next'><span class='custom-arrow'></span><i class='circle'></i></div>",
        prevArrow: "<div class='slick-arrows arrow-prev'><span class='custom-arrow'></span><i class='circle'></i></div>",
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 768,
            settings: {
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                dots: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                dots: false,

                slidesToScroll: 1
            }
        }
        ]
    });

    $('.slider-products').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        waitForAnimate: false,
        infinite: true,

        nextArrow: "<div class='slick-arrows arrow-next'><span class='custom-arrow'></span><i class='circle'></i></div>",
        prevArrow: "<div class='slick-arrows arrow-prev'><span class='custom-arrow'></span><i class='circle'></i></div>",
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 768,
            settings: {
                dots: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },

        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                dots: false,

                slidesToScroll: 1
            }
        }
        ]
    });

    $('.product-slider-g').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        infinite: true,
         // adaptiveHeight: true,
         customPaging : function(slider, i) {
            if(slider.$slides.eq(i).find(".youtube").length){
                return '<span href="#" class="dots-item dots-item--youtube"></span>';
            }
            return '<span href="#" class="dots-item"></span>';
        },
        nextArrow: "<div class='slick-arrows arrow-next'><span class='custom-arrow'></span><i class='circle'></i></div>",
        prevArrow: "<div class='slick-arrows arrow-prev'><span class='custom-arrow'></span><i class='circle'></i></div>",

    });

    function mainSlickInit(){

        if($(window).width() > 768 && !$(".main-slider").hasClass("slick-slider")){
            $('.main-slider').slick({
                dots: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                waitForAnimate: false,
                infinite: true,
                cssEase: 'ease-in-out',
                fade: true,
                autoplay: true,
                autoplaySpeed: 3000,
                swipe: false,
                nextArrow: "<div class='slick-arrows arrow-next'><i class='fa fa-angle-right'></i></div>",
                prevArrow: "<div class='slick-arrows arrow-prev'><i class='fa fa-angle-left'></i></div>",
                responsive: [{
                    breakpoint: 768,
                    settings: "unslick"
                }]
            });

            $('.main-slider').slick("setPosition");
        }

    }
    mainSlickInit()

    $(window).on("resize", mainSlickInit);



// end SLIDERs ====


$(document).on("click touchend", ".top-head__menu-bar", function(e) {
    $(".top-head__mmenu").addClass("mmenu--opened");
});


$(".all-reviews-stars, .review-item__stars").barrating({
    theme: 'fontawesome-stars',
    readonly: true
});

$(".block-reviews__stars").barrating({
    theme: 'fontawesome-stars',
    readonly: false
});



$(".rating-stars").each(function(i, el){
    var $this = $(el),
    stars = $this.data("stars");
    $this.barrating('set', stars);
});


$(document).on("click touchend", ".mmenu__close", function(e) {
    $(this).closest(".mmenu").removeClass("mmenu--opened");
});

$(".catalog__item").on('mouseleave', function(e) {
    $(this).removeClass("catalog__item--active")
});


$(".catalog__item").on('mouseenter touchend', function(e) {
    var $this = $(this),
    dropM = $this.find(".dropdown-menu"),
    items = dropM.find(".dropdown-menu__item");
    if(dropM.length){
        $this.addClass("catalog__item--active");
        $this.find('.slider-brands').slick("setPosition");

        if(items.length > 6){
            dropM.css("height", "");
            dropM.find(".all-catagories").css("display", "inline-block");
        }
        var maxH = $(window).width() > 1600 ? 170 : 155;
        $(".dropdown-menu__item--with-list").each(function(i, el){
            // console.log($(el).find(".item-dropdown__list").height())
            if($(el).find(".item-dropdown__list").height() + 36 > maxH){
                // console.log("1")
                $(el).addClass("show-more");
            }
        })
    }
});

var filters = $(".filters"),
childs = $(".filters").find(".filter");

if(childs.length > 5){
    var heightFive = 0;
    childs.each(function(i, el){
        heightFive += $(el).height();
    });
    filters.height(heightFive + 30);
}

$(document).on("click", ".filters__show-all", function(e){
    e.preventDefault();
    $(this).addClass("hidden")
    $(this).closest(".filters").css("height", "auto");
});



$(document).on("click touchend", function(e) {
    var target = $(e.target);

    if (!target.closest(".catalog__item--active").length ||
        target.closest(".item-catalog__back").length) {
        $(".catalog__item--active").removeClass("catalog__item--active")
}
});

$(document).on("click", ".dropdown__show-all", function(e){
    e.preventDefault();
    $(this).addClass("hidden")
    $(".dropdown-menu").css("height", "auto");
});

$(document).on("click", ".read-more", function(e){
    e.preventDefault();
    console.log("show")
    $(this)
    .closest("section")
    .find(".more-txt")
    .css("display", "block");
});




$(document).on("click", ".all-catagories", function(e){
    e.preventDefault();
    var height = $(".dropdown-menu .items").height();
    console.log()
    $(this).css("display", "none");
    $(".dropdown-menu").css("height", "auto");
    // $(".dropdown-menu .items").animate({scrollTop : 100}, 1000);
});

  


$("#lang, #sort").niceSelect();


// ======= TABS ======

$(document).on("click", ".tabs .tabs__item", function(e){
    e.preventDefault();

    var $this = $(this),
    $tabs = $this
    .closest(".tabs")
    .find(".tabs__item"),
    toSlider = $this.data("to-slider"),
    $allSliders = $this
    .closest(".tabs").parent()
    .find(".slider-products"),
    slider = $("#tabs-slider-" + toSlider);

    $tabs.removeClass("tabs__item--active");
    $this.addClass("tabs__item--active");

    $allSliders.addClass("hidden")
    slider
    .removeClass("hidden")
    .slick('setPosition');

});

// ======= end TABS ====


// ==== input FILE ===
$(document).on("change", ".load-photo input", handleFileSelect);
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
    }

    var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          $('#photo-review').css("background-image","url(" + e.target.result + ")");
          if($(window).width() < 1024){
            $('#photo-review').css("text-align", "right")
            .find("span").html(escape(theFile.name))
        }else{
            $('#photo-review')
            .find("span").css("opacity", "0")
        }

          // '<img class="thumb" src="'+ e.target.result +
                            // '" title="'+ escape(theFile.name)+ '"/>';
                        };
                    })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
  }
}

//  ============

// ===== MODALS ===
if($("#basket-modal").length){
    $("#basket-modal").iziModal({
        transitionIn: "comingIn",
         closeButton: true,
    });
}


$(document).on('click', '.modal-basket', function (event) {
    event.preventDefault();
    $('#basket-modal').iziModal('open');
});


// === end MODALS ===


    // ========= VALIDATION ========
    $("form").on("submit", function(e) {
        e.preventDefault();
    });

    if($("#add-review").length){
        $("#add-review").validate({
            rules: {
              message:{
                required: true,
                minlength: 10,
            },
            name: {
                required: true,
            },
            "hidden-grecaptcha": {
              required: true,
              minlength: "255"
          }
      },

      messages: {
          message: {
            required: "Це поле не повинно бути пустим",
            minlength: "Поле має містити більше 10 символів"
        },
        name: "Введіть ім’я",
        "hidden-grecaptcha":{
            required: "Пройдіть перевірку"
        }
    },

    submitHandler: function(form) {
        console.log(form);
                // form.submit();
                return false;
            }
        });

    }

    if($("#contact-us").length){

        $("#contact-us").validate({
        // Specify validation rules
        rules: {

          message:{
            required: true,
            minlength: 10,
        },
        email: {
            required: true,
            email: true
        },
        "hidden-grecaptcha": {
          required: true,
          minlength: "255"
      }

  },

  messages: {
      message: {
        required: "Це поле не повинно бути пустим",
        minlength: "Поле має містити більше 10 символів"
    },
    email: "Введіть E-mail",
    "hidden-grecaptcha":{
        required: "Пройдіть перевірку"
    }
},

submitHandler: function(form) {
    console.log(form);
            // form.submit();
            return false;
        }
    });

    }



    // ====== end VALIDATION =====


});

function recaptchaCallback() {
    var response = grecaptcha.getResponse();
    $("#hidden-grecaptcha").val(response);
    $("#add-review, #contact-us").valid();
};

if($("#google-map").length){
   var map;
   function initMap() {
    var mapOptions = {
        center: { lat: 50.447476, lng: 30.524386},
        zoom: 14,
        disableDefaultUI: true,
        scrollwheel: false,
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
        // var image = {
        //     url: '/img/marker.png',
        //     /*size: new google.maps.Size(177, 100),*/
        //     scaledsize: new google.maps.Size(175, 96),
        // };
        // var point = new google.maps.LatLng(51.201803, 24.725005);
        // var marker = new google.maps.Marker({
        //     position: point,
        //     map: map,
        //     icon: image,
        //     title: ''
        // });

    }

}
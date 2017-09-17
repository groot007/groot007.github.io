$(function(){


	$(document).on("touchstart", ".top-head__menu-bar", function(e){
		$(".top-head__mmenu").addClass("mmenu--opened");
	});
	$(document).on("touchend", ".mmenu__close", function(e){
		$(this).closest(".mmenu").removeClass("mmenu--opened");
	});


	$(".catalog__item").on('touchstart', function () {
        $(this).data('moved', '0');
    })
    .on('touchmove', function () {
        $(this).data('moved', '1');
    })
    .on('touchend', function () {
        if($(this).data('moved') == 0
        	&& $(this).find(".dropdown-menu").length){
           $(this).addClass("catalog__item--active");
           $(this).find('.slider-brands').slick("setPosition");
        }
    });

	$(document).on("touchend", function(e){
		var target = $(e.target);

		if(!target.closest(".catalog__item--active").length
			|| target.closest(".item-catalog__back").length){
			$(".catalog__item--active").removeClass("catalog__item--active")
		}
	});

	$("#lang").niceSelect();

//  ========= SLIDERs  ========
	$('.slider-brands').slick({
	  dots: true,
	  infinite: false,
	  speed: 300,
	  slidesToShow: 4,
	  slidesToScroll: 4,
	  waitForAnimate: false,
	  infinite: true,
	  nextArrow: "<div class='slick-arrows arrow-next'><i class='arrow-right'></i><i class='circle'></i></div>",
	  prevArrow: "<div class='slick-arrows arrow-prev'><i class='arrow-left'></i><i class='circle'></i></div>",
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3,
	        infinite: true,
	        dots: false
	      }
	    },
	    {
	      breakpoint: 750,
	      settings: {
	      	dots: false,
	        slidesToShow: 3,
	        slidesToScroll: 2
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


	$('.main-slider').slick({
	  dots: true,
	  speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  waitForAnimate: false,
	  infinite: true,
	  nextArrow: "<div class='slick-arrows arrow-next'><i class='arrow-right'></i><i class='circle'></i></div>",
	  prevArrow: "<div class='slick-arrows arrow-prev'><i class='arrow-left'></i><i class='circle'></i></div>",
	});

	$('.main-slider').slick("setPosition");

// end SLIDERs ====


});
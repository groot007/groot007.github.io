$(function(){
	$(".portfolio-sidebar__slider").slick({
		arrows: false,
		dots: true,
		draggable: false,
		autoplay: true,
		// fade: true,
  		autoplaySpeed: 2000,
	});

	$(window).on("load", function(){
		$(".preloader").delay(500).fadeOut('slow');

		$(".to-left, .to-right").waypoint(function() {
			var $el = $(this.element),
				animClass = '';
			var delay = +$el.attr("data-delay");

			if (($el).hasClass("to-left")){
				animClass = 'fadeInRight';
			}else if (($el).hasClass("to-right")){
				animClass = 'fadeInLeft';
			}

			if ($(window).width() > 768){
				setTimeout(function(){
					$el.addClass(animClass);
				}, delay);
			}else{
				$el.addClass(animClass);
			}

		  }, { offset: '90%'});
	});



});
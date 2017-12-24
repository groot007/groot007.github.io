$(function(){
	$(".portfolio-sidebar__slider").slick({
		arrows: false,
		dots: true,
		draggable: false,
		autoplay: true,
  		autoplaySpeed: 2000,
	});

	$(window).on("load", function(){
		$(".preloader").addClass("hide");

		setTimeout(function(){
			$(".to-left, .to-right").waypoint(function() {

			var $el = $(this.element),
				animClass = '',
				delay = +$el.attr("data-delay");

			if (($el).hasClass("to-left")){
				animClass = 'fadeInRight';
			}else if (($el).hasClass("to-right")){
				animClass = 'fadeInLeft';
			}

			$el.addClass(animClass);

		  }, { offset: '100%'});

		}, 1000);

	});
});
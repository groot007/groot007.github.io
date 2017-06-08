function pluginEvents (root, $, name) {
	// timeline = new name();
	$(document).on("click", ".empty-frame", function(e){
		var $el = $(this);
		var index = $(".empty-frame").index($el);
		$(".timeline").timeline("createTab", index);
		$(".timeline").timeline("setActiveItem", index);
		$(".props-block .tabs .tab").trigger("click");


	});
	$(document).on("click", ".full-frame", function(e){
		$(".anim-zone").animZone("setState");
	});


	// $(document).on("click", ".empty-frame .action", function(e){
	// 	e.stopPropagation();
	// 	e.preventDefault();
	// 	var $this = $(this);
	// 	$template = $("<div class='empty-frame'><div class='subsidiary'><div class='action'>+</div><span class='percent'>0%</span></div></div>");
	// 	$this.closest(".empty-frame").before($template)
	// 	updatePercent()
	// });

	$(document).on("mouseenter", ".empty-frame .subsidiary", function(e){
		e.stopPropagation();
		e.preventDefault();
		var $this = $(this);
		if ($this.parent().hasClass("full-frame"))
			$this.find(".percent").addClass("clear");
	});

	$(document).on("mouseleave", ".empty-frame .subsidiary", function(e){
		var $this = $(this);
		$this.find(".percent").removeClass("clear")
	});

	$(document).on("click", ".empty-frame .subsidiary .percent.clear", function(e){
		var $this = $(this);
		e.stopPropagation();
		$(".timeline").timeline("clearItem", $this);
	});

	$(document).on("click", ".timeline .anim-controls .play", function(e){
		$(".anim-zone").animZone("animationPlay");
		$(this).addClass("hidden").next().removeClass("hidden");
	});
	$(document).on("click", ".timeline  .anim-controls  .pause", function(e){
		$(".anim-zone").animZone("animationPause");
		$(this).addClass("hidden").next().removeClass("hidden");
	});
	$(document).on("click", ".timeline .anim-controls  .stop", function(e){

		$(".anim-zone").animZone("animationStop");
	});
	$(document).on("click", ".timeline .anim-controls  .resume", function(e){
		$(".anim-zone").animZone("animationResume");
		$(this).addClass("hidden").prev().removeClass("hidden");
	});
}


module.exports = pluginEvents;
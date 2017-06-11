function pluginEvents (root, $, name) {

	$(document).on("click", ".type-anim", function(e){
		var $this = $(this);
		$(".curve-wrap").toggleClass("hidden");
	});
	// $(document).on("blur", "#css-props input, #anim-props input", function(e){
	// 	let inputs = new name();
	// 	inputs.setProps();
	// });
	$(document).on("mousewheel", "#css-props input", function(event, delta) {
		var num =  /-\d+|\d+/.exec($(this).val()) || 0;
		var pre =  /\D+$/.exec($(this).val()) || "";

		if (num == "") return;
        if (delta > 0) {
            $(this).val(+num + 1 + pre);
        } else {
            $(this).val(+num - 1 + pre)
        }
        $(this).trigger("input")
        return false;
     });
	var down = false;
	var $input = null;

	$(document).on("mouseup", function(){
		down = false;
	});

	$(document).on("mousedown","#css-props input", function(){
		down = true;
		$input = $(this);
	});
	var pageY;
	var pageX;
	$(document).on("mousemove", function(e) {

		if (!down || (e.pageY > $input.offset().top && e.pageY < $input.offset().top + $input.height())) return;
		var num =  /-\d+|\d+/.exec($input.val()) || 0;
		var pre =  /\D+$/.exec($input.val()) || "";

        if (pageY > e.pageY) {
            $input.val(+num + 4 + pre);
        } else {
            $input.val(+num - 4 + pre)
        }
        $input.trigger("input");
        pageY = e.pageY;
        pageX = e.pageX;
        return false;
     });

	$(document).on("blur", "#anim-props input", function(e){
		let inputs = new name();
		inputs.setAnimObj($(this));
		console.log($(this));
		inputs.generateString(inputs.getValue());
		setTimeout(function(){$("#editor").editor("setValue", inputs.getString());}, false);
		$(".anim-zone").animZone("setPropsAnimation", inputs.getCssObj(), inputs.getAnimObj())
	});
	$(document).on("change", "#anim-props select", function(e){
		let inputs = new name();
		inputs.setAnimObj($(this));
		inputs.generateString(inputs.getValue());
		setTimeout(function(){$("#editor").editor("setValue", inputs.getString());}, false);
		$(".anim-zone").animZone("setPropsAnimation", inputs.getCssObj(), inputs.getAnimObj())
	});


	$(document).on("input blur", "#css-props input", function(e){
		let inputs = new name();
		inputs.setCssObj();
		// inputs.generateString(inputs.getValue());
		// setTimeout(function(){$("#editor").editor("setValue", inputs.getString());}, false);
		$(".anim-zone").animZone("setPropsAnimation")
		$(".anim-zone").animZone("setState");

	});


	$(document).on("mouseenter", "#css-props .group", function(e){
		$("<div class='delete-input'><i class='fa fa-times' aria-hidden='true'></i></div>").appendTo($(this));
	});

	$(document).on("mouseleave", "#css-props .group ", function(e){
		$(".delete-input").remove();
	});

	$(document).on("click", ".delete-input", function(e){
		$(this).closest(".group").remove();
		$(".props-block").inputs("setCssObj");

		// var value = $(".props-block").inputs("getValue");
		// $(".props-block").inputs("setObj", value);
	});
	$(document).on("click", ".curve-wrap .save", function(e){
		$(this).closest(".curve-wrap").addClass("hidden");
		$("select[name='animation-timing-function'] option:last-child").text("cubic-bezier(" + bezier.coordinates.toString() + ")");
		$("select[name='animation-timing-function'] option:last-child").attr("value", "cubic-bezier(" + bezier.coordinates.toString() + ")");
		$("select[name='animation-timing-function']").val("cubic-bezier(" + bezier.coordinates.toString() + ")");
		jQuery("select").niceSelect("update");
		$("#anim-props select").trigger("change");
	});
	$(document).on("click", ".curve-wrap .cancel", function(e){
		$(this).closest(".curve-wrap").addClass("hidden");
	});

	$(document).on("click", ".nice-select .list li:last-child", function(e){
		$(".curve-wrap").removeClass("hidden");
		curveBoundingBox = curve.getBoundingClientRect();
	});

	$(document).on("blur", ".select.active input.flexdatalist-alias", function(e){
		var select = $(this).closest(".select");
		select.removeClass("anim-active");
		$(".add-input").removeClass("hide");
	});

	$(document).on("click", ".add-input", function(e){
		var $this = $(this);
		$this.addClass("hide");
		$(".select.active").addClass("anim-active");
	    setTimeout(function(){
	    	$(".select.active").find("input").focus();
	    }, 300)
	})

}


module.exports = pluginEvents;
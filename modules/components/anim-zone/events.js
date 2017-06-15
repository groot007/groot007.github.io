function pluginEvents (root, $, name) {
	$("#anim-element").draggable({ drag:function(event, ui){
	  var left = $(".keyframe-tab.active input[name='left']");
	  var top = $(".keyframe-tab.active input[name='top']");
		if (!left.length){
			$("<div class='group'> <label for=''>left</label><input value='0px' name='left'></input></div>")
			.appendTo("#css-props .keyframe-tab.active");
		}
		if (!top.length){
			$("<div class='group'> <label for=''>top</label><input value='0px' name='top'></input></div>")
			.appendTo("#css-props .keyframe-tab.active");
		}
		left.val(Math.round(ui.position.left * 100) / 100 + "px");
		top.val(Math.round(ui.position.top * 100) / 100 + "px");
		left.trigger("input");
	}});
}


module.exports = pluginEvents;
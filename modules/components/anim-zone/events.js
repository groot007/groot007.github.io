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

	$('#anim-element').resizable({
    handles: {
        'nw': '.ui-resizable-nw',
        'ne': '.ui-resizable-ne',
        'sw': '.ui-resizable-sw',
        'se': '.ui-resizable-se',
        'n': '.ui-resizable-n',
        'e': '.ui-resizable-e',
        's': '.ui-resizable-s',
        'w': '.ui-resizable-w'
    },
    resize: function( event, ui ) {

    	var origin = {},
    		newV = {},
    		left = $(".keyframe-tab.active input[name='left']"),
	  		top = $(".keyframe-tab.active input[name='top']"),
	  		width = $(".keyframe-tab.active input[name='width']"),
	  		height = $(".keyframe-tab.active input[name='height']");
		origin.height = ui.originalSize.height;
		origin.width = ui.originalSize.width;
		origin.left = ui.originalPosition.left;
		origin.top = ui.originalPosition.top;
		newV.height = ui.size.height;
		newV.width = ui.size.width;
		newV.left = ui.position.left;
		newV.top = ui.position.top;

    	if (origin.height !== newV.height ){
    		if(!height.length){
    			$("<div class='group'> <label for=''>height</label><input value='0px' name='height'></input></div>")
				.appendTo("#css-props .keyframe-tab.active");
    		}
			height.val(newV.height + "px");
			height.trigger("input");
    	}
    	if (origin.width !== newV.width){
    		if(!width.length){
    			$("<div class='group'> <label for=''>width</label><input value='0px' name='width'></input></div>")
				.appendTo("#css-props .keyframe-tab.active");
    		}

			width.val(newV.width + "px");
			width.trigger("input");
    	}
    	if (origin.left !== newV.left){
    		if(!left.length){
    			$("<div class='group'> <label for=''>left</label><input value='0px' name='left'></input></div>")
				.appendTo("#css-props .keyframe-tab.active");
    		}

			left.val(newV.left + "px");
			left.trigger("input");
    	}
    	if (origin.top !== newV.top){
    		if(!top.length){
    			$("<div class='group'> <label for=''>top</label><input value='0px' name='top'></input></div>")
			.appendTo("#css-props .keyframe-tab.active");
    		}

			top.val(newV.top + "px");
			top.trigger("input");
    	}


    }
	});

var img = $('#anim-element');
var handle = $(".handle");
var offset = img.offset();
var mouseDown = false;
var transform, transformOrigin;

$("#anim-element").on("click", function(e){
    var $this = $(this);

    $this.find(".control").removeClass("hidden");


});

$(document).on("click", function(e){
    if(!$(e.target).closest("#anim-element").length){
        $("#anim-element").find(".control").addClass("hidden");
    }
});


$("#anim-element .handle").on("mousedown", function (e) {
   e.stopPropagation();
   transform = $(".keyframe-tab.active input[name='transform']");
    transformOrigin = $(".keyframe-tab.active input[name='transform-origin']");
    mouseDown=true;
    if(!transform.length){
         $("<div class='group'> <label for=''>transform</label><input value='(0)' name='transform'></input></div>")
         .appendTo("#css-props .keyframe-tab.active");
         transform = $(".keyframe-tab.active input[name='transform']");
        }
        if(!transformOrigin.length){
         $("<div class='group'> <label for=''>transform-origin</label><input value='(0)' name='transform-origin'></input></div>")
         .appendTo("#css-props .keyframe-tab.active");
         transformOrigin = $(".keyframe-tab.active input[name='transform-origin']");
        }
        transform.trigger("input");
        transformOrigin.val("50% 50%");
        transformOrigin.trigger("input");
        img = $('#anim-element');
        offset = img.offset();

});
$(document).on("mousemove", function(e){
    console.log(mouseDown)
    if(mouseDown ==true){
        var center_x = (offset.left) + ((img.width() + 100) / 2);
        var center_y = (offset.top) + ((img.height() + 100)/ 2);
        var mouse_x = e.pageX;
        var mouse_y = e.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 90;
        img.css('transform', 'rotate(' + degree + 'deg)');
        img.css('transform-origin', '50% 50%');
            transform.val("rotate("+ degree  +"deg)");
            transform.trigger("input");
        }

});
$(document).on("mouseup", function (e) {
    mouseDown = false;
})

	 // var dragging = false,
  //       target_wp,
  //       o_x, o_y, h_x, h_y, last_angle,
  //       transform, transformOrigin;

  //   $('.handle').mousedown(function (e) {
  //   	transform = $(".keyframe-tab.active input[name='transform']");
  //       transformOrigin = $(".keyframe-tab.active input[name='transform-origin']");
  //       h_x = e.pageX;
  //       h_y = e.pageY; // clicked point
  //       e.preventDefault();
  //       e.stopPropagation();
  //       dragging = true;
  //       target_wp = $(this).closest('#anim-element');
  //       if (!target_wp.data("origin")) target_wp.data("origin", {
  //           left: target_wp.offset().left,
  //           top: target_wp.offset().top
  //       });
  //       o_x = target_wp.data("origin").left;
  //       o_y = target_wp.data("origin").top; // origin point

  //       if(!transform.length){
		// 	$("<div class='group'> <label for=''>transform</label><input value='(0)' name='transform'></input></div>")
		// 	.appendTo("#css-props .keyframe-tab.active");
		// }
		// if(!transformOrigin.length){
		// 	$("<div class='group'> <label for=''>transform-origin</label><input value='(0)' name='transform-origin'></input></div>")
		// 	.appendTo("#css-props .keyframe-tab.active");
		// }
		// transform.trigger("input");
		// transformOrigin.val("50% 50%");
		// transformOrigin.trigger("input");
  //       last_angle = target_wp.data("last_angle") ||  0;
  //   })

  //   $(document).mousemove(function (e) {
  //       if (dragging) {
  //           var s_x = e.pageX,
  //               s_y = e.pageY; // start rotate point
  //           if (s_x !== o_x && s_y !== o_y) { //start rotate
  //               var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
  //               console.log(s_rad);
  //               s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
  //               s_rad += last_angle; // relative to the last one
  //               var degree = (s_rad * (360 / (2 * Math.PI)));
  //               transform.val("rotate("+ Math.round(degree * 100) / 100  +"deg)");
		// 		transform.trigger("input");
  //               target_wp.css('transform', 'rotate(' + degree + 'deg)');
  //               target_wp.css('transform-origin', '50% 50%');
  //           }
  //       }
  //   }) // end mousemove

  //   $(document).mouseup(function (e) {
  //   	if(dragging){
  //   		dragging = false
  //       var s_x = e.pageX,
  //           s_y = e.pageY;

  //       // Saves the last angle for future iterations
  //       var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
  //       s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
  //       s_rad += last_angle;
  //       console.log(s_rad)
  //       target_wp.data("last_angle", s_rad);
  //   	}

  //   })
}


module.exports = pluginEvents;
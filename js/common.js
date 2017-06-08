

// Start the main app logic.
// requirejs([
// 	"jquery",
// 	"ace",
// 	"keyframe",
// 	"niceSelect",
// 	"./js/modules/animZone",
// 	"./js/modules/timeline",
// 	"./js/modules/inputs",
// 	"./js/modules/editor",
// ], function ($, ace, keyframe, niceSelect) {
$(document).on("ready", function(){

	window.Keyframe = Keyframe;
	var docWidth = $(document.body).width()
	var borderWidth = $(".v-border").width();
	var width = (((docWidth - borderWidth * 2) / docWidth)) * 100;
	var editorEl;
	var html = "<span>Firefly</span>\n";
	var styles = "<style>\n #anim-element{\n\tposition: absolute;\n\twidth: 50px;\n\theight: 50px;\n\tcolor: #fff;\n\tbackground: #000;\n}</style>\n\n";

	setTimeout(function(){
		$("#editor").editor();
		editorEl = ace.edit("editor-el");
		editorEl.$blockScrolling = Infinity
	    editorEl.setTheme("ace/theme/monokai");
	    editorEl.getSession().setMode("ace/mode/html");
	    editorEl.setValue(styles + html);
	},false);
	// $(".props-block, .css-block").css("width", width / 2 + "%");

	jQuery("select").niceSelect();

	$(".timeline").timeline();
	$(".props-block").inputs();

	var drag = false;
	$(document).on("mousedown", ".middle-border", function(e){
		drag = true;
	});
	$(document).on("mouseup", function(e){
		drag = false;
	});

	var old;
	$(document).on("mousemove", ".main-blocks", function(e){
		if(drag && e.pageX > 400 && e.pageX < $(window).width() - 400){
			$(".props-block").css("width", e.pageX + "px");
				$(".css-block").css("width", $(window).width() - e.pageX + "px");
		}
		old = e.pageX;
	});



	// tabs
	$(document).on("click", ".props-block .tabs .tab", function(e){
		var $this = $(this),
			target = $this.data("target"),
			targetPart = target.match(/.{1,}(?=-)/)[0],
			tabCont = $("#" + target);
		$(".tabs .tab").removeClass("active");
		$this.addClass("active")
		$(".tabs-content .tab-cont").removeClass("active");
		$(".tabs-content #" + target).addClass("active");
		$(".select").removeClass("active");
		$(".select#" + targetPart + "-select").addClass("active");
	});

	// end
	$(document).on("click", ".flexdatalist-results.css li", function(e){
		var $this = $(this),
			text = $this.find(".item-name").text().replace(/\s/g, ""),
			value = $this.find(".item-name").next().text().replace(/\s/g, "");
		var el = $(".keyframe-tab.active input[name='"+text+"']");
		if (el.length){
			el.addClass("atention");
			el.focus();
			setTimeout(function(){el.removeClass("atention");}, 1000)
			return;
		}

		$("<div class='group'> <label for='"+ text +"'>" + text + "</label><input value='" + value + "' name='"+text +"'></input></div>")
			.appendTo("#css-props .keyframe-tab.active");
		$(".keyframe-tab.active input[name='"+text+"']").focus();
	});
	$(document).on("show:flexdatalist.results", function(){
		$(".flexdatalist-results.css li").addClass("disabled");
	});

	$(document).on("click", ".flexdatalist-results.anim li", function(e){
		var obj = {};
		var name = $(this).attr("id");
		$.getJSON('js/animations.json', function(data){
			obj = data[name]
			$(".props-block").inputs("setObj", obj);
		})
	});
	$.getJSON('js/animations.json', function(data){
		obj = data["clear"]
		$(".props-block").inputs("setObj", obj);
	});

	$(document).on("click", ".anim-zone button.accept", function(e){
		var value = editorEl.getValue()
		// var styles = /[^(<style>)]([\s\S]+)(?=(<\/style>))/.exec(value)[0];
		var styles = value.match(/<style>([\s\S]+)<\/style>/)[1];
		var html = value.replace(/<style>([\s\S]+)<\/style>/, "");

		if ($("style#custom").length){
	  			$("style#custom").text(styles);
	  	}else{
	  		$( "<style id='custom'>" + styles + "</style>" ).appendTo( "head" );
	  	}
	  	$("#anim-element").empty();
	  	$("#anim-element").append($(html));
	});

	$(document).on("click", ".anim-zone button.reset", function(e){
	  	editorEl.setValue(styles + html);
	  	$(".anim-zone button.accept").trigger("click");
	});

	$(document).on("click", ".edit-anim-el", function(e){
		var el = $(".custom-el");
	  	if(el.hasClass("visible")){
	  		$(this).removeClass("active")
	  		el.removeClass("visible");
	  	}else{
	  		$(this).addClass("active")
	  		el.addClass("visible");
	  	}
	});




});

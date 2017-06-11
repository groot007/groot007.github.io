

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
	var html = "<img src='img/logo.png' alt=''>\n<span>FIREFLY</span>";
	var styles = "<style>\n #anim-element{\n\tmargin:5px;\n\tposition: absolute;\n\tpadding: 5px;\n\tline-height: 1;\n\ttext-align: center;\n\twidth: 100px;\n\theight: 100px;\n\tcolor: #fff;\n\tbackground: #000;\n}\n#anim-element span{\n\tfont-weight: bold;\n\tfont-size: 18px;\n\t}\n</style>\n\n";

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
	// $.getJSON('js/animations.json', function(data){
	// 	obj = data["clear"]
	// 	$(".props-block").inputs("setObj", obj);

	// });

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
	if (localStorage.getItem('skipped') != "true"){
		setTimeout(function(){
	    	$(".tips-block").removeClass("hide");
			$("body").addClass("fixed");
    	}, 2000)
	}

	$(document).on("click", ".tips-block:not(.hide)", function(e){
		localStorage.setItem('skipped', 'true');
		$(this).closest(".tips-block").addClass("hide");
		$("body").removeClass("fixed");
	});

	$(document).on("click", ".reg-controls .help", function(e){
		$(".tips-block").removeClass("hide");
		$("body").addClass("fixed");
	});

	$(document).on("click", ".change-view", function(e){
		var b = $("body");
		if(b.hasClass("vertical")){
			b.removeClass("vertical");
			$(".bottom-border.first, .timeline, .bottom-border.second").insertAfter(".main-blocks");
			$(".top-border.h-border").insertBefore(".main-blocks");
		}else{
			b.addClass("vertical");
			$(".bottom-border.first, .timeline, .bottom-border.second").insertAfter("body > header");
			$(".top-border.h-border").insertAfter(".main-blocks");
		}
	});

	$(document).on("click", ".reg-controls .about", function(e){
		var b = $(".about-block");
		b.removeClass("hide");
	});

	$(document).on("click", ".about-block", function(e){
		var target = $(e.target);
		if (!target.is(".about-block .about-wrap")){
			$(".about-block").addClass("hide");
		}
	});


	var blob;

	$(document).on("click", ".css-block .export:not(.show-input)", function(e){
		e.stopPropagation();

		var className = $(".props-block").inputs("getValue")["main"]["className"];
		var $this = $(this);
		$this.addClass("show-input");
		$this.closest(".export").find("input").focus();

		$this.find("input").val(className + ".css")
	});


	$(document).on("blur", ".css-block .export input", function(e){
		var exportBlock = $(this).closest(".export");
		// exportBlock.removeClass("show-input");
	})


	$(document).on("click", ".css-block .export .export-btn", function(e){
		e.stopPropagation();

		var text = $("#editor").editor("getValue");
		var exportBlock = $(this).closest(".export");
		var fileName = exportBlock.find("input").val();
		exportBlock.removeClass("show-input");

		blob = new Blob([text], {type: "text/plain;charset=utf-8"});
		saveAs(blob, fileName);
	});

	$(document).on("click", ".css-block .copy", function(e){
		var note = $(this).find(".note");
		note.addClass("visible");
		setTimeout(function(){
			note.removeClass("visible");
		}, 2000)
		var copyTextarea = $(".css-block .fantom");
		var value = $("#editor").editor("getValue");
          copyTextarea.val(value);
          copyTextarea.select();
          document.execCommand('copy');
          // Reset textarea
          // copyTextarea.value = "";
	});





function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var target =  evt.dataTransfer || evt.target;
    var file = target.files[0] ||  target.files[0]; // FileList object.
        var reader = new FileReader();
        reader.onload = (function(reader)
        {
            return function()
            {
                var contents = reader.result;
                var lines = contents.split('\n');
                $("#editor").editor("setValue", contents);
            }
        })(reader);

        reader.readAsText(file);
        $(".drag-block").addClass("hidden");
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $(".drag-block").removeClass("hidden");
    $(".drag-block").appendTo("#editor");
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

  }

  // Setup the dnd listeners.
  var dropZone = $("#editor")[0];
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  $("#file")[0].addEventListener('change', handleFileSelect, false);


  var input = $(".select.active .add-input").offset();
  var editor = $(".css-block .import").offset();
  var timeline = $(".timeline .empty-frame").eq(40).offset();
  var editEl = $(".edit-anim-el").offset();
  var tabs = $(".tab-css-props").offset();
  console.log(tabs)
  $(".tip1").css({
  	left: input.left - 120,
  	top: input.top + 30
  });
   $(".tip2").css({
  	left: editor.left - 150,
  	top: editor.top + 50
  });
    $(".tip3").css({
  	left: timeline.left - 120,
  	top: timeline.top - 110
  });
   $(".tip4").css({
  	left: editEl.left + 80,
  	top: editEl.top + 40
  });
    $(".tip5").css({
  	left: tabs.left - 50,
  	top: tabs.top + 35
  });
});


$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(200).fadeOut('slow');

});
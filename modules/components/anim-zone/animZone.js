
let template = require("./template");
let Keyframe = window.Keyframe;
let animationControls;
let  animation;
let pause = false;
var timer;
class AnimZone {
	constructor() {
		Keyframe = window.Keyframe;
		console.log(this);

		// this.getElement().html(template());
	}
	setItem(){
		$(".empty-frame").eq(68).addClass("full-frame active");
	}
	setPropsAnimation(cssObj, animObj){

	  	if ($("style#anim").length){
	  			$("style#anim").text($(".props-block").inputs('getString'));
	  	}else{
	  		$( "<style id='anim'>" + $(".props-block").inputs('getString') + "</style>" ).appendTo( "head" );
	  	}

	}
	animationPlay(){
		var count = 0;
		var duration = $(".props-block").inputs("getValue")["anim"]["animation-duration"];
		var iteration = $(".props-block").inputs("getValue")["anim"]["animation-iteration-count"];
		var className = $(".props-block").inputs("getValue")["main"]["className"];
		$(".progress-block").css({
			"animation-duration" : duration,
			"animation-iteration-count" : iteration,
		})
		$(".progress-block").addClass("play");
		$("#anim-element").attr("style", "");
		$("#anim-element").addClass(className);
		$(".timeline .anim-controls .play").addClass("hidden");
		$(".timeline .anim-controls .pause").removeClass("hidden");
	}
	animationPause(){
		$(".progress-block").removeClass("running").addClass("pause")

		$("#anim-element").addClass("pause").removeClass("resume");
		$(".timeline .anim-controls .pause").addClass("hidden");
		$(".timeline .anim-controls .resume").removeClass("hidden");
	}
	animationResume(){
		$(".progress-block").removeClass("pause").addClass("running")


		$(".timeline .anim-controls .pause").addClass("hidden");
		$(".timeline .anim-controls .resume").removeClass("hidden");
		$("#anim-element").addClass("resume");
		$("#anim-element").removeClass("pause");

	}
	animationStop(){
		$(".timeline .anim-controls .resume, .timeline .anim-controls .pause").addClass("hidden");
		$(".timeline .anim-controls .play").removeClass("hidden");
		$("#anim-element").removeClass("class pause resume");
		$(".timeline .empty-frame").removeClass("progress");
		$(".progress-block").removeClass("play pause running")
	}

	setState(){
		var indx = $(".timeline").timeline("getActiveItem");
		var obj = $(".props-block").inputs("getCssObj")[indx] || {};
		$("#anim-element").attr("style", "");
		$("#anim-element").css(obj);
	}


};
var el = document.getElementById("anim-element");
var progress = $(".progress-block")[0];
    el.addEventListener("animationend", AnimationListener, false);
    progress.addEventListener("animationend", stopProgress, false);
    function AnimationListener(){
    	$(".timeline .anim-controls .pause, .timeline .anim-controls .resume").addClass("hidden");
    	$(".timeline .anim-controls .play").removeClass("hidden");
    	$("#anim-element").removeClass("className");
    	clearInterval(timer);
 }
 function stopProgress(){
    	$(".progress-block").removeClass("play pause running")
    	$(".progress-block").attr("style", "");
 }


module.exports = AnimZone;


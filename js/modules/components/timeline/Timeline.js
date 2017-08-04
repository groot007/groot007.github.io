let template = require("./template");

class Timeline {
	constructor() {
		this.time();
		// this.setActiveItem(0);
		// this.setActiveItem(100);
		// this.getElement().html(template());
	}
	time() {
		var $el = $(".timeline .empty-frame");
		var length = $el.length - 1;
		var percent = +(100 / length).toFixed(2);
		var rez = 0;
		var $temp;
		// $el.eq(0).find(".percent").html(0 + "%");
		$el.eq(length).find(".percent").html(100 + "%");
		for (var i = 1; i < length; i++){
			rez = i*percent;
			if((rez ^ 0) !== rez){
				rez = (i*percent).toFixed(2);
			}
			if(Math.round(rez) === 50){
				$el.find(".middle-percent").remove();
				$temp = $("<span class='middle-percent'>"+ rez +"%</span>");
				$el.eq(i).append($temp);
			}
			$el.eq(i).find(".percent").html(rez + "%")
		}
	}

	setActiveItem(index){
		if(typeof index == "object"){
			var that = this;
			index.map(function(indx) {
			  that._$el.find(".frames-block>.empty-frame").eq(indx).addClass("full-frame active");
			});
		}else{
			$(".empty-frame").removeClass("active")
			this._$el.find(".frames-block>.empty-frame").eq(index).addClass("full-frame active");
			$(".props-block").inputs("setCssObj", index);
		}
	}
	clearAllItems(){
		$(".empty-frame").removeClass("active full-frame");
	}


	createTab(indx){

		if(!$(".keyframe-tab#"+indx).length){
			$(".props-block").inputs("createTab", indx);
		}else{
			$(".keyframe-tab").removeClass("active");
			$(".keyframe-tab#"+indx).addClass("active")
		}
	}

	getActiveItem(){
		return this._$el.find("div.active").index();
	}

	clearItem($this){
		var frame = $this.closest(".empty-frame");
		var index = $(".empty-frame").index(frame);
		var lastIndex = 0;
		if (frame.hasClass("active")){
			var last = this._$el.find(".frames-block .empty-frame")
			.eq(index)
			.prevAll(".full-frame")
			.eq(0);

			lastIndex = $(".empty-frame").index(last);
		}
		frame.removeClass("active full-frame");
		this.setActiveItem(lastIndex);
		$(".keyframe-tab#"+lastIndex).addClass("active");
		$(".props-block").inputs("removeTab", index)
	}
}


module.exports = Timeline;
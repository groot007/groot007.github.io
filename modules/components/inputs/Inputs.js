let template = require("./template");
let cssObj = {};
let animObj = {};
let mainObj = {};
let value = {};
let resultStr = "";
class Inputs {
	constructor() {

	}

	setObj(obj){
		this.createTabs(obj["css"]);
		this.setValueForAnim(obj["anim"]);
		animObj = obj["anim"];
		cssObj = obj["css"];
		mainObj = obj["main"];
		this.generateString(obj);
		var string = this.getString();
		$("#editor").editor("setValue", string);
		$(".anim-zone").animZone("setPropsAnimation", obj["main"])

	}
	render(setText){
		var obj = this.getValue();
		this.generateString(obj);
		if (setText) $("#editor").editor("setValue", this.getString());
		// $(".anim-zone").animZone("setPropsAnimation", obj["main"])
	}

	setAnimObj(elem){
		if(elem){
			if($(elem).attr("animation-name") == "name"){
				mainObj["name"] = $(elem).val();
			}else if ($(elem).attr("type") == "number"){
				animObj[$(elem).attr("name")] = +$(elem).val();
			}
			else{
				animObj[$(elem).attr("name")] = $(elem).val();
			}
			return;
		}
		$("#anim-props .group").each(function(i, el){
			var elem = $(el).find("input");
			if($(elem).attr("name") == "name"){
				mainObj["name"] = $(elem).val();
			}else if ($(elem).attr("type") == "number"){
				animObj[$(elem).attr("name")] = +$(elem).val();
			}else{
				animObj[$(elem).attr("name")] = $(elem).val();
			}
		});
	}

	getAnimObj(){
		return animObj;
	}


	setCssObj(id){
		var num = (id) ? id : $(".timeline").timeline("getActiveItem");
		var props = {};
		var keyframe = (id) ? ".keyframe-tab#"+id + " input" : ".keyframe-tab.active input";

		$("#css-props " + keyframe).each(function(i, el){
			props[$(el).attr("name")] = $(el).val();
		});
		cssObj[num] = props;
		// console.log(cssObj)
		this.render(true);
	}

	getCssObj(){
		return cssObj;
	}
	getMainObj(){
		return mainObj;
	}

	getValue(){
		value["main"] = this.getMainObj();
		value["anim"] = this.getAnimObj();
		value["css"] = this.getCssObj();
		return value;
	}

	generateString(obj){
		var name = obj["main"]["name"] || "example";
		var className = "className";
		var animStr = "." + className + "{\n";
		var cssStr = "@keyframes " + name + " { \n";

		for(var key in obj["anim"]){
			// var keyMod = key.replace(/([A-Z])/g, "-$1").toLowerCase();
			if(obj["anim"][key] !== 0){
				animStr += "\t" + key + ": " + obj["anim"][key] + "; \n"
			}
		}
		animStr += "}\n"

		for(var key in obj["css"]){
			cssStr += "\t" + key + "% { \n";
			for (var innerKey in obj["css"][key]){
				cssStr += "\t\t" +  innerKey + ": " + obj["css"][key][innerKey] + ";\n"
			}
			cssStr += "\t} \n"
		}
		cssStr += "}"

		resultStr = animStr + cssStr;
	}

	getString(){
		return resultStr;
	}


	setValueForAnim(obj){
		for(var key in obj){
			if (key == "animation-timing-function" && /\d/.test(obj[key])){
				var cubic = [0.215, 0.610, 0.355, 1.000];
				renderCurve(cubic);
				$(".curve-wrap .cancel").trigger("click");
			}else{
				$("#anim-props [name='" + key + "']").val(obj[key]);
			}
		}

		// $("#anim-props [name='name']").val(this.getValue()["main"]["name"]);
		$('select').niceSelect('update');
	}


	createTabs(obj){
		$(".keyframe-tab").remove();
		$(".timeline").timeline("clearAllItems");
		for(var id in obj){
			$(".timeline").timeline("setActiveItem", id);
				var el = $("<div/>", {
					class: "keyframe-tab",
					id : id,
				});
				for(var key in obj[id]){
					$("<div class='group'> <label for='"+ key +"'>" + key + "</label><input value='"+ obj[id][key]+"' name='"+key+"'></input></div>")
						.appendTo(el)
				};
				el.appendTo("#css-props");
		}
		$(".keyframe-tab").last().addClass("active");
	}


	createTab(id){
		var last = $(".timeline")
			.timeline("getElement")
			.find(".frames-block .empty-frame")
			.eq(id)
			.prevAll(".full-frame")
			.eq(0);
		var index = $(".empty-frame").index(last) || 0;

		$(".keyframe-tab").removeClass("active");
		$("<div/>", {
			class: "keyframe-tab active",
			id : id,
		}).insertAfter(".keyframe-tab#" + index);

		for(var key in cssObj[index]){
			$("<div class='group'> <label for='"+ key +"'>" + key + "</label><input value='"+ cssObj[index][key]+"' name='"+key+"'></input></div>")
			.appendTo("#css-props .keyframe-tab#" +id);
		}

		this.setCssObj(id);
	}

	removeTab(id){
		$(".keyframe-tab#" + id).remove();
		delete cssObj[id];
		this.setCssObj();
	}
}


module.exports = Inputs;
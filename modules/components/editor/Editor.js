let template = require("./template");
var editor;
class Editor {
	constructor() {
		let ace =  window.ace;
		let id = this._$el.attr("id");
		editor = ace.edit(id);
		editor.$blockScrolling = Infinity;
	    editor.setTheme("ace/theme/monokai");
	    editor.getSession().setMode("ace/mode/css");
	    var that = this;
	    editor.on("blur", function(){
	    	that.parsingToObj();
	    });

	    editor.getSession().on("changeAnnotation", function(){

		    var annot = editor.getSession().getAnnotations();
		    for (var key in annot){
		        if (annot.hasOwnProperty(key))
		            console.log("editor errors [" + annot[key].row + " , " + annot[key].column + "] - \t" + annot[key].text);
		    }

		});
	    if(localStorage.getItem('css-animation')){
	    	editor.setValue(localStorage.getItem('css-animation'));
	    	this.parsingToObj()
	    }
	    else{
	    	$.getJSON('js/animations.json', function(data){
				var obj = data["clear"]
				$(".props-block").inputs("setObj", obj);
			});
	    }
	}
	setValue(value){
		editor.setValue(value, 1);
	}
	getValue(){
		return editor.getValue();
	}
	parsingToObj(str){
		var props = [];
		var rez = {};
		var cssNotParse = [];
		var simple = "";

		var anim = "";
		var css = "";
		var cssParsed = {};
		var animProps = "";
		var animParsed = {};

		var className = /\.\w+/.exec(this.getValue())[0].replace(/\./, "");
		anim = /(?:.+){([^\}]*)}/.exec(this.getValue())[0];
		css = this.getValue().match(/(\d+%)\s+{([\s\w:;().\-,]+)}/g);

		animProps = /{([\s\w:;()-.,]+)[^}\s]/.exec(anim)[0].replace(/[{\s]+/, "").split(";");

		for(var k = 0; k < animProps.length - 1; k++){
			animParsed[$.trim(animProps[k].split(":")[0])] = $.trim(animProps[k].split(":")[1])
		}

		for(var i = 0; i < css.length; i++){
			var props = {};
			var values = css[i].match(/[^%{\s\d]([\s\w:;().,\-]+)[^}]/);
			if(!values){
				values = "";
				cssNotParse[i] = values;
			}else{
				cssNotParse[i] = values[0];
			}

			simple = cssNotParse[i].split(";");

			for (var j = 0; j < simple.length - 1; j++){
				props[$.trim(simple[j].split(":")[0])] = $.trim(simple[j].split(":")[1]);
			}

			cssParsed[/\d+/.exec(css[i])[0]] = props;
		}

		rez["main"] = {
			"name": animParsed["animation-name"],
			"className": className
		};
		rez["anim"] = animParsed;
		rez["css"] = cssParsed;

		$(".props-block").inputs("setObj", rez);
	}
}


module.exports = Editor;
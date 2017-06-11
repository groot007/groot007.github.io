/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).init(function () {
		var Plugin = __webpack_require__(4).Plugin,
		    Inputs = __webpack_require__(12),
		    pluginEvents = __webpack_require__(14);

		new Plugin("inputs", Inputs, pluginEvents);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var root = window;
	var initialized = false,
	    constants = __webpack_require__(2),
	    modules = __webpack_require__(3);

	function init(callback) {
		if (!initialized) {
			var complete = function complete($) {
				initialized = true;
				modules.defineModule("jquery", $);
				if (typeof callback == "function") {
					callback();
				}
			};

			if (typeof root.define === "function" && root.define.amd) {
				//AMD
				root.define(["jquery"], complete);
			} else {
				//Standard
				complete(root.jQuery);
			}
		}
	}

	module.exports = {
		init: init
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	var register = Object.create(null);

	function set(name, val) {
		if (register[name] === void 0) {
			register[name] = val;
		}
	}

	function get(name) {
		if (register[name] !== void 0) {
			return register[name];
		}
		throw Error("Undefined constant " + name);
	}

	module.exports = {
		get: get,
		set: set
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	var register = Object.create(null);

	function defineModule(name, val) {
		if (register[name] === void 0) {
			register[name] = val;
		} else {
			console.error("Re-connect module " + name);
		}
	}

	function requireModule(name) {
		if (register[name] !== void 0) {
			return register[name];
		}
		throw Error("Undefined module " + name);
	}

	module.exports = {
		defineModule: defineModule,
		requireModule: requireModule
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var app = __webpack_require__(1),
	    modules = __webpack_require__(3),
	    $ = modules.requireModule("jquery");

	var PrivateProps = function () {
		function PrivateProps() {
			_classCallCheck(this, PrivateProps);

			this.weakMaps = Object.create(null);
		}

		_createClass(PrivateProps, [{
			key: "set",
			value: function set(obj, propName, value) {
				var weakMap = this.weakMaps[propName] || (this.weakMaps[propName] = new WeakMap());
				weakMap.set(obj, value);
				return this;
			}
		}, {
			key: "setAll",
			value: function setAll(obj, props) {
				for (var propName in props) {
					if (props.hasOwnProperty(propName)) {
						this.set(obj, propName, props[propName]);
					}
				}
			}
		}, {
			key: "get",
			value: function get(obj, propName) {
				var weakMap = this.weakMaps[propName];
				if (weakMap) {
					return weakMap.get(obj);
				}
			}
		}]);

		return PrivateProps;
	}();

	var Plugin = function () {
		var uid = 0;
		var root = window;
		var privateProps = new PrivateProps();

		var componentMixin = {
			getPluginName: function getPluginName() {
				return this.constructor.pluginName;
			},
			getElement: function getElement() {
				return this._$el;
			},
			getUID: function getUID() {
				return this._uid || (this._uid = this.getPluginName() + ++uid);
			}
		};

		var createPlugin = function createPlugin(obj) {

			var defaultDestructor = function defaultDestructor() {
				this.getElement().removeData(obj.name);
			};

			return function (methodName, propName) {
				if (privateProps.get(obj, "isInit")) {
					var initArgs = void 0,
					    isGetMethod = void 0,
					    pluginData = void 0,
					    workResult = null,
					    args = null,
					    _$ = obj.$;

					initArgs = _$.type(methodName) === "object" ? methodName : {};

					if ((methodName === "get" || methodName === "set") && _$.type(propName) === "string") {
						methodName += propName.substr(0, 1).toUpperCase() + propName.substr(1);

						var _arguments = Array.prototype.slice.call(arguments);

						args = _arguments.slice(2);
					} else {
						var _arguments2 = Array.prototype.slice.call(arguments);

						args = _arguments2.slice(1);
					}

					isGetMethod = _$.type(methodName) === "string" && methodName.search(/^get/) === 0;

					_$.each(this, function () {
						var $this;
						$this = _$(this);
						pluginData = $this.data(obj.name);

						if (!pluginData) {
							var Component = obj.Component;
							pluginData = Object.create(Component.prototype);
							pluginData.$ = _$;
							pluginData._$el = $this;
							$this.data(obj.name, pluginData);
							Component.call(pluginData, $this, initArgs);
						}

						if (methodName === "destroy") {
							defaultDestructor.call(pluginData);
						}

						if (pluginData[methodName]) {
							workResult = pluginData[methodName].apply(pluginData, args);
							if (isGetMethod) {
								return false;
							}
						}
					});

					if (isGetMethod && pluginData) {
						return workResult;
					} else {
						return this;
					}
				} else {
					root.console.error("The module '" + obj.name + "' has not been initialized.");
					return this;
				}
			};
		};

		var Plugin = function () {
			function Plugin(name, Component, events) {
				_classCallCheck(this, Plugin);

				name = "" + name;
				Component.pluginName = name;
				var componentProto = Component.prototype;

				for (var key in componentMixin) {
					if (componentMixin.hasOwnProperty(key) && !(key in componentProto)) {
						componentProto[key] = componentMixin[key];
					}
				}

				privateProps.setAll(this, {
					plugin: createPlugin(this),
					name: name,
					events: events,
					Component: Component
				});

				this._init();
			}

			_createClass(Plugin, [{
				key: "noConflict",
				value: function noConflict() {
					this.$.fn[this.name] = privateProps.get(this, "oldPlugin");
				}
			}, {
				key: "_init",
				value: function _init() {
					if (!privateProps.get(this, "isInit")) {
						var name = this.name,
						    Component = this.Component,
						    events = this.events,
						    plugin = this.plugin;

						var oldPlugin = $.fn[name];
						this.$ = $;

						$.fn[name] = plugin;
						$.fn[name]._constructor = Component;
						events(root, $, Component, name);

						modules.defineModule(name, plugin);

						privateProps.setAll(this, {
							isInit: true,
							oldPlugin: oldPlugin
						});
						return plugin;
					}
				}
			}, {
				key: "name",
				get: function get() {
					return privateProps.get(this, "name");
				}
			}, {
				key: "Component",
				get: function get() {
					return privateProps.get(this, "Component");
				}
			}, {
				key: "events",
				get: function get() {
					return privateProps.get(this, "events");
				}
			}, {
				key: "plugin",
				get: function get() {
					return privateProps.get(this, "plugin");
				}
			}]);

			return Plugin;
		}();

		return Plugin;
	}();

	module.exports = {
		PrivateProps: PrivateProps,
		Plugin: Plugin
	};

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	// * templayed.js 0.2.1
	// * The fastest and smallest Mustache compliant Javascript templating library written in 1806 bytes (uncompressed)
	// *
	// * (c) 2012 Paul Engel (Internetbureau Holder B.V.)
	// * Except otherwise noted, templayed.js is licensed under
	// * http://creativecommons.org/licenses/by-sa/3.0
	// *
	// * $Date: 2012-10-14 01:17:01 +0100 (Sun, 14 October 2012) $
	// *

	function templayed(template, vars) {

	  var get = function get(path, i) {
	    i = 1;path = path.replace(/\.\.\//g, function () {
	      i++;return '';
	    });
	    var js = ['vars[vars.length - ', i, ']'],
	        keys = path == "." ? [] : path.split("."),
	        j = 0;
	    for (j; j < keys.length; j++) {
	      js.push('.' + keys[j]);
	    };
	    return js.join('');
	  },
	      tag = function tag(template) {
	    return template.replace(/\{\{(!|&|\{)?\s*(.*?)\s*}}+/g, function (match, operator, context) {
	      if (operator == "!") return '';
	      var i = inc++;
	      return ['"; var o', i, ' = ', get(context), ', s', i, ' = (((typeof(o', i, ') == "function" ? o', i, '.call(vars[vars.length - 1]) : o', i, ') || "") + ""); s += ', operator ? 's' + i : '(/[&"><]/.test(s' + i + ') ? s' + i + '.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/>/g,"&gt;").replace(/</g,"&lt;") : s' + i + ')', ' + "'].join('');
	    });
	  },
	      block = function block(template) {
	    return tag(template.replace(/\{\{(\^|#)(.*?)}}(.*?)\{\{\/\2}}/g, function (match, operator, key, context) {
	      var i = inc++;
	      return ['"; var o', i, ' = ', get(key), '; ', (operator == "^" ? ['if ((o', i, ' instanceof Array) ? !o', i, '.length : !o', i, ') { s += "', block(context), '"; } '] : ['if (typeof(o', i, ') == "boolean" && o', i, ') { s += "', block(context), '"; } else if (o', i, ') { for (var i', i, ' = 0; i', i, ' < o', i, '.length; i', i, '++) { vars.push(o', i, '[i', i, ']); s += "', block(context), '"; vars.pop(); }}']).join(''), '; s += "'].join('');
	    }));
	  },
	      inc = 0;

	  return new Function("vars", 'vars = [vars]; var s = "' + block(template.replace(/"/g, '\\"').replace(/\n/g, '\\n')) + '"; return s;');
	};

	templayed.version = "0.2.1";

	//simpleport
	module.exports = templayed;

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var template = __webpack_require__(13);
	var cssObj = {};
	var animObj = {};
	var mainObj = {};
	var value = {};
	var resultStr = "";

	var Inputs = function () {
		function Inputs() {
			_classCallCheck(this, Inputs);
		}

		_createClass(Inputs, [{
			key: "setObj",
			value: function setObj(obj) {
				this.createTabs(obj["css"]);
				this.setValueForAnim(obj["anim"]);
				animObj = obj["anim"];
				cssObj = obj["css"];
				mainObj = obj["main"];
				this.generateString(obj);
				var string = this.getString();
				localStorage.setItem('css-animation', string);
				$("#editor").editor("setValue", string);
				$(".anim-zone").animZone("setPropsAnimation", obj["main"]);
			}
		}, {
			key: "render",
			value: function render(setText) {
				var obj = this.getValue();
				this.generateString(obj);
				if (setText) $("#editor").editor("setValue", this.getString());
				// $(".anim-zone").animZone("setPropsAnimation", obj["main"])
			}
		}, {
			key: "setAnimObj",
			value: function setAnimObj(elem) {
				if (elem) {
					if ($(elem).attr("animation-name") == "name") {
						mainObj["name"] = $(elem).val();
					} else if ($(elem).attr("type") == "number") {
						animObj[$(elem).attr("name")] = +$(elem).val();
					} else {
						animObj[$(elem).attr("name")] = $(elem).val();
					}
					console.log(animObj, 1);
					return;
				}
				$("#anim-props .group").each(function (i, el) {
					var elem = $(el).find("input");
					if ($(elem).attr("name") == "name") {
						mainObj["name"] = $(elem).val();
					} else if ($(elem).attr("type") == "number") {
						animObj[$(elem).attr("name")] = +$(elem).val();
					} else {
						animObj[$(elem).attr("name")] = $(elem).val();
					}
				});
			}
		}, {
			key: "getAnimObj",
			value: function getAnimObj() {
				return animObj;
			}
		}, {
			key: "setCssObj",
			value: function setCssObj(id) {
				var num = id ? id : $(".timeline").timeline("getActiveItem");
				var props = {};
				var keyframe = id ? ".keyframe-tab#" + id + " input" : ".keyframe-tab.active input";

				$("#css-props " + keyframe).each(function (i, el) {
					props[$(el).attr("name")] = $(el).val();
				});
				cssObj[num] = props;
				// console.log(cssObj)
				this.render(true);
			}
		}, {
			key: "getCssObj",
			value: function getCssObj() {
				return cssObj;
			}
		}, {
			key: "getMainObj",
			value: function getMainObj() {
				return mainObj;
			}
		}, {
			key: "getValue",
			value: function getValue() {
				value["main"] = this.getMainObj();
				value["anim"] = this.getAnimObj();
				value["css"] = this.getCssObj();
				return value;
			}
		}, {
			key: "generateString",
			value: function generateString(obj) {
				var name = obj["anim"]["animation-name"] || "example";
				var className = obj["main"]["className"] || "className";
				var animStr = "." + className + "{\n";
				var cssStr = "@keyframes " + name + " { \n";

				for (var key in obj["anim"]) {
					// var keyMod = key.replace(/([A-Z])/g, "-$1").toLowerCase();
					if (obj["anim"][key] !== 0) {
						animStr += "\t" + key + ": " + obj["anim"][key] + "; \n";
					}
				}
				animStr += "}\n";

				for (var key in obj["css"]) {
					cssStr += "\t" + key + "% { \n";
					for (var innerKey in obj["css"][key]) {
						cssStr += "\t\t" + innerKey + ": " + obj["css"][key][innerKey] + ";\n";
					}
					cssStr += "\t} \n";
				}
				cssStr += "}";

				resultStr = animStr + cssStr;
			}
		}, {
			key: "getString",
			value: function getString() {
				return resultStr;
			}
		}, {
			key: "setValueForAnim",
			value: function setValueForAnim(obj) {
				for (var key in obj) {
					if (key == "animation-timing-function" && /\d/.test(obj[key])) {
						var cubic = [0.215, 0.610, 0.355, 1.000];
						renderCurve(cubic);
						$(".curve-wrap .cancel").trigger("click");
					} else {
						$("#anim-props [name='" + key + "']").val(obj[key]);
					}
				}

				// $("#anim-props [name='name']").val(this.getValue()["main"]["name"]);
				$('select').niceSelect('update');
			}
		}, {
			key: "createTabs",
			value: function createTabs(obj) {
				$(".keyframe-tab").remove();
				$(".timeline").timeline("clearAllItems");
				for (var id in obj) {
					$(".timeline").timeline("setActiveItem", id);
					var el = $("<div/>", {
						class: "keyframe-tab",
						id: id
					});
					for (var key in obj[id]) {
						$("<div class='group'> <label for='" + key + "'>" + key + "</label><input value='" + obj[id][key] + "' name='" + key + "'></input></div>").appendTo(el);
					};
					el.appendTo("#css-props");
				}
				$(".keyframe-tab").last().addClass("active");
			}
		}, {
			key: "createTab",
			value: function createTab(id) {
				var last = $(".timeline").timeline("getElement").find(".frames-block .empty-frame").eq(id).prevAll(".full-frame").eq(0);
				var index = $(".empty-frame").index(last) || 0;

				$(".keyframe-tab").removeClass("active");
				$("<div/>", {
					class: "keyframe-tab active",
					id: id
				}).insertAfter(".keyframe-tab#" + index);

				for (var key in cssObj[index]) {
					$("<div class='group'> <label for='" + key + "'>" + key + "</label><input value='" + cssObj[index][key] + "' name='" + key + "'></input></div>").appendTo("#css-props .keyframe-tab#" + id);
				}

				this.setCssObj(id);
			}
		}, {
			key: "removeTab",
			value: function removeTab(id) {
				$(".keyframe-tab#" + id).remove();
				delete cssObj[id];
				this.setCssObj();
			}
		}]);

		return Inputs;
	}();

	module.exports = Inputs;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(7)("\n\t<div style=\"color: white; font-size: 2em;\">Testing</div>\n");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";

	function pluginEvents(root, $, name) {

		$(document).on("click", ".type-anim", function (e) {
			var $this = $(this);
			$(".curve-wrap").toggleClass("hidden");
		});
		// $(document).on("blur", "#css-props input, #anim-props input", function(e){
		// 	let inputs = new name();
		// 	inputs.setProps();
		// });
		$(document).on("mousewheel", "#css-props input", function (event, delta) {
			var num = /-\d+|\d+/.exec($(this).val()) || 0;
			var pre = /\D+$/.exec($(this).val()) || "";

			if (num == "") return;
			if (delta > 0) {
				$(this).val(+num + 1 + pre);
			} else {
				$(this).val(+num - 1 + pre);
			}
			$(this).trigger("input");
			return false;
		});
		var down = false;
		var $input = null;

		$(document).on("mouseup", function () {
			down = false;
		});

		$(document).on("mousedown", "#css-props input", function () {
			down = true;
			$input = $(this);
		});
		var pageY;
		var pageX;
		$(document).on("mousemove", function (e) {

			if (!down || e.pageY > $input.offset().top && e.pageY < $input.offset().top + $input.height()) return;
			var num = /-\d+|\d+/.exec($input.val()) || 0;
			var pre = /\D+$/.exec($input.val()) || "";

			if (pageY > e.pageY) {
				$input.val(+num + 4 + pre);
			} else {
				$input.val(+num - 4 + pre);
			}
			$input.trigger("input");
			pageY = e.pageY;
			pageX = e.pageX;
			return false;
		});

		$(document).on("blur input", "#anim-props input", function (e) {
			var inputs = new name();
			inputs.setAnimObj($(this));
			console.log($(this));
			inputs.generateString(inputs.getValue());
			setTimeout(function () {
				$("#editor").editor("setValue", inputs.getString());
			}, false);
			$(".anim-zone").animZone("setPropsAnimation", inputs.getCssObj(), inputs.getAnimObj());
		});
		$(document).on("change", "#anim-props select", function (e) {
			var inputs = new name();
			inputs.setAnimObj($(this));
			inputs.generateString(inputs.getValue());
			setTimeout(function () {
				$("#editor").editor("setValue", inputs.getString());
			}, false);
			$(".anim-zone").animZone("setPropsAnimation", inputs.getCssObj(), inputs.getAnimObj());
		});

		$(document).on("input blur", "#css-props input", function (e) {
			var inputs = new name();
			inputs.setCssObj();
			// inputs.generateString(inputs.getValue());
			// setTimeout(function(){$("#editor").editor("setValue", inputs.getString());}, false);
			$(".anim-zone").animZone("setPropsAnimation");
			$(".anim-zone").animZone("setState");
		});

		$(document).on("mouseenter", "#css-props .group", function (e) {
			$("<div class='delete-input'><i class='fa fa-times' aria-hidden='true'></i></div>").appendTo($(this));
		});

		$(document).on("mouseleave", "#css-props .group ", function (e) {
			$(".delete-input").remove();
		});

		$(document).on("click", ".delete-input", function (e) {
			$(this).closest(".group").remove();
			$(".props-block").inputs("setCssObj");

			// var value = $(".props-block").inputs("getValue");
			// $(".props-block").inputs("setObj", value);
		});
		$(document).on("click", ".curve-wrap .save", function (e) {
			$(this).closest(".curve-wrap").addClass("hidden");
			$("select[name='animation-timing-function'] option:last-child").text("cubic-bezier(" + bezier.coordinates.toString() + ")");
			$("select[name='animation-timing-function'] option:last-child").attr("value", "cubic-bezier(" + bezier.coordinates.toString() + ")");
			$("select[name='animation-timing-function']").val("cubic-bezier(" + bezier.coordinates.toString() + ")");
			jQuery("select").niceSelect("update");
			$("#anim-props select").trigger("change");
		});
		$(document).on("click", ".curve-wrap .cancel", function (e) {
			$(this).closest(".curve-wrap").addClass("hidden");
		});

		$(document).on("click", ".nice-select .list li:last-child", function (e) {
			$(".curve-wrap").removeClass("hidden");
			curveBoundingBox = curve.getBoundingClientRect();
		});

		$(document).on("blur", ".select.active input.flexdatalist-alias", function (e) {
			var select = $(this).closest(".select");
			select.removeClass("anim-active");
			$(".add-input").removeClass("hide");
		});

		$(document).on("click", ".add-input", function (e) {
			var $this = $(this);
			$this.addClass("hide");
			$(".select.active").addClass("anim-active");
			setTimeout(function () {
				$(".select.active").find("input").focus();
			}, 300);
		});
	}

	module.exports = pluginEvents;

/***/ })
/******/ ]);
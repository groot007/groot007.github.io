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
		    Timeline = __webpack_require__(15),
		    pluginEvents = __webpack_require__(17);

		new Plugin("timeline", Timeline, pluginEvents);
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
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var template = __webpack_require__(16);

	var Timeline = function () {
		function Timeline() {
			_classCallCheck(this, Timeline);

			this.time();
			this.setActiveItem(0);
			// this.setActiveItem(100);
			// this.getElement().html(template());
		}

		_createClass(Timeline, [{
			key: "time",
			value: function time() {
				var $el = $(".timeline .empty-frame");
				var length = $el.length - 1;
				var percent = +(100 / length).toFixed(2);
				var rez = 0;
				var $temp;
				$el.eq(0).find(".percent").html(0 + "%");
				$el.eq(length).find(".percent").html(100 + "%");
				for (var i = 1; i < length; i++) {
					rez = i * percent;
					if ((rez ^ 0) !== rez) {
						rez = (i * percent).toFixed(2);
					}
					if (Math.round(rez) === 50) {
						$el.find(".middle-percent").remove();
						$temp = $("<span class='middle-percent'>" + rez + "%</span>");
						$el.eq(i).append($temp);
					}
					$el.eq(i).find(".percent").html(rez + "%");
				}
			}
		}, {
			key: "setActiveItem",
			value: function setActiveItem(index) {
				if ((typeof index === "undefined" ? "undefined" : _typeof(index)) == "object") {
					var that = this;
					index.map(function (indx) {
						that._$el.find(".frames-block>.empty-frame").eq(indx).addClass("full-frame active");
					});
				} else {
					$(".empty-frame").removeClass("active");
					this._$el.find(".frames-block>.empty-frame").eq(index).addClass("full-frame active");
					$(".props-block").inputs("setCssObj", index);
				}
			}
		}, {
			key: "clearAllItems",
			value: function clearAllItems() {
				$(".empty-frame").removeClass("active full-frame");
			}
		}, {
			key: "createTab",
			value: function createTab(indx) {

				if (!$(".keyframe-tab#" + indx).length) {
					$(".props-block").inputs("createTab", indx);
				} else {
					$(".keyframe-tab").removeClass("active");
					$(".keyframe-tab#" + indx).addClass("active");
				}
			}
		}, {
			key: "getActiveItem",
			value: function getActiveItem() {
				return this._$el.find("div.active").index();
			}
		}, {
			key: "clearItem",
			value: function clearItem($this) {
				var frame = $this.closest(".empty-frame");
				var index = $(".empty-frame").index(frame);
				var lastIndex = 0;
				if (frame.hasClass("active")) {
					var last = this._$el.find(".frames-block .empty-frame").eq(index).prevAll(".full-frame").eq(0);

					lastIndex = $(".empty-frame").index(last);
				}
				frame.removeClass("active full-frame");
				this.setActiveItem(lastIndex);
				$(".keyframe-tab#" + lastIndex).addClass("active");
				$(".props-block").inputs("removeTab", index);
			}
		}]);

		return Timeline;
	}();

	module.exports = Timeline;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(7)("\n\t<div style=\"color: white; font-size: 2em;\">Testing</div>\n");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	"use strict";

	function pluginEvents(root, $, name) {
		// timeline = new name();
		$(document).on("click", ".empty-frame", function (e) {
			var $el = $(this);
			var index = $(".empty-frame").index($el);
			$(".timeline").timeline("createTab", index);
			$(".timeline").timeline("setActiveItem", index);
			$(".props-block .tabs .tab").trigger("click");
		});
		$(document).on("click", ".full-frame", function (e) {
			$(".anim-zone").animZone("setState");
		});

		// $(document).on("click", ".empty-frame .action", function(e){
		// 	e.stopPropagation();
		// 	e.preventDefault();
		// 	var $this = $(this);
		// 	$template = $("<div class='empty-frame'><div class='subsidiary'><div class='action'>+</div><span class='percent'>0%</span></div></div>");
		// 	$this.closest(".empty-frame").before($template)
		// 	updatePercent()
		// });

		$(document).on("mouseenter", ".empty-frame .subsidiary", function (e) {
			e.stopPropagation();
			e.preventDefault();
			var $this = $(this);
			if ($this.parent().hasClass("full-frame")) $this.find(".percent").addClass("clear");
		});

		$(document).on("mouseleave", ".empty-frame .subsidiary", function (e) {
			var $this = $(this);
			$this.find(".percent").removeClass("clear");
		});

		$(document).on("click", ".empty-frame .subsidiary .percent.clear", function (e) {
			var $this = $(this);
			e.stopPropagation();
			$(".timeline").timeline("clearItem", $this);
		});

		$(document).on("click", ".timeline .anim-controls .play", function (e) {
			$(".anim-zone").animZone("animationPlay");
			$(this).addClass("hidden").next().removeClass("hidden");
		});
		$(document).on("click", ".timeline  .anim-controls  .pause", function (e) {
			$(".anim-zone").animZone("animationPause");
			$(this).addClass("hidden").next().removeClass("hidden");
		});
		$(document).on("click", ".timeline .anim-controls  .stop", function (e) {

			$(".anim-zone").animZone("animationStop");
		});
		$(document).on("click", ".timeline .anim-controls  .resume", function (e) {
			$(".anim-zone").animZone("animationResume");
			$(this).addClass("hidden").prev().removeClass("hidden");
		});
	}

	module.exports = pluginEvents;

/***/ })
/******/ ]);
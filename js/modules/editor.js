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
		    Editor = __webpack_require__(9),
		    pluginEvents = __webpack_require__(11);

		new Plugin("editor", Editor, pluginEvents);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var template = __webpack_require__(10);
	var editor;

	var Editor = function () {
		function Editor() {
			_classCallCheck(this, Editor);

			var ace = window.ace;
			var id = this._$el.attr("id");
			editor = ace.edit(id);
			editor.$blockScrolling = Infinity;
			editor.setTheme("ace/theme/monokai");
			editor.getSession().setMode("ace/mode/css");
			var that = this;
			editor.on("blur", function () {
				that.parsingToObj();
			});
		}

		_createClass(Editor, [{
			key: "setValue",
			value: function setValue(value) {
				editor.setValue(value, 1);
			}
		}, {
			key: "getValue",
			value: function getValue() {
				return editor.getValue();
			}
		}, {
			key: "parsingToObj",
			value: function parsingToObj(str) {
				var props = [];
				var rez = {};
				var cssNotParse = [];
				var simple = "";

				var anim = "";
				var css = "";
				var cssParsed = {};
				var animProps = "";
				var animParsed = {};
				console.log(this);
				var className = /\.\w+/.exec(this.getValue())[0].replace(/\./, "");
				anim = /(?:.+){([^\}]*)}/.exec(this.getValue())[0];
				css = this.getValue().match(/(\d+%)\s+{([\s\w:;().,]+)}/g);

				animProps = /{([\s\w:;()-.,]+)[^}\s]/.exec(anim)[0].replace(/[{\s]+/, "").split(";");

				for (var k = 0; k < animProps.length - 1; k++) {
					animParsed[$.trim(animProps[k].split(":")[0])] = $.trim(animProps[k].split(":")[1]);
				}

				for (var i = 0; i < css.length; i++) {
					var props = {};
					var values = css[i].match(/[^%{\s\d]([\s\w:;().,]+)[^}]/);
					if (!values) {
						values = "";
						cssNotParse[i] = values;
					} else {
						cssNotParse[i] = values[0];
					}

					simple = cssNotParse[i].split(";");

					for (var j = 0; j < simple.length - 1; j++) {
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
		}]);

		return Editor;
	}();

	module.exports = Editor;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(7)("\n\t<div style=\"color: white; font-size: 2em;\">Testing</div>\n");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	function pluginEvents(root, $, name) {
		// $(document).on("click", ".css-block .header", function(){
		// 	$("#editor").editor("parsingToObj");
		// });
	}

	module.exports = pluginEvents;

/***/ })
/******/ ]);
let app = require("./app"),
	modules = require("./var/modules"),
	$ = modules.requireModule("jquery");


let PrivateProps = class {
	constructor (){
		this.weakMaps = Object.create(null);
	}

	["set"] (obj, propName, value) {
		let weakMap = this.weakMaps[propName] || (this.weakMaps[propName] = new WeakMap());
		weakMap.set(obj, value);
		return this;
	}

	setAll (obj, props) {
		for(let propName in props){
			if(props.hasOwnProperty(propName)){
				this.set(obj, propName, props[propName]);
			}
		}
	}

	["get"] (obj, propName) {
		let weakMap = this.weakMaps[propName];
		if(weakMap){
			return weakMap.get(obj);
		}
	}
};



let Plugin = function(){
	let uid = 0;
	let root = window;
	let privateProps =  new PrivateProps();

	let componentMixin = {
		getPluginName: function () {
			return this.constructor.pluginName;
		},
		getElement: function(){
			return this._$el;
		},
		getUID: function(){
			return this._uid || (this._uid = this.getPluginName() + ++uid);
		}
	};

	let createPlugin = function (obj) {

		let defaultDestructor = function () {
			this.getElement().removeData(obj.name);
		};

		return function (methodName, propName) {
			if(privateProps.get(obj, "isInit")){
				let initArgs, isGetMethod, pluginData,
					workResult = null,
					args = null,
					$ = obj.$;

				initArgs = $.type(methodName) === "object" ? methodName : {};
				
				if ((methodName === "get" || methodName === "set") && $.type(propName) === "string") {
					methodName += propName.substr(0, 1).toUpperCase() + propName.substr(1);
					[,, ...args] = arguments;
				} else {
					[, ...args] = arguments;
				}

				isGetMethod = $.type(methodName) === "string" && methodName.search(/^get/) === 0;

				$.each(this, function() {
					var $this;
					$this = $(this);
					pluginData = $this.data(obj.name);

					if (!pluginData) {
						let Component = obj.Component;
						pluginData = Object.create(Component.prototype);
						pluginData.$ = $;
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
			}else{
				root.console.error(`The module '${obj.name}' has not been initialized.`);
				return this;
			}
		};
	};

	class Plugin {
		constructor(name, Component, events) {
			name = "" + name;
			Component.pluginName = name;
			let componentProto = Component.prototype;

			for(let key in componentMixin){
				if(componentMixin.hasOwnProperty(key) && !(key in componentProto)){
					componentProto[key] = componentMixin[key];
				}
			}

			privateProps.setAll(this, {
				plugin: createPlugin(this),
				name,
				events,
				Component
			});

			this._init();
		}

		noConflict () {
			this.$.fn[this.name] = privateProps.get(this, "oldPlugin");
		}

		get name(){
			return privateProps.get(this, "name");
		}

		get Component(){
			return privateProps.get(this, "Component");
		}

		get events(){
			return privateProps.get(this, "events");
		}

		get plugin(){
			return privateProps.get(this, "plugin");
		}

		_init(){
			if(!privateProps.get(this, "isInit")){
				let {name, Component, events, plugin} = this;
				let oldPlugin = $.fn[name];
				this.$ = $;

				$.fn[name] = plugin;
				$.fn[name]._constructor = Component;
				events(root, $, Component, name);

				modules.defineModule(name, plugin);

				privateProps.setAll(this, {
					isInit: true,
					oldPlugin
				});
				return plugin;
			}
		}
	}

	return Plugin;
}();



module.exports = {
	PrivateProps,
	Plugin
};
const root = window;
let initialized = false,
	constants = require("./var/constants"),
	modules = require("./var/modules");


function init(callback) {
	if(!initialized) {
		function complete($) {
			initialized = true;
			modules.defineModule("jquery", $);
			if(typeof callback == "function"){
				callback();
			}
		}

		if (typeof root.define === "function" && root.define.amd) {
			//AMD
			root.define(["jquery"], complete);
		}else {
			//Standard
			complete(root.jQuery);
		}
	}
}


module.exports = {
	init
};
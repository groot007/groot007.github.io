require("../../app").init(function () {
	let Plugin = require("../../common").Plugin,
		Inputs = require("./Inputs"),
		pluginEvents = require("./events");

	new Plugin("inputs",  Inputs, pluginEvents);
});
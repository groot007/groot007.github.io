require("../../app").init(function () {
	let Plugin = require("../../common").Plugin,
		AnimZone = require("./AnimZone"),
		pluginEvents = require("./events");

	new Plugin("animZone",  AnimZone, pluginEvents);
});
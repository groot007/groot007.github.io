require("../../app").init(function () {
	let Plugin = require("../../common").Plugin,
		Timeline = require("./Timeline"),
		pluginEvents = require("./events");

	new Plugin("timeline",  Timeline, pluginEvents);
});
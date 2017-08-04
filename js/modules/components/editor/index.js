require("../../app").init(function () {
	let Plugin = require("../../common").Plugin,
		Editor= require("./Editor"),
		pluginEvents = require("./events");

	new Plugin("editor",  Editor, pluginEvents);
});
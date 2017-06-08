const register = Object.create(null);


function defineModule(name, val) {
	if(register[name] === void 0){
		register[name] = val;
	} else {
		console.error("Re-connect module " + name);
	}
}


function requireModule(name) {
	if(register[name] !== void 0){
		return register[name];
	}
	throw Error("Undefined module " + name);
}


module.exports = {
	defineModule,
	requireModule
}
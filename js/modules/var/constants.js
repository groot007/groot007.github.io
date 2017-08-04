const register = Object.create(null);


function set(name, val) {
	if(register[name] === void 0){
		register[name] = val;
	}
}


function get(name) {
	if(register[name] !== void 0){
		return register[name];
	}
	throw Error("Undefined constant " + name);
}


module.exports = {
	get,
	set
}
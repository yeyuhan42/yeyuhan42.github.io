define(function(require,exports,module){
	exports.getStyle=function(obj,sName){
		return (obj.currentStyle||getComputedStyle(obj,false))[sName];
	}
});
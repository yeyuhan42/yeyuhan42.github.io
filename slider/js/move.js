'use strict'

define(function(require,exports,module){
	var T=require('tween'),
	    G=require('getStyle');

	exports.startMove=function(obj,json,options){
		options=options||{};
		options.duration=options.duration||'700';
		options.easing=options.easing||T.Tween.Bounce.easeOut;
		var start={};
		var dis={};

		for(var name in json){
			start[name]=parseFloat(G.getStyle(obj,name));
			if(isNaN(start[name])){
				start[name]=1;
			}
			dis[name]=json[name]-start[name];
		}

		var count=Math.floor(options.duration/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			for(var name in json){
				
				var cur=options.easing(n*options.duration/count,start[name],dis[name],options.duration);
				if(name=='opacity'){
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';
				}else{
					obj.style[name]=cur+'px';
				}
				if(n==count){
					clearInterval(obj.timer);
					options.complete&&options.complete();
				}
			}
		},30);
	}

});









































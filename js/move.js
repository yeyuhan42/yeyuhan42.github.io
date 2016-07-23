// JavaScript Document
'use strict'
//随机数
function rnd(m,n){
	return parseInt(Math.random()*(n-m)+m);
}
//弧度转角度
function a2d(n){
	return n*180/Math.PI;
}
//角度转弧度
function d2a(n){
	return n*Math.PI/180;
}

function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}

function startMove(obj,json,options){
	options=options||{};
	options.duration=options.duration||'700';
	options.easing=options.easing||'ease-out';

	var start={};
	var dis={};
	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			start[name]=1;
		}
		dis[name]=json[name]-start[name];	
	}	
	
	var n=0;
	var count=Math.floor(options.duration/30);
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			
			if(name=='opacity'){
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';	
			}else{
				obj.style[name]=cur+'px';	
			}
		}
		
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();	
		}
	},30);
}
































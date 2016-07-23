window.onload=function(){	
	//style1('head-r','a','active');
	style2('begin','onmouseover','begin');
	style2('begin','onmouseout','');

	var oHead=document.getElementById('header');
	var oBack=document.getElementById('back');
	var bOk=false;

	window.onscroll=function(){
		//顶部菜单
		var sT=document.documentElement.scrollTop||document.body.scrollTop;
		//document.title=sT;
		if(sT>50){
			startMove(oHead,{top:0,opacity:1},{duration:1200});		
		}else{
			startMove(oHead,{top:-50,opacity:0},{duration:1200});
		}

		//#box显示
		var oApus=document.getElementById('apus');
		var oApus1=document.getElementById('apus1');
		if(sT>280){
			oApus.style.display='block';
			startMove(oApus,{opacity:1},{duration:1200});
			if(sT>400){
				oApus1.style.display='block';
				startMove(oApus,{top:60,opacity:0.8},{duration:300});
				startMove(oApus1,{top:340,opacity:0.8},{duration:2400});
			}else{
				oApus1.style.display='none';
				startMove(oApus,{opacity:0},{duration:2400});
			}
		}else{
			oApus.style.display='none';
			startMove(oApus,{top:200,opacity:0},{duration:2400});
		}
		
		//回到顶部
		if(bOk){
			clearInterval(oBack.timer);
		}
		bOk=true;

		if(sT>100){
			oBack.style.display='block';
		}else{
			oBack.style.display='none';
		}

		oBack.onclick=function(){
			var start=document.documentElement.scrollTop||document.body.scrollTop;
			var iTarget=0;
			var dis=iTarget-start;
			var count=Math.floor(3000/30);
			var n=0;

			clearInterval(oBack.timer);
			oBack.timer=setInterval(function(){
				n++;
				var a=1-n/count;
				var cur=start+dis*(1-Math.pow(a,3));
				document.documentElement.scrollTop=document.body.scrollTop=cur;
				bOk=false;

				if(n==count){
					clearInterval(oBack.timer);
				}
			},30);
		};
		
	};
	//welcome
	(function(){
		var timer1=null;
		var oHead_l=document.getElementById('head-l');
		var str='welcome to my personal web';
		for(var i=0;i<str.length;i++){
			var oS=document.createElement('span');
			oS.innerHTML=str.charAt(i);
			oHead_l.appendChild(oS);
			oS.style.opacity=0;
		}
		var aSpan=oHead_l.children;
		var i=0;
		timer1=setInterval(function(){
			startMove(aSpan[i],{opacity:1});
			i++;
			if(i==aSpan.length){
				clearTimeout(timer1);
			}
		},50);
	})();
	    
	//顶部导航菜单
	var oHeader_r=document.getElementById('head-r');
	var aHeader_li=oHeader_r.children;
	
	for(var i=0;i<aHeader_li.length;i++){
		aHeader_li[i].onmouseover=function(){
			var oHeader_s=this.getElementsByTagName('span')[0];
			startMove(oHeader_s,{top:0},{duration:500});
		};
		aHeader_li[i].onmouseout=function(){
			var oHeader_s=this.getElementsByTagName('span')[0];
			startMove(oHeader_s,{top:-48},{duration:500});
		};
		
	}

	//nav运动
	var oNav=document.getElementById('nav');
	oNav.onmouseover=function(){
		startMove(oNav,{left:0},{duration:1000});
	};
	oNav.onmouseout=function(){
		startMove(oNav,{left:-100},{duration:1000});
	};

	var oNav_l=document.getElementById('nav-ul');
	var aNav_li=oNav_l.children;
	for(var i=0;i<aNav_li.length;i++){
		aNav_li[i].onmouseover=function(){
			var oDiv=this.getElementsByTagName('div')[0];
			oDiv.style.display='block';
		};
		aNav_li[i].onmouseout=function(){
			var oDiv=this.getElementsByTagName('div')[0];
			oDiv.style.display='none';
		};
	}


};
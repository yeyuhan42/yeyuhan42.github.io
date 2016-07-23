'use strict'

window.onload=function(){
	var oSearch_l=document.getElementById('search-l');
	var oOptions_text=document.getElementById('options-text');
	var oOPtions_ul=document.getElementById('options-ul');
	var aOptions_Li=oOPtions_ul.children;

	oSearch_l.onmouseover=function(){
		oOPtions_ul.style.display='block';
	};
	oSearch_l.onmouseout=function(){
		oOPtions_ul.style.display='none';
	};

	for(var i=0;i<aOptions_Li.length;i++){ 
		aOptions_Li[i].index=i;
		aOptions_Li[i].onmouseover=function(){
			for(var i=0;i<aOptions_Li.length;i++){
				aOptions_Li[i].className='';
			}
			this.className='on';
		};
		aOptions_Li[i].onclick=function(){
			var oOptions_a=this.children[0];
			oOptions_text.innerHTML=oOptions_a.innerHTML;
			oOPtions_ul.style.display='none';
		};
	}
	//个人
	var oContent_ul=document.getElementById('content-ul');
	var aContent_li=oContent_ul.children;
	for(var i=0;i<aContent_li.length;i++){
		aContent_li[i].index=i;
		aContent_li[i].onclick=function(){
			var iNow=this.index;
			var aContent_a1=this.children[0];
			var aContent_a2=this.children[1];
			for(var i=0;i<aContent_li.length;i++){
				aContent_li[i].className='';
				aContent_li[i].children[0].className='';
				aContent_li[i].children[1].className='content-span'+(i+1);
			};
			this.className='content-li-on';
			aContent_a1.className='content-a-on';
			aContent_a2.className='content-span'+(iNow+1)+'-1';
		};
	}

	//新浪产品
	var oProducts_ul=document.getElementById('products-ul');
	var aProducts_li=oProducts_ul.children;
	
	for(var i=0;i<aProducts_li.length;i++){
		aProducts_li[i].index=i;
		aProducts_li[i].onmouseover=function(){
			var iNow=this.index;
			var oProducts_a1=this.children[0];
			oProducts_a1.onmouseover=function(){
				this.className='pro-img pro-img'+(iNow+1)+'-1';
			};
			oProducts_a1.onmouseout=function(){
				this.className='pro-img pro-img'+(iNow+1);
			};
		};
	}
    //content-r nav-bottom
    var oOl=document.getElementById('content-r-ol');
    var aLi=oOl.children;
    var oNav_bottom=document.getElementById('nav-bottom');
	var oContent_r_b=document.getElementById('content-r-b');
	var aContent_r_b_li=oContent_r_b.children;

    //计算oNav_bottom长度
    function distance(obj,num){
        var oS=0;
        for(var i=0;i<num;i++){
            oS+=obj[i].offsetWidth;
        }
        return oS;
    }
    for(var i=0;i<aLi.length;i++){
        (function(index){
            aLi[i].onmouseover=function(){
            	for(var i=0;i<aLi.length;i++){
            		aContent_r_b_li[i].className='';
            	}
                var dis=distance(aLi,index);
                //alert(dis);
                startMove(oNav_bottom,{left:dis,width:this.offsetWidth},{duration:200});
                aContent_r_b_li[index].className='show';
            };
        })(i);
    }

    //聚光灯
    var oFocus=document.getElementById('focus');
	var aP=oFocus.children;

	for(var i=0;i<aP.length;i++){
		aP[i].onmouseover=function(){
			var oImg=this.children[0].children[0];
			//alert(oImg);
			for(var i=0;i<aP.length;i++){
				var aImg=aP[i].children[0].children[0];
				aP[i].style.opacity='0.3';
				aP[i].style.filter='opacity:30';
				aImg.className='';
			}
			this.style.opacity='1';
			this.style.filter='opacity:100';
			oImg.className='active';
		};
	}
	oFocus.onmouseout=function(){
		for(var i=0;i<aP.length;i++){
			var aImg=aP[i].children[0].children[0];
			aP[i].style.opacity='1';
			aP[i].style.filter='opacity:100';
			aImg.className='';
		}
	};

	//3D图片展示
	(function(){
		var oPosi=document.getElementById('posi');
		var oIndex_posi=document.getElementById('index-posi');
		var aImg=oIndex_posi.getElementsByTagName('a');
		var aSpan=oPosi.getElementsByTagName('span');
		oIndex_posi.style.width=aImg[0].offsetWidth*aImg.length+'px';
		var disC=oPosi.offsetWidth/2;	
		oPosi.style.display='block';	
		oIndex_posi.onmousedown=function(ev){
			var oEvent=ev||event;
			var disX=oEvent.clientX-oIndex_posi.offsetLeft;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var l=oEvent.clientX-disX;

				//限制oIndex_posi左右运动范围
				//aImg[0].offsetLeft---第一张图片的offsetLeft为0
				if(l>disC-(aImg[0].offsetWidth/2+aImg[0].offsetLeft)){
					l=disC-aImg[0].offsetWidth/2+aImg[0].offsetLeft;
				}
				//aImg[aImg.length-1].offsetLeft---最后一张图片的offsetLeft
				//最后一张图片中心到可视区最左端距离
				if(l<disC-(aImg[aImg.length-1].offsetWidth/2+aImg[aImg.length-1].offsetLeft)){
					l=disC-(aImg[aImg.length-1].offsetWidth/2+aImg[aImg.length-1].offsetLeft);
				}

				oIndex_posi.style.left=l+'px';
				setSize();
			};
			document.onmouseup=function(ev){
				document.onmousemove=null;
				document.onmouseup=null;
				oIndex_posi.releaseCapture&&oIndex_posi.releaseCapture();
			};
			oIndex_posi.setCapture&&oIndex_posi.setCapture();
			return false;
		}

		//3D图片不同位置的不同尺寸
		function setSize(){
			for(var i=0;i<aImg.length;i++){
				var l=Math.abs(disC-(aImg[i].offsetLeft+oIndex_posi.offsetLeft+aImg[i].offsetWidth/2));		
				var scale=1-l/500;
				if(scale<0.5){
					scale=0.5;
				}
				aImg[i].style.width=scale*180+'px';
				aImg[i].style.height=scale*320+'px';
				aImg[i].style.marginTop=-aImg[i].offsetHeight/2+45+'px';
				aImg[i].style.marginLeft=-aImg[i].offsetWidth/2+80+'px';
				aImg[i].style.marginRight=-aImg[i].offsetWidth/2+80+'px';
				aImg[i].style.zIndex=scale*1000;
				aImg[i].style.opacity=1-l/500;
				aImg[i].style.filter='alpha(opacity:'+(1-l/500)*100+')';
			}
		}
		setSize();
	})();

	//button选项卡
	//button1屏保
	var oC=document.getElementById('canvas1');
	var gd=oC.getContext('2d');

	oC.width=665;
	oC.height=832;

	var N=5;
	//设置点的信息：位置、大小、速度
	var aPoint=[];
	for(var i=0;i<N;i++){
		aPoint[i]={
			w:5,
			h:5,
			x:rnd(0,oC.width),
			y:rnd(0,oC.height),
			speedX:rnd(-10,10),
			speedY:rnd(-10,10)
		};
	}
	var oldPoint=[];//存放每次五个点的信息，即[[{点1},{点2},...],[],[],[],...]
	//放置各点，让各个点动起来，开定时器，改变x,y
	setInterval(function(){
		gd.clearRect(0,0,oC.width,oC.height);

		for(var i=0;i<N;i++){
			drawPoint(aPoint[i]);

			aPoint[i].x+=aPoint[i].speedX;
			aPoint[i].y+=aPoint[i].speedY;

			if(aPoint[i].x<0 || aPoint[i].x>oC.width){
				aPoint[i].speedX*=-1;
			}
			if(aPoint[i].y<0 || aPoint[i].y>oC.height){
				aPoint[i].speedY*=-1;
			}
		}

		//连线
		gd.beginPath();
		gd.moveTo(aPoint[0].x,aPoint[0].y);
		for(var i=1;i<N;i++){
			gd.lineTo(aPoint[i].x,aPoint[i].y);
		}
		gd.closePath();
		gd.strokeStyle="#f0f";
		gd.stroke();

		//存路径，每次N个点运动的坐标
		var arr=[];
		for(var i=0;i<N;i++){
			arr.push({x:aPoint[i].x,y:aPoint[i].y});
		}
		oldPoint.push(arr);

		while(oldPoint.length>20){
			oldPoint.shift();
		}

		//绘制影子
		for(var i=0;i<oldPoint.length;i++){//oldPoint.length个影子
			gd.beginPath();
			gd.moveTo(oldPoint[i][0].x,oldPoint[i][0].y);
			for(var j=1;j<N;j++){//起点与各自对应的剩余(N-1)个点连接
				gd.lineTo(oldPoint[i][j].x,oldPoint[i][j].y); 
			}
			gd.closePath();
			var opacity=i/oldPoint.length;

			gd.strokeStyle="rgba(255,0,0,"+opacity+")";
			gd.stroke();
		}

	},30);

	function drawPoint(p){
		gd.fillStyle="#fff";
		gd.fillRect(p.x,p.y,p.w,p.h);
		gd.strokeRect(p.x,p.y,p.w,p.h);
	}

	//图片过滤
	var oSpecial_Ul=document.getElementById('special_ul');
	var aSpecial_Li=oSpecial_Ul.children;

	for(var i=0;i<aSpecial_Li.length;i++){
		aSpecial_Li[i].onmouseover=function(){
			for(var i=0;i<aSpecial_Li.length;i++){
				aSpecial_Li[i].style.webkitFilter="blur(2px) grayscale(1)";
				aSpecial_Li[i].style.opacity="0.7";
			}
			this.style.webkitFilter="";
			this.style.opacity="1";
		};
	}
	oSpecial_Ul.onmouseout=function(){
		for(var i=0;i<aSpecial_Li.length;i++){
			aSpecial_Li[i].style.webkitFilter="";
			aSpecial_Li[i].style.opacity="1";
		}
	};

	//图片层叠
	var Stack0=document.getElementById('image_stack0');
	var oStack0_img=Stack0.children[0];
	var Stack1=document.getElementById('image_stack1');
	var aStack1_img=Stack1.children;
	var Stack2=document.getElementById('image_stack2');
	var aStack2_img=Stack2.children;

	Stack0.onmouseover=function(){
		oStack0_img.style.transform="scale(1.2,1.2)";
	};
	Stack0.onmouseout=function(){
		oStack0_img.style.transform="scale(1,1)";
	};
	Stack1.onmouseover=function(){
		aStack1_img[0].style.transform="translate(50px,0) rotate(20deg)";
		aStack1_img[2].style.transform="translate(-50px,0) rotate(-20deg)";
	};
	Stack1.onmouseout=function(){
		aStack1_img[0].style.transform="translate(0,0) rotate(0) ";
		aStack1_img[2].style.transform="translate(0,0) rotate(0) ";
	};
	Stack2.onmouseover=function(){
		aStack2_img[0].style.transform="translateZ(-50px)";
		aStack2_img[2].style.transform="translateZ(50px)";
	};
	Stack2.onmouseout=function(){
		aStack2_img[0].style.transform="translateZ(-1px)";
		aStack2_img[2].style.transform="translateZ(1px)";
	};

	//button选项卡
	var oButton_li=document.getElementById('button_li');
	var aButton_div=oButton_li.children;
	var oMove_ol=document.getElementById('move-ol');
	var aMove_li=oMove_ol.children;

	for(var i=0;i<aMove_li.length;i++){
		aButton_div[i].index=i;
		aButton_div[i].onmouseover=function(){
			for(var i=0;i<aMove_li.length;i++){
				aMove_li[i].style.display="none";
			}
			aMove_li[this.index].style.display="block";
		};
		
	}


};































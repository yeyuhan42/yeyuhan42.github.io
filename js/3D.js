window.onload=function(){
	//3D图片展示
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
	
	
};
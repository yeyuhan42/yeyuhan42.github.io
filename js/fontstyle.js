'use strict'

function style1(par,chi,sty1){
	var oPar=document.getElementById(par);
	var aChi=document.getElementsByTagName(chi);

	for(var i=0;i<aChi.length;i++){
		aChi[i].onmouseover=function(){
			for(var i=0;i<aChi.length;i++){
				aChi[i].className='';
			}
			this.className=sty1;
		};
	}
}

function style2(obj,opera,style1){
	var oSty=document.getElementById(obj);
	oSty[opera]=function(){
		oSty.className=style1;
	};
}





















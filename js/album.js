$(function(){
	$(".content") .hover(function(){
		$(this) .children(".txt").stop() .animate({height:"360px"},200);
        $(this) .parent(".teacherPic") .css({"background":"url(images/"+($(this).attr('id'))+".jpg) no-repeat","-webkit-transition":"all 0.8s ease 0.2s","transition":"all 0.8s ease 0.2s"});
/*			$(this) .parent(".teacherPic") .css("background","url(images/"+($(this).attr('id'))+".jpg) no-repeat");*/
		$(this) .find(".txt h3").stop() .animate({paddingTop:"130"},550);
		$(this) .find(".txt p").stop() .show();
},function(){
		$(this) .children(".txt").stop() .animate({height:"100px"},200);
		$(this) .find(".txt h3").stop().animate({paddingTop:"0px"},550);
		$(this) .find(".txt p").stop() .hide();
	})
});
window.onload=function(){
    //图片翻页
    var oPaging=document.getElementById('paging');
    var oNext=document.querySelector('#next');
    var oPrev=document.querySelector('#prev');
    var oFront=document.querySelector('#front');       
    var oBack=document.querySelector('#back');
    var iNow=0;

    oPaging.onclick=function(){
        iNow++;
        oPrev.style.transition="0.5s all ease";
        oPrev.style.transform="perspective(800px) rotateY(-180deg)";
    };

    oPaging.addEventListener('transitionend',function(){
        oPrev.style.transition="none";
        oPrev.style.transform="perspective(800px) rotateY(0deg)";
        oPaging.style.backgroundImage="url(images/"+(iNow%3)+".jpg)";
        oFront.style.backgroundImage="url(images/"+(iNow%3)+".jpg)";
        oBack.style.backgroundImage="url(images/"+(iNow+1)%3+".jpg)";
        oNext.style.backgroundImage="url(images/"+(iNow+1)%3+".jpg)";
    },false);

    //爆炸
    var oBomb=document.querySelector('#bomb');
    var C=7,R=4;
    var w=oBomb.offsetWidth/C;
    var h=oBomb.offsetHeight/R;
    var iNow1=0;

    for(var c=0;c<C;c++){
        for(var r=0;r<R;r++){
            var oSpan=document.createElement('span');
            oSpan.innerHTML="<i class='front'></i><i class='back'></i>";
            //大小
            oSpan.style.width=w+'px';
            oSpan.style.height=h+'px';
            //定位
            oSpan.style.left=c*w+'px';
            oSpan.style.top=r*h+'px';
            //背景图
            var aI=oSpan.children;
            aI[0].style.backgroundPosition=(-c*w)+"px "+(-r*h)+"px";
            aI[1].style.backgroundPosition=(-c*w)+"px "+(-r*h)+"px";
            oSpan.C=c;
            oSpan.R=r;

            oBomb.appendChild(oSpan);
        }
    }

    var aSpan=oBomb.children;
    oBomb.onclick=function(){
        iNow1++;
        for(var i=0;i<aSpan.length;i++){
            aSpan[i].style.transition="1s all ease "+(aSpan[i].R+aSpan[i].C)*100+"ms";
            aSpan[i].style.transform="perspective(800px) rotateY(180deg)";
            //document.title=iNow1;
        }
    };

    aSpan[aSpan.length-1].addEventListener('transitionend',function(){
        for (var i = 0; i < aSpan.length; i++) {
            aSpan[i].style.transition='none';
            aSpan[i].style.transform="perspective(800px) rotateY(0deg)";

            aSpan[i].children[0].style.backgroundImage='url(images/'+iNow1%3+'.jpg)';
            aSpan[i].children[1].style.backgroundImage='url(images/'+(iNow1+1)%3+'.jpg)';
        }
    },false);

};
$(function(){
	
})
window.onload=function ()
{
	var shopFlo=document.getElementById('shopFlo');
	var aSpan=shopFlo.getElementsByTagName('span');
	var aImg=aSpan.getElementsByTagName('img');
	var aB=document.getElementById('active');
	var i=0;
	//布局转换
	for(i=0;i<aSpan.length;i++)
	{
		aSpan[i].innerHTML=aSpan[i].offsetLeft+'px';
		aSpan[i].style.left=aSpan[i].offsetLeft+'px';
		aSpan[i].style.top=aSpan[i].offsetTop+'px';
		
		//aSpan[i].style.position='absolute';
	}
	for(i=0;i<aSpan.length;i++)
	{
		aSpan[i].style.position='absolute';
		aSpan[i].style.margin='0';		
	}
	//加事件
	for(i=0;i<aImg.length;i++)
	{
		
		aImg[i].onmouseover=function(){
			startMove(this, {width:400, height:280, marginLeft:-10, marginTop:-10});
		};
		
		aImg[i].onmouseout=function(){
			startMove(this, {width:380, height:260, marginLeft:0, marginTop:0});
		};
	}
}















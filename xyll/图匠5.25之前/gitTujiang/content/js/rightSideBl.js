var fromBox='快速预约'+
			'<form id="onLine" action="" method="">'+
				'<li>'+
					'<p>电话</p>'+
					'<input type="text" name="" id="" value="" placeholder="您的手机"/>'+
				'</li>'+
				'<li>'+
					'<p>姓名</p>'+
					'<input type="text" name="" id="" value="" placeholder="您的称呼"/>'+
				'</li>'+
				'<li>'+
					'<p>需求</p>'+
					'<input type="text" name="" id="" value="" placeholder="您的需求"/>'+
				'</li>'+
				'<input class="sub" type="submit" value="免费预约"/>'+
				'<b>专业交易顾问1V1全程服务</b>'+
			'</form>'
			
var hotNeedBox=	'<li>'+
					'<img src="img/hotNeed.png"/>'+
				'</li>'+
				'<p>三亚雅砻江摄影</p>'+
				'<span id="">'+
					'<b>投标中</b>'+
					'<strong>4天14小时5分钟</strong>'+
				'</span>'
				
var facilit='<a href="">'+
				'<img src="img/headPort.png"/>'+
			'</a>'+
			'<h4>小轩摄影中心</h4>'+
			'<p>个人|苏州</p>'+
			'<b>五星级</b>'		
$(function(){
	$(".fromBox").html(fromBox);
	$(".hotNeedBox").html(hotNeedBox);
	$(".facilit").html(facilit);
})
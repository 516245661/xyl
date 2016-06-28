
var leftNav='<ul class="info">图匠资讯</ul>'+
				'<ul class="title1">'+
					
					'<a href="javascript:;">新手指南</a>'+
					'<li>雇主入门</li>'+
					'<li>服务商入门</li>'+
					'<li>规则中心</li>'+
				'</ul>'+
				'<ul class="title">'+
					
					'<a href="javascript:;">我是雇主</a>'+
					'<li>经验分享</li>'+
					'<li>图匠测评</li>'+
				'</ul>'+
				'<ul class="title">'+
					
					'<a href="javascript:;">我是服务商</a>'+
					'<li>开店赚钱</li>'+
					'<li>赚钱利器</li>'+
					'<li>帮助中心</li>'+
					'<li>公告板</li>'+
				'</ul>'+
				'<ul class="title">'+
					
					'<a href="javascript:;">交易保障</a>'+
					'<li>担保交易</li>'+
					'<li>争议仲裁</li>'+
					'<li>雇主防骗</li>'+
					'<li>服务商防骗</li>'+
				'</ul>'+
				'<ul class="title">'+
					
					'<a href="javascript:;">新闻中心</a>'+
					'<li>行业新闻</li>'+
					'<li>图匠新闻</li>'+
				'</ul>'

$(function(){
	$(".leftNav").html(leftNav);	
	$(".leftNav ul > a").click(function(){
		var aLi=$(this).siblings("li");
		aLi.slideToggle(500);
	})
})

$("ul.name div>li").hover(function(){
	$(this).find("ul.main").stop().fadeIn(500);
},function(){
	$(this).find("ul.main").stop().fadeOut(500);
});
$("ul.requirements>li").hover(function(){
	$(this).find("ul.main").stop().fadeIn(500);
},function(){
	$(this).find("ul.main").stop().fadeOut(500);
});
$("ul.name ul.main li.detail").click(function(){
	window.location.href="../index.html#modules/iamHeadwaiter/myHeadwa/myHeadwaCenter.html"
})
$("ul.resources").css("marginLeft",-1*$("ul.resources>li").width());
var timer=null;
timer=setInterval(function(){
	$("ul.resources").animate({marginLeft:0},1000,function(){
		$("ul.resources>li:last-child").insertBefore("ul.resources>li:first-child");
		$("ul.resources").css("marginLeft",-1*$("ul.resources>li").width());
	});
},10000);
$("ul.resources>li p.left").click(function(){
	$("ul.resources").stop().animate({marginLeft:-2*$("ul.resources>li").width()},1000,function(){
		$("ul.resources>li:first-child").insertAfter("ul.resources>li:last-child");
		$("ul.resources").css("marginLeft",-1*$("ul.resources>li").width());
	});	
});
$("ul.resources>li p.right").click(function(){
	$("ul.resources").stop().animate({marginLeft:0*$("ul.resources>li").width()},1000,function(){
		$("ul.resources>li:last-child").insertBefore("ul.resources>li:first-child");
		$("ul.resources").css("marginLeft",-1*$("ul.resources>li").width());
	});	
});
//设置
$(".past li.setUp").click(function(){
	if($HQ.getUrlParams().accounttype==0){
		window.location.href="content/indexPage.html#modules/accountsetJBXX.html?accounttype=0&employerid="+$HQ.getUrlParams().employerid
	}else{
		window.location.href="content/indexPage.html#modules/iamHeadwaiter/myHeadwa/myHeadwaSet.html?accounttype=1&employerid="+$HQ.getUrlParams().employerid
	}
});
//我的消息
$(".past li.info").click(function(){
	if($HQ.getUrlParams().accounttype==0){
		window.location.href="content/indexPage.html#modules/accountCenterSystem.html?accounttype=0&employerid="+$HQ.getUrlParams().employerid
	}else{
		window.location.href="content/indexPage.html#modules/iamHeadwaiter/myHeadwa/accountCenterSystem.html?accounttype=1&employerid="+$HQ.getUrlParams().employerid
	}
})
if($HQ.getUrlParams().accounttype ==null){
	$(".login").css("display","block");
	$(".past").css("display","none");
}else{
	$(".login").css("display","none");
	$(".past").css("display","block");
}

var index = new Vue({
	el: '#body',
	data: {
		thisPerInfo:{},
	},
	created: function() {
		this.findThSerInfo();
	},
	methods: {
		//取地址栏信息
		start: function(){ 
			this.jLocal = $HQ.getUrlParams();
		},
		//查询该服务商信息
		findThSerInfo: function() {
			var url = "uService/findServiceByCondition";
			var params = {};
			var self = this;
			params.accountId=$HQ.getUrlParams().employerid;
			
			$HQ.load(url, params, function(data) {
				console.log(data);
				self.$set("thisPerInfo",data.responseMsg[0])
			});	
		},
	}
});
















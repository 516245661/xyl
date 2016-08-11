var sendList = new Vue({
	el: '#sendList',
	data: {
		messageAlls: {},
	},
	created: function() {
		this.findAll();
	},
	ready: function() {},
	methods: {
		//查询所有服务商的信息
		findAll: function() {
			var jLocal = $HQ.getUrlParams();
			var url = "uService/findServiceByCondition";
			var params = {};
			var self = this;
			
			var data="";
			Info=$HQ.load(url, params, data);
			console.log(Info);
			self.$set("messageAlls", Info.responseMsg);
		},
	}
});	
//轮播
if($("div.bigBox ul").length>5){
	setInterval(function(){
		var ul = $("div.bigBox ul");
		$("div.bigBox").animate({marginLeft:-172-42},1000,function(){
			$("div.bigBox>ul:first-of-type").insertAfter("div.bigBox>ul:last-of-type");
			$("div.bigBox").css("marginLeft","0px");
		});
		for(var i=0;i<6;i++){
			var one = ul.eq(i);
			if(i==1||i==5||i==0){
				one.children("img").animate({width:"162px",height:"162px"},1000);
				one.children("div.info").animate({width:"162px",height:"162px"},1000);
			}else if(i==3){
				one.children("img").animate({width:"212px",height:"212px"},1000);
				one.children("div.info").animate({width:"212px",height:"212px"},1000);
			}else{
				one.children("img").animate({width:"192px",height:"192px"},1000);
				one.children("div.info").animate({width:"192px",height:"192px"},1000);
			}
		}
	},2000);
}
//倒计时
var iMinu="900";
$(".min").html(15+":"+00);
setInterval(function(){
	iMinu=iMinu-1;
	var iTitle=iMinu,
		iMin;
	iMin=parseInt(iTitle/60);
	if(iMin<10&&iMin>0){
		iMin = "0"+iMin;
	}
	var iSec=iTitle%60;
	if(iSec<10&&iSec>0){
		iSec = "0"+iSec;
	}
	if(iMin<=0){
		iMin="00";
	}
	if(iSec<=0){
		iSec="00";
	}
	$(".min").html(iMin+":"+iSec);
},1000)
//# sourceURL=sendList.js
//雇主 公共的 左 侧边栏					
var headNav = '<ul>' +
	'<li class="li_gz"><a href="#">我是服务商</a></li>' +
	'<li><a href="iamHeadwaiter/myHeadwa/myHeadwaShow.html?employerid='+ $HQ.getUrlParams().employerid +'&accounttype='+ $HQ.getUrlParams().accounttype +' ">首页</a></li>' +
	'<li><a href="iamHeadwaiter/myHeadwa/myHeadwaSet.html?employerid='+ $HQ.getUrlParams().employerid +'&accounttype='+ $HQ.getUrlParams().accounttype +'">账号设置</a></li>' +
	'<li><a href="iamHeadwaiter/myHeadwa/accountCenterSystem.html?employerid='+ $HQ.getUrlParams().employerid +'&accounttype='+ $HQ.getUrlParams().accounttype +'">我的消息</a></li>' +
	'<li><a href="#">我的主页</a></li>' +
//	'<li><a href="#">店铺展示</a></li>' +

	'<li class="li_fws"><a href="#">添加作品</a></li>' +
	'</ul>'

$(function() {
	//添加到页面  headNav 的内容
	$(".headNav").html(headNav);

	$(".sideBar ul li").find("a").click(function(e) {
		var clickDom = $(e.target).attr("data-yy")
		$(".sideBar ul li a").removeClass("active");
		$(this).addClass("active");
		$(".headwaiterInfo>div").css("display", "none");
		$(".headwaiterInfo>div").eq(clickDom).css("display", "block");
	});
	$(".caseAdmin>span b:last-child").click(function() {
		$(".headwaiterInfo>div").css("display", "none");
		$(".addCase").css("display", "block");
	})
	$(".caseAdmin p.main b.include").click(function() {
		$(".headwaiterInfo>div").css("display", "none");
		$(".repairCase").css("display", "block");
	})
});
var myMainPage = new Vue({
	el: '.bigBox',
	data: {
		messageAlls: {},
		msgCollects: {},
		jLocal: {}, //存地址栏参数
		commentIfon:{}, //存用户的评价管理
		onOff:true,
		thisSeInfo:{},
		waitMakeMsgs:{},
	},
	created: function() {
		this.start (); //查询地址栏参数 先请求
		this.findWaitMake();
		this.myCollect();
		this.servingInfo(); //查询雇主给服务商的评价
		this.findThsiSeInfo();
	},
	ready: function() {},
	methods: {
		//去地址栏参数
		start: function(){ 
			this.jLocal = $HQ.getUrlParams();
		},
		//查询该服务商信息  	
		findThsiSeInfo: function() {
			var url = "uService/findServiceByCondition";
			var params = {};
			var self = this;
			params.accountId=this.jLocal.employerid;
			$HQ.load(url, params, function(data) {
				self.$set("thisSeInfo", data.responseMsg[0]);
			});	
		},
		//查询订单信息	需要做分页
		findWaitMake: function() {
			var url = "uDemand/findDemandById";
			var params = {};
			var self = this;
			params.accountId = this.jLocal.employerid;
			params.index = 1;
			params.size = 10;
			$HQ.load(url, params, function(data) {
				self.$set("waitMakeMsgs", data.responseMsg);
				
				console.log(self.waitMakeMsgs);
				self.$nextTick(function(){
					for (var i = 0; i < data.responseMsg.length; i++) {
						if (data.responseMsg[i].robState == "-4") {
							data.responseMsg[i].robState = "中止派单"
						} else if (data.responseMsg[i].robState == "-3") {
							data.responseMsg[i].robState = "待付"
						} else if (data.responseMsg[i].robState == "-2") {
							data.responseMsg[i].robState = "返工"
						} else if (data.responseMsg[i].robState == "-1") {
							data.responseMsg[i].robState = "拒单"
						} else if (data.responseMsg[i].robState == "0") {
							data.responseMsg[i].robState = "派单中";
							$(".yesNo").css("display","block");
						} else if (data.responseMsg[i].robState == "1") {
							data.responseMsg[i].robState = "派单完成(服务商待接单)";
						} else if (data.responseMsg[i].robState == "2") {
							data.responseMsg[i].robState = "派单完失败"
						} else if (data.responseMsg[i].robState == "3") {
							data.responseMsg[i].robState = "服务中"
						} else if (data.responseMsg[i].robState == "4") {
							data.responseMsg[i].robState = "待确认验货"
						}else if (data.responseMsg[i].robState == "5") {
							data.responseMsg[i].robState = "交易完成"
						}else if (data.responseMsg[i].robState == "6") {
							data.responseMsg[i].robState = "确认接单"
						}else if (data.responseMsg[i].robState == "7") {
							data.responseMsg[i].robState = "待评价"
						}
					}
				});
			});
		},
		//只用于看雇主发的
		jump: function(e){
			var demandId=$(e.target).attr("demandId");
			window.location.href="../content/indexPage.html#modules/iamHeadwaiter/robSucceed.html?accounttype=1&employerid="+$HQ.getUrlParams().employerid+"&demandId="+demandId
		},
		//接单拒单
		yesNo: function(e) {
			var name=$(e.target).attr("name");
			var demandId=$(e.target).attr("demandId");
			var url = "uDemand/sendOrdersTest";
			var params = {};
			var self = this;
			params.demandId=demandId;
			console.log(this.thisSeInfo.serviceId);
			params.serviceId=this.thisSeInfo.serviceId;
			if(name=="yes"){
				params.robState = 0;
				$HQ.load(url, params, function(data) {
					console.log(data);
					if(data.responseMsg.code == 100){
						window.location.href="../content/indexPage.html#modules/iamHeadwaiter/robSucceed.html?accounttype=1&employerid="+$HQ.getUrlParams().employerid+"&demandId="+demandId
					}
				});	
			}else if(name=="no"){
				params.robState = -1;
				$HQ.load(url, params, function(data) {
					console.log(data);
					if(data.responseMsg.code == 100){
						alert("拒单成功");
					}
				});
			};
		},
		//查询我收藏的作品
		myCollect: function() {
			var url = "uAtt/findAttByCondition";
			var params = {};
			var self = this;
			params.attPersonId = 1;
			params.byAttType = 1;
			$HQ.load(url, params, function(data) {
				self.$set("msgCollects", data.responseMsg);
			});
		},
		//取消关注
		CancelColl: function() {
			var url = "uAtt/deleteAtt";
			var params = {};
			var self = this;
			params.attPersonId = 1;
			params.byAttId = 1;
			$HQ.load(url, params, function(data) {
				console.log(data.responseMsg);
				if (data.responseMsg.code == "100") {
					alert("取消成功")
				}
			});
		},
		//查询雇主给服务商的评价 
		servingInfo: function() {
			var url = 'uComment/findServiceByCondition';
			var self = this;
			var params = {};
			params.empolyerId = this.jLocal.employerid;
			params.commentType = 0;
			$HQ.load(url, params, function(data) {
				self.$set('commentIfon', data.responseMsg)
				console.log(self.commentIfon);
			});
		},
	},
});

//# sourceURL=myHeadwaCenter.js
var login = new Vue({
	el: '#login',
	data: {
		leaveinfo: {}, //存数据		
	},
	created: function() { //创建功能 开始就进行的方法

	},
	methods: {
		//查询表comclassify里的信息					
		updata: function() {
			var self = this;
			var params = {};
			// var url = 'uAccount/doLogin'; //真实的接口
			var url = 'uAccount/doLogin'; //测试接口
			params.accountPwd = $(".password").val();
			params.accountNum = $(".text").val();
			if ($(".password").val() == "" && $(".text").val() == "") {
				$(".text").focus();
				$(".loginBox strong").html("请输入账户和密码");
			} else if ($(".text").val() == "") {
				$(".loginBox strong").html("请输入用户名");
				$(".text").focus();
			} else if ($(".password").val() == "") {
				$(".loginBox strong").html("请输入密码");
				$(".password").focus();
			} else {
				$HQ.load(url, params, function(data) {
					if ('100' == data.responseMsg.code ) {
						if (data.result.accountType == 1) {
							window.location.href = "../indexPage.html#modules/iamHeadwaiter/myHeadwa/myHeadwaShow.html?employerid="+data.result.accountId+"&accounttype=1";                              
						}else if(data.result.accountType == 0){
							window.location.href = "../indexPage.html#modules/accountCenterMyorder.html?accounttype=0&employerid="+data.result.accountId;
						}
					} else {
						alert(data.responseMsg.sub_msg)
					}
				});
			}
		},
	}
});
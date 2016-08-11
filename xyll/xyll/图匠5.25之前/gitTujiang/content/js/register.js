$("#put4").blur(function() {
	var a = $("#put4").val();
	var patrn = /^[1]{1}[0-9]{10}$/;
	if (patrn.test(a)) {
		$(".yesOrNo").html("<b style='color:green'>您输入的手机号码可用</b>")
	} else {
		$(".yesOrNo").html("<b style='color:red'>您输入的手机号码有误</b>")
	}
});
$("#put2").blur(function() {
	var a = $("#put2").val();
	var reg = /^\s+|\s+$/g;
	if (!/^.{6,20}$/.test(a.replace(reg, ""))) {
		$(".password1").html("<b style='color:red'>密码长度要在6-20</b>")
	} else {
		$(".password1").html("<b style='color:green'>密码可用</b>")
	}
})
$("#put3").blur(function() {
	var a = $("#put2").val();
	var b = $("#put3").val();
	var reg = /^\s+|\s+$/g;
	if (a != b || b == "") {
		$(".password2").html("<b style='color:red'>请输入相同的密码</b>")
	} else {
		$(".password2").html("<b style='color:green'>输入的密码相同</b>")
	}
})
$("#put6").click(function() {
	if ($("#put6").is(':checked')) {
		$(".tiaohuan").html("<b style='color:red'></b>");
	}
})

var register = new Vue({
	el: '#basicInfo',
	data: {
		leaveinfo: {}, //存数据		
	},
	created: function() { //创建功能 开始就进行的方法

	},
	methods: {
		//上传信息	
		role: function(e) {
			this.a = $(e.target).val();
		},
		//获取验证码
		sendCode: function() {
			var url = "uAccount/sendInfo"
			var self = this;
			var params = {};
			params.accountNum = $("#put4").val();
			if ($('.yesOrNo b').text() == '您输入的手机号码有误' || $('.yesOrNo b').text() == '') {
				alert('您输入的手机号码有误!')
			} else {
				$HQ.load(url, params, function(data) {
					if (data.responseMsg.code == 206) {
						alert('手机号已注册！')
					} else if (data.responseMsg.code == 100) { //倒计时
						$('#send').css('display', 'none')
						$('#sendTime').css('display', 'block')
						$('#sendTime').css('background','#7B827F')
						$('#sendTime strong').html(120);
						var timer = setInterval(function() {
							var second = $('#sendTime strong').text()
							second -= 1;
							if (second > 0) {
								$('#sendTime strong').html(second);
							} else {
								clearInterval(timer);
								$('#send').show();
								$('#sendTime').hide();
							}
						}, 1000);
					}
				});
			}

		},
		//注册信息
		resgister: function() {
			var url = "uAccount/register"; //修改信息数据  接口			
			var self = this;
			var params = {};
			params.accountPwd = $("#put2").val();
			params.code = $("#put5").val();
			params.accountNum = $("#put4").val();
			params.accountType = $("#selECT").val();
			var b = $("#put2").val();
			var c = $("#put3").val();
			var d = $("#put4").val();
			var e = $("#put5").val();
			var patrn = /^[1]{1}[0-9]{10}$/;
			var reg = /^\s+|\s+$/g;
			// if (!/^.{6,20}$/.test(a.replace(reg, ""))) {
			// $(".userName").html("<b style='color:red'>用户名长度要在6-20位</b>");
			// $("#put1").focus();
			// } 
			if (!/^.{6,20}$/.test(b.replace(reg, ""))) {
				$(".password1").html("<b style='color:red'>密码长度要在6-20</b>");
				$("#put2").focus();
			} else if (b != c || c == "") {
				$(".password2").html("<b style='color:red'>请输入相同的密码</b>");
				$("#put3").focus();
			} else if (!patrn.test(d)) {
				$(".yesOrNo").html("<b style='color:red'>您输入的手机号码有误</b>");
				$("#put4").focus();
			} else if (!$("#put6").is(':checked')) {
				$(".tiaohuan").html("<b style='color:red'>请接受服务条款</b>");
			} else {
				$HQ.load(url, params, function(data) {
					if (data.responseMsg.code == '100') {
						alert("注册成功")
						if (data.result.accountType == 1) {
							window.location.href = "../indexPage.html#modules/iamHeadwaiter/myHeadwa/myHeadwaSet.html?serviceid=" + data.result.accountId + "&accounttype=1";
						} else if (data.result.accountType == 0) {
							window.location.href = "../indexPage.html#modules/accountsetJBXX.html?accounttype=0&employerid=" + data.result.accountId;
						}
					} else {
						alert(data.responseMsg.sub_msg);
					}
				});
			}
		},
	}
});
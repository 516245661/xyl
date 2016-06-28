//雇主 公共的 左 侧边栏
var em_Left_Sidebar = '<ul>'+
						'<!--我的账号-->'+
						'<h4><a href="javascript:;">我的账号</a></h4>'+
						'<!--个人资料-->'+
						'<li><a data-yy=0 class="active" href="javascript:;">基本信息</a></li>'+
						'</ul>'+
						
						'<h4><a href="javascript:;">身份认证</a></h4>'+
						'<ul>'+
						'<li><a data-yy="1" href="javascript:;">实名认证</a></li>'+
						'<li><a data-yy="2" href="javascript:;">银行卡认证</a></li>'+
						'</ul>'+
					'</ul>'
					
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
	$(".headNav").html(headNav)
	//添加到页面 sidebar 的内容
	$(".sidebar").html(em_Left_Sidebar);
	
	$(".sidebar ul>li>a").click(function(e){
		var clickDom=$(e.target).attr("data-yy");
		
		$(".sidebar ul>li>a").removeClass("active");
		$(this).addClass("active");
	
		$(".guzhuInfo>div").css("display","none");
		$(".guzhuInfo>div").eq( clickDom ).css("display","block");
	});
})
var uploader= uploadJSSDK;
var myMainPage = new Vue({
	el: '#ALLINFO',
	data: {
		uploader: uploadJSSDK,
		provshen: {}, //省
		cityshi: {}, //市
		areaxian: {}, //县
		jLocal: {},
		thisPerInfo:{},
		zhemgmian:{},
		fanmian:{},
		jLocal : $HQ.getUrlParams(),
	},
	created: function() {
		this.findThSerInfo();
		this.begingLoad();
		this.findAll();
	},
	methods: {
		//查询该服务商信息
		findThSerInfo: function() {
			var url = "uService/findServiceByCondition";
			var params = {};
			var self = this;
			params.accountId=myMainPage.jLocal.employerid;
			
			$HQ.load(url, params, function(data) {
				console.log(data);
				self.$set("thisPerInfo",data.responseMsg[0])
			});	
		},
		changeThSerInfo: function(e) {
			var name=$(e.target).attr("name");
			var url = "uService/udpateServiceInfoById";
			var params = {};
			var self = this;
			var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			var patrn = /^[1]{1}[0-9]{10}$/;
			params.serviceId=this.thisPerInfo.serviceId;
//			if($("input#name").val()==""){
//				$("input#name").focus();
//				$("b#name").html("请输入你的真实名字");
//			}else if($("input#dianpu").val()==""){
//				$("input#dianpu").focus();
//				$("b#dianpu").html("请输入你的店铺名字");
//			}else if($("textarea#jianjie").val()==""){
//				$("textarea#jianjie").focus();
//				$("b#jianjie").html("请输入你的店铺的简介");
//			}else if(!reg.test($("input#eml").val())){
//				$("input#eml").focus();
//				$("b#eml").html("你输入的邮箱有误");
//			}else if(!patrn.test($("input#tel").val())){
//				$("input#tel").focus();
//				$("b#tel").html("你输入的手机有误");
//			}else if($(".select1").val()==""||$(".select2").val()==""||$(".select3").val()==""){
//				$("b#select").html("请选择你的地址");
//			}else if($("input.address").val()==""){
//				$("b.address").html("请输入你的详细地址");
//			}else{}
			if(name=="basic"){
				params.realName=this.thisPerInfo.realName;
				params.nickName=this.thisPerInfo.nickName;
				params.empDesc=this.thisPerInfo.empDesc;
				params.email=this.thisPerInfo.email;
				params.phone=this.thisPerInfo.phone;
				params.address=this.thisPerInfo.address;
				params.proviceName= this.thisPerInfo.proviceName;
				params.areaName=this.thisPerInfo.areaName;
				params.cityName=this.thisPerInfo.cityName;
				params.headImg=$("#touxiang").attr("src");
			}else if(name=="trueName"){
				params.realName=this.thisPerInfo.realName;
				params.authPath=$("#img1").attr("src")+","+$("#img2").attr("src");
				console.log($("#img1").attr("src")+","+$("#img2").attr("src"));
			}else if(name=="bankName"){
				params.bankRealName=this.thisPerInfo.bankRealName;
				params.empDesc=this.thisPerInfo.bankName;
				params.empDesc=this.thisPerInfo.bankCard;
			}
			
			$HQ.load(url, params, function(data) {
				alert("保存成功")
			});	
		},
		//获取tokn
		findAll: function() {
			var url = "wanTuMethod/webDirect";
			var params = {};
			var self = this;
			$HQ.load(url, params, function(data) {
				self.$set("token", data.token.token);
			}, 'GET')
		},
		//顽兔上传
		upload: function(e) {
			var files = e.target.files;
			var name=$(e.target).attr("name");
			var self = this;
//			self.$set('uploadFiles', files) //把用户点击上传的图片信息存进 uploadFiles
				//上传
			uploader({
				file: files[0], //文件，必填,html5 file类型，不需要读数据流，
//					name: self.accountInfo.employerId, //文件名称，选填，默认为文件名称
				name: files[0].name, //文件名称，选填，默认为文件名称
				token: this.token, //token，必填
				dir: '/fuwushang/', //目录，选填，默认根目录''
				retries: 0, //重试次数，选填，默认0不重试
				maxSize: 50 * 1024 * 1024, //上传大小限制，选填，默认0没有限制
				callback: function(percent, result) {
					// percent（上传百分比）：-1失败；0-100上传的百分比；100即完成上传
					//result(服务端返回的responseText，json格式)
					//result = JSON.stringify(result);
					//上传成功
					console.log(result);
					if(name=="touxiang"){
						if (result.code == 'OK') { //判断顽兔的回调值code	
							$("#touxiang").attr("src",result.url);
						}else {
							alert("网络问题！")
						}
					}else if(name=="zhengmian"){
						if (result.code == 'OK') { //判断顽兔的回调值code	
							$("#img1").attr("src",result.url) ;
						}else {
							alert("网络问题！")
						}
					}else if(name=="beimian"){
						if (result.code == 'OK') { //判断顽兔的回调值code	
							$("#img2").attr("src",result.url) ;
						}else {
							alert("网络问题！")
						}
					}
				}
			});
		},
		//所在省市县具体地址的显示
		begingLoad: function() {
			var params = {};
			var self = this;
			$.ajax({
				type: "get",
				url: "http://apis.map.qq.com/ws/district/v1/list?key=HYMBZ-24MWX-D6F4H-TLY5U-UHAV3-DXB6C&output=jsonp",
				dataType: "jsonp",
				success: function(data) {
					self.provshen = data.result[0];
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {}
			});
			var cityshiHtml = "";
			var cities = [];
			var areaHtml = "";
			var area = [];
			$(".select1").bind("change", function() {
				areaHtml = "";
				var id = "";
				id = $(".select1 option:selected").attr("data-proid");
				var params = {
					'id': id
				}
				$.ajax({
					type: "get",
					url: "http://apis.map.qq.com/ws/district/v1/getchildren?&id=" + id + "&key=HYMBZ-24MWX-D6F4H-TLY5U-UHAV3-DXB6C&output=jsonp",
					dataType: "jsonp",
					success: function(data) {
						self.cityshi = data.result[0];
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {}
				});
			});
			$(".select2").bind("change", function() {
				areaHtml = "";
				var id = $(".select2 option:selected").attr("data-citid");
				var params = {
					'id': id
				}
				$.ajax({
					type: "get",
					url: "http://apis.map.qq.com/ws/district/v1/getchildren?&id=" + id + "&key=HYMBZ-24MWX-D6F4H-TLY5U-UHAV3-DXB6C&output=jsonp",
					dataType: "jsonp",
					success: function(data) {
						self.areaxian = data.result[0];
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {

					}
				});
			});
		},
	}
});
// # sourceURL= myHeadwaSet.js










//点击系统拍单 
$("#system").click(function() {
	$("span b").css("background", "white");
	$(this).css("background", "#00A263");
	window.location.href = "indexPage.html#modules/iamHeadwaiter/sendList.html?employerid=" + $HQ.getUrlParams().employerid + "&accounttype=" + $HQ.getUrlParams().accounttype+"&demandid=" + $HQ.getUrlParams().demandid 
});
//点击 指定服务商拍单
$("#assign").click(function() {
	$("span b").css("background", "white");
	$(this).css("background", "#00A263");
	window.location.href = "indexPage.html#modules/iamHeadwaiter/assignSendList.html?employerid=" + $HQ.getUrlParams().employerid + "&accounttype=" + $HQ.getUrlParams().accounttype +"&demandid=" + $HQ.getUrlParams().demandid                     
});

var uploader = uploadJSSDK;
var seeOff = new Vue({
	el: '#seeOff',
	data: {
		token: {},
		uploader: uploadJSSDK,
		uploadFiles: [], //本地上传的图片
		wancallbackOk: [], //上传成功的图片
		wancallbackFl: [], //上传图片失败
		// time : '1',  //点击上传图片的次数
		wanTuImg:{}, //存顽兔已经上传的图片
	},
	created: function() {
		this.ADDRESS(); //当前地址栏的参数
		this.findAll(); //
		this.findWantuInfo();  //获取已经上传的图片
	},
	methods: {
		//获取当前地址栏的参数
		ADDRESS: function() {
			this.jLocal = $HQ.getUrlParams(); //存地址栏参数
		},
		//获取顽兔商已经上传的图片wanTuMethod/traverseElements
		findWantuInfo: function() {
			var url = "wanTuMethod/traverseElements";
			var params = {};
			var self = this;
			params.fileName = "/作品图片/" +this.jLocal.demandid;
			params.currentPage = 1 ;
			params.pageSize = 100 ;
			$HQ.load(url, params, function(data) {
				self.$set("wanTuImg", data.responseMsg);
			}, 'GET')
		},
		//获取token		
		findAll: function() {
			var url = "wanTuMethod/webDirect";
			var params = {};
			var self = this;
			$HQ.load(url, params, function(data) {
				self.$set("token", data.token.token);
			}, 'GET')
		},
		upload: function(e) {
			$('#background').css('display', 'block')
			$('#progressBar').css('display', 'block')
			var files = e.target.files;
			var self = this;
			self.$set('uploadFiles', files) //把用户点击上传的图片信息存进 uploadFiles
				//上传
			for (var i = 0; i < files.length; i++) {
				uploader({
					file: files[i], //文件，必填,html5 file类型，不需要读数据流，
					name: files[i].name, //文件名称，选填，默认为文件名称
					token: this.token, //token，必填
					dir: '/作品图片/'+ self.jLocal.demandid  , //目录，选填，默认根目录''
					retries: 0, //重试次数，选填，默认0不重试
					maxSize: 50 * 1024 * 1024, //上传大小限制，选填，默认0没有限制
					callback: function(percent, result) {
						// percent（上传百分比）：-1失败；0-100上传的百分比；100即完成上传
						//result(服务端返回的responseText，json格式)
						// result = JSON.stringify(result);
						//上传成功
						if (result.code == 'OK') { //判断顽兔的回调值code
							var wancallbackOk = self.wancallbackOk
							wancallbackOk.push(result)
						} else {
							$('.fail p em').html('(网络问题！)')
							var wancallbackFl = self.wancallbackFl
							wancallbackFl.push(files)
						}
						setTimeout(function(){
							$('#background').css('display', 'none')
							$('#progressBar').css('display', 'none')
						},files.length * 150)
					}
				});
			}
		},
//		cilckJump : function(e){
//			var url = "uDemand/find_byId";
//			var params = {};
//			var self = this;
//			params.demandId = this.jLocal.demandid;
//			$HQ.load(url, params, function(data) {
//				self.$set("wanTuImg", data.responseMsg);
//			}, 'GET')
//			if()
//			$(this).data('clickJjj')
//		},
	}
});
//# sourceURL=seeOff.js
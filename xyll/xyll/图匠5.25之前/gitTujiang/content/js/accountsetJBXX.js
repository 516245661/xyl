var uploader = uploadJSSDK;
var accountsetJBXX = new Vue({
	el: '#accountsetJBXX',
	data: {
		token: {}, //获取 上传头像的token
		uploader: uploadJSSDK, //上传图片
		accountInfo: {}, //用户的基本信息
		jLocal: {}, //地址栏参数
		provshen: {}, //省
		cityshi: {}, //市
		areaxian: {}, //县
		address: {}, //具体地方志
	},
	created: function() {
		this.start(); //取地址栏参数
		this.findAccountIfon();
		this.begingLoad(); //查询省市县
		this.findAll(); //查询token
	},
	ready: function() {},
	methods: {
		//取地址栏参数
		start: function() {
			this.jLocal = $HQ.getUrlParams();
		},
		//查询用户的基本信息
		findAccountIfon: function() {
			var url = 'uEmployer/findEmployerByCondition';
			var self = this;
			var params = {};
			params.accountId = this.jLocal.employerid;
			$HQ.load(url, params, function(data) {
				self.$set("accountInfo", data.responseMsg[0])
			});
		},
		//修改用户信息
		updata: function() {
			var url = 'uEmployer/updateEmplouerInfoById';
			var self = this;
			var params = {};
			//			for (var i in this.accountInfo) {
			//				params.i = this.accountInfo.i;
			//			}
			params.employerId = this.accountInfo.employerId;
			params.nickName = this.accountInfo.nickName;
			params.headImg = this.accountInfo.headImg;
			params.email = this.accountInfo.email;
			params.phone = this.accountInfo.phone;
			params.proviceName = this.accountInfo.proviceName;
			params.areaName = this.accountInfo.areaName;
			params.cityName = this.accountInfo.cityName;
			params.address = this.accountInfo.address;
			params.empDesc = this.accountInfo.empDesc;
			$HQ.load(url, params, function(data) {
				if (data.responseMsg.code == '100') {
					alert('修改成功！')
					window.location.reload()
				}
			});
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
			var files = e.target.files;
			var self = this;
			self.$set('uploadFiles', files) //把用户点击上传的图片信息存进 uploadFiles
				//上传
			for (var i = 0; i < files.length; i++) {
				uploader({
					file: files[i], //文件，必填,html5 file类型，不需要读数据流，
					//					name: self.accountInfo.employerId, //文件名称，选填，默认为文件名称
					name: files[i].name, //文件名称，选填，默认为文件名称
					token: this.token, //token，必填
					dir: '/gzheadimg/', //目录，选填，默认根目录''
					retries: 0, //重试次数，选填，默认0不重试
					maxSize: 50 * 1024 * 1024, //上传大小限制，选填，默认0没有限制
					callback: function(percent, result) {
						// percent（上传百分比）：-1失败；0-100上传的百分比；100即完成上传
						//result(服务端返回的responseText，json格式)
						// result = JSON.stringify(result);
						//上传成功
						// console.log(files[i].name);
						console.log(percent);
						if (percent == '100') {
							self.accountInfo.headImg = result.url
						} else {
							alert("网络问题,图片上传失败！")
						}
					}
				});
			}
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
			//填写具体地址  省市县自动填写
			//$(".select3").bind("change", function() {
			//	self.address = $(".select1").val() + $(".select2").val() + $(".select3").val();
			//	$(".address").val(self.address)
			//})

		},
	}
});
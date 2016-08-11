$('#number').blur(function() {
	if ($('#number').val() > 0) {

	} else {
		$('#number').val('1')
	}

})
var uploader = uploadJSSDK;
var epSendOrder = new Vue({
	el: '#epSendOrder',
	data: {
		token: {}, //上传需要的token
		uploader: uploadJSSDK, //顽兔jsdk
		// priceX:'3', //星级的价格  即单价
		// totalPrice:'',
		demands: {},
		miaoshu: '',
		// updataOrderIfon:{}, //上传雇主信息
		params: {
			demandTitle: '',
			priceX: '3',
			totalPrice: '',
			addPrice: '',
			state: '',
			totalPrice: 5,
			imgPrice: 5,
			addPrice: 1.2,
			completeTime: 18
		}
	},
	created: function() {
		var self = this;
		this.load(); //帮助中心高度
		// this.findAll(); //token
		// this.totalMoney(); // 总价
		$.getJSON('/tujiang-web2/tujiang_web/content/sendDemands.json','',function(data){
			self.$set('demands',  data.demands);
			self.$set('style', data.style[0])
			// self.$set('miaoshu',data.miaoshu[0])
		});	
	},
	watch: {
		'params.priceX': function(val, oldVal){
			if(val == 1){
				val = 1;
			}else if(val == 2){
				val = 3;
			}else if(val == 3){
				val = 5;
			}else if(val == 4){
				val = 7;
			}else if(val == 5){
				val = 9;
			}
			this.$set('params.imgPrice', val);
			this.totalMoney(val);
		},
		'params.imgPrice': function(val){
			this.totalMoney(val);
		},
		'params.imgNumber': function(val){
			this.totalMoney();
		},
		'params.state': function(val){
			this.totalMoney();
		}
	},
	ready: function() {},
	methods: {
		load: function() {
			var height = '';
			height = $('.leftNavIP').css('height'); //帮助中心高度
			$('.ephelp').css('min-height', height)
			//帮助中心高度
			if (height > $('.leftNavIP').css('height')) {
				height = $(document).height()
				$('.ephelp').css('min-height', height)
			} else if (height < $('.leftNavIP').css('min-height')) {
				height = $('.leftNavIP').css('min-height')
				$('.ephelp').css('min-height', height)
			}
			height = $(document).height();
			$('.ephelp').css('min-height', height);
		},
		//算总价
		totalMoney: function(val) {
			var totalPrice = 0,
				pri = val?val:this.params.imgPrice,
				imgNumber = this.params.imgNumber,
				jiaji = this.params.addPrice;
			if(this.params.state){
				totalPrice = imgNumber*pri*jiaji;
			}else{
				totalPrice = imgNumber*pri;
			}
			this.$set('params.totalPrice', totalPrice);
			// var amount = $("#number").val() //图片数量
			// var pri =2 * this.priceX -1 //单价
			// var jiaji = 1 	//加急
			// this.totalPrice = amount * pri * jiaji
			// $('.totalPrice').attr('value',this.totalPrice)
		  },
		//算总价
		totalMoneyClick: function(e){
			var totalPrice = 0,
				pri = 1,
				priceX = this.params.priceX,
				imgNumber = this.params.imgNumber,
				jiaji = 1;
			if(priceX==1){
				pri = 1;
			}else if(priceX==2){
				pri = 3;
			}else if(priceX==3){
				pri = 5;
			}else if(priceX==4){
				pri = 7;
			}else if(priceX==5){
				pri = 9;
			}
			if(this.params.state){
				totalPrice = imgNumber*pri*jiaji;
			}else{
				totalPrice = imgNumber*pri;
			}
			this.$set('params.totalPrice', totalPrice);
			// $('.danjia1 , .danjia2, .danjia3, .danjia4, .danjia5').css('display','none')
			// $('.danjia'+$(e.target).attr('value')).css('display','inline-block')
		 	// var amount = $("#number").val() //图片数量
		 	// var pri = $('#danjia'+$(e.target).attr('value')).attr('value') //单价
		 	// var jiaji = 1 	//加急
			// this.totalPrice = amount * pri * jiaji
			// $('.totalPrice').attr('value',this.totalPrice)
		 },
		//上传信息（建单）
		updataOrder: function() {
			var demands = this.demands[0].demands,
				priceX = this.priceX,
				params = this.params;
			for(var i=0;i<demands.length;i++){
				var one = demands[i];
				if(priceX<=1){
					switch(one.name){
						case 'face':
						case 'eye':
						case 'yebu':
							demands.splice(i,1);
							i=i-1;
							break;
					}
				}
			}
			var url = "udemand_method/save_demand";
			params.demandDesc = JSON.stringify(this.demands);
			// params.demandTitle = this.updataOrderIfon.demandTitle
			// params.imgNumber = this.updataOrderIfon.imgNumber
			// params.imgGasleyAddress = this.updataOrderIfon.imgGasleyAddress
			// params.imgPrice = this.priceX //单价
			// params.totalPrice = this.totalPrice //总价
			// params.state = this.updataOrderIfon.state 
			if(priceX>1){
				params.styleId = JSON.stringify(this.style);
			}
			$HQ.load(url, params, function(data) {
				console.log(data);
			})
		},
		//获取token		
		findAll: function() {
			var url = "wanTuMethod/webDirect";
			var params = {};
			var self = this;
			var data = $HQ.load(url, params, '', 'GET');
			self.$set("token", data.token.token);
		},
		//上传文件（压缩文件）
		upload: function(e) {
			this.findAll();
			if(!this.token){
				$HQ.topRightInfoTips({content:'token未拿到!'})
				return false;
			}
			$('#background').css('display', 'block')
			$('#progressBar').css('display', 'block')
			var files = e.target.files;
			var self = this;
			//上传
			for (var i = 0; i < files.length; i++) {
				uploader({
					file: files[i], //文件，必填,html5 file类型，不需要读数据流，
					name: files[i].name, //文件名称，选填，默认为文件名称
					token: this.token, //token，必填
					dir: '/雇主或者影楼/' + $.cookie('accountUUID'), //目录，选填，默认根目录''
					retries: 0, //重试次数，选填，默认0不重试
					maxSize: 20 * 1024 * 1024 * 1024, //上传大小限制，选填，默认0没有限制
					MimeType: 'zip;rar;cab;7z;iso', //文件的格式
					callback: function(percent, result) {
						// percent（上传百分比）：-1失败；0-100上传的百分比；100即完成上传
						//result(服务端返回的responseText，json格式)
						// result = JSON.stringify(result);
						//上传成功
						if (result.code == 'OK') { //判断顽兔的回调值code
							// self.updataOrderIfon.imgGasleyAddress = result.url
							self.$set('params.imgGasleyAddress', result.url);
							$('.upWenjian').css('display', 'block').html(result.name + '<em style=' + 'padding:20px;color:red' + '>上传成功！</em>')
						} else {
							$HQ.topRightInfoTips({content:'网络问题!'})
						}
						setTimeout(function() {
							$('#background').css('display', 'none')
							$('#progressBar').css('display', 'none')
						}, files.length * 150)
					}
				});
			}
		},
	}
});

//# sourceURL=epSendOrder.js
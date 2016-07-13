var pendingMoney = new Vue({
	el: '#pendingMoney',
	data: {
		host: config.host,
		UserData: {
			nikeName: localStorage.getItem('nikeName') != '' ? localStorage.getItem('nikeName') : '',
			tel: localStorage.getItem('tel') != '' ? localStorage.getItem('tel') : '',
			address: localStorage.getItem('address') != '' ? localStorage.getItem('address') : '',
		},
		GoodsData: {},
		shopData: {},
		UserCouponData: {},
		uporederData: {},
		amount: '1',
		content: '正确操作',
		type: 'info',
		shopID: '', //优惠券编号
		shopmoney: '', //优惠券价格
		payType: '', //支付方式
	},
	created: function() {
		$HQ.initAuthorize();
		this.findGoodsIfon();
	},
	ready: function() {},
	methods: {
		//是否使用优惠券
		start: function() {
			if (this.GoodsData.couponType == 'NO') {
				$('.noyouhuiquan').html('该商品不可以使用');
				$('.goshop .ui-form').css('display', 'none')
			}else{
				if (this.UserCouponData.code == 8) {
					$('.noyouhuiquan').html('没有可以使用的');
				}
				if ($('.goshop input[type=checkbox]').attr('checked')) {
					$('.goshop .ui-form').css('display', 'block')
				} else {
					$('.goshop .ui-form').css('display', 'none')
				}
			}

			this.findGoodsMoney();
		},
		//弹出提示
		prompt: function() {
			$.tips({
				content: this.content,
				stayTime: 2000,
				type: this.type,
			})
		},
		//查询单个商品信息  或者是查询单个团购商品信息
		findGoodsIfon: function() {
			var address = $HQ.getUrlParams(window.location.href)
			var self = this;
			var params = {};
			if (address.groupid) {
				var url = this.host + 'group/list';
				params.id = address.groupid;
				$('#coupon').css('display', 'none') //隐藏优惠券
				$('.buynumber').css('display', 'none') //隐藏数量添加
			} else {
				var url = this.host + 'goods/goods_list';
				params.id = address.id;
			}
			$HQ.load(url, params, function(data) {
				self.$set("GoodsData", data.list[0])
				self.GoodsData.image = self.GoodsData.image.split(',')[0]
				if (address.groupid) {
					self.GoodsData.id = self.GoodsData.goodsId;
				} else {
					self.GoodsData.id = self.GoodsData.id;
				}
				self.findShopIfon();
				if (address.groupid) {} else {
					self.findUserCouponIfon();
				}
				self.findGoodsMoney();
			});
		},
		//查询 商品对应的店铺信息
		findShopIfon: function() {
			var url = this.host + 'merchant/shop_info';
			var self = this;
			var params = {};
			params = {
				merchantId: this.GoodsData.merchantId,
				shopId: this.GoodsData.merchantShopId,
			};
			$HQ.load(url, params, function(data) {
				self.$set("shopData", data[0])
			});
		},
		//查询该用户的优惠券
		findUserCouponIfon: function() {
			var url = this.host + 'coupon/list';
			var self = this;
			var params = {};
			params = {
				goodsId: self.GoodsData.id,
				isUse: 'NO',
				userId: localStorage.getItem('ui_id'),
				pageNo: 1,
				pageSize: 10,
			};
			$HQ.load(url, params, function(data) {
				self.$set("UserCouponData", data)
				alert(data.code)
				if (self.UserCouponData.code == '-1' || self.UserCouponData.code == '3') {
					
				}
				self.start(); //显示是否有优惠券
			});
		},
		//查询优惠券编号 优惠券价格
		findCoupon: function(e) {
			if ($('.goshop input[type=checkbox]').attr('checked')) {
				this.shopID = $(e.target).data('id') //优惠券编号
				this.shopmoney = $(e.target).data('money')
			} else {
				this.shopmoney = '0';
			}
			this.findGoodsMoney();

		},
		//查询，显示，算，总计
		findGoodsMoney: function() {
			if (!$('.goshop input[type=checkbox]').attr('checked')) {
				this.shopmoney = '0'
			}
			var showmoney //给用户显示的总价
			showmoney = (this.GoodsData.priceStr * 100 * this.amount - this.shopmoney * 100) / 100 //显示管理用户的总价
			$('.showmoney').html(showmoney)
		},
		//数量  优惠券价格
		numeber: function(e) {
			$(e.target).data('numeber')
			if ($(e.target).data('numeber') == 'add') {
				this.amount++;
				$('.numeber').attr('value', this.amount)
			} else if ($(e.target).data('numeber') == 'less') {
				if (this.amount <= 1) {
					this.content = '数量不能小于1！';
					this.prompt();
					this.amount = '1';
					return false;
				} else {
					this.amount--;
				}
				$('.numeber').attr('value', this.amount)
			}
			this.findGoodsMoney();
		},
		//判断信息是否填写
		writeIfon: function(e) {
			this.payType = $(e.target).data('type')
			var phonetel = /^[1]{1}[0-9]{10}$/;
			if (this.UserData.nikeName == '') {
				this.content = '请填写名字！'
				this.prompt();
				return false
			} else if (!phonetel.exec(this.UserData.tel)) {
				this.content = '请填写正确的电话号码！'
				this.prompt();
				return false
			} else if (this.UserData.address == '') {
				this.content = '请填写地址！'
				this.prompt();
				return false
			}
			this.uporeder();
		},
		//添加订单
		uporeder: function() {
			var url = this.host + 'user/order/add';
			var isGroup = 'YES';
			var groupId = '110';
			var self = this;
			var params = {};
			var address = $HQ.getUrlParams(window.location.href)
			params = {
				goodsType: 1, //商品规格	
				buyerTel: this.UserData.tel,
				buyerAddress: this.UserData.address,
				money: this.GoodsData.priceStr * 100 * this.amount / 100,
				num: this.amount,
				payType: this.payType,
				buyerName: this.UserData.nikeName,
				userId: localStorage.getItem('ui_id'),
				goodsId: this.GoodsData.id,
			};
			if (address.groupid) {
				params.groupId = address.groupid //团购编号
				params.isGroup = 'YES' //团购编号
			} else if (address.id) {
				params.isGroup = 'NO' //是否是团购	
			}
			if ($('.goshop input[type=checkbox]').attr('checked')) {
				if (this.UserCouponData.code == 8  ) {
					params.isUsePon = 'NO';
				} else {
					params.isUsePon = 'YES' //是否使用优惠券
					params.couponId = this.shopID //优惠券编号
				}
			} else {
				params.isUsePon = 'NO';
			}
			$HQ.load(url, params, function(data) {
				self.$set("uporederData", data)
					//存用户的基本信息
				localStorage.setItem('address', self.UserData.address)
				localStorage.setItem('tel', self.UserData.tel)
				localStorage.setItem('nikeName', self.UserData.nikeName)
					//存用户的基本信息
				if (self.uporederData.code == '-1') {
					setTimeout(function() {
							self.paymoney();
						}, 500) //跳转支付页面

				} else if (self.uporederData.error) {
					self.content = self.uporederData.error;
					self.prompt();
				} else {
					self.content = self.uporederData.sub_msg;
					self.prompt();
				}
			}, 'GET');
		},
		// 订单创建成功后支付
		paymoney: function() {
			var url = this.host + 'wechatJsapi/jsapiPay';
			alert("http://ludanmall.com/wechatJsapi/jsapiPay?orderNo=" + this.uporederData.orderNo + "&zcOpenId=" + localStorage.getItem('ui_openid'))
			window.location.href = "http://ludanmall.com/wechatJsapi/jsapiPay?orderNo=" + this.uporederData.orderNo + "&zcOpenId=" + localStorage.getItem('ui_openid');
		},
	}
});
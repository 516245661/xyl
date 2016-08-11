var accountCenterMyorder = new Vue({
	el: '#accountCenterMyorder',
	data: {
		robStateYes: '',
		dataInfoOnes: [], //查询单个雇主的订单
		ADDRESS: $HQ.getUrlParams(),
		findAccStyData: {},
	},
	created: function() {
		this.findAccOrderIfon();
	},
	ready: function() {},
	methods: {
		//查询当前雇主的个人订单
		findAccOrderIfon: function() {
			var url = 'uDemand/findDemandById';
			var self = this;
			var params = {};
			params.accountId = ADDRESS.employerid;
			params.index = 1;
			params.size = 4;
			$HQ.load(url, params, function(data) {
				self.$set("dataInfoOnes", data.responseMsg)
				for (var i = 0; i < self.dataInfoOnes.length; i++) {
					switch (self.dataInfoOnes[i].robState) {
						case -4:
							self.dataInfoOnes[i].robState = "中止派单"
							break;
						case -3:
							self.dataInfoOnes[i].robState = "代付款"
							break;
						case -2:
							self.dataInfoOnes[i].robState = "返工"
							break;
						case -1:
							self.dataInfoOnes[i].robState = "拒单"
							break;
						case 0:
							self.dataInfoOnes[i].robState = "派单中"
							break;
						case 1:
							self.dataInfoOnes[i].robState = "拍单完成（服务商待接单）"
							break;
						case 2:
							self.dataInfoOnes[i].robState = "拍单完成"
							break;
						case 3:
							self.dataInfoOnes[i].robState = "服务中"
							break;
						case 4:
							self.dataInfoOnes[i].robState = "待确认验货"
							break;
						case 5:
							self.dataInfoOnes[i].robState = "交易完成"
							break;
						case 6:
							self.dataInfoOnes[i].robState = "确认接单"
							break;
						case 7:
							self.dataInfoOnes[i].robState = "待评价"
							break;
					}
				}
			});
		},
		//点击是触发
		orderTy: function(e) {
			//			var oredrNuber = $(e.target).data('orde');
			//			var index = 1; //页数
			var url = 'uDemand/findDemandById';
			var self = this;
			var params = {};
			params.accountId = ADDRESS.employerid;
			params.index = 1;
			params.size = 20;
			$HQ.load(url, params, function(data) {
				self.$set("dataInfoOnes", data.responseMsg)
				for (var i = 0; i < self.dataInfoOnes.length; i++) {
					switch (self.dataInfoOnes[i].robState) {
						case -4:
							self.dataInfoOnes[i].robState = "中止派单"
							break;
						case -3:
							self.dataInfoOnes[i].robState = "代付款"
							break;
						case -2:
							self.dataInfoOnes[i].robState = "返工"
							break;
						case -1:
							self.dataInfoOnes[i].robState = "拒单"
							break;
						case 0:
							self.dataInfoOnes[i].robState = "派单中"
							break;
						case 1:
							self.dataInfoOnes[i].robState = "拍单完成（服务商待接单）"
							break;
						case 2:
							self.dataInfoOnes[i].robState = "拍单完成"
							break;
						case 3:
							self.dataInfoOnes[i].robState = "服务中"
							break;
						case 4:
							self.dataInfoOnes[i].robState = "待确认验货"
							break;
						case 5:
							self.dataInfoOnes[i].robState = "交易完成"
							break;
						case 6:
							self.dataInfoOnes[i].robState = "确认接单"
							break;
						case 7:
							self.dataInfoOnes[i].robState = "待评价"
							break;
					}
				}
			});

		},
		//点击标题跳转到订单的详情
		jumpOrder: function(e) {
			var demandId = $(e.target).data('order')
			window.location.href = "../content/indexPage.html#modules/robSucceed.html?accounttype=0&employerid=" + ADDRESS.employerid + '&demandId=' + demandId
		},

	}
});
//# sourceURL=accountCenterMyorder.js
var payMoneySucc = new Vue({
	el: '#payMoneySucc',
	data: {
		findAccIfon: {},
		jLocal:{},
	},
	created: function() {
		this.address();
		this.serveSIfon();

	},
	ready: function() {},
	methods: {
		//取地址栏参数
		address: function() {
			this.jLocal = $HQ.getUrlParams();
		},
		//查询需求订单信息
		serveSIfon: function() {
			var url = 'uDemand/find_byId';
			var self = this;
			var params = {};
			params.demandId = this.jLocal.demandid;
			$HQ.load(url, params, function(data) {
				self.$set("findAccIfon", data.responseMsg[0])
			});
		},
		//马上派单
		anonSend: function() {
			window.location.href = 'indexPage.html#modules/iamHeadwaiter/seeOff.html?demandid=' + this.jLocal.demandid + '&employerid=' + this.jLocal.employerid + '&accounttype=' + this.jLocal.accounttype;
		},
	}
});
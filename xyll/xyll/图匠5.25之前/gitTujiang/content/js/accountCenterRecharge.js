var accountCenterRecharge = new Vue({
	el: '#accountCenterRecharge',
	data: {
		incomeDetail: {},
		jLocal: {},
	},
	created: function() {
		this.findAccOredrData();
		this.ADDRESS();
	},
	ready: function() {},
	methods: {
		//取地址栏参数 雇主ID  状态
		ADDRESS: function() {
			this.jLocal = $HQ.getUrlParams(); //存地址栏参数
		},
		//收入明细数据
		findAccOredrData: function() {
			var self = this;
			var params = {};
			var url = 'transaction_mthod/find_record';
			params.index = 1;
			params.size = 10;
			$HQ.load(url, params, function(data) {
				self.$set("incomeDetail", data.responseMsg)
				console.log(123);
			});
		},
	}
});
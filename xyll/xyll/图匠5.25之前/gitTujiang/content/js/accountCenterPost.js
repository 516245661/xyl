var accountCenterPost = new Vue({
	el: '#accountCenterPost',
	data: {
		incomeDetail: {},
		jLocal : {},
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
			var url = 'transactionMthod/findRecord';
//			params.employerId = this.jLocal.employerid;
			$HQ.load(url, params, function(data) {
				self.$set("incomeDetail", data.responseMsg[0])
				console.log(123);
			});
		},
	}
});
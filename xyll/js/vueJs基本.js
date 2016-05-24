var = new Vue({
	el: '',
	data: {
		dataInfo:{},
	},
	created: function() {
		this.findAccountIfon();
	},
	ready: function() {},
	methods: {
		findAccountIfon: function() {
			var url = '';
			var self = this;
			var params = {};
			params.accountPwd = ;
			$HQ.load(url, params, function(data) {
				self.$set("",data)
			});
		},
	}
});
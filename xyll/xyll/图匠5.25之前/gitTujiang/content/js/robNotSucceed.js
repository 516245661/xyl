var robNotSucceed = new Vue({
	el: '#robNotSucceed',
	data: {
		allIfon: {},
	},
	created: function() {
		this.findAccountIfon();
	},
	ready: function() {},
	methods: {
		findAccountIfon: function() {
			var url = 'uDemand/findDemandById';
			var self = this;
			var params = {};
			params.demandId = 123;
			$HQ.load(url, params, function(data) {
				self.$set('allIfon', data[0].responseMsg[0])
				console.log(self.allIfon);
			});
		},
	},
});

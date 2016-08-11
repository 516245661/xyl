var sendSu = new Vue({
	el: '#sendSu',
	data: {
		findAccIfon: {},
	},
	created: function() {
		this.findAccountIfon();
		// this.ADDress();
	},
	ready: function() {},
	methods: {
		//取地址栏参数
		ADDress: function() {
			var Href = window.location.href;
			employerId = Href.split("employerId=")[1].split("&")[0];
			accountType = Href.split("accountType=")[1].split("&")[0];
			// var serviceId = Href.split("serviceId=")[1].split("&")[0];
		},
		//查询单个雇主的信息
		findAccountIfon: function() {
			var url = 'uDemand/findDemandById';
			var params = {};
			var self = this;
			params.demandId = 123; //需求ID
			$HQ.load(url, params, function(data) {
				self.$set("findAccIfon", data[0].responseMsg[0])
				console.log(self.findAccIfon);
			});
		},
	}
});
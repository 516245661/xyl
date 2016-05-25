var eg = new Vue({
	el: '#eg',
	data: {
		dataInfo:{},
	},
	created: function() {
		this.findAccountIfon();
	},
	ready: function() {},
	methods: {
		findAccountIfon: function() {
			var url = 'eg';
			var self = this;
			var params = {};
			params:{
				eg : 1 ;
			}
			$HQ.load(url, params, function(data) {
				self.$set("egInfo",data)
			});
		},
	}
});
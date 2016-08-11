$('.assess_manage li').click(function(e){
	if($(this).attr('class')== 'clickColor'){
		$(this).addClass('clickColor')
	}else{
		$('.assess_manage li').removeClass('clickColor')
		$(this).addClass('clickColor')
	}
})

var accountCenterMyAssess = new Vue({
	el: '#accountCenterMyAssess',
	data: {
		jLocal :{}, //地址栏参数
		commentIfon:{}, //存评论信息
	},
	created: function() {
		this.start();
		this.servingInfo();
	},
	ready: function() {},
	methods: {
		//取地址栏参数
		start: function(){ 
			this.jLocal = $HQ.getUrlParams();
		},
		// 查询服务商 给这个雇主的评价 雇主状态0  服务商1   可以和服务商评价写在一起 取点击就取 值  
		servingInfo: function() {
			var url = 'uComment/findServiceByCondition';
			var self = this;
			var params = {};
			params.empolyerId = this.jLocal.employerid;
			params.commentType = 0;
			$HQ.load(url, params, function(data) {
				self.$set('commentIfon',data.responseMsg)
				console.log(self.commentIfon);
			});
		},
		//点击查询 服务商的评价 
		giveServing : function(){
			var url = 'uComment/findServiceByCondition';
			var self = this;
			var params = {};
			params.empolyerId = this.jLocal.employerid;
			params.commentType = 1;
			$HQ.load(url, params, function(data) {
				self.$set('commentIfon',data.responseMsg)
			});
		},
	}
});



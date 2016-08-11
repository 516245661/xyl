$(function(){
	$(".transac").find("a").click(function(){
		$(".transac a").removeClass("active");
		$(this).addClass("active");
		$(".specialCon>div").stop().fadeOut(500);
		$(".specialCon>div").eq($(this).index()).stop().fadeIn(500);
	})
})

var myMainPage = new Vue({
	el: '.frame',
	data: {
		messageAlls: {}, //存数据		
		messageOne: {},
	},
	created: function() { //创建功能 开始就进行的方法
		this.findAll();
	},
	methods: {		
		//查询表comclassify里的信息					
		findAll: function() {
			var url = "sProduction/findProductionByPage";
			var params = {};
			var self = this;
			params.index=1;
			params.size=10;
			$HQ.load(url, params, function(data) {
				console.log(data.responseMsg[0].createTime);				
				self.$set("messageAlls", data.responseMsg);					
			})
		},
	}
});


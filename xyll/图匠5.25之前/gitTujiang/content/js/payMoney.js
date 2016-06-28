var zhifu //定义支付的变量
	//变换支付方式  快捷支付  银联支付
$(".way b").click(function(e) {
		$(".way b").removeClass("active");
		$(this).addClass("active");
		var domIndex = $(e.target).attr("data-yy");
		$(".payMoney div").css("display", "none");
		$(".payMoney div").eq(domIndex).css("display", "block");
	})
	//选择支付的工具  支付宝   中国银行 等
$("span").click(function(e) {
	$('span').removeClass("active");
	$(this).addClass("active");
	zhifu = $(this).data();
})
var payMoney = new Vue({
	el: '#iconSe',
	data: {
		findAccIfon: {},
		jLocal: {}, //存地址栏参数
	},
	created: function() {
		this.ADDRESS();
		this.serveSIfon();
	},
	ready: function() {},
	methods: {
		//取地址栏参数 雇主ID 需求ID 状态
		ADDRESS: function() {
			this.jLocal = $HQ.getUrlParams(); //存地址栏参数
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
		//支付
		surePay: function() {
			var url = 'uDemand/sendOrdersTest';
			var self = this;
			var params = {};
			params.demandId = this.jLocal.demandid;
			params.robState = '-3';
			$HQ.load(url, params, function(data) {
			});
			alert('支付成功！')
				window.location.href='indexPage.html#modules/iamHeadwaiter/payMoneySucc.html?demandid='+this.jLocal.demandid+'&employerid='+this.jLocal.employerid+'&accounttype='+this.jLocal.accounttype;
		},
	}
});
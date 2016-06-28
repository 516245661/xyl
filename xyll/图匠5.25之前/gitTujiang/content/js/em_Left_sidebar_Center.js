//取地址栏参数
var ADDRESS = $HQ.getUrlParams()
	//雇主 公共的 左 侧边栏
var accountMyorderJs = new Vue({
	el: '.sidebar',
	data: {
		employerInfo: {},
	},
	created: function() {
		this.findAccountIfon();
	},
	ready: function() {},
	methods: {
		//查询具体雇主的基本信息
		findAccountIfon: function() {
			var url = 'uEmployer/findEmployerByCondition';
			var self = this;
			var params = {};
			params.accountId = ADDRESS.employerid;
			$HQ.load(url, params, function(data) {
				self.$set("employerInfo", data.responseMsg[0]);
				self.renderDOM();
			});
		},
		em_Left_Sidebar: function() {
			var html = '';
			html = '<dl>' +
				'<img src=" ' + this.employerInfo.headImg + '  "/>' +
				'<dd>' +
				'<b> ' + this.employerInfo.nickName + ' </b><p>' + this.employerInfo.starLevel + '星级</p>' +
				'</dd>' +
				'</dl>' +
				'<span>' +
				'<p>收入：<b>￥' + this.employerInfo.income + '元</b></p>' +
				'<p>支出：<b>￥' + this.employerInfo.expend + '元</b></p>' +
				'<p>余额：<b>￥' + this.employerInfo.balance + '元</b><b class="chongzhi"> &nbsp;<bottom>充值</bottom>|<bottom style="cursor:pointer;"><a style="color:#4680D0;" href="iamHeadwaiter/makeMoney.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">提现</a></bottom></b></p>' +
				'<p class="szxx"><b>查看收支详细</b></p>' +
				'</span>' +
				'<ul>' +
				'<!--交易管理-->' +
				'<h4 class="disBlo1"><a href="#">交易管理</a></h4>' +
				'<ul>' +
				'<li><a href="accountCenterMyorder.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">我的订单</a></li>' +
				'<li><a href="accountCenterMyAssess.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">评价管理</a></li>' +
				'<li><a href="accountCenterMyCollect.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">我的收藏</a></li>' +
				'</ul>' +
				'<h4 class="disBlo3"><a href="#">我的账本</a></h4>' +
				'<!--我的账本-->' +
				'<ul>' +
				'<li><a href="accountCenterMyRecord.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">收支明细</a></li>' +
				'<li><a href="accountCenterRecharge.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">充值记录</a></li>' +
				'<li><a href="accountCenterPost.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">提现记录</a></li>' +
				'</ul>' +
				'<h4 class="disBlo4"><a href="#">退款/维权/举报管理</a></h4>' +
				'<ul>' +
				'<li><a href="accountCenterBackMoney.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">我的退款</a></li>' +
				'<li><a href="accountCenterReport.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">我的举报</a></li>' +
				'</ul>' +
				'</ul>';
			return html;
		},
		renderDOM: function() {
				//添加到页面 sidebar 的内容
				$(".sidebar").html(this.em_Left_Sidebar());
		},
			//分页
	}
});

var headNav = '<ul>' +
	'<li class="li_gz"><a href="#">我是雇主</a></li>' +
	'<li><a href="accountCenterMyorder.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">首页</a></li>' +
	'<li><a href="accountsetJBXX.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + '">账号设置</a></li>' +
	'<li><a href="#">我的消息</a></li>' +
	'<li><a href="#">我的主页</a></li>' +
	'<li class="li_fws"><a href="iamHeadwaiter/makeDemand.html?employerid=' + ADDRESS.employerid + '&accounttype=' + ADDRESS.accounttype + ' ">发布需求</a></li>' +
	'</ul>';
//添加到页面  headNav 的内容
$(".headNav").html(headNav);
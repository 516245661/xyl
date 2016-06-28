//取地址栏参数
var addressInfo = location.href
var accounttype = addressInfo.split("accounttype=")[1].split("&")[0];
var employerid =addressInfo.split("employerid=")[1].split("&")[0];
//雇主 公共的 左 侧边栏
var em_Left_Sidebar = '<ul>' +
	'<!--个人资料-->' +
	'<h4 class="disBlo2"><a href="accountsetJBXX.html?employerid='+ employerid +'&accounttype='+ accounttype +' ">个人资料</a></h4>' +
	'<h4 class="disBlo4"><a href="#">身份认证</a></h4>' +
	'<ul class="disBlo4_ul" style="display:block">' +
	'<li><a href="accountsetLegalizeName.html?employerid='+ employerid +'&accounttype='+ accounttype +'">实名认证</a></li>' +
	'<li><a href="accountsetBankName.html?employerid='+ employerid +'&accounttype='+ accounttype +'">银行卡认证</a></li>' +
	'</ul>' +
	'</ul>'

var headNav = '<ul>' +
	'<li class="li_gz"><a href="#">我是雇主</a></li>' +
	'<li><a href="accountCenterMyorder.html?employerid='+ employerid +'&accounttype='+ accounttype +'">首页</a></li>' +
	'<li><a href="accountsetJBXX.html?employerid='+ employerid +'&accounttype='+ accounttype +'">账号设置</a></li>' +
	'<li><a href="#">我的主页</a></li>' +
	'<li><a href="#">我的消息</a></li>' +
	'<li class="li_fws"><a href="iamHeadwaiter/makeDemand.html?employerid='+ employerid +'&accounttype='+ accounttype +'">发布需求</a></li>' +
	'</ul>'
$(function() {
	//添加到页面  headNav 的内容
	$(".headNav").html(headNav)
		//添加到页面 sidebar 的内容
	$(".sidebar").html(em_Left_Sidebar);
	//取当前地址
})

//myselfInform.html?employerid='+ employerid +'&accounttype='+ accounttype +'  我的主页
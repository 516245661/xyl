/*公用js*/
$(document).ready(function() {
	/*导航栏*/
	var navBar = {
		init: function() {
			this.addClass();
		},
		hash: location.hash.replace(/\?\s*\S*/g, ''),
		navLi: $(".nav_ul").find("li.selected"),
		addClass: function() { //添加类
			switch (this.hash) {
				case "#modules/release.html":
					this.navLi.eq(1).addClass("active");
					break;
				case "#modules/releasegoods.html":
					this.navLi.eq(1).addClass("active");
					break;
				case "#modules/control.html":
					this.navLi.eq(3).addClass("active");
					break;
				case "#modules/productstore.html":
					this.navLi.eq(4).addClass("active");
					break;
				case "#modules/applicationAndMarketing/firstapppage.html.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/coupon.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/allgraphicmaterial.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/allopenshop.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/allstaff.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/departmentmanagement.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/distributionsystem.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/givegift.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/goodmanagement.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/graphicmaterialdetail.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/label.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/levelmanagement.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/messagepush.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/newgraphicmaterial.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/openshopreward.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/otherpay.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/performancestatistics.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/permission.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/salebonus.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/shopmodel.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/staffrecruiting.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/applicationAndMarketing/teamshop.html":
					this.navLi.eq(6).addClass("active");
					break;
				case "#modules/shop/editshop.html":
					this.navLi.eq(0).addClass("active");
					break;
				case "#modules/shop.html":
					this.navLi.eq(0).addClass("active");
					break;
				case "#modules/staffwall.html":
					this.navLi.eq(5).addClass("active");
					break;
				case "#modules/order/orderindex.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/activist.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/allorder.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/batchmarking.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/buyersself.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/cashondelivery.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/distributionbuy.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/givegiftorder.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/incomewithdrawal.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/logisticsnotice.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/logisticstool.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/orderotherpay.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "#modules/order/shopself.html":
					this.navLi.eq(2).addClass("active");
					break;
				case "../../../ldbbs/index.html":
					this.navLi.eq(2).addClass("active");
					break;
			}
		}
	};

	//初始化
	navBar.init();

	//导航栏的下拉菜单
	$(".nav_sz").mouseover(function() {
		$(".nav_sz_menu").css({
			"display": "block"
		})
	}).mouseout(function() {
		$(".nav_sz_menu").css({
			"display": "none"
		})
	});
});

function HQ() {
	/**
	 *
	 * @param url 请求地址
	 * @param params 上传至后台参数
	 * @param callback 回调
	 */
	this.load = function(url, params, callback) {
			var result = "";
			$.ajax({
				async: callback ? true : false,
				timeout: 150000,
				type: 'POST',
				url: 'url',
				data: params,
				processData: true,
				datatype: 'json',
				success: function(data) {
					if (callback) {
						callback(data);
					} else {
						result = data;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {

				}
			});
			return result;
		},
		/**
		 * option 对象 如：{id: 'test', type: 'richText'}
		 * id 指ue初始化对象的id
		 * type 三类，richText 富文本编辑器；uploadPic 上传图片；uploadFile 上传文件
		 */
		this.ueditor = function(option, callback) {
			var _editor;
			var options = option;
			var type = options.type;
			var id = options.id;
			if (option.toolbars) {
				_editor = UE.getEditor(id, {
					toolbars: option.toolbars
				});
			} else {
				_editor = UE.getEditor(id);
			}

			if (type === 'richText') {
				return _editor;
			} else if (type === 'uploadPic') {
				this.upload(_editor, callback);
				var upHtml = '<a href="#" class="ueditorUpload" id="ueditorUploadPic_' + id + '">选择图片</a>';
				$("#" + id).after(upHtml);
				$("#ueditorUploadPic_" + id).on("click", function() {
					//弹出图片上传的对话框
					var myImage = _editor.getDialog("insertimage");
					myImage.open();
				});
			} else if (type === 'uploadFile') {
				this.upload(_editor, callback);
				var upHtml = '<a href="#" class="ueditorUpload" id="ueditorUploadFile_' + id + '">上传附件</a>';
				$("#" + id).after(upHtml);
				$("#ueditorUploadFile_" + id).on("click", function() {
					//弹出文件上传的对话框
					var myFiles = _editor.getDialog("attachment");
					myFiles.open();
				});
			}
		},
		this.upload = function(_editor, callback) {
			_editor.ready(function() {
				//隐藏编辑器，因为不会用到这个编辑器实例，所以要隐藏
				_editor.setHide();
				//侦听图片上传
				_editor.addListener('beforeInsertImage', function(t, arg) {
					callback(arg);
				});
				//侦听文件上传
				_editor.addListener('afterUpfile', function(t, arg) {
					callback(arg);
				});
			});
		},
		//添加公用侧边导航
		this.addSideBar = function(callback) {
			this.load('modules/sideBar.html', {}, function(data) {
				callback(data)
			});
		},
		//自动排控部分添加侧导航
		this.addPaikongSideBar = function(callback) {
			this.load('modules/paikongSideBar.html', {}, function(data) {
				callback(data)
			});
		},
		//
		this.sethtml = function(html) {
			if (html) { //-----------------------------------如果传入了参数就把传入的参数放入编辑器中
				$("#view").html(html);
			} else { //--------------------------------------否则把view2中html载入编辑器中
				$("#view").html($("#view2").html());
			}

			$("#view a").each(function() { //----------------------------为了防止在编辑器中点击到了a标签进行跳转，把href的值存放到了href1中，现在需要还原
				if ($(this).attr("href")) {
					$(this).attr("href1", $(this).attr("href"));
					$(this).removeAttr("href");
				}
			}); //--------------------------------------------------------为了防止在编辑器中点击到了a标签进行跳转，把href的值存放到了href1中，现在需要还原

			$("#view .ueditor a").each(function() { //-------------------------------------------------------------但是百度uedit中 a 标签不能被还原
				if ($(this).attr("href1")) {
					$(this).attr("href", $(this).attr("href1"));
					$(this).removeAttr("href1");
				}
			}); //------------------------------------------------------------------------------------------------但是百度uedit中 a 标签不能被还原

			$("#view .slideBox").each(function() { //-------------初始化每个幻灯片
				$(this).attr("id", "slideBox");
				TouchSlide({
					slideCell: "#slideBox",
					titCell: ".hd ul",
					mainCell: ".bd ul",
					effect: "leftLoop",
					autoPage: true,
					autoPlay: true,
					interTime: 2000
				});
				$("#slideBox").removeAttr("id");
			}); //-----------------------------------------初始化每个幻灯片

			$("#view .listcontainer").each(function() { //--------------------------------------给每个列表盒子添加一个删除按钮
				$(this).append('<span class="delprenson" 删除按钮="">×</span>');
			}); //-----------------------------------------------------------------------------给每个列表盒子添加一个删除按钮

		}

}

HQ.prototype = {
	/**
	 * 解析URL返回GET参数,可以手动传入如:aa=bb&cc=dd
	 *
	 * @param  {[type]}  purl        地址
	 * @param  {Boolean} isNoToLower 是否全部变为小写
	 *
	 * @return {Object}
	 */
	getUrlParams: function(purl, isNoToLower) {
		isNoToLower = isNoToLower || false;
		var url = purl || window.location.href;
		var paraObj = {};
		if (url.indexOf('?') < 0) {
			return paraObj;
		}
		url = url.replace('#', '');
		var paraString = url.substring(url.indexOf('?') + 1, url.length)
			.split('&');
		if (!isNoToLower) {
			for (var i = 0; j = paraString[i]; i++) {
				paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] =
					j.substring(j.indexOf('=') + 1, j.length);
			}
		} else {
			for (var i = 0; j = paraString[i]; i++) {
				try {
					paraObj[j.substring(0, j.indexOf('='))] =
						decodeURIComponent(j.substring(j.indexOf('=') +
							1, j.length));
				} catch (ex) {
					paraObj[j.substring(0, j.indexOf('='))] =
						unescape(j.substring(j.indexOf('=') + 1, j.length));
				}
			}
		}
		return paraObj;
	}
};
var $HQ = new HQ();

//在登录成功后根据传过来的ID从后台查询用户
var navUsername = new Vue({
	el: '#daohang',
	data: {
		user: {},
		userIfo: {},
	},
	created: function() {
		//var self = this;
		//self.$set("timestamp", new Date().getTime());
		//$.post("oneshop.action", {
		//	'id': this.params.id
		//}, function(data) {
		//	self.user = data;
		//});
	},
	ready: function() {},
	methods: {},
})
define("load", function(require, exports, module) {
	$(window).on("hashchange", function(e) {
		var url = location.hash.substring(1);
		module.exports.url(url);
	});
	$(document).on("click", "a", function(e) {
		if (!$(this).attr("target") && $(this).attr("href")) {
			e.preventDefault();
			module.exports.page($(this).attr("href"));
		}
	});
	module.exports = {
		/**
		 * ����ҳ��Ľӿڷ���
		 * @desc ����ҳ��Ľӿڷ�����ҳ���ϵ�aԪ��ȫ��������ʹ�ø÷�����ʹ�ø÷������ص�ҳ��ᱻ��Ϊ������루in��
		 * @param url
		 */
		page: function(url) {
			if (url && url != '#' && /\.html/g.test(url)) {
				//var turl=((/\?/g).test(url))?url.replace(/\?\S*/,"")+"?"+encodeURIComponent(url.replace(/\S*\?/,"")):url;
				window.location.hash = 'modules/' + url;
				location.reload();
			}
		},
		/**
		 * ����url�ľ���ʵ�ַ���
		 * @param url
		 */
		url: function(url) {
			var self = this;
			$.ajax({
				type: 'GET',
				url: url,
				success: function(data) {
					$('#content').html(data);
				}
			});
		}
	};
});
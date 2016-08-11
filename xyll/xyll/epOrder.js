var epOrder = new Vue({
	el: '#epOrder',
	data: {
		orderIfon: {},
		orderIfonPage: {},
		pagePreviewData: {}, //顽兔图片遍历出的图片
		currentPage: '', //顽兔上传分页的第几页
		index: '1', //页数
		size: '7', //条数
		robState: '4', //状态  订单
		nowPage: '1', //现在第几页
		totalPage: '1' //共几页
	},
	created: function() {
		this.orderFindIfon();
	},
	ready: function() {},
	methods: {
		//查询用户订单
		orderFindIfon: function() {
			var url = 'udemand_method/find_byUserId';
			var self = this;
			var params = {};
			params.userId = sessionStorage.getItem('accountUUID');
			params.index = this.index;
			params.size = this.size;
			params.robState = this.robState
			$HQ.load(url, params, function(data) {
				setTimeout(function() {
					$('#background').css('display', 'none')
					$('#progressBar').css('display', 'none')
				}, 500)
				if (data.result.code == 202) {
					$('.nodata').css('display', 'inline-block')
				} else {
					$('.nodata').css('display', 'none')
				}
				//笨办法 要注意
				self.$set("orderIfon", '')
				self.$set('orderIfonPage', '')
				if(data.result.code =='202'){
					return false
				}
				self.$set("orderIfon", data.result)
				self.$set('orderIfonPage', data)
				self.totalPage = data.result.code !='202'?data.page.totalPage:1
				var total = data.page.total < '7' ? data.page.total : 7
				for (var i = 0; i < total; i++) {
					if (self.orderIfon[i].state == false) {
						self.orderIfon[i].state = '常规'
					} else if (self.orderIfon[i].state == true) {
						self.orderIfon[i].state = '加急'
					}
				}
			});
		},
		//分页
		page: function(e) {
			var page = $(e.target).data('page')
			switch (page) {
				case 'upPage':
					if (this.nowPage <= 1) {
						$HQ.topRightInfoTips({
							title: '已经是第一页',
						})
						return false
					}
					this.index--
						this.nowPage--
						break;
				case 'onePage':
					if (this.nowPage <= 1) {
						$HQ.topRightInfoTips({
							title: '已经是第一页',
						})
						return false
					}
					this.index = 1;
					this.nowPage = 1
					break;
				case 'nextPage':
					if (this.nowPage >= this.totalPage) {
						$HQ.topRightInfoTips({
							title: '已经是第最后一页',
						})
						return false
					}
					this.index++
						this.nowPage++
						break;
				case 'lastPage':
					if (this.nowPage >= this.totalPage) {
						$HQ.topRightInfoTips({
							title: '已经是第最后一页',
						})
						return false
					}
					this.index = this.totalPage
					this.nowPage = this.totalPage
					break;
				case 'Jump':
					if ($('.Jump').val() <= this.totalPage && $('.Jump').val() >= 1) {
						this.nowPage = $('.Jump').val()
						this.index = $('.Jump').val()
					} else {
						$HQ.topRightInfoTips({
							title: '最多只有' + this.totalPage + '页',
						})
						return false
					}
					break;
			}
			$('#background').css('display', 'block')
			$('#progressBar').css('display', 'block')
			this.orderFindIfon()
		},
		//选项卡 点击显示不同的订单
		chooseStyle: function(e) {
			$('.head span').css('background', '#2CBFBD')
			$(e.target).css('background', '#121921')
			$('#background').css('display', 'block')
			$('#progressBar').css('display', 'block')
			if ($(e.target).data('stype') == '待确定验货') {
				this.robState = 4;
				$('.con .kjd').addClass('show_order')
				$('.con .pdz').removeClass('show_order')
				$('.con .fwz').removeClass('show_order')
				$('.con .ywc').removeClass('show_order')
			} else if ($(e.target).data('stype') == '派单中') {
				this.robState = 0;
				$('.con .kjd').removeClass('show_order')
				$('.con .pdz').addClass('show_order')
				$('.con .fwz').removeClass('show_order')
				$('.con .ywc').removeClass('show_order')
			} else if ($(e.target).data('stype') == '服务中') {
				this.robState = 1;
				$('.con .kjd').removeClass('show_order')
				$('.con .pdz').removeClass('show_order')
				$('.con .fwz').addClass('show_order')
				$('.con .ywc').removeClass('show_order')
			} else if ($(e.target).data('stype') == '整个订单完成') {
				this.robState = 7;
				$('.con .kjd').removeClass('show_order')
				$('.con .pdz').removeClass('show_order')
				$('.con .fwz').removeClass('show_order')
				$('.con .ywc').addClass('show_order')
			}
			this.index = 1;
			this.nowPage = 1;
			this.orderFindIfon()
		},
		//确认收货
		sureGit: function(e) {
			var url = 'udemand_method/update_byRobStatus';
			var self = this;
			var params = {};
			params.demandId = $(e.target).data('xqid');
			params.robState = 5;
			params.serviceId = $(e.target).data('fwsid');
			$HQ.load(url, params, function(data) {
				if (data.result.code == '100') {
					var id = '#' + $(e.target).data('xqid')
					$(id).css('display', 'inline-block')
				} else {
					$HQ.topRightInfoTips({
						title: data.result.sub_msg,
					})
				}
			});

		},
		//确认评论
		surePf: function(e) {
			var url = 'ucomment_01_mehtod/save_comment';
			var self = this;
			var params = {};
			var id = '#' + $(e.target).data('xqid')
			params.demandId = $(e.target).data('xqid');
			params.commentBody = $(id).find('.pingfen textarea').val();
			params.score = $(id).find('.selectPf').val();
			$HQ.load(url, params, function(data) {
				$(id).css('display', 'none')
				if (data.result.code == '100') {
					self.orderFindIfon()
				} else {
					$HQ.topRightInfoTips({
						title: data.result.sub_msg,
					})
				}
			});
		},
		//轮播显示图片
		// pagePreview: function(e) {
		// var url = 'wanTuMethod/traverseElements';
		// var self = this;
		// var params = {};
		// params.fileName = '服务商测试';
		// params.currentPage = 1;
		// params.pageSize = 1;
		// $HQ.load(url, params, function(data) {
		// self.$set("pagePreviewData", data.result[0])
		// });
		// },
	}
});
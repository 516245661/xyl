var assignSendList = new Vue({
	el: '#assignSL',
	data: {
		messageAlls: {}, //存数据		
		messageOne: {},
		lll: 0,
		iNumPage: 1,
		allPage: 1,
		onOff: true,
		jump: '',
		jLocal: {}, //存地址栏参数
	},
	created: function() { //创建功能 开始就进行的方法
		this.findAll();
		this.start();
	},
	methods: {
		//取地址栏参数
		start: function() {
			this.jLocal = $HQ.getUrlParams();
		},
		//查询表comclassify里的信息	
		findAll: function(e) {
			if (this.onOff) {
				var name = e ? $(e.target).attr('name') : '';
				var url = "uService/findServiceByCondition";
				var params = {};
				var self = this;
				params.size = 15;
				switch (name) {
					case 'first':
						if (this.iNumPage != 1) {
							this.iNumPage = 1;
							params.index = this.iNumPage;
						} else if (this.iNumPage == 1) {
							return false;
						}
						break;
					case 'prev':
						//						params.index = this.iNumPage-1<=0?1:this.iNumPage-1;
						this.iNumPage--;
						if (this.iNumPage < 1) {
							this.iNumPage = 1;
							return false;
						} else if (this.iNumPage >= 1) {
							params.index = this.iNumPage;
						}
						break;
					case 'next':
						//						params.index = this.iNumPage+1>=this.allPage?this.allPage:this.iNumPage+1;
						this.iNumPage++;
						if (this.iNumPage > this.allPage) {
							this.iNumPage = this.allPage;
							return false;
						} else if (this.iNumPage <= this.allPage) {
							params.index = this.iNumPage;
						}
						break;
					case 'last':
						if (this.iNumPage != this.allPage) {
							this.iNumPage = this.allPage;
							params.index = this.allPage;
						} else if (this.iNumPage == this.allPage) {
							return false;
						};
						break;
					case 'jump':
						if (this.jump > this.allPage || this.jump <= 0 || this.jump == this.iNumPage || isNaN(this.jump)) {
							this.jump = "";
							return false;
						} else {
							params.index = this.jump;
						};
						break;
					default:
						params.index = this.iNumPage;
				}
				this.$set('iNumPage', params.index);
				this.onOff = false;
				$(".assignSL span").css("background-image", "url(../qian/img/loading.gif)");
				$("div.box").css("opacity", "0");
				$HQ.load(url, params, function(data) {
					self.$set("messageAlls", data.responseMsg);
					self.$set("allPage", data.responseMsg[0].totalPage);
					$(".assignSL span").css("background-image", "");
					$("div.box").css("opacity", "1");
					self.onOff = true;
				});
			}
		},

		gain: function(e) {
			this.lll = $(e.target).closest("ul").attr("data-yy") //获取点击的val值
		},
		upId: function() {
			var url = "uDemand/sendOrdersTest";
			var params = {};
			var self = this;
			params.demandId = this.jLocal.demandid
			params.serviceId = this.lll;
			params.robState = 0;
			$HQ.load(url, params, function(data) {
				if (data.responseMsg.code == 100) {
					alert("派单成功!")
					window.location.href = "indexPage.html#modules/iamHeadwaiter/appoSendSu.html?employerid=" + self.jLocal.employerid + "&accounttype=" + self.jLocal.accounttype + "&serviceid=" + self.lll;
				}else{
					alert(data)
				}

			})
		},
	}
});
//# sourceURL=assignSendList.js
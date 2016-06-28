var demandType = 1;
var totalPrice = 10 ;
$(".check").click(function() {
	var sum = parseInt($(".number select").val()) * parseInt($("p.number input.number").val());
	if ($(".check").is(':checked')) {
		sum = sum * 1.2
	} else {
		sum = sum * 1
	};
	if (isNaN(sum) || sum < 0) {
		sum = 0
	}
	$(".price").val(sum);
})

$(".number select").click(function(e) {
	var money = $(e.target).val();
	var sum = parseInt($(".number select").val()) * parseInt($("p.number input.number").val());
	if (isNaN(sum) || sum < 0) {
		sum = 0
	}
	if ($(".check").is(':checked')) {
		sum = sum * 1.2
	} else {
		sum = sum * 1
	};
	if (isNaN(sum) || sum < 0) {
		sum = 0
	}
	$(".price").val(sum);
});
$("p.number input.number").bind("input", function() {
		if ($("p.number input.number").val() < 0) {
			$("p.number input.number").val("0")
		}
		var sum = parseInt($(".number select").val()) * parseInt($("p.number input.number").val());
		if (isNaN(sum) || sum < 0) {
			sum = 0
		}
		if ($(".check").is(':checked')) {
			sum = sum * 1.2
		} else {
			sum = sum * 1
		};
		if (isNaN(sum) || sum < 0) {
			sum = 0
		}
		$(".price").val(sum); 
		totalPrice = sum
		
	})
	//选择风格id 最懂两个
$('.style strong').click(function(e) {
	if ($(this).attr('class') == 'active') {
		$(this).removeClass('active')
	} else if ($('.style .active').length < '2') {
		$(this).addClass('active')
	} else {
		alert('最多只能选择两个')
	}
})
//选择是修图还是排版
$('.demand strong').click(function(e){
	if($(this).attr('class') != 'training'){
		$('.demand .composition').css('background','#00a263')
		$('.demand .composition').css('color','white')
		$('.demand .training').css('background','white')
		$('.demand .training').css('color','black')
		demandType = $(this).data('xiuitu')
	}else{
		$('.demand .training').css('background','#00a263')
		$('.demand .training').css('color','white')
		$('.demand .composition').css('background','white')
		$('.demand .composition').css('color','black')
		demandType = $(this).data('xiuitu')
	}
})
var makeDemand = new Vue({
	el: '#makeDemand',
	data: {
		allIfon: {},
		uDemand: {},
		jLocal : {}, //存地址栏参数
	},
	created: function() {
		this.startFind(); //取地址栏参数
	},
	ready: function() {},
	methods: {
		//取地址栏参数
		startFind : function() {
			this.jLocal = $HQ.getUrlParams();
		},
		//数据填写完成上传数据 跳转支付
		itsok: function() {
			var url = 'uDemand/saveDemand';
			var self = this;
			var params = {};
			if (1 == this.uDemand.state) {
				params['uDemand.state'] = 1;
			} else {
				params['uDemand.state'] = 0;
			}
			params.styleId = 1 , 2 ;
			params['demandTitle'] = this.uDemand.demandTitle;
			params['demandDesc'] = this.uDemand.demanDesc;
			params['imgNumber'] =this.uDemand.imgNumber;
			params['totalPrice'] =  totalPrice;
			params['imgPrice'] = $('.imgPrice').val();
			params['demandType'] = demandType;
			params['serviceType'] = this.uDemand.serviceType;
//			params['userId'] = this.jLocal.employerid;
			$HQ.load(url, params, function(data) {
				var demandid = data.responseMsg.demandId
				window.location.href = 'indexPage.html#modules/iamHeadwaiter/payMoney.html?employerid=' + self.jLocal.employerid + '&accounttype=' + self.jLocal.accounttype + '&demandid=' + demandid;
			});
		}
	},
});
var vue_zhiling = new Vue({
	el: '#vue_zhiling',
	data: {
		vText:"",
		vHtml:"",
		vIf:"true",
		vShow:"true",
		vFor:[],
		isred:false,
		classA:"AAA",
		classB:"BBB",
		
	},
	created: function() {
		this.startShow();
	},
	ready: function() {},
	methods: {
		startShow: function() {
			this.vText = "这里是v-text指令";
			this.vHtml = "在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上";
			for(var i=0;i<5;i++){
				var a = i+1;
				this.vFor[i] = {'xx':'这里是数组'+a+'里面的内容，我们都被v-for给遍历出来了'};
			}
			console.log(this.isred)
		},
	}
});

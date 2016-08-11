var box = new Vue({
	el: '.box',
	data: {
		YY: [],
		MM: [],
		DD: [],
		tdd: '28',
	},
	created: function() {
		this.yy();
		this.mm();
		this.dd();
	},
	ready: function() {},
	methods: {
		yy: function() {
			for (var a = 0, i = 1900; i < 1900 + 150, a < 150; i++, a++) {
				this.YY[a] = i;
			}
		},
		mm: function() {
			for (var i = 0; i < 12; i++) {
				this.MM[i] = i + 1;
			}
		},
		dd: function() {
			for (var i = 0; i < this.tdd; i++) {
				this.DD[i] = i + 1;
			}
			console.log(this.DD);
		},
		changeE: function() {
			var dd = $('.MM').val()
			if (dd == '4' || dd == '6' || dd == '9' || dd == '11') {
				this.tdd = 30;
			} else if (dd == '2') {
				var findyy = $('.YY').val()
				if (findyy % 400 != 0 && findyy % 4 == 0) {
					this.tdd = 29;
				}
				if (findyy % 4 == 0 && findyy % 400 == 0) {
					this.tdd = 29;
				} else {
					this.tdd = 28;
				}
			} else {
				this.tdd = 31;
			}
			this.dd();
		},
	}
});
var o = {
	a :1 ,b : 2,
	m:function(){
		return this.a + 1 
	}
};
var b = Object.create(o)
b.a = 110 ;
var c =Object.create(b)
c.a = 249;

console.log('c:' + c.a );
console.log('m:' + c.m() );
console.log('b:' + b.a);
console.log('m:' + b.m());
console.log('a:' + o.a);
console.log('m:' + o.m());



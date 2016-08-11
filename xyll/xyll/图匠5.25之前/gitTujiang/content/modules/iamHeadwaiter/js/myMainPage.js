$(function(){
	$(".transac").find("a").click(function(){
		$(".transac a").removeClass("active");
		$(this).addClass("active");
		$(".specialCon>div").stop().fadeOut(500);
		$(".specialCon>div").eq($(this).index()).stop().fadeIn(500);
	})
})

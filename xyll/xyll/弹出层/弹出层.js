var ajaxbg = $("#background, #progressBar");
ajaxbg.hide();
$(document).ajaxStart(function() {
	ajaxbg.show();
}).ajaxStop(function() {
	ajaxbg.hide();
});

$(document).ready(function() {
	$("div").ajaxStop(function() {
		$('#background').css('display', 'block')
		$('#progressBar').css('display', 'block')
	});
	$("button").click(function() {
		$("div").load("/example/jquery/demo_ajax_load.txt");
		$("div").load("/example/jquery/demo_ajax_load.asp");
	});
});
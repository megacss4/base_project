$(document).ready(function () {
	footer();
});

$(window).on('load', function () {
	footer();
});

$(window).on('resize', function () {
	footer();
});


function footer() {
	if ($('#footer').length) {
		var $footerHeight = $('#footer').outerHeight();

		$('#layout').css('padding-bottom', $footerHeight);
		$('#footer').css('margin-top', -$footerHeight);
	}
}
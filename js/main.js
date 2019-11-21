$(document).ready(function() {
	$("body").removeClass("preload");
	$('.burger').click(function(){
		$(this).toggleClass('open');
		$("body").toggleClass('open');
	});
});

$(window).scroll(function(){
	if ( $(this).scrollTop() > 200 ) { 
		$('body').addClass("scrolled");
	} else { 
		$('body').removeClass("scrolled");
	}
});

$('a[href^="#"]').on('click',function(e) {
	e.preventDefault();
	var offset = 0;
	var target = this.hash;
	if ($(this).data('offset') != undefined) offset = $(this).data('offset');
	$('html, body').stop().animate({
		'scrollTop': $(target).offset().top - scrollOffset
	}, 500, 'swing', function() {});
});
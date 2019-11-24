$(document).ready(function() {
	$("body").removeClass("preload");
	$('.burger').click(function(){
		$(this).toggleClass('open');
		$("body").toggleClass('open');
	});
});

$(window).on('resize scroll load', function() {
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
		'scrollTop': $(target).offset().top - 0
	}, 1000, 'swing', function() {});
});


var duration = 50; // duration in seconds
var fadeAmount = 0.3; // fade duration amount relative to the time the image is visible

$(document).ready(function (){
	var images = $("#slideshow .item");
	var numImages = images.size();
	var durationMs = duration * 1000;
	var imageTime = durationMs / numImages; // time the image is visible 
	var fadeTime = imageTime * fadeAmount; // time for cross fading
	var visibleTime = imageTime  - (imageTime * fadeAmount * 2);// time the image is visible with opacity == 1
	var animDelay = visibleTime * (numImages - 1) + fadeTime * (numImages - 2); // animation delay/offset for a single image 

	images.each( function( index, element ){
		if(index != 0){
			$(element).css("opacity","0");
				setTimeout(function(){
					doAnimationLoop(element,fadeTime, visibleTime, fadeTime, animDelay);
				},visibleTime*index + fadeTime*(index-1));
		} else{
			setTimeout(function(){
				$(element).animate({opacity:0},fadeTime, function(){
					setTimeout(function(){
						doAnimationLoop(element,fadeTime, visibleTime, fadeTime, animDelay);
					}, animDelay )
				});
			},visibleTime);
		}
	});
});

// creates a animation loop
function doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime){
	fadeInOut(element,fadeInTime, visibleTime, fadeOutTime ,function(){
		setTimeout(function(){
			doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime);
		},pauseTime);
	});
}

// shorthand for in- and out-fading
function fadeInOut( element, fadeIn, visible, fadeOut, onComplete){
	return $(element).animate( {opacity:1}, fadeIn ).delay( visible ).animate( {opacity:0}, fadeOut, onComplete);
}

function parallaxHeader (){
	if ($(window).width() > 960) {

		var cover = document.querySelector('.js-parallax'),
		coverHeight = Math.round(cover.offsetHeight), translate, parallaxThreshold = 3;

		function parallax() {
			if (window.scrollY < coverHeight) {
				translate = Math.round(window.scrollY / parallaxThreshold);
				window.requestAnimationFrame(function () {
					cover.style.transform = 'translateY(' + translate + 'px)';
				});
			}
		}

		parallax();

		window.addEventListener('scroll', parallax, false);

		window.addEventListener('resize', debounce(function () {
			coverHeight = Math.round(cover.offsetHeight);
		}, 500));

	}
}

function debounce(fn, wait) {
	var timeout;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			fn.apply(this, arguments)
		}, (wait || 1));
	}
}


$.fn.isInViewport = function() {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll load', function() {

	parallaxHeader();

	$('.parallax').each(function() {
		var velocity = $(this).data("velocity");
		$(this).css('transform', 'translateY(-' + $(window).scrollTop() / velocity + 'px)');
	});

	$('.parallax-rotate').each(function() {
		var velocity = $(this).data("velocity");
		$(this).css('transform', 'translateY(-' + $(window).scrollTop() / velocity + 'px) rotate(' + $(window).scrollTop() / (velocity*2)   + 'deg)');
	});

	$('.parallax-rotate-slow').each(function() {
		var velocity = $(this).data("velocity");
		$(this).css('transform', 'translateY(-' + $(window).scrollTop() / velocity + 'px) rotate(' + $(window).scrollTop() / (velocity*15)   + 'deg)');
	});

});
var menutrigger = false;
$('#menu-button').click(function(event) {
	if(!menutrigger) {
		menuOut();
		$( ".menu" ).animate({
			left: 0,
		}, 400, "easeOutCubic" , function() {
			
		});
		menutrigger = true;
	} else {
		menuIn();
		$( ".menu" ).animate({
			left: '100%',
		}, 400, "easeOutQuad", function() {
			
		});
		menutrigger = false;
	}
});

function menuOut() {
	$('.hamburger img').attr('src', '/images/cross2.png');
}

function menuIn() {
	$('.hamburger img').attr('src', '/images/burger2.png');
}

$( window ).resize(function() {
  if($(window).width() >= 851) {
  	$(".menu").css('left', '');
  }
});

$(document).ready(function() {
	$('#main-background-image').addClass('zoomed');
	
	var changeimg = function(){
  		if(imgnum === 0){
  			$('.layer').css('background-color', 'RGBA(0,0,0,1');
  			setTimeout(function(){
  				$('#main-background-image').removeClass('zoomed').addClass(imgArray[imgnum]).removeClass('bg-image-three');
  			},500);
  		} else {
  			$('.layer').css('background-color', 'RGBA(0,0,0,1');
  			setTimeout(function(){
  				$('#main-background-image').removeClass('zoomed').addClass(imgArray[imgnum]).removeClass(imgArray[imgnum-1]);
  			},500);
  		}
  		setTimeout(function(){
  			$('.layer').css('background-color', 'RGBA(0,0,0,0.8');
  			$('#main-background-image').addClass('zoomed');	
  			
  			if(imgnum === 2) {
  				imgnum = 0;
  			} else {
  				imgnum++;
  			}
  		},1000);

  		setTimeout(changeimg, 25000);
  	};
  	setTimeout(changeimg, 25000);

});
var imgArray = ["bg-image-one", "bg-image-two", "bg-image-three"];
var imgnum = 1;

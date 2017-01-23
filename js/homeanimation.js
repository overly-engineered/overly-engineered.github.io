var interaction = false;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.clientWidth;
var height = canvas.clientHeight;
canvas.width = width;
canvas.height = height;
var circles = [];
var centerX = width/2;
var centerY = height/2;
var radius = width > height ?  (height/2) - 50: (width/2) - 50;
var startAngle = 0;
var endAngle = Math.floor(Math.random() * 4) + 2;
var counterClockwise = false;
ctx.lineWidth = 3;
var circleSpace = width < 700 ? 6 : 10;
var circleAmount = radius/circleSpace;
ctx.shadowColor = "rgba(0,0,0,1)";
ctx.shadowBlur = 10;
var ongoingTouches = [];
window.onload = function(){
	create();
}

function create(){
	for(i = 0; i < circleAmount; i++) {
		var cDirection = Math.random() > .5 ? true : false;
		circles.push({
			x: centerX,
			y: centerY,
			r: (radius - ((circleSpace)*(i))),
			sA: startAngle,
			eA: endAngle,
			direction: cDirection,
			v: (Math.random() * .3) + .1,
			color: "rgba("+Math.floor(((Math.random()*255) + 1))+","+Math.floor(((Math.random()*255) + 1))+","+Math.floor(((Math.random()*255) + 1))+"," + (Math.random() + .4) + ")"
		});
	}
	circleInit();
}
function draw(){
	ctx.clearRect(0,0,width,height);
	circles.forEach(drawCircle);
}

function drawCircle(elem, i, arr){
	ctx.beginPath();
	ctx.strokeStyle = elem.color;
	ctx.arc(elem.x, elem.y, elem.r, elem.sA, elem.eA, false);
	ctx.stroke();
	if(elem.direction){
		elem.sA += (elem.v)/10;
		elem.eA += (elem.v)/10;
	} else {
		elem.sA -= (elem.v)/10;
		elem.eA -= (elem.v)/10;
	}
	if(elem.sA > 25){
		elem.direction = false;
	} else if(elem.sA < -25){
		elem.direction = true;
	}
	if((i+1) === arr.length && !interaction) {
		interaction = false;
		globalAnim = window.requestAnimationFrame(draw);
  }
}

function moveInteraction(e, bool){
	console.log('here');
	if(bool){
		var rect = canvas.getBoundingClientRect();
		var mouseX = e.clientX - rect.left;
		var mouseY = e.clientY - rect.top;
		var xOffset = mouseX - (width/2);
		var yOffset = mouseY - (height/2);
		var angle = Math.atan2(yOffset, xOffset);
		circles.forEach(function(elem, i){
			var difference = elem.eA - elem.sA;
			elem.sA = (angle - (difference/2)) + Math.PI;
			elem.eA = (angle + (difference/2)) + Math.PI;
		});
		draw();
	} else {
		var touches = e.changedTouches;
		var rect = canvas.getBoundingClientRect();
		var touchX = touches[0].clientX - rect.left;
		var touchY = touches[0].clientY - rect.top;
		var xOffset = touchX - (width/2);
		var yOffset = touchY - (height/2);
		var angle = Math.atan2(yOffset, xOffset);
		circles.forEach(function(elem, i){
			var difference = elem.eA - elem.sA;
			elem.sA = (angle - (difference/2)) + Math.PI;
			elem.eA = (angle + (difference/2)) + Math.PI;
		});
		draw();
	}
}
function handleMouse(e){
	  interaction = true;
		cancelAnimationFrame(globalAnim);
		moveInteraction(e, true);
}

function handleTouch(e){
	e.preventDefault();
	interaction = true;
	cancelAnimationFrame(globalAnim);
	moveInteraction(e, false);

}

function handleTouchMove(e){
	e.preventDefault();
	interaction = true;
	cancelAnimationFrame(globalAnim);
	moveInteraction(e, false);
}

circles.forEach(function(elem, i){
	ctx.beginPath();
	ctx.strokeStyle = elem.color;
	ctx.arc(elem.x, elem.y, elem.r, elem.sA, elem.eA, false);
	ctx.stroke();
});
function circleInit(){
		var can = document.getElementById('canvas');
		can.addEventListener("mousemove", function(evt){handleMouse(evt);});
		can.addEventListener("mouseout", function(evt){
			interaction = false;
			globalAnim = window.requestAnimationFrame(draw);
		});
		can.addEventListener("touchstart", handleTouch, false);
		can.addEventListener("touchmove", handleTouch, false);
		can.addEventListener("touchend", function(evt){
			interaction = false;
			globalAnim = window.requestAnimationFrame(draw);
		})
		globalAnim = window.requestAnimationFrame(draw);
		//document.getElementById('canvas').addEventListener("click", function(evt){handleClick(evt);});

}

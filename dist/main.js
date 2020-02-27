"use strict";console.log("Hey, my name is Jamie."),console.log("I make web apps and websites."),window.jamie={github:"https://github.com/overly-engineered",codePen:"https://codepen.io/overlyenginnered/",email:"jwrpettman@gmail.com",twitter:"https://twitter.com/PettmanJamie"},console.log(window.jamie);
"use strict";var interaction=!1,canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),width=canvas.clientWidth,height=canvas.clientHeight;canvas.width=width,canvas.height=height;var circles=[],centerX=width/2,centerY=height/2,radius=height<width?height/2-50:width/2-50,startAngle=0,endAngle=Math.floor(4*Math.random())+2,counterClockwise=!1;ctx.lineWidth=3;var circleSpace=width<700?2:10,circleAmount=radius/circleSpace;ctx.shadowColor="rgba(0,0,0,1)",ctx.shadowBlur=10;var ongoingTouches=[];function create(){for(var t=0;t<circleAmount;t++){var e=.5<Math.random();circles.push({x:centerX,y:centerY,r:radius-circleSpace*t,sA:startAngle,eA:endAngle,direction:e,v:.3*Math.random()+.1,color:"rgba("+Math.floor(255*Math.random()+1)+","+Math.floor(255*Math.random()+1)+","+Math.floor(255*Math.random()+1)+","+(Math.random()+.4)+")"})}circleInit()}function draw(){ctx.clearRect(0,0,width,height),circles.forEach(drawCircle)}function drawCircle(t,e,n){ctx.beginPath(),ctx.strokeStyle=t.color,ctx.arc(t.x,t.y,t.r,t.sA,t.eA,!1),ctx.stroke(),t.direction?(t.sA+=t.v/10,t.eA+=t.v/10):(t.sA-=t.v/10,t.eA-=t.v/10),25<t.sA?t.direction=!1:t.sA<-25&&(t.direction=!0),e+1!==n.length||interaction||(interaction=!1,window.globalAnim=window.requestAnimationFrame(draw))}function moveInteraction(t,e){if(e){var n=canvas.getBoundingClientRect(),a=t.clientX-n.left,i=t.clientY-n.top,c=a-width/2,o=i-height/2,r=Math.atan2(o,c);circles.forEach(function(t,e){var n=t.eA-t.sA;t.sA=r-n/2+Math.PI,t.eA=r+n/2+Math.PI}),draw()}else{var d=t.changedTouches,h=(n=canvas.getBoundingClientRect(),d[0].clientX-n.left),l=d[0].clientY-n.top;c=h-width/2,o=l-height/2,r=Math.atan2(o,c);circles.forEach(function(t,e){var n=t.eA-t.sA;t.sA=r-n/2+Math.PI,t.eA=r+n/2+Math.PI}),draw()}}function handleMouse(t){interaction=!0,cancelAnimationFrame(window.globalAnim),moveInteraction(t,!0)}function handleTouch(t){t.preventDefault(),interaction=!0,cancelAnimationFrame(window.globalAnim),moveInteraction(t,!1)}function handleTouchMove(t){t.preventDefault(),interaction=!0,cancelAnimationFrame(window.globalAnim),moveInteraction(t,!1)}function circleInit(){var t=document.getElementById("canvas");t.addEventListener("mousemove",function(t){handleMouse(t)}),t.addEventListener("mouseout",function(t){interaction=!1,window.globalAnim=window.requestAnimationFrame(draw)}),t.addEventListener("touchstart",handleTouch,!1),t.addEventListener("touchmove",handleTouch,!1),t.addEventListener("touchend",function(t){interaction=!1,window.globalAnim=window.requestAnimationFrame(draw)}),window.globalAnim=window.requestAnimationFrame(draw)}create(),circles.forEach(function(t,e){ctx.beginPath(),ctx.strokeStyle=t.color,ctx.arc(t.x,t.y,t.r,t.sA,t.eA,!1),ctx.stroke()});
"use strict";
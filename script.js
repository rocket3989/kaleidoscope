var r = [];
var theta = [];
var penDown = false;
var cursor = false;
var canvas = document.getElementById('drawing');
var ctx = canvas.getContext('2d');
var width = $('#line_width').val();
var symmetry = $('#symmetry').val();
var mirror = false;
var brush = 'Normal';
var start;

// Changes to the form input trigger variable reloads
$('#line_width').change(function (){
	if ($('#line_width').val() <= 0)
		$('#line_width').val(1);
	width = $('#line_width').val();
});
$('#symmetry').change(function (){
	if ($('#symmetry').val() <= 0){
		alert("symmetry is typically constrained to counting numbers");
		$('#symmetry').val(1);
	}
	symmetry = $('#symmetry').val();
});
$('#mirror').change(function (){
	mirror = !mirror;
});
$('input[type=radio][name=brush]').change(function(){
	brush = this.value;
	penDown = false;
})
$("#background").click(function(){
	ctx.fillStyle=rgbPick;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
});
$("#reset").click(function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});



function transform(){
	pos = getMousePos();
	theta[1] = Math.atan2(pos.y,pos.x);
	r[1] = Math.sqrt(pos.x*pos.x+pos.y*pos.y);
	
}
function getMousePos() {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left-canvas.width/2,
      y: event.clientY - rect.top-canvas.height/2
    };
}


$('#drawing').mouseover(function(){
	cursor = true;
	$('.cursor').show();
});
$('#drawing').mouseout(function(){
	cursor = false;
	$('.cursor').hide();
});
$('body').mousedown(function(){
	transform();
	theta[0]=theta[1];
	r[0]=r[1];
	draw();
	penDown = true;
	start = {x: event.clientX, y:event.clientY-width/2};
	
});
$('body').mouseup(function(){
	switch(brush){
		case 'Straight':
			transform();
			draw();
			$('.line').hide();
		case 'Normal':
		case 'Spray':
			penDown = false;
			break;
	}
});
$('body').mousemove(function(){
	switch(brush){
		case 'Straight':
			if(penDown)
				lineDiv();
			break;
		case 'Normal':
			if(penDown){
				theta[0]=theta[1];
				r[0]=r[1];
				transform();
				draw();
			}
			break;
		case 'Spray':
			if(penDown){
				transform();
				draw();
			}
			break;
	}

	$('.cursor').css({top: event.clientY-1-width/2, left:  event.clientX-1-width/2,width:width,height:width});
});

function lineDiv(){
	
	end = {x: event.clientX, y:event.clientY-width/2};	
	let xdiff = start.x-end.x;
	let ydiff = start.y-end.y;

	let dist = Math.sqrt(xdiff*xdiff+ydiff*ydiff);
	let slope = Math.atan2(ydiff,xdiff);
	$('.line').css({
		width: dist,
		height: width,
		top: (start.y+end.y)/2+1,
		left: (start.x+end.x)/2 -dist/2 + 1,
		transform: 'rotate(' + (slope*180)/Math.PI + 'deg)',
		'background-color': rgbPick
	});
	$('.line').show();


}
function draw(){
	ctx.lineWidth = width;
	ctx.strokeStyle = rgbPick;
	for(diff = 0; diff < symmetry; diff++){
		let x0 = canvas.width/2 + r[0]*Math.cos(theta[0]+(diff*2*Math.PI)/symmetry);
		let y0 = canvas.height/2 + r[0]*Math.sin(theta[0]+(diff*2*Math.PI)/symmetry);
		let x1 = canvas.width/2 + r[1]*Math.cos(theta[1]+(diff*2*Math.PI)/symmetry);
		let y1 = canvas.height/2 + r[1]*Math.sin(theta[1]+(diff*2*Math.PI)/symmetry);
		ctx.beginPath();
		ctx.moveTo(x0,y0);
		ctx.lineTo(x1,y1);
		ctx.stroke();
		ctx.beginPath();
		if (width>=2)
			ctx.arc(x1, y1, width/2, 0, 2 * Math.PI, false);
		ctx.fillStyle = rgbPick;
		ctx.fill();
		if(mirror){
			let x0 = canvas.width/2 + r[0]*Math.cos(-theta[0]+(diff*2*Math.PI)/symmetry);
			let y0 = canvas.height/2 + r[0]*Math.sin(-theta[0]+(diff*2*Math.PI)/symmetry);
			let x1 = canvas.width/2 + r[1]*Math.cos(-theta[1]+(diff*2*Math.PI)/symmetry);
			let y1 = canvas.height/2 + r[1]*Math.sin(-theta[1]+(diff*2*Math.PI)/symmetry);
			ctx.beginPath();
			ctx.moveTo(x0,y0);
			ctx.lineTo(x1,y1);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(x1, y1, (width >= 2 ? (width/2) : 0), 0, 2 * Math.PI, false);
			ctx.fillStyle = rgbPick;
			ctx.fill();
		}
	}
}
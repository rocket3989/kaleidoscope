var r = [];
var theta = [];
var penDown = false;
var canvas = document.getElementById('drawing');
var ctx = canvas.getContext('2d');


function transform(){
	pos = getMousePos();
	theta[1] = Math.atan2(pos.y,pos.x);
	r[1] = Math.sqrt(pos.x*pos.x+pos.y*pos.y);
	
}
function getMousePos() {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left-canvas.width/2,
      y: event.clientY - rect.top-canvas.height/2
    };
}
$('body').mousedown(function(){
	transform();
	theta[0]=theta[1];
	r[0]=r[1];
	draw();
	penDown = true;
});
$('body').mouseup(function(){
	penDown = false;});

$('body').mousemove(function(){
	if(penDown){
		theta[0]=theta[1];
		r[0]=r[1];
		transform();
		draw(false);
	}
});
$("#reset").click(function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});
function draw(){
	let symmetry = $("#symmetry").val();
	let width = $("#line_width").val();
	ctx.lineWidth = width;
	ctx.strokeStyle = rgbPick;
	console.log(rgb);
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
		ctx.arc(x1, y1, (width >= 2 ? (width/2) : 0), 0, 2 * Math.PI, false);
		ctx.fillStyle = rgbPick;
		ctx.fill();
	}
}
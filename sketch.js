let symmetry = 6;
let size = 20;
function setup() {
	createCanvas(windowWidth, windowHeight);
	fill('red');
	noStroke();
	noLoop();
}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged(){
	let x = mouseX - width/2;
	let y = mouseY - height/2;
	
	let theta = atan(y/x);
	let r = (x > 0 ? 1 :-1)*sqrt(x*x+y*y);

	for(diff = 0; diff < symmetry; diff++){
		ellipse(width/2+r*cos(theta+(diff*2*PI)/symmetry),height/2+r*sin(theta+(diff*2*PI)/symmetry),size,size);
	}



	

}
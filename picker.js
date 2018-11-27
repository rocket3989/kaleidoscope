var picker = document.getElementById('canvas_picker').getContext('2d');
var onPick = false;
var rgbPick = '#000';
var rbg = [];
picker.drawImage(document.getElementById('colors'),0,0);
function pickColor(){
    let rect = document.getElementById('canvas_picker').getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    rgb = picker.getImageData(x, y, 1, 1).data;
    rgbPick = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    $('#rgb').css("background-color", rgbPick);
}
$('#canvas_picker').mousedown(function(){
    onPick = true;
    pickColor();
});
$('body').mouseup(function(){
    onPick = false;
});
$('#canvas_picker').mousemove(function(){
    if(onPick)
    pickColor();
});
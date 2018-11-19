var picker = document.getElementById('canvas_picker').getContext('2d');
var onPick = false;
var rgbPick = '#000';
picker.drawImage(document.getElementById('colors'),0,0);

$('#canvas_picker').mousedown(function(){
    onPick = true;
});
$('body').mouseup(function(){
    onPick = false;
});
$('#canvas_picker').mousemove(function(){
    if(onPick){
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;
        let imgData = picker.getImageData(x, y, 1, 1).data;
        rgbPick = 'rgb(' + imgData[0] + ',' + imgData[1] + ',' + imgData[2] + ')';
        $('#rgb').css("background-color", rgbPick);
    }
});
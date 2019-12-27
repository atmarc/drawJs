canvas = document.getElementById("layer1");
canvas.width = document.documentElement.clientWidth - 50;
canvas.height = document.documentElement.clientHeight - 50;

canvas2 = document.getElementById("layer2");
canvas2.width = document.documentElement.clientWidth - 50;
canvas2.height = document.documentElement.clientHeight - 50;


const d = new drawTool("layer1");
const d2 = new drawTool("layer2");
var m1 = 10;
var m2 = 10;
var l1 = 300;
var l2 = 300;
var angle1 = Math.PI/4;
var angle2 = Math.PI/4;
var g = 10;
var x1 = 0; 
var x2 = 0; 
var y1 = l1; 
var y2 = l2; 

d.translate(d.width/2, 100);
d2.translate(d.width/2, 100);

frameN = 0;
function update () {
    d.clearAll();
    d.circle(0,0,5);
    angle1 = Math.cos(g/l1 * frameN);
    d.rotate(-angle1);
    d2.rotate(-angle1);
    d2.dot(x1, y1, "red");
    d.line(0, 0, x1, y1);
    d.circle(x1, y1, m1, true);
    ++frameN;
    d.rotate(angle1);
    d2.rotate(angle1);
    
}

    d.setInterval(update, 20);
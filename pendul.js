canvas = document.getElementById("layer1");
canvas.width = document.documentElement.clientWidth - 50;
canvas.height = document.documentElement.clientHeight * 1.5;

canvas2 = document.getElementById("layer2");
canvas2.width = document.documentElement.clientWidth - 50;
canvas2.height = document.documentElement.clientHeight * 1.5;

var m1Slider = document.getElementById("m1Slider");

// Update the current slider value (each time you drag the slider handle)
m1Slider.oninput = function() {
    m1 = this.value;
}

const d = new drawTool("layer1");
const d2 = new drawTool("layer2");

var m1 = 10;
var m2 = 10;
var l1 = 150;
var l2 = 150;
var angle1 = Math.PI/3;
var angle2 = Math.PI/3;
var g = 1.01;
var x1 = 0; 
var x2 = 0; 
var y1 = l1; 
var y2 = l1 + l2; 
var a1 = 0;
var a2 = 0;
var v1 = 0;
var v2 = 0;
var px2 = 0;
var py2 = 0;

d.translate(d.width/2, l1 + l2);
d2.translate(d.width/2, l1 + l2);

frameN = 0;

function update () {
    d.clearAll();
    d.circle(0, 0, 5);
    a1 = calcAngle1();
    a2 = calcAngle2(); 

    x1 = l1 * Math.sin(angle1);
    y1 = l1 * Math.cos(angle1);
    
    x2 = x1 + l2 * Math.sin(angle2);
    y2 = y1 + l2 * Math.cos(angle2);

    //Linia
    if (frameN > 1)
        d2.line(x2, y2, px2, py2, "red");
    
    //Primer pendul
    d.line(0, 0, x1, y1);
    d.circle(x1, y1, m1, true);

    //Segon pendul
    d.line(x1, y1, x2, y2);
    d.circle(x2, y2, m2, true);
    
    v1 += a1;
    v2 += a2;

    angle1 += v1;
    angle2 += v2;

    console.log(v1);
    console.log(v2);

    if (v1 > 10 || v2 > 10) {
        console.log("bug")
    }

    ++frameN;

    px2 = x2;
    py2 = y2;

}

function calcAngle1 () {
    let num1 = -g * ((2.0 * m1) + m2) * Math.sin(angle1);
    let num2 = -m2 * g * Math.sin(angle1 - (2.0 * angle2));
    let num3 = -2.0 * Math.sin(angle1 - angle2) * m2 * 
        ((v2 * v2 * l2) + (v1 * v1 * l1 * Math.cos(angle1 - angle2)));
    let den = l1 * ((2.0 * m1) + m2 - (m2 * Math.cos(2.0 * angle1 - 2.0 * angle2)));
    return ((num1 + num2 + num3) / den);
}

function calcAngle2 () {
    let num1 = 2.0 * Math.sin(angle1 - angle2);
    let num2 = v1 * v1 * l1 * (m1 + m2);
    let num3 = g * (m1 + m2) * Math.cos(angle1);
    let num4 = v2 * v2 * l2 * m2 * Math.cos(angle1 - angle2);
    let den = l2 * ((2.0 * m1) + m2 - (m2 * Math.cos((2.0 * angle1) - (2.0 * angle2))));
    return ((num1 * (num2 + num3 + num4)) / den);
}

d.setInterval(update, 20);
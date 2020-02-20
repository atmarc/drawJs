canvas = document.getElementById("myCanvas");
canvas.height = document.documentElement.clientHeight - 50;
canvas.width = canvas.height;

const d = new drawTool("myCanvas");
d.translate(d.width/2, d.height/2);

var zoom = d.width/2;
var xOffset = -150;
var yOffset = 0;
var nIter = 100;

function abs(x) {
    if (x < 0) return -x;
    return x;
}

function mandelbrotColor(a, b) {
    let i = 0;
    let x = (a + xOffset)/(zoom);
    let y = (b + yOffset)/(zoom);
    let zx = x;
    let zy = y;
    while (abs(zx * zy) < 5 && i < nIter) {
        let tempZx = zx;
        zx = zx*zx - zy*zy + x;
        zy = tempZx*zy*2 + y;
        ++i;
    }
    let color = Math.round(0xFFFFFF*((nIter - i)/nIter));
    return color.toString(16);
}

function drawMandelbrot() {
    for (let i = -d.width/2; i < d.width/2; ++i) {
        for (let j = -d.height/2; j < d.height/2; ++j) {
            let c = mandelbrotColor(i, j).substr(0, 6);
            if (c.length < 6)
                for (let i = c.length; i < 6; ++i) c = "0" + c;
    
                d.dot(i, j, {color: "#" + c});
        }
    }
}

drawMandelbrot();

onclick = (e) => {
    console.log("x: " + e.x + " y: " + e.y);
    console.log("x: " + e.clientX + " y: " + e.clientY);
    zoom += d.width/10;
    // nIter += 10;
    let x = e.clientX;
    let y = e.clientY;
    xOffset = x - 150 - d.width/2;
    yOffset = y - d.width/2;
    drawMandelbrot();
}
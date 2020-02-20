canvas = document.getElementById("myCanvas");
canvas.height = document.documentElement.clientHeight - 50;
canvas.width = document.documentElement.clientWidth - 50;

function abs(x) {
    if (x < 0) return -x;
    return x;
}

// Primer altura, segon amplada
function drawElipse (x1, y1, x2, y2, quadrant, color) {
    var PI2 = Math.PI/2;
    var height = Math.max(abs(x1), abs(y1));
    var width = Math.max(abs(x2), abs(y2));
    var ratio = height/width;
    var radius = Math.max(height, width)/2;
    var increment = 1/radius;
    var cx = x1 + width/2;
    var cy = y1 + height/2;

    d.ctx.beginPath();
    
    if (quadrant == 1) {
        var x = cx + radius * Math.cos(0);
        var y = cy - ratio * radius * Math.sin(0);
        d.ctx.lineTo(x, y);
        for (var r = increment; r < PI2; r += increment) {
            x = cx + radius * Math.cos(r);
            y = cy - ratio * radius * Math.sin(r);
            d.ctx.lineTo(x, y);
        }
    }
    else if (quadrant == 2) {
        var x = cx + radius * Math.cos(PI2);
        var y = cy - ratio * radius * Math.sin(PI2);
        d.ctx.lineTo(x, y);
        for (var r = PI2; r < PI2*2; r += increment) {
            x = cx + radius * Math.cos(r);
            y = cy - ratio * radius * Math.sin(r);
            d.ctx.lineTo(x, y);
        }
    }
    else if (quadrant == 3) {
        var x = cx + radius * Math.cos(Math.PI);
        var y = cy - ratio * radius * Math.sin(Math.PI);
        d.ctx.lineTo(x, y);
        for (var r = Math.PI; r < PI2*3; r += increment) {
            x = cx + radius * Math.cos(r);
            y = cy - ratio * radius * Math.sin(r);
            d.ctx.lineTo(x, y);
        }
    }
    else if (quadrant == 4) {
        var x = cx + radius * Math.cos(PI2*3);
        var y = cy - ratio * radius * Math.sin(PI2*3);
        d.ctx.lineTo(x, y);
        for (var r = PI2*3; r < Math.PI*2; r += increment) {
            x = cx + radius * Math.cos(r);
            y = cy - ratio * radius * Math.sin(r);
            d.ctx.lineTo(x, y);
        }
    }
    if (color !== undefined) 
        d.ctx.strokeStyle = color; 
    d.ctx.stroke();
}

const d = new drawTool("myCanvas");
// d.backbroung("black");
d.translate(d.width/2, d.height/2);

var n1 = 1;
var n2 = 1;
var direction = 0;

while (n1 < d.width/2) {
    drawElipse(n1, 0, n2, 0, 1, "green");
    aux = n2;
    n2 += n1;
    n1 = aux;
    drawElipse(0, n1, n2, 0, 2, "red");
    aux = n2;
    n2 += n1;
    n1 = aux;
    drawElipse(-n1, 0, n2, 0, 3, "blue");
    aux = n2;
    n2 += n1;
    n1 = aux;
    drawElipse(0, -n1, n2, 0, 4, "yellow");
    aux = n2;
    n2 += n1;
    n1 = aux;
    console.log(n1);
}

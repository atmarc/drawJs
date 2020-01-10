var canvas = document.getElementById("myCanvas");
canvas.width = document.documentElement.clientWidth - 50;
canvas.height = document.documentElement.clientHeight - 50;

const d = new drawTool("myCanvas");
// El Buges quien lo lea

d.mouseX = 0;
d.mouseY = 0;

onmousemove = (e) => {
    d.mouseX = e.clientX;
    d.mouseY = e.clientY;
}

var numWalls = 1;

var walls = [];

for (let i = 0; i < numWalls; ++i) {
    // var x1 = Math.random() * d.width; 
    // var x2 = Math.random() * d.width; 
    // var y1 = Math.random() * d.height; 
    // var y2 = Math.random() * d.height; 
    var x1 = 400; 
    var x2 = 700; 
    var y1 = 100; 
    var y2 = 400; 
    walls.push([x1,y1,x2,y2]);
    walls.push([0,0,0,d.height]);
    walls.push([0,d.height, d.width, d.height]);
    walls.push([d.width, d.height, d.width, 0]);
    walls.push([d.width, 0, 0, 0]);
}

function drawWalls() {
    for (i in walls) {
        w = walls[i];
        d.line(w[0], w[1], w[2], w[3], {color: "white", width: 3});
    }
}

// Comprova que el punt és del segment
function check (x, y, x1, y1, x2, y2) {
    if (x1 > x2) {
        if (x > x1) return;
        if (x < x2) return;
    }
    else {
        if (x < x1) return;
        if (x > x2) return;
    }
    if (y1 > y2) {
        if (y > y1) return;
        if (y < y2) return;
    }
    else {
        if (y < y1) return;
        if (y > y2) return;
    }
    return {x, y};
}

function calcM(v1, v2, w, x3, y3) {
    let x1 = w[0];
    let y1 = w[1];
    let x2 = w[2];
    let y2 = w[3];
    let u1 = x1 - x2;
    let u2 = y1 - y2;
    
    let a = v2/v1;
    let c = (y3*v1 - x3*v2)/v1;
    let b = u2/u1;
    let d = y1 - (x1*u2)/u1;
    let x = (d - c)/(a - b);
    let y = a*((d - c)/(a - b)) + c; 

    if (u1 == 0) {
        x = x1;
        y = x*a + c;
        return check(x, y, x1, y1, x2, y2);  
    }
    
    if (u2 == 0) {
        y = y1;
        if (u1 == 0)
            x = (d - y)/b;
        else
            x = (c - y)/a;
        return check(x, y, x1, y1, x2, y2);  
    }

    if (v1 == 0) {
        x = x3;
        y = x*b + d;
        return check(x, y, x1, y1, x2, y2);  
    }
    if (v2 == 0) {
        y = y3;
        if (u1 == 0)
            x = (d - y)/b;
        else
            x = (c - y)/a;
        return check(x, y, x1, y1, x2, y2);  
    }

    return check(x, y, x1, y1, x2, y2);  
    // return {x, y};
}

function abs(x) {
    if (x < 0) return -x;
    else return x;
}

function dist(p1, p2) {
    console.log(p1);
    console.log(p2);
    return Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y));
}

function drawRays() {
    var c = ["yellow", "orange", "blue", "brown", "red", "purple", "white", "green"];
    let j = 0;
    var m = {x: d.mouseX, y: d.mouseY};
    for (let a = 0; a < 2*Math.PI; a += Math.PI/4) {
        let sin = Math.sin(a);
        let cos = Math.cos(a);
        let M = {x: Infinity, y: Infinity};
        let minDist = Infinity;
        for (let i = 0; i < walls.length; ++i) {
            var aux = calcM(cos, sin, walls[i], d.mouseX, d.mouseY);
            // Només volem pintar la primera paret que ens trobem
            if (aux !== undefined) {
                var distance = dist(m, aux);
                console.log(distance);
                if (distance < minDist) {
                    M = aux;
                    minDist = distance;
                }
            }
        }
        if (M !== undefined) {
            d.line(d.mouseX, d.mouseY, M.x, M.y, {color:c[j], width: 2});
        } 
    } 
        
}

function update() {
    d.backbroung("black");
    drawWalls();
    drawRays();
    d.circle(d.mouseX, d.mouseY, 10, {color: "white"});
}

d.setInterval(update, 500);
canvas = document.getElementById("myCanvas");
canvas.width = document.documentElement.clientWidth - 50;
canvas.height = document.documentElement.clientHeight - 50;

function mandelbrotColor(x, y) {
    if (x%2 == 0) {
        return "green";
    }
    else return "blue";
}

const d = new drawTool("myCanvas");
d.backbroung("black");
d.translate(d.width/2, d.height/2);

for (let i = -d.width/2; i <= d.width/2; ++i) {
    for (let j = -d.height/2; j <= d.height/2; ++j) {
        let c = mandelbrotColor(i, j); 
        d.dot(i, j, {color: c});        
    }
}
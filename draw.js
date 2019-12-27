function drawTool (canvas) {
    this.setup = (canvas) => {
        this.canv = document.getElementById(canvas);
        this.ctx = this.canv.getContext("2d");
        this.width = this.canv.width;
        this.height = this.canv.height;
        this.xOffset = 0;
        this.yOffset = 0;
    }    
    
    if (canvas != undefined) {
        this.setup(canvas);
    }

    this.dot = (x, y, color='black') => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    } 
    
    this.rectangle = (x, y, w, h, color='black', center=true, stroke=false, width=1, sc="black") => {
        this.ctx.fillStyle = color;1
        if (center)
            this.ctx.fillRect(x - w/2, y - h/2, w, h);
        else
            this.ctx.fillRect(x, y, w, h);
        if (stroke) {
            console.log('stroke');
            this.ctx.beginPath();
            this.ctx.strokeStyle = sc;
            this.ctx.lineWidth = w;
            this.ctx.stroke();
            this.ctx.closePath();        
        }

    }

    this.translate = (x, y) => {
        this.ctx.translate(x, y);
        this.xOffset += x;
        this.yOffset += y;
    }

    this.circle = (x, y, r, color = "black", fill=true, w=1) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        if (fill) {
            this.ctx.fill();
        }
        else {  
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = w;
            this.ctx.stroke();
        }
        this.ctx.closePath();        
    }

    this.line = (x1, y1, x2, y2, color = "black", width=1) => {
        this.ctx.beginPath(); 
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color; 
        this.ctx.stroke(); 
        this.ctx.closePath();        
    }

    this.clearRect = (x1, y1, x2, y2, color="white") => {
        this.ctx.fillStyle = color;
        this.ctx.clearRect(x1, y1, x2, y2);
    } 
    
    this.clearAll = (color="white") => {
        this.ctx.fillStyle = color;        
        this.ctx.clearRect(0 - this.xOffset, 0 - this.yOffset, d.width, d.height);
    }

    this.setInterval = (fun, frames) => {
        setInterval(fun, frames);
    }

    this.rotate = (angle) => {
        this.ctx.rotate(angle)
    }
}
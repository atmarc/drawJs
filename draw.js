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
        this.ctx.fillRect(x + this.xOffset, y + this.yOffset, 1, 1);
    } 
    
    this.rectangle = (x, y, w, h, color='black', center=true) => {
        this.ctx.fillStyle = color;
        if (center)
            this.ctx.fillRect(x + this.xOffset - w/2, y + this.yOffset - h/2, w, h);
        else
            this.ctx.fillRect(x + this.xOffset, y + this.yOffset, w, h);
    }

    this.translate = (x, y) => {
        this.xOffset = x;
        this.yOffset = y;
    }

    this.circle = (x, y, r, color = "black", fill=true, w=1) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x + this.xOffset, y + this.yOffset, r, 0, 2 * Math.PI);
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
        this.ctx.moveTo(x1 + this.xOffset, y1 + this.yOffset);
        this.ctx.lineTo(x2 + this.xOffset, y2 + this.yOffset);
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color; 
        this.ctx.stroke(); 
        this.ctx.closePath();        
    }

    this.clearRect = (x1, y1, x2, y2, color="white") => {
        this.ctx.fillStyle = color;
        this.ctx.clearRect(x1 + this.xOffset, y1 + this.yOffset, x2 + this.xOffset, y2 + this.yOffset);
    } 
    
    this.clearAll = (color="white") => {
        this.ctx.fillStyle = color;        
        this.ctx.clearRect(0, 0, d.width, d.height);
    }

    this.setInterval = (fun, frames) => {
        setInterval(fun, frames);
    }
}
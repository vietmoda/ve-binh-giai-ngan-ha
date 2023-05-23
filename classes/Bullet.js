class Bullet{
    constructor(canvas, x, y) {
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.canvas = canvas;
        this.color = 'yellow';
        this.type = 'player';
    }

    render() {
        let context = this.canvas.getContext('2d');
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2*Math.PI )
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    move(){
        this.y -= this.speed;
    }
}
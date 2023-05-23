class Player {
    constructor(canvas, x, y) {
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.canvas = canvas;
        this.width = 50;
        this.height = 50;
        this.dir = '';
        this.img = new Image();
        this.img.src = 'assets/images/player.png';
        this.imgDeath = new Image();
        this.imgDeath.src = 'assets/images/boom.png';
        this.shootSound = new Audio('assets/sounds/shoot.wav');
        this.shootSound.volume = 0.2;
    }

    render() {
        let context = this.canvas.getContext('2d');
        // context.beginPath();
        // context.rect(this.x, this.y, 30, 30)
        // context.fillStyle = 'green';
        // context.fill();
        // context.closePath();
        context.beginPath();
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    fire(){
        let bullet = new Bullet(this.canvas,this.x+(this.width/2), this.y);
        this.shootSound.currentTime = 0;
        this.shootSound.play();
        return bullet
    }
    move() {
        switch (this.dir) {
            case "ArrowLeft":
                if (this.x > 0)
                    this.x -= this.speed;
                break;
            case "ArrowRight":
                if (this.x + this.width < this.canvas.width)
                    this.x += this.speed;
                break;
        }
    }
    death(){
        let context = this.canvas.getContext('2d');
        context.beginPath();
        context.drawImage(this.imgDeath, this.x-100, this.y-80);
        context.closePath();
    }
}
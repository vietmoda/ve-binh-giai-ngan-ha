class Enemy {
    constructor(canvas, x, y, bullets, type) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.bullets = bullets;
        this.type = type;
        this.speed = Math.floor(Math.random() * (ENEMIES[this.type - 1].maxSpeed - ENEMIES[this.type - 1].minSpeed)) + ENEMIES[this.type-1].minSpeed;
        this.dir = Math.random() > 0.5 ? 'left' : 'right';
        this.timer = Math.floor(Math.random() * ENEMIES[this.type - 1].reloadTime);
        this.reloadTime = ENEMIES[this.type - 1].reloadTime;
        this.img = new Image();
        this.img.src = ENEMIES[this.type - 1].image;
        this.deathSound = new Audio('assets/sounds/enemy-death.wav');
        this.deathSound.volume = 1;
    }

    playDeathSound() {
        this.deathSound.currentTime = 0;
        this.deathSound.play();
    }

    render() {
        let context = this.canvas.getContext('2d');
        // context.beginPath();
        // context.rect(this.x, this.y, 30, 30);
        // context.fillStyle = 'white';
        // context.fill();
        // context.closePath();
        context.beginPath();
        context.drawImage(this.img, this.x, this.y, 30, 30);
        context.closePath();
    }

    fire() {
        this.timer++;
        if (this.timer > this.reloadTime) {
            let bullet = new Bullet(this.canvas, this.x + 15, this.y);
            bullet.type = 'enemy';
            bullet.color = 'red';
            bullet.speed = -3;
            this.bullets.push(bullet);
            this.timer = 0;
        }

    }

    move() {
        switch (this.dir) {
            case 'left':
                this.x -= this.speed;
                if (this.x <= 0) {
                    this.speed = Math.floor(Math.random() * 6) + 1
                    this.x = this.canvas.width;
                }
                break;
            case 'right':
                this.x += this.speed;
                if (this.x + 30 >= this.canvas.width) {
                    this.speed = Math.floor(Math.random() * 6) + 1
                    this.x = -30
                }
                break;
        }

    }

}





let canvas = document.getElementById('game')
let player = new Player(canvas, canvas.width / 2 - 15, canvas.height - 100)
let bullets = [];
let timer = 0;
let reloadTime = 20;
let enemies = [];
let score = 0;
let scoreTxt = document.getElementById('score-txt');
let hiScore = getHighScore();
let hiScoreTxt = document.getElementById('highscore-txt');
let levelTxt = document.getElementById('level-txt');
let isGameOver = false;
let level = 0;
console.log(LEVELS[0].enemyTypes.length);

function main() {
    if (isGameOver) return;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    player.move();
    player.render();
    checkEnemy();
    autoFire();
    showAllBullets();
    showAllEnemies();
    checkCollision();

    displayScore();
    checkHighScore();
    requestAnimationFrame(main);
}

main();

function displayScore() {
    scoreTxt.innerText = score;
    hiScoreTxt.innerText = hiScore;
    levelTxt.innerText = level;
}

function checkHighScore() {
    let hs = 0;
    if (localStorage.hasOwnProperty('score')) {
        hs = +localStorage.getItem('score');
    }
    if (hs < score) {
        localStorage.setItem('score', score)
    }
}

function getHighScore() {
    let hs = 0;
    if (localStorage.hasOwnProperty('score')) {
        hs = +localStorage.getItem('score');
    }
    return hs;
}

function showGameOver() {
    document.getElementById('gameover').style.display = 'block';
    document.getElementById('score-end').innerText = score;
    isGameOver = true;
}

function creatEnemy() {
    let heights = [20, 60, 100, 140];
    let widths = [-30, canvas.width + 30];
    for (let i = 0; i < LEVELS[level - 1].enemyTypes.length; i++) {
        for (let j = 0; j < LEVELS[level - 1].enemyTypes[i]; j++) {
            let indexHeight = Math.floor(Math.random() * 4)
            let indexWidth = Math.floor(Math.random() * 2)
            let enemy = new Enemy(canvas, widths[indexWidth], heights[indexHeight], bullets, i + 1);
            enemies.push(enemy);
        }
    }
    console.log(enemies);
}

function checkEnemy() {
    if (enemies.length <= 0) {
        if (level < LEVELS.length)
            level++;
        creatEnemy();
    }
}


function showAllEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].move();
        enemies[i].fire();
        enemies[i].render();
    }
}

function showAllBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].move();
        bullets[i].render();
    }
}

function autoFire() {
    timer++;
    if (timer > reloadTime) {
        let bullet = player.fire();
        bullets.push(bullet);
        timer = 0;
    }
}

window.addEventListener("keydown", function (evt) {
        player.dir = evt.key;
        if (evt.key == 'Enter') {
            // let bullet = player.fire();
            // bullets.push(bullet);
        }
    }
)
window.addEventListener("keyup", function (evt) {
    player.dir = '';
})

function checkCrash(enemy, bullet) {
    let left1 = enemy.x;
    let right1 = enemy.x + 30;
    let top1 = enemy.y;
    let bot1 = enemy.y + 30;
    let left2 = bullet.x - 15;
    let right2 = bullet.x + 15;
    let top2 = bullet.y - 15;
    let bot2 = bullet.y + 15;
    if (left1 > right2 || right1 < left2 || top1 > bot2 || bot1 < top2) {
        return false;
    }
    return true;
}

function checkCollision() {
    for (let i = 0; i < bullets.length; i++) {
        if (checkCrash(player, bullets[i]) && bullets[i].type === 'enemy') {
            bullets.splice(i, 1)
            player.death();
            showGameOver();
        }
        for (let j = 0; j < enemies.length; j++) {
            if (checkCrash(enemies[j], bullets[i]) && bullets[i].type === 'player') {
                enemies[j].playDeathSound();
                enemies.splice(j, 1)
                bullets.splice(i, 1)
                score += 1;
                break;
            }
        }

    }
}

function playAgain() {
    window.location.reload();
}



const ENEMIES = [
    {
        type: 1,
        reloadTime: 300,
        image: 'assets/images/enemy1.png',
        minSpeed: 1,
        maxSpeed: 3
    },
    {
        type: 2,
        reloadTime: 250,
        image: 'assets/images/enemy2.png',
        minSpeed: 3,
        maxSpeed: 5
    },
    {
        type: 3,
        reloadTime: 200,
        image: 'assets/images/enemy3.png',
        minSpeed: 4,
        maxSpeed: 7
    }
]
const LEVELS = [
    {
        level: 1,
        numberEnemy: 10,
        enemyTypes: [10, 0, 0],
        spawnTime: 20,
    },
    {
        level: 2,
        numberEnemy: 15,
        enemyTypes: [10, 5, 0],
        spawnTime: 15,
    },
    {
        level: 3,
        numberEnemy: 20,
        enemyTypes: [10, 5, 5],
        spawnTime: 10,
    },
    {
        level: 4,
        numberEnemy: 50,
        enemyTypes: [10, 15, 25],
        spawnTime: 10,
    }
]
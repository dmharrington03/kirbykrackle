const w = 600;
const h = 600;

class Ball {
    pos = createVector(0, 0);
    rad = 30;
    col = "";
    x;
    y;
    constructor(x, y, rad, col) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.col = col;
    }
}

let balls = [];

function setup() {
    createCanvas(w, h);
    // noLoop();
    noStroke();
    pixelDensity(1);
    balls = balls.concat(createBalls(150, 'red'))
    balls = balls.concat(createBalls(100, 'yellow'))
    balls = balls.concat(createBalls(40, 'black'))
}

function draw() {
    background(0);
    let scale = 60;
    
    
    moveBalls(balls);
    drawBalls(balls);
    

    loadPixels();

    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            let index = (i + j * width) * 4;
            if (pixels[index+1] > 150) {
                let n = random();
                pixels[index] -= n * scale;
                pixels[index+1] -= n * scale;
                pixels[index+2] -= n * scale;
            }

        }
    }
    updatePixels();
}

function moveBalls(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].y -= random() * 0.5;
        if (arr[i].y < -80)
            arr[i].y = h + 80
    }
}

function drawBalls(arr) {
    for (let i = 0; i < arr.length; i++) {
        switch (arr[i].col) {
            case 'red':
                fill(245, 55, 55);
                break;
            case 'yellow':
                fill(245, 175, 40);
                break;
            case 'black':
                fill(0);
                break;
        }
        // fill(100);
        ellipse(arr[i].x, arr[i].y, arr[i].rad);
    }
}

function createBalls(num, col) {
    var arr = [];
    for (let i = 0; i < num; i++) {
        let valx = randomGaussian();
        let valy = randomGaussian();
        let sdx = 100;                  
        let sdy = 200;                 
        let mean1 = random(w);
        let mean2 = h/2;
        let x = ( valx * sdx ) + mean1;
        let y = ( valy * sdy ) + mean2;
        let rad = random(15, 80);
        let ball = new Ball(x, y, rad, col);
        arr.push(ball);
    }
    return arr;
}
const w = 600;
const h = 600;

class Ball {
    pos = createVector(0, 0);
    rad = 30;
    col = "";
    dirx = random([-1, 1]);
    diry = random([-1, 1]);
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
let rate;
let bounce;

function setup() {
    createCanvas(w, h);
    // noLoop();
    noStroke();
    pixelDensity(1);
    rate = createSlider(0, 10, 0.5, 0.1);
    bounce = createCheckbox(' bounce', false);
    balls = balls.concat(createBalls(150, 'red'))
    balls = balls.concat(createBalls(100, 'yellow'))
    balls = balls.concat(createBalls(40, 'black'))
    textSize(20);
}

function draw() {
    background(0);
    let scale = 60;
    let speed = rate.value();
    
    
    moveBalls(balls, speed);
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

function keyPressed() {
    if (keyCode === ENTER)
        balls = [];
}

function mouseDragged() {
    if (mouseX < w && mouseY < h)
        balls.push(
            new Ball(mouseX, mouseY, random(15, 100), random(['red', 'yellow', 'black']))
        );
}

function moveBalls(arr, rate=0.5) {
    let threshhold = 60;

    for (let i = 0; i < arr.length; i++) {
        arr[i].y += random() * rate * arr[i].diry;
        arr[i].x += random() * rate/2 * arr[i].dirx;
        
        if (bounce.checked()) {
            if (arr[i].y > h + arr[i].rad || arr[i].y < -arr[i].rad)
                arr[i].diry = -arr[i].diry;
            if (arr[i].x < -arr[i].rad || arr[i].x > w + arr[i].rad)
                arr[i].dirx = -arr[i].dirx;
        } else {
            if (arr[i].y > h + threshhold || arr[i].y < -threshhold)
                arr[i].y = h + threshhold - arr[i].y
            if (arr[i].x < -threshhold || arr[i].x > w + threshhold)
                arr[i].x = w + threshhold - arr[i].x
        }
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
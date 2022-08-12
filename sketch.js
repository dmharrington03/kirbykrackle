const w = 600;
const h = 600;

function setup() {
    createCanvas(w, h);
    noLoop();
    noStroke();
    pixelDensity(1);
}

function draw() {
    background(0);
    let scale = 60;
    
    
    randomCircles(150, 245, 55, 55);
    randomCircles(100, 245, 175, 40);
    randomCircles(40, 0, 0, 0);
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

function randomCircles(num, r, g, b) {
    fill(r, g, b);
    for (let i = 0; i < num; i++) {
        let valx = randomGaussian();
        let valy = randomGaussian();
        let sdx = 100;                  
        let sdy = 200;                 
        let mean1 = random(w);
        let mean2 = h/2;
        let x = ( valx * sdx ) + mean1;
        let y = ( valy * sdy ) + mean2;
        let loc = createVector(random(0, w), random(0, h));
        let rad = random(15, 80);
        ellipse(x, y, rad);
        // loc.x = map(noise(off), 0, 1, 0, w);
        // loc.y =  map(noise(off), 0, 1, 0, h)
        // off += 0.01;
    }
}
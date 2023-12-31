const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colours = [
    'white',
    'rgba(255,255,255,0.3)',
    'rgba(173,216,230,0.8)',
    'rgba(211,211,211,0.3)'
];

const maxSize = 40;
const minSize = 0;
const touchRadius = 60;

// mouse and touch position
let pointer = {
    x: null,
    y: null
};

// function to handle both mouse and touch events
function handleMove(event) {
    if (event.touches) {
        pointer.x = event.touches[0].clientX;
        pointer.y = event.touches[0].clientY;
    } else {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
    }
}

window.addEventListener('mousemove', handleMove);
window.addEventListener('touchmove', handleMove, { passive: false });

// create constructor function for particle
function Particle(x, y, directionX, directionY, size, colour) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.colour = colour;
}

// add draw method to particle prototype
Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.colour;
    ctx.fill();
}

// add update method to particle prototype
Particle.prototype.update = function () {
    if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    // pointer interactivity (both mouse and touch)
    if (pointer.x - this.x < touchRadius &&
        pointer.x - this.x > -touchRadius &&
        pointer.y - this.y < touchRadius &&
        pointer.y - this.y > -touchRadius) {
        if (this.size < maxSize) {
            this.size += 3;
            this.x -= 1.5;
        }
    } else if (this.size > minSize) {
        this.size -= 0.1;
    }
    if (this.size < 0) {
        this.size = 0;
    }
    this.draw();
}

// create particle array
function init() {
    particleArray = [];
    for (let i = 0; i < 1000; i++) {
        let size = 10;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.2) - 0.1;
        let directionY = (Math.random() * 0.2) - 0.1;
        let colour = colours[Math.floor(Math.random() * colours.length)];

        particleArray.push(new Particle(x, y, directionX, directionY, size, colour));
    }
    console.log(particleArray);
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// remove pointer position periodically
setInterval(function () {
    pointer.x = undefined;
    pointer.y = undefined;
}, 1000);

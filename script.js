/*const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(200,0,0)';
ctx.fillRect(250, 100, 50, 50);

ctx.fillStyle = 'rgba(0,200,0,0.5)';
ctx.fillRect(230, 80, 50, 50);

ctx.beginPath();
ctx.moveTo(175, 50);
ctx.lineTo(200, 75);
ctx.lineTo(200, 25);
//ctx.closePath();
//ctx.stroke();
ctx.fill();

ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, true);  // Mouth (clockwise)
    ctx.moveTo(65, 85);
    ctx.arc(60, 85, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 85);
    ctx.arc(90, 85, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();

var p = new Path2D('M10 10 h 80 v 80 h -80 Z');
ctx.stroke(p);*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

ctx.fillRect(0, 0, 700, 125);
ctx.fillRect(0, 375, 700, 125);

var box = {
    x: 100,
    y: 300,
    vy: 5,
    draw: function () {
        ctx.fillStyle = 'rgb(30,89,177)';
        ctx.fillRect(this.x, this.y, 75, 75);
    }
};
var hole = {
    x: 700,
    y: 375,
    vx: 2,
    draw: function () {
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(this.x, this.y, 125, 125);
        //console.log("hole");
    }
};
status = "floor";

function move() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 700, 125);
    ctx.fillRect(0, 375, 700, 125);
    box.draw();
    hole.draw();
    console.log("movehole");
    if (status == "floor") {
        if (hole.x - hole.vx < -125) {
            window.cancelAnimationFrame(raf);
        }
        else {
            hole.x -= hole.vx;
            raf = window.requestAnimationFrame(move);
        }
    }
    else {
        if (hole.x - hole.vx < -125) {
            window.cancelAnimationFrame(raf);
        }
        else {
            hole.x -= hole.vx;
            raf = window.requestAnimationFrame(move);
        }
    }
}

function swift() {
    ctx.clearRect(0, 125, 700, 250);
    box.draw();
    console.log(status);
    if (status == "floor") {
        if (box.y - box.vy < 125) {
            window.cancelAnimationFrame(flip);
            status = "ceiling";
        }
        else {
            box.y -= box.vy;
            flip = window.requestAnimationFrame(swift);
        }
    }
    else {
        if (box.y + box.vy > 300) {
            window.cancelAnimationFrame(flip);
            status = "floor";
        }
        else {
            box.y += box.vy;
            flip = window.requestAnimationFrame(swift);
        }
    }
}

/*canvas.addEventListener('mousemove', function(e) {
  if (!running) {
    ctx.clearRect(0,125,700,250);
    box.x = e.clientX;
    box.y = e.clientY;
    box.draw();
  }
});*/

start = document.getElementById('start');
start.addEventListener('click', function () {
    if (status == "floor") {
        hole.x = 700;
        hole.y = 375;
    }
    else {
        hole.x = 700;
        hole.y = 0;
    }
    raf = window.requestAnimationFrame(move);
});

canvas.addEventListener('click', function () {
    flip = window.requestAnimationFrame(swift);
    console.log(status);
});

/*canvas.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
  running = false;
});*/

box.draw();
hole.draw();

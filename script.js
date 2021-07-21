var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

ctx.fillRect(0, 0, 700, 125);
ctx.fillRect(0, 375, 700, 125);
function replay() { location.reload(); }

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
    if (t==0){
        createHole(Math.floor(Math.random()*10));
    }
    else if((sec-t)>4){
        createHole(Math.floor(Math.random()*10));
    }
}
let rafCount=0;
function createHole(x){
    if (x<5 && hole.x==700) {
        hole.y = 375;
    }
    else if(x>4 && hole.x==700){
        hole.y = 0;
    }
    if (hole.x - hole.vx < -125) {
        window.cancelAnimationFrame(raf);
        hole.x=700;
        raf = window.requestAnimationFrame(move);
    }
    else {
        hole.x -= hole.vx;
        raf = window.requestAnimationFrame(move);
    }
    if(((box.x+74)==hole.x && (box.y+75)==hole.y) || ((box.x+74)==hole.x && (box.y-125)==hole.y)){
            end();
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

let sec=0,t=0;
function timer(){
    sec+=0.1;
}
var start = document.getElementById('start');
start.addEventListener('click', function () {
    interval = window.setInterval(timer,100);
    start.style.display = "none";
    raf = window.requestAnimationFrame(move);
});

canvas.addEventListener('click', function () {
    flip = window.requestAnimationFrame(swift);
    console.log(status);
});

box.draw();
hole.draw();

var modal = document.getElementById("modal");
modal.style.display = "none";
function end(){
    console.log("...intersection...");
    window.cancelAnimationFrame(flip);
    window.cancelAnimationFrame(raf);
    window.clearInterval(interval);
    console.log(sec);
    new Audio("Disgruntled Gramophone.mp3").play();
    modal.style.display = "block";
    displayScore();
}

function displayScore() {
    distance = 60*sec; //in px //As animation is in 60 frames per sec
    score = Math.floor(distance<2000 ? distance : distance<4000 ? distance*1.2 : distance<6000 ? distance*1.4 : dsitance*1.6);
    hs = localStorage.getItem("HiSc");    
    if (hs == Infinity) {
        hs = score;
    } else if (score > hs) {
        hs = score;
    }
    localStorage.setItem("HiSc", hs);
    document.getElementById("score").innerHTML = "Your Score: " + score;
    document.getElementById("highscore").innerHTML = "⚡High Score:" + hs;
}

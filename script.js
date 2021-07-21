var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var glide;
var speed=1;

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
        speed = sec<20 ? 1:sec<40 ? 2:sec<80 ? 3:sec<120 ? 4:6
        console.log(speed);
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(this.x, this.y, 125, 125);
        //console.log("hole");
    }
};
status = "floor";

let sec=0,t=0;
function timer(){
    sec+=0.1;
}
var start = document.getElementById('start');
start.addEventListener('click', function () {
    interval = window.setInterval(timer,100);
    start.style.display = "none";
    glide = window.requestAnimationFrame(move);
});

var flip;
canvas.addEventListener('click', function () {
    flip = window.requestAnimationFrame(swift);
    console.log(status);
});
document.body.addEventListener('keydown', function (e) {
    if(e.keyCode == 32){
        flip = window.requestAnimationFrame(swift);
        console.log(status);
    }
});

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

function createHole(x){
    if (x<5 && hole.x==700) {
        hole.y = 375;
    }
    else if(x>4 && hole.x==700){
        hole.y = 0;
    }
    if (hole.x - hole.vx < -125) {
        window.cancelAnimationFrame(glide);
        hole.x=700;
        glide = window.requestAnimationFrame(move);
    }
    else {
        hole.x -= hole.vx*speed;
        glide = window.requestAnimationFrame(move);
    }
    if(((box.x+74)>hole.x && (box.x+75)<hole.x+125 && (((box.y-125)==hole.y) || (box.y+75)==hole.y)) ){
            end();
        }
}

function swift() {
    ctx.clearRect(0, 125, 700, 250);
    box.draw();
    if(box.y==215){ new Audio("when-604.mp3").play();}
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

box.draw();
hole.draw();

var modal = document.getElementById("modal");
modal.style.display = "none";
function end(){
    console.log("...intersection...");
    window.cancelAnimationFrame(flip);
    window.cancelAnimationFrame(glide);
    window.clearInterval(interval);
    console.log(sec);
    new Audio("Disgruntled Gramophone.mp3").play();
    modal.style.display = "block";
    displayScore();
}
let r;
function displayScore() {
    distance = 60*sec; //in px //As animation is in 60 frames per sec
    r = distance<1200 ? 1 : distance<2400 ? 1.5 : distance<4800 ? 2 : distance<7200 ? 2.5:3;
    score = distance*r;
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

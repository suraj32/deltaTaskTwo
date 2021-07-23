var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var glideHole;
var glideBall;
var flip;
var speed = 1;
status = "floor";

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
        speed = sec < 20 ? 1 : sec < 40 ? 1.3 : sec < 80 ? 1.6 : sec < 120 ? 1.8 : 2 //speed variance
        console.log(speed);
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(this.x, this.y, 125, 125);
        console.log("hole");
    }
};
var obstacle = {
    x: 725,
    y: 350,
    vx: 3,
    vy: 2,
    draw: function () {
        objSpeed = sec < 20 ? 1 : sec < 40 ? 1.2 : sec < 80 ? 1.4 : sec < 120 ? 1.4 : 1.8 //objSpeed variance
        //console.log(speed);
        ctx.fillStyle = 'rgb(100,0,0)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
        ctx.fill();
        console.log("obstacle");
    }
};

let sec = 0;
function timer() {
    sec += 0.1;
}
var start = document.getElementById('start');
start.addEventListener('click', function () {
    interval = window.setInterval(timer, 100);
    start.style.display = "none";
    glideHole = window.requestAnimationFrame(moveHole);
    //glideBall=window.requestAnimationFrame(moveObstacle);
    timeout = setTimeout(function () {
        glideBall = window.requestAnimationFrame(moveObstacle);
    }, 13.125 * 1000);

});

canvas.addEventListener('click', function () {
    flip = window.requestAnimationFrame(swift);
    console.log(status);
});
document.body.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
        flip = window.requestAnimationFrame(swift);
        console.log(status);
    }
});

function moveHole() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 700, 125);
    ctx.fillRect(0, 375, 700, 125);
    ctx.clearRect(0, 125, 700, 250);
    box.draw();
    hole.draw();
    obstacle.draw();
    console.log("movehole");
    createHole(Math.floor(Math.random() * 10));
}

function createHole(x) {
    if (x < 5 && hole.x == 700) {
        hole.y = 375;
    }
    else if (x > 4 && hole.x == 700) {
        hole.y = 0;
    }
    if (hole.x - hole.vx < -125) {
        window.cancelAnimationFrame(glideHole);
        hole.x = 700;
        glideHole = window.requestAnimationFrame(moveHole);
    }
    else {
        hole.x -= hole.vx * speed;//speed varies with time
        glideHole = window.requestAnimationFrame(moveHole);
    }
    //Intersection
    if (((box.x + 74) > hole.x && (box.x + 75) < hole.x + 125 && (((box.y - 125) == hole.y) || (box.y + 75) == hole.y))) {
        end();
    }
}
let update = 'up';
function moveObstacle() {
    ctx.clearRect(0, 125, 700, 250);
    box.draw();
    hole.draw();
    obstacle.draw();
    console.log("moveobstacle");
    createObstacle(Math.floor(Math.random() * 10));
}
function createObstacle(m) {
    if (m < 5 && obstacle.x == 725) {
        obstacle.y = 350;
        update = 'up';
    }
    else if (m > 4 && obstacle.x == 725) {
        obstacle.y = 150;
        update = 'down';
    }
    if (obstacle.x - obstacle.vx < -25) {
        window.cancelAnimationFrame(glideBall);
        obstacle.x = 725;
        glideBall = window.requestAnimationFrame(moveObstacle);
    }
    else {
        obstacle.x -= obstacle.vx * objSpeed;//objSpeed varies with time
        if (update == 'up') {
            obstacle.y -= obstacle.vy;
            console.log(update);
            if (obstacle.y == 150) {
                update = 'down';
                console.log(update);
            }
        }
        else {
            obstacle.y += obstacle.vy;
            console.log(update);
            if (obstacle.y == 350) {
                update = 'up';
                console.log(update);
            }
        }
        glideBall = window.requestAnimationFrame(moveObstacle);
    }
    var d = Math.pow(Math.pow((box.x + 37.5 - obstacle.x), 2) + Math.pow((box.y + 37.5 - obstacle.y), 2), 0.5);
    //Collision
    if (((box.x + 74 == Math.floor(obstacle.x) - 25) && (d < 72.887)) || ((box.y == Math.floor(obstacle.y) - 24) && (d < 72.887)) || ((box.y + 75 == Math.floor(obstacle.y) - 24) && (d < 72.887))
        || Math.floor(Math.pow(Math.pow((box.x - obstacle.x), 2) + Math.pow((box.y - obstacle.y), 2), 0.5)) == 25
        || Math.floor(Math.pow(Math.pow((box.x + 75 - obstacle.x), 2) + Math.pow((box.y - obstacle.y), 2), 0.5)) == 25
        || Math.floor(Math.pow(Math.pow((box.x - obstacle.x), 2) + Math.pow((box.y + 75 - obstacle.y), 2), 0.5)) == 25
        || Math.floor(Math.pow(Math.pow((box.x + 75 - obstacle.x), 2) + Math.pow((box.y + 75 - obstacle.y), 2), 0.5)) == 25) {
        end();
    }
}

function swift() {
    //ctx.scale(1,-1);
    ctx.clearRect(0, 125, 700, 250);
    box.draw();
    //hole.draw();
    obstacle.draw();
    if (box.y == 215) { new Audio("when-604.mp3").play(); }
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
obstacle.draw();

var modal = document.getElementById("modal");
modal.style.display = "none";
function end() {
    console.log("...intersection...");
    window.cancelAnimationFrame(flip);
    window.cancelAnimationFrame(glideHole);
    window.cancelAnimationFrame(glideBall);
    window.clearInterval(interval);
    window.clearTimeout(timeout);
    console.log(sec);
    new Audio("Disgruntled Gramophone.mp3").play();
    modal.style.display = "block";
    displayScore();
}
let r;
function displayScore() {
    distance = 60 * sec; //in px //As animation is in 60 frames per sec and speed is 2
    //Bonus score for more distance
    r = distance < 600 ? 1 : distance < 1200 ? 1.5 : distance < 2400 ? 2 : distance < 4800 ? 2.5 : 3;
    score = Math.floor(distance * r);
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

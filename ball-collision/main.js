import Ball from './ball';
import './main.css';

//code ajouté
const canvas = document.querySelector('#canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const ctx = canvas.getContext('2d');
const balls = [],
numBalls = 40,
long = 85,
bounce = -1;
for (var i = 0; i < numBalls; i++) {
    console.log(numBalls);
    var radius = Math.random() * 5 + 5;
    var ball = new Ball(radius, "#fff");
    ball.mass = Math.random() * 5 + 2;
    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;
    ball.vx = Math.random() * 6 - 3;
    ball.vy = Math.random() * 6 - 3;
    balls.push(ball);
}

/*const particles = [];
const NUM_PARTICLES = 200;
for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push( new Particle (canvas));
}*/

/*
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    });
    requestAnimationFrame(animate);
};
animate();*/


 (function drawFrame() {
     window.requestAnimationFrame(drawFrame, canvas);
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     balls.forEach(move(ball));
     for (var ballA, i = 0, len = numBalls - 1; i < len; i++) {
         ballA = balls[i];
         for (var ballB, j = i + 1; j < numBalls; j++) {
             ballB = balls[j];
             checkCollision(ballA, ballB);
             drawLine(ballA, ballB);
         }
     }

     balls.forEach(draw());
 }())

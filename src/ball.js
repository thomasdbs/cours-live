class Ball {

    constructor () {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 40;
        this.rotation = 0;
        this.mass = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.color = '#fff';
        this.lineWidth = 1;
    };

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);//移动的是圆心
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    rotate(x, y, sin, cos, reverse) {
        return {
            x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
            y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
        }
    }


     checkCollision(ball0, ball1) {
         var dx = ball1.x - ball0.x,
                 dy = ball1.y - ball0.y,
                 dist = Math.sqrt(dx * dx + dy * dy);

         if (dist < ball0.radius + ball1.radius) {
             var angle = Math.atan2(dy, dx),
                     sin = Math.sin(angle),
                     cos = Math.cos(angle);

             //rotate ball0 position
             var pos0 = {
                 x: 0,
                 y: 0
             }

             //rotate ball1 position
             var pos1 = this.rotate(dx, dy, sin, cos, true);

             //rotate ball0 velocity
             var vel0 = this.rotate(ball0.vx, ball0.vy, sin, cos, true);

             //rotate ball1 velcoity
             var vel1 = this.rotate(ball1.vx, ball1.vy, sin, cos, true);

             //collision reaction

             var vxTotal = vel0.x - vel1.x;

             vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) / (ball0.mass + ball1.mass);
             vel1.x = vxTotal + vel0.x;

             //update position - to avoid objects becoming stuck together
             var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
                     overlap = (ball0.radius + ball1.radius) - Math.abs(pos0.x - pos1.x);
             //update position
             pos0.x += vel0.x / absV * overlap;
             pos1.x += vel1.x / absV * overlap;

             //rotate everything back
             var pos0F = this.rotate(pos0.x, pos0.y, sin, cos, false);
             var pos1F = this.rotate(pos1.x, pos1.y, sin, cos, false);

             //adjust position to actual screen position
             ball1.x = ball0.x + pos1F.x;
             ball1.y = ball0.y + pos1F.y;
             ball0.x = ball0.x + pos0F.x;
             ball0.y = ball0.y + pos0F.y;

             //rotate velocity back
             var vel0F = this.rotate(vel0.x, vel0.y, sin, cos, false);
             var vel1F = this.rotate(vel1.x, vel1.y, sin, cos, false);

             ball0.vx = vel0F.x;
             ball0.vy = vel0F.y;
             ball1.vx = vel1F.x;
             ball1.vy = vel1F.y;

         }
     }

     checkWalls(ball) {
         if (ball.x + ball.radius > canvas.width) {
             ball.x = canvas.width - ball.radius;
             ball.vx *= -1;
         } else if (ball.x - ball.radius < 0) {
             ball.x = ball.radius;
             ball.vx *= -1;
         }

         if (ball.y + ball.radius > canvas.height) {
             ball.y = canvas.height - ball.radius;
             ball.vy *= -1;
         } else if (ball.y - ball.radius < 0) {
             ball.y = ball.radius;
             ball.vy *= -1;
         }
     }

     move(ball) {
         ball.x += ball.vx;
         ball.y += ball.vy;
         this.checkWalls(ball);
     }

     draw(ball) {
         ball.draw(ball);
     }

     drawLine(ball0, ball1) {
         var dx = ball1.x - ball0.x,
                 dy = ball1.y - ball0.y,
                 dist = Math.sqrt(dx * dx + dy * dy);

         if (dist < 85) {
             ctx.save();
             ctx.strokeStyle = "rgba(255,255,255,0.5)";
             ctx.beginPath();
             ctx.moveTo(ball0.x, ball0.y);
             ctx.lineTo(ball1.x, ball1.y);
             ctx.closePath()
             ctx.stroke()
             ctx.restore();
         }
     }

}
export default Ball;

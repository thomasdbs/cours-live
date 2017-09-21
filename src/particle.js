
class Particle {

    constructor(canvas) {
        this.W = canvas.width;
        this.H = canvas.height;
        this.w = Math.random() * 5 + 5;
        this.h = Math.random() * 5 + 5;
        this.x = Math.random() * this.W;
        this.y = Math.random() * this.H;
        this.speedX = Math.random() > 0.5 ? Math.random() : -Math.random();
        this.speedY = Math.random() > 0.5 ? Math.random() : -Math.random();
        this.angleX = Math.random() > 0.5 ? Math.random() : -Math.random();
        this.angleY = Math.random() > 0.5 ? Math.random() : -Math.random();
    }

    update() {
        this.x += this.speedX + this.angleX;
        this.y += this.speedY + this.angleY;
        if (this.x < 0 || this.x > canvas.width){
            const sign = this.x <0 ? 1 : -1;
            this.angleX = Math.random() *2 * sign;
            this.speedX = -Math.random() * this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height) {
            const sign = this.y <0 ? 1 : -1;
            this.angleY = Math.random() *2 * sign;
            this.speedY = -Math.random() * this.speedY;
        }
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

}

export default Particle;

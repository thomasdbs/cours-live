class Particle {

    constructor(xCoordinate, yCoordinate, radius) {
        var randomNumber = Math.floor((Math.random() * 4));
        var randomTrueOrFalse = Math.floor(Math.random() * 2);
        var randomTrueOrFalseTwo = Math.floor(Math.random() * 2);

        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.radius = radius;
        var colorArray = ['#272F32', '#9DBDC6', '#FF3D2E', '#DAEAEF'];
        this.color = colorArray[randomNumber];

        if (randomTrueOrFalse == 1) {
            this.xVelocity = -Math.random() * 1;
        } else {
            this.xVelocity = Math.random() * 1;
        }

        if (randomTrueOrFalse == 1) {
            this.yVelocity = -Math.random() * 1;
        } else {
            this.yVelocity = Math.random() * 1;
        }
    }

    update(mouseX,mouseY,canvasWidth,canvasHeight) {
        this.xCoordinate += this.xVelocity;
        var xDistance = mouseX - this.xCoordinate;
        var yDistance = mouseY - this.yCoordinate;
        var originalRadius = this.radius;
        this.yCoordinate += this.yVelocity;

        // Movement Functions
        if (this.xCoordinate + this.radius > canvasWidth || this.xCoordinate - this.radius < 0) {
            this.xVelocity = -this.xVelocity;
        };
        if (this.yCoordinate + this.radius > canvasHeight || this.yCoordinate - this.radius < 0) {
            this.yVelocity = - this.yVelocity;
        };

        // Radius Decrease Functions
            // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
        if (xDistance < 50 && xDistance > -50 && this.radius < maxRadius && yDistance < 50 && yDistance > -50) {
            this.radius += 2;
        }
        else if ((xDistance >= 50 && originalRadius < this.radius) || (xDistance <= -50 && originalRadius < this.radius) || (yDistance >= 50 && originalRadius < this.radius) || (yDistance <= -50 && originalRadius < this.radius)) {
            this.radius -= 2;
        };
    }

    draw(c) {
        c.beginPath();
        c.arc(this.xCoordinate, this.yCoordinate, Math.abs(this.radius), 0, Math.PI * 2)
        c.fillStyle = this.color;
        c.fill();
    }

    updateAll(myCircle,particles, c,canvasWidth, canvasHeight) {
    	c.clearRect(0,0, canvasWidth, canvasHeight);
    	myCircle.update();
    	for (var i = 0; i < particles.length; i++) {
    			particles[i].update();
    		}
    	window.requestAnimationFrame(updateAll);
    }



}

export default Particle;

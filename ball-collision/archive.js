import Particle from './particle';
import './main.css';


const canvas = document.querySelector('#canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const ctx = canvas.getContext('2d');
//ctx.fillStyle = 'pink';

const particles = [];
const NUM_PARTICLES = 200;

for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push( new Particle (canvas));
}


const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    });
    requestAnimationFrame(animate);
};
animate();

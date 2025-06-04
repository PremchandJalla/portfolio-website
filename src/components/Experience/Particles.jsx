import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 36;
const COLOR = 'rgba(0,243,255,0.8)';
const GLOW = 'rgba(0,243,255,0.25)';
const MIN_SIZE = 1.5;
const MAX_SIZE = 3.5;
const MIN_SPEED = 0.08;
const MAX_SPEED = 0.25;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(width, height) {
  const angle = Math.random() * 2 * Math.PI;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: randomBetween(MIN_SIZE, MAX_SIZE),
    baseSize: 0,
    speed: randomBetween(MIN_SPEED, MAX_SPEED),
    direction: angle,
    flicker: Math.random() * Math.PI * 2,
    flickerSpeed: randomBetween(0.01, 0.03),
    flashTimer: Math.random() * 6 + 2, // seconds
    flash: false,
    opacity: randomBetween(0.7, 1),
  };
}

const Particles = () => {
  const canvasRef = useRef();
  const animationRef = useRef();
  const particles = useRef([]);
  const lastTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Initialize particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));

    function animate(now) {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles.current) {
        // Flicker
        p.flicker += p.flickerSpeed;
        let flicker = 0.7 + 0.3 * Math.sin(p.flicker);
        // Occasional flash
        p.flashTimer -= (now - lastTime.current) / 1000;
        if (p.flashTimer < 0) {
          p.flash = true;
          p.flashTimer = Math.random() * 6 + 2;
        }
        if (p.flash) {
          flicker = 1.5;
          p.flash = false;
        }
        // Draw glow
        ctx.save();
        ctx.globalAlpha = 0.18 * p.opacity * flicker;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 8, 0, 2 * Math.PI);
        ctx.fillStyle = GLOW;
        ctx.shadowColor = COLOR;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
        // Draw core
        ctx.save();
        ctx.globalAlpha = p.opacity * flicker;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = COLOR;
        ctx.shadowColor = COLOR;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        // Move
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;
        // Wrap around
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }
      lastTime.current = now;
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      // Reposition particles
      particles.current.forEach(p => {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

export default Particles; 
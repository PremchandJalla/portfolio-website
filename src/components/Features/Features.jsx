import React, { useEffect, useRef, useMemo } from 'react';
import './Features.css';
import backgroundImage from '../../assets/featured.jpg';

const Features = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);
  const fpsInterval = useRef(1000 / 30); // Cap at 30 FPS for better performance

  // Memoize particle creation for better performance
  const createParticles = useMemo(() => (width, height) => {
    return Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15, // Slightly faster movement
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 2 + 1, // Larger particles
      baseOpacity: Math.random() * 0.5 + 0.3, // Increased base opacity
      opacity: Math.random() * 0.5 + 0.3,
      glowIntensity: Math.random() * 0.7 + 0.5 // Increased glow
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { 
      alpha: true, 
      willReadFrequently: false
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    const drawParticles = (ctx) => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 123, 255, 0.6)';
      
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        
        // Enhanced gradient with more vibrant blue
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 4
        );
        
        gradient.addColorStop(0, `rgba(0, 123, 255, ${particle.opacity * particle.glowIntensity})`);
        gradient.addColorStop(0.4, `rgba(0, 123, 255, ${particle.opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawConnections = (ctx) => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 123, 255, 0.3)';
      ctx.lineWidth = 0.8;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = dx * dx + dy * dy;

          if (distance < 15000) {
            const opacity = 0.3 * (1 - Math.sqrt(distance) / 150);
            ctx.strokeStyle = `rgba(0, 123, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add subtle pulsing to particles
        particle.opacity = particle.baseOpacity + Math.sin(Date.now() * 0.003) * 0.2;

        // Efficient boundary checking
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
    };

    const animate = (currentTime) => {
      const elapsed = currentTime - lastTimeRef.current;

      if (elapsed > fpsInterval.current) {
        lastTimeRef.current = currentTime - (elapsed % fpsInterval.current);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateParticles();
        drawParticles(ctx);
        drawConnections(ctx);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    handleResize();
    
    // Throttled resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          handleResize();
          resizeTimeout = null;
        }, 250);
      }
    });

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [createParticles]);

  return (
    <section id="features" className="features-section" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`, // Reduced overlay opacity
      filter: 'brightness(1.3) contrast(1.1)' // Adjusted for better visibility
    }}>
      <canvas ref={canvasRef} className="features-canvas" />
      <div className="features-glow"></div>
      <h2 className="section-title">Projects & Achievements</h2>
      <div className="features-grid">
        {[1, 2, 3].map((num) => (
          <div key={num} className="feature-card">
            <div className="feature-image">
              <div className="feature-image-glow"></div>
            </div>
            <div className="feature-content">
              <h3>Project {num}</h3>
              <p>Description of project {num} goes here</p>
              <div className="feature-tech-stack">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </div>
              <div className="feature-links">
                <a 
                  href="https://github.com/yourusername/project" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="feature-link"
                >
                  <i className="fab fa-github"></i> View Code
                </a>
                <a 
                  href="https://project-demo.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="feature-link"
                >
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(Features); 
import React, { useEffect, useRef } from 'react';
import './Hero.css';
import backgroundImage from '../../assets/hero-bg.jpg';
import profilePicture from '../../assets/option2.jpeg';
import githubIcon from '../../assets/Github.png';
import linkedinIcon from '../../assets/LinkedIN.png';

const Hero = () => {
  const canvasRef = useRef(null);
  const backgroundCanvasRef = useRef(null);

  // Main neural network effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let particles = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: 150 }, () => ({ // Increased number of particles
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3, // Increased opacity
        connections: []
      }));
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Lighter color for connections
      ctx.lineWidth = 0.5;

      particles.forEach(particle => {
        // Find nearby particles
        particles.forEach(other => {
          if (particle !== other) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) { // Increased connection distance
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
            }
          }
        });
      });
      ctx.stroke();

      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`; // Whiter particles
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      });
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Background smaller networks
  useEffect(() => {
    const canvas = backgroundCanvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let particles = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.2
      }));
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.3;

      particles.forEach(particle => {
        particles.forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
          }
        });
      });
      ctx.stroke();

      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="hero-section" 
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <canvas ref={backgroundCanvasRef} className="background-network-canvas" />
      <canvas ref={canvasRef} className="neural-network-canvas" />
      <div className="floating-elements">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`floating-circle circle-${i + 1}`}>
            <div className="inner-circle"></div>
          </div>
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title glitch-effect">Hi, I'm Premchand Jalla</h1>
          <div className="title-scroll">
            <span>AI Developer</span>
            <span>ML Engineer</span>
            <span>Robot Builder</span>
          </div>
          <p className="hero-description">
            Crafting intelligent solutions at the intersection of AI and robotics
          </p>
          <div className="hero-buttons">
            <a href="/resume.pdf" className="resume-button" download>
              Download Resume
            </a>
            <div className="social-links">
              <a 
                href="https://github.com/PremchandJalla" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon github"
                aria-label="GitHub Profile"
              >
                <img 
                  src={githubIcon} 
                  alt="GitHub" 
                  className="social-icon-img"
                  style={{ width: '55px', height: '55px' }}
                />
              </a>
              <a 
                href="https://www.linkedin.com/in/premchandjalla/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon linkedin"
                aria-label="LinkedIn Profile"
              >
                <img 
                  src={linkedinIcon} 
                  alt="LinkedIn" 
                  className="social-icon-img"
                  style={{ width: '55px', height: '55px' }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-picture-container">
            <img src={profilePicture} alt="Profile" className="profile-picture" />
            <div className="tech-circle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
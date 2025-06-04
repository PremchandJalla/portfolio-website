import React, { useEffect, useRef, useCallback, Suspense } from 'react';
import './Hero.css';
import backgroundImage from '../../assets/hero-bg.jpg';
import profilePicture from '../../assets/option2.jpeg';
import githubIcon from '../../assets/Github.png';
import linkedinIcon from '../../assets/LinkedIN.png';
import LazyImage from './LazyImage';

const Hero = () => {
  const canvasRef = useRef(null);
  const backgroundCanvasRef = useRef(null);
  let particles = [];

  const initMainParticles = (canvas) => {
    particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.5,
      connections: []
    }));
  };

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initMainParticles(canvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 123, 255, 0.3)';
      ctx.lineWidth = 0.7;

      particles.forEach(particle => {
        particles.forEach(other => {
          if (particle !== other) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
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
        ctx.fillStyle = `rgba(0, 123, 255, ${particle.opacity})`;
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 123, 255, 0.7)';
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
  }, [handleResize]);

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
            <span>Machine Learning Engineer</span>
            <span>Application Developer</span>
            <span>AIOps Engineer</span>
            <span>Data Engineer</span>
            <span>Full stack developer</span>
          </div>
          <p className="hero-description">
          I am a software engineer passionate about building AI solutions, with experience in application development and machine learning. I'm building AI solutions to make a positive impact in the world. Let's tune those hyperparameters and optimize for greatness! Turning ideas into reality, one line of code at a time.
          </p>
          <div className="hero-buttons">
            <a href="https://drive.google.com/file/d/1jMpaAJGD0JlFzH_Rh1oAX_uWclYYduOI/view?usp=sharing" className="resume-button" target='blank'>
              Resume
            </a>
            <div className="social-links">
              <Suspense fallback={<div>Loading...</div>}>
                <LazyImage 
                  href="https://github.com/PremchandJalla" 
                  src={githubIcon} 
                  alt="GitHub" 
                  className="social-icon-img"th
                />
                <LazyImage 
                  href="https://www.linkedin.com/in/premchandjalla/" 
                  src={linkedinIcon} 
                  alt="LinkedIn" 
                  className="social-icon-img"
                />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-picture-container">
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);

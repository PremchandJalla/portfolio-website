import React, { useEffect, useRef, useMemo } from 'react';
import './Features.css';
import backgroundImage from '../../assets/featured.jpg';
import highlander from '../../assets/HighlanderBot.jpg';
import dog from '../../assets/Dog.jpg';
import specialRecog from '../../assets/specialRecog.jpg';
import aiml from '../../assets/AI_ML Hackathon.jpg';
import cloudera from '../../assets/ClouderaE.png';
import star from '../../assets/Star.png';

const Features = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);
  const fpsInterval = useRef(1000 / 30); // Cap at 30 FPS for better performance

  // Sample project data with image field
  const projectData = [
    {
      id: 1,
      title: "Highlander Bot",
      description: "ChatBot for NJIT",
      technologies: ["LLM", "Python", "Flask"],
      codeLink: "https://github.com/PremchandJalla/HackNJITBOT",
      demoLink: "https://github.com/PremchandJalla/HackNJITBOT",
      image: highlander, // Placeholder image URL
    },
    {
      id: 2,
      title: "Attention-Based Deep Learning for Dog Cardiomegaly Classification",
      description: "Neural Network built from Scratch for Classifying Dog Cardiomegaly",
      technologies: ["Deep Learning", "PyTorch"],
      codeLink: "https://github.com/PremchandJalla/Dog-Cardiomegaly",
      demoLink: "https://www.researchgate.net/publication/385982443_Attention-Based_Deep_Learning_for_Dog_Cardiomegaly_Classification",
      image: dog, // Placeholder image URL
    },
    {
      id: 3,
      title: "Special Recognition Award",
      description: "Special Recognition Award fpr leading Banks Statement Analysis Module",
      technologies: ["LLM", "AWS", "Flask","Dockers"],
      codeLink: "https://drive.google.com/file/d/148x-pWINaTI_lIbDQLPA4BU9VOmxAfNu/view",
      demoLink: "https://drive.google.com/file/d/148x-pWINaTI_lIbDQLPA4BU9VOmxAfNu/view",
      image: specialRecog, // Placeholder image URL
    },
    {
      id: 4,
      title: "AI/ML Hackathon Award",
      description: "Designed and deployed MLOps pipelines for underperforming large language models",
      technologies: ["MLOps", "LLM Evaluation", "CI/CD"],
      codeLink: "https://drive.google.com/file/d/1kVQbG7NGvroSniULgfbIY7_1gKwfLFlV/view",
      demoLink: "https://drive.google.com/file/d/1kVQbG7NGvroSniULgfbIY7_1gKwfLFlV/view",
      image: aiml, // Placeholder image URL
    },
    {
      id: 5,
      title: "Legal Q&A Bot, Cloudera Evolve24 Hackathon winner",
      description: "Built an Accelerated Machine Learning Package for a RAG based Legal Q&A chatbot in 12 hours",
      technologies: ["NVDIA NIM", "LLM", "AMPs"],
      codeLink: "https://github.com/PremchandJalla/LegalDocHack",
      demoLink: "https://github.com/PremchandJalla/LegalDocHack",
      image: cloudera, // Placeholder image URL
    },
    {
      id: 6,
      title: "Star Micronics Dashboard",
      description: "Designed and implemented a robust dashboard for analyzing POS data",
      technologies: ["Python", "Flask", "Dash" , "LLM"],
      codeLink: "https://github.com/PremchandJalla/sma-flask-dashboard",
      demoLink: "https://www.google.com/url?q=https://starmicronics-dashboard.onrender.com&sa=D&source=apps-viewer-frontend&ust=1733001313509321&usg=AOvVaw1cgOfTGq2Z7JB4pXEmy62v&hl=en",
      image: star, // Placeholder image URL
    },

  ];

  // Memoize particle creation for better performance
  const createParticles = useMemo(() => (width, height) => {
    return Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 2 + 1,
      baseOpacity: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      glowIntensity: Math.random() * 0.7 + 0.5,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    const drawParticles = (ctx) => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 123, 255, 0.6)';
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 4
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
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity = particle.baseOpacity + Math.sin(Date.now() * 0.003) * 0.2;
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
    <section
      id="features"
      className="features-section"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        filter: 'brightness(1.3) contrast(1.1)',
      }}
    >
      <canvas ref={canvasRef} className="features-canvas" />
      <div className="features-glow"></div>
      <h2 className="section-title">Projects & Achievements</h2>
      <div className="features-grid">
        {projectData.map((project) => (
          <div key={project.id} className="feature-card">
            <div className="feature-image">
              <img src={project.image} alt={`${project.title} Thumbnail`} />
            </div>
            <div className="feature-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="feature-tech-stack">
                {project.technologies.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
              <div className="feature-links">
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-link"
                >
                  <i className="fab fa-github"></i> View Code
                </a>
                <a
                  href={project.demoLink}
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

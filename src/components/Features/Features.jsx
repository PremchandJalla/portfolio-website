import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Features.css';
import InternalCard from './InternalCard';
import aiAgentsImage from '../../assets/ai-agents.jpg';
import realEstateImage from '../../assets/real-estate.png';
import healthcareImage from '../../assets/healthcare.webp';
import chatbotsImage from '../../assets/chatbots.jpg';
import achievementsImage from '../../assets/specialRecog.jpg';
import backgroundImage from '../../assets/featured.jpg';
import highlander from '../../assets/HighlanderBot.jpg';
import dog from '../../assets/Dog.jpg';
import specialRecog from '../../assets/specialRecog.jpg';
import aimlimg from '../../assets/aiml.jpg';
import cloudera from '../../assets/ClouderaE.png';
import star from '../../assets/Star.png';
import rl from '../../assets/rl.webp';

const Features = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);
  const fpsInterval = useRef(1000 / 30);

  const [activeCategory, setActiveCategory] = useState(null);

  const categories = {
    'AI Agents': {
      icon: 'fas fa-robot',
      projects: [],
      image: aiAgentsImage,
      description: 'Explore AI-driven tools and agents.',
    },
    'AI Implementation in Real Estate': {
      icon: 'fas fa-home',
      projects: [],
      image: realEstateImage,
      description: 'Explore AI-driven tools in real estate.',
    },
    'AI Implementation in Healthcare': {
      icon: 'fas fa-heartbeat',
      projects: [
        { title: 'Attention-Based Deep Learning for Dog Cardiomegaly Classification', description: 'Neural Network built from Scratch for Classifying Dog Cardiomegaly', image: dog, technologies: ['Deep Learning', 'PyTorch'], codeLink: '#', demoLink: '#' }
      ],
      image: healthcareImage,
      description: 'Explore AI solutions in healthcare.',
    },
    'AI-Powered Chatbots and Tools': {
      icon: 'fas fa-comments',
      projects: [
        { title: 'Highlander Bot', description: 'ChatBot for NJIT', image: highlander, technologies: ['LLM', 'Python', 'Flask'], codeLink: '#', demoLink: '#' },
        { title: 'Cloudera Evolve24 Hackathon winner', description: 'Built an Accelerated Machine Learning Package for a RAG based Legal Q&A chatbot in 12 hours', image: cloudera, technologies: ['NVIDIA NIM', 'LLM', 'AMPs'], codeLink: '#', demoLink: '#' },
        { title: 'Star Micronics Dashboard', description: 'Designed and implemented a robust dashboard for analyzing POS data', image: star, technologies: ['Python', 'Flask', 'Dash', 'LLM'], codeLink: '#', demoLink: '#' }
      ],
      image: chatbotsImage,
      description: 'Discover AI-powered chatbots and tools.',
    },
    Achievements: {
      icon: 'fas fa-trophy',
      projects: [
        { title: 'Special Recognition Award', description: 'Special Recognition Award for leading Banks Statement Analysis Module', image: specialRecog, technologies: ['LLM', 'AWS', 'Flask', 'Dockers'], codeLink: '#', demoLink: '#' },
        { title: 'AI/ML Hackathon Award', description: 'Designed and deployed MLOps pipelines for underperforming large language models', image: aimlimg, technologies: ['MLOps', 'LLM Evaluation', 'CI/CD'], codeLink: '#', demoLink: '#' }
      ],
      image: achievementsImage,
      description: 'View notable achievements and awards.',
    },
    'Core AI Algorithms and Reinforcement Learning': {
      icon: 'fas fa-brain',
      projects: [
        { title: 'Reinforcement Learning Project', description: 'An advanced project on reinforcement learning algorithms', image: '', technologies: ['Reinforcement Learning', 'Python'], codeLink: '#', demoLink: '#' }
      ],
      image: rl, // Add an appropriate image path here
      description: 'Explore core AI algorithms and reinforcement learning projects.',
    },
  };

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
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 123, 255, ${particle.opacity})`;
        ctx.fill();
      });
    };

    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
    };

    const animate = () => {
      drawParticles();
      updateParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [createParticles]);

  return (
    <section 
      id="features"    
      className="features-section" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <canvas ref={canvasRef} className="features-canvas" />
      <h2 className="section-title">Projects & Achievements</h2>
      {!activeCategory ? (
        <div className="features-grid">
          {Object.entries(categories).map(([category, { icon, image, description }]) => (
            <div
              key={category}
              className="features-category"
              onClick={() => setActiveCategory(category)}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="icon-wrapper">
                <i className={icon}></i>
              </div>
              <h3>{category}</h3>
              <p className="description">{description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="active-category-view">
          <h3>{activeCategory}</h3>
          <div className="internal-cards">
            {categories[activeCategory].projects.map((project, index) => (
              <InternalCard key={index} project={project} />
            ))}
          </div>
          <button onClick={() => setActiveCategory(null)} className="back-button">
            Back to Categories
          </button>
        </div>
      )}
    </section>
  );
};

export default Features;

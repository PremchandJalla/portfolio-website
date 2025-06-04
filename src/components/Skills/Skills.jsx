import React, { useState, useEffect } from 'react';
import './Skills.css';
import SkillIcon from './SkillIcon'; // Import the new component

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const backgroundFormulas = [
    { text: 'f(z) = z² + c', top: '20%', left: '15%' },
    { text: 'λ = 4.669...', top: '35%', left: '75%' },
    { text: 'xₙ₊₁ = rxₙ(1-xₙ)', top: '65%', left: '25%' },
    { text: '∂x/∂t = σ(y-x)', top: '80%', left: '70%' },
    { text: 'f(z) = z² + c', top: '10%', left: '45%' }
  ];

  const skillCategories = {
    AI: {
      icon: 'fas fa-brain', // Main category icon
      color: '#00ff9d',
      skills: [
        { name: 'Machine Learning', iconSet: 'devicon', iconName: 'machinelearning-plain' },
        { name: 'PyTorch', iconSet: 'devicon', iconName: 'pytorch-original-wordmark' },
        { name: 'TensorFlow', iconSet: 'devicon', iconName: 'tensorflow-original-wordmark' },
        { name: 'Keras', iconSet: 'devicon', iconName: 'keras-original-wordmark' },
        { name: 'Scikit-learn', iconSet: 'iconify', iconName: 'simple-icons:scikitlearn' }, // Using simple-icons via iconify
        { name: 'OpenCV', iconSet: 'devicon', iconName: 'opencv-original-wordmark' },
        { name: 'HuggingFace', iconSet: 'simpleicons', iconName: 'huggingface' },
        { name: 'LangChain', iconSet: 'iconify', iconName: 'simple-icons:langchain' }, // Using simple-icons via iconify
        { name: 'Guardrails AI', iconSet: 'fontawesome', iconName: 'fas fa-shield-alt' },
        { name: 'MLflow', iconSet: 'simpleicons', iconName: 'mlflow' },
        { name: 'DVC', iconSet: 'iconify', iconName: 'simple-icons:dvc' }, // Using simple-icons via iconify
        { name: 'CUDA', iconSet: 'simpleicons', iconName: 'nvidia' }, // Simple Icons uses 'nvidia' for CUDA
      ]
    },
    Cloud: {
      icon: 'fas fa-cloud',
      color: '#60a5fa',
      skills: [
        { name: 'AWS', iconSet: 'simpleicons', iconName: 'amazonaws' },
        { name: 'Google Cloud', iconSet: 'simpleicons', iconName: 'googlecloud' },
        { name: 'Docker', iconSet: 'devicon', iconName: 'docker-plain-wordmark' },
        { name: 'Kubernetes', iconSet: 'devicon', iconName: 'kubernetes-plain-wordmark' },
        { name: 'CI/CD', iconSet: 'fontawesome', iconName: 'fas fa-code-branch' },
        { name: 'Terraform', iconSet: 'devicon', iconName: 'terraform-plain-wordmark' },
        { name: 'TorchServe', iconSet: 'devicon', iconName: 'pytorch-original-wordmark' }, // Using PyTorch as proxy
        { name: 'Prometheus', iconSet: 'simpleicons', iconName: 'prometheus' },
        { name: 'Grafana', iconSet: 'simpleicons', iconName: 'grafana' },
      ]
    },
    'Application Development': {
      icon: 'fas fa-code', // Main category icon (remains FontAwesome)
      color: '#ff5757',
      skills: [
        { name: 'Python', iconSet: 'devicon', iconName: 'python-original-wordmark' },
        { name: 'Java', iconSet: 'devicon', iconName: 'java-original-wordmark' },
        { name: 'Django', iconSet: 'devicon', iconName: 'django-plain-wordmark' },
        { name: 'Spring Boot', iconSet: 'devicon', iconName: 'spring-original-wordmark' },
        { name: 'PostgreSQL', iconSet: 'devicon', iconName: 'postgresql-plain-wordmark' },
        { name: 'MySQL', iconSet: 'devicon', iconName: 'mysql-original-wordmark' },
        { name: 'Redis', iconSet: 'devicon', iconName: 'redis-plain-wordmark' },
        { name: 'MongoDB', iconSet: 'devicon', iconName: 'mongodb-plain-wordmark' },
        { name: 'React', iconSet: 'devicon', iconName: 'react-original-wordmark' },
        { name: 'TypeScript', iconSet: 'devicon', iconName: 'typescript-original' },
        { name: 'HTML5', iconSet: 'devicon', iconName: 'html5-original-wordmark' },
        { name: 'CSS3', iconSet: 'devicon', iconName: 'css3-original-wordmark' },
        { name: 'Bootstrap', iconSet: 'devicon', iconName: 'bootstrap-plain-wordmark' },
        { name: 'TailwindCSS', iconSet: 'devicon', iconName: 'tailwindcss-original-wordmark' }
      ]
    },
    'Soft Skills & Leadership': {
        icon: 'fas fa-users', // Main category icon
        color: '#f0db4f', // Example color
        skills: [
            { name: 'Problem Solving', iconSet: 'fontawesome', iconName: 'fas fa-lightbulb' },
            { name: 'Critical Thinking', iconSet: 'fontawesome', iconName: 'fas fa-brain' },
            { name: 'Collaboration', iconSet: 'fontawesome', iconName: 'fas fa-users' },
            { name: 'Stakeholder Management', iconSet: 'fontawesome', iconName: 'fas fa-handshake' },
            { name: 'Presentation', iconSet: 'fontawesome', iconName: 'fas fa-chalkboard-teacher' },
            { name: 'Mentorship', iconSet: 'fontawesome', iconName: 'fas fa-user-graduate' },
            { name: 'Leadership', iconSet: 'fontawesome', iconName: 'fas fa-flag' },
            { name: 'Documentation', iconSet: 'fontawesome', iconName: 'fas fa-file-alt' } // Changed from fa-file-text
        ]
    }
  };

  // Calculate radial positions for skill icons
  useEffect(() => {
    if (activeCategory) {
      const skillContainers = document.querySelectorAll('.skill-icon-container');
      if (skillContainers.length === 0) return;

      // Get the grid size for proportional radius
      const skillsGrid = document.querySelector('.skills-grid');
      let gridSize = 420;
      if (skillsGrid) {
        gridSize = Math.min(skillsGrid.offsetWidth, skillsGrid.offsetHeight);
      }
      let radius = Math.round(gridSize * 0.36); // 36% of grid size
      if (window.innerWidth < 600) radius = Math.round(gridSize * 0.36);
      if (window.innerWidth < 400) radius = Math.round(gridSize * 0.32);
      radius = Math.max(40, Math.min(radius, gridSize * 0.45)); // Clamp radius

      const angleStep = (2 * Math.PI) / skillContainers.length;
      skillContainers.forEach((container, index) => {
        const angle = index * angleStep - Math.PI / 2; // Start from top
        const x = Math.round(radius * Math.cos(angle));
        const y = Math.round(radius * Math.sin(angle));
        container.style.setProperty('--translate-x', `${x}px`);
        container.style.setProperty('--translate-y', `${y}px`);
        container.style.opacity = '0';
        container.style.setProperty('--stagger-delay', `${index * 0.1}s`);
        container.classList.remove('animate-skill');
        void container.offsetWidth;
        container.classList.add('animate-skill');
      });
    }
  }, [activeCategory]);

  // Removed the old lazy load for general <i> tags, SkillIcon will handle its own loading
  // const getIconClass = (icon) => {
  //   return icon.includes('fab') || icon.includes('fas') ? icon : 'fas fa-cog';
  // };

  return (
    <section id="skills" className={`skills${activeCategory ? ' skills-blur-active' : ''}`}>
      <div className={`background-formulas mobile-hidden${activeCategory ? ' blur' : ''}`}>
        {backgroundFormulas.map((formula, index) => (
          <div 
            key={index} 
            className="formula"
            style={{ 
              top: formula.top,
              left: formula.left,
              animationDelay: `${index * 1.5}s`
            }}
          >
            {formula.text}
          </div>
        ))}
      </div>

      <div className="container mobile-container">
        <h2 className="title mobile-title">Skills & Expertise</h2>
        
        {!activeCategory && (
          <div className="prompt mobile-prompt">
            Click on any category to explore my skills
          </div>
        )}

        {!activeCategory ? (
          <div className="categories-container mobile-categories">
            {Object.entries(skillCategories).map(([category, { icon, color }]) => (
              <div 
                key={category}
                className={`category mobile-category${activeCategory === category ? ' active' : activeCategory ? ' inactive' : ''}`}
                onClick={() => setActiveCategory(category)}
                style={{ '--hover-color': color }}
                role="button"
                tabIndex="0"
                aria-pressed={activeCategory === category}
                aria-label={`Select category: ${category}`}
              >
                <div className="icon-wrapper mobile-icon">
                  <i className={icon}></i>
                </div>
                <h3 className="mobile-category-title">{category}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="active-category-view mobile-active-view">
            <div className="skills-grid mobile-skills-grid">
              {/* Main category icon in the center */}
              <div className="main-skill-icon-centered" style={{ left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                <i className={skillCategories[activeCategory].icon} style={{ color: skillCategories[activeCategory].color, fontSize: '3rem' }}></i>
                <h3 className="mobile-skill-title" style={{ color: skillCategories[activeCategory].color, marginTop: '0.5rem' }}>{activeCategory}</h3>
              </div>
              {/* Radial skill icons */}
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="skill-icon-container mobile-skill-icon"
                  role="listitem"
                  aria-label={skill.name}
                  tabIndex="0"
                >
                  <SkillIcon skill={skill} categoryColor={skillCategories[activeCategory].color} />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
            <button 
              className="back-button mobile-back-button"
              onClick={() => setActiveCategory(null)}
              aria-label="Go back to skill categories"
            >
              Back to Categories
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills; 
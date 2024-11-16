import React, { useState } from 'react';
import './Skills.css';

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
      icon: 'fas fa-brain',
      color: '#00ff9d',
      skills: [
        { name: 'Machine Learning', icon: 'fas fa-robot' },
        { name: 'PyTorch', icon: 'fas fa-fire' },
        { name: 'Keras', icon: 'fas fa-layer-group' },
        { name: 'TensorFlow', icon: 'fab fa-python' },
        { name: 'Scikit-learn', icon: 'fas fa-chart-network' },
        { name: 'OpenCV', icon: 'fas fa-camera' }
      ]
    },
    Cloud: {
      icon: 'fas fa-cloud',
      color: '#60a5fa',
      skills: [
        { name: 'AWS', icon: 'fab fa-aws' },
        { name: 'Google Cloud', icon: 'fab fa-google' },
        { name: 'Azure', icon: 'fab fa-microsoft' },
        { name: 'Docker', icon: 'fab fa-docker' },
        { name: 'Kubernetes', icon: 'fas fa-dharmachakra' },
        { name: 'Terraform', icon: 'fas fa-cube' }
      ]
    },
    'Application Development': {
      icon: 'fas fa-code',
      color: '#ff5757',
      skills: [
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Node.js', icon: 'fab fa-node-js' },
        { name: 'Flask', icon: 'fab fa-python' },
        { name: 'Django', icon: 'fab fa-python' },
        { name: 'Express.js', icon: 'fab fa-node-js' },
        { name: 'FastAPI', icon: 'fas fa-bolt' }
      ]
    }
  };

  return (
    <section id="skills" className="skills">
      <div className="background-formulas mobile-hidden">
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
                className="category mobile-category"
                onClick={() => setActiveCategory(category)}
                style={{ '--hover-color': color }}
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
            <div 
              className="main-skill mobile-main-skill"
              style={{ '--category-color': skillCategories[activeCategory].color }}
            >
              <div className="main-skill-icon mobile-main-icon">
                <i className={skillCategories[activeCategory].icon}></i>
              </div>
              <h3 className="mobile-skill-title">{activeCategory}</h3>
            </div>

            <div className="skills-grid mobile-skills-grid">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="skill-icon-container mobile-skill-icon"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--skill-color': skillCategories[activeCategory].color
                  }}
                >
                  <i className={skill.icon}></i>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>

            <button 
              className="back-button mobile-back-button"
              onClick={() => setActiveCategory(null)}
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
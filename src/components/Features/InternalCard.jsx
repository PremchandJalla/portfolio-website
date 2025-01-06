import React from 'react';
import './InternalCard.css';

const InternalCard = ({ project }) => {
  return (
    <div className="internal-card">
      <div className="internal-card-image" style={{ backgroundImage: `url(${project.image})` }}></div>
      <div className="internal-card-content">
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <div className="internal-card-tech">
          {project.technologies.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>
        <div className="internal-card-links">
          <a href={project.codeLink} target="_blank" rel="noopener noreferrer">View Code</a>
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
        </div>
      </div>
    </div>
  );
};

export default InternalCard; 
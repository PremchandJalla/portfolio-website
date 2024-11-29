import React from 'react';
import './Navbar.css';

const Navbar = ({ activeSection }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-brand">Portfolio</div>
      <div className="navbar-links">
        <button 
          className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={() => scrollToSection('hero')}
        >
          Home
        </button>
        <button 
          className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
          onClick={() => scrollToSection('features')}
        >
          Featured
        </button>
        <button 
          className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
          onClick={() => scrollToSection('skills')}
        >
          Skills
        </button>
        <button 
          className={`nav-link ${activeSection === 'blogs' ? 'active' : ''}`}
          onClick={() => scrollToSection('blogs')}
        >
          Experience
        </button>
        <button 
          className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => scrollToSection('contact')}
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 
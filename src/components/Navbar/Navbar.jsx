import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu after selecting an item
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-brand">Premchand Jalla</div>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <button
          className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={() => scrollToSection('hero')}
        >
          Home
        </button>
        <button
          className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
          onClick={() => scrollToSection('experience')}
        >
          Experience
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
          Blogs
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

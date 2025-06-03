import React, { Suspense, lazy, useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';

// Lazy loaded components
const Hero = lazy(() => import('./components/Hero/Hero'));
const Experience = lazy(() => import('./components/Experience/Experience'));
const Features = lazy(() => import('./components/Features/Features'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Blogs = lazy(() => import('./components/Blogs/Blogs'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const ChatBot = lazy(() => import('./components/ChatBot/ChatBot'));

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <main className="main-content">
            <Hero />
            <Experience />
            <Features />
            <Skills />
            <Blogs />
            <Contact />
          </main>
          <ChatBot />
        </Suspense>
      </div>
    </>
  );
}

export default App;

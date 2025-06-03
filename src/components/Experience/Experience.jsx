import React, { useEffect, useRef } from 'react';
import './Experience.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './Particles';
import ExpBackground from '../../assets/Exp Background.png';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const panelsRef = useRef([]);
  const rolesRef = useRef([]);

  // Clear role refs on each render
  rolesRef.current = [];

  // Parallax background effect
  useEffect(() => {
    const handleScroll = () => {
      const bg = document.getElementById('exp-bg-img');
      if (bg) {
        const y = window.scrollY * 0.25;
        bg.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Pin the header
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: headerRef.current,
      pinSpacing: false,
    });

    // Animate company panels
    panelsRef.current.forEach((panel, index) => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Animate roles and bullets
    rolesRef.current.forEach((role, roleIndex) => {
      const bullets = role.querySelectorAll('li');
      gsap.fromTo(
        role,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: role,
            start: 'top 85%',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          },
        }
      );
      bullets.forEach((bullet, bulletIndex) => {
        gsap.fromTo(
          bullet,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: bulletIndex * 0.13,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: role,
              start: 'top 85%',
              end: 'bottom center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const experiences = [
    {
      company: 'DBS Bank Ltd',
      period: 'Aug 2022 - Aug 2023',
      roles: [
        {
          title: 'AI Solution Architect — Bank Statement Analysis',
          achievements: [
            'Led AI-driven innovations expanding LLM-powered functionality.',
            'Integrated AI-powered analytics into banking workflows.',
            'Mentored junior engineers and analysts, enabling first-sprint contributions.',
            'Authored technical documentation and onboarding guides.'
          ]
        },
        {
          title: 'Machine Learning Engineer — Bank Statement Analysis',
          achievements: [
            'Built key components for DBS 110 project — reducing SME loan disbursement to under 3 mins.',
            'Refactored backend Python systems to optimize performance.',
            'Improved SQL queries, cutting debugging time by 40%.',
            'Implemented Docker-based CI/CD, reducing setup time by 50% (Special Recognition Award).',
            'Developed GPT-powered semantic extraction processing 20K+ docs/day.'
          ]
        },
        {
          title: 'Machine Learning Operations Engineer — AutoFin Module',
          achievements: [
            'Won internal hackathon building automated retraining pipelines.',
            'Deployed robust MLOps pipelines for system reliability.',
            'Automated data validation, monitoring, deployment — reducing manual debugging efforts.',
            'Improved model stability, minimizing degradation over time.'
          ]
        }
      ]
    },
    {
      company: 'AceTech Pvt Ltd',
      period: 'Jul 2021 – Jul 2022',
      roles: [
        {
          title: 'Machine Learning Engineer',
          achievements: [
            'Built predictive maintenance ML models for Cisco networks reducing downtime by 20%.',
            'Deployed real-time anomaly detection for operations and cybersecurity teams.',
            'Led hybrid cloud migration to AWS and Kubernetes for better scalability.',
            'Piloted proactive monitoring system, dropping downtime incidents by 50%.'
          ]
        }
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      {/* Background Image Layer */}
      <img
        id="exp-bg-img"
        src={ExpBackground}
        alt="Experience Background"
        className="exp-bg-img"
        draggable="false"
      />
      {/* Mobile Overlay for Readability */}
      <div className="exp-bg-mobile-overlay" />
      {/* Particles Overlay */}
      <Particles />
      {/* Content */}
      <div className="experience-header" ref={headerRef}>
        <h2>The Training Logs of My Career</h2>
      </div>
      <div className="experience-panels">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="experience-panel"
            ref={el => (panelsRef.current[index] = el)}
          >
            <div className="company-header">
              <h3>{exp.company}</h3>
              <span className="period">{exp.period}</span>
            </div>
            {exp.roles.map((role, roleIndex) => (
              <div
                key={roleIndex}
                className="role-container"
                ref={el => {
                  if (el) rolesRef.current.push(el);
                }}
              >
                <h4>{role.title}</h4>
                <ul>
                  {role.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience; 
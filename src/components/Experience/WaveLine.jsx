import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WaveLine = () => {
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    
    // Create wave animation
    const waveAnimation = gsap.to(path, {
      attr: {
        d: "M 50,0 C 100,25 150,-25 200,0 C 250,25 300,-25 350,0 C 400,25 450,-25 500,0 C 550,25 600,-25 650,0 C 700,25 750,-25 800,0 C 850,25 900,-25 950,0 C 1000,25 1050,-25 1100,0 C 1150,25 1200,-25 1250,0 C 1300,25 1350,-25 1400,0 C 1450,25 1500,-25 1550,0 C 1600,25 1650,-25 1700,0 C 1750,25 1800,-25 1850,0 C 1900,25 1950,-25 2000,0"
      },
      duration: 2,
      ease: "none",
      repeat: -1,
      yoyo: true
    });

    // Add breathing effect
    const breathingAnimation = gsap.to(path, {
      strokeWidth: 3,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Add glow effect
    const glowAnimation = gsap.to(path, {
      filter: "blur(8px)",
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Handle scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const speed = 0.5;
      gsap.to(path, {
        attr: {
          d: `M 50,${scrollY * speed} C 100,${25 + scrollY * speed} 150,${-25 + scrollY * speed} 200,${scrollY * speed} C 250,${25 + scrollY * speed} 300,${-25 + scrollY * speed} 350,${scrollY * speed} C 400,${25 + scrollY * speed} 450,${-25 + scrollY * speed} 500,${scrollY * speed} C 550,${25 + scrollY * speed} 600,${-25 + scrollY * speed} 650,${scrollY * speed} C 700,${25 + scrollY * speed} 750,${-25 + scrollY * speed} 800,${scrollY * speed} C 850,${25 + scrollY * speed} 900,${-25 + scrollY * speed} 950,${scrollY * speed} C 1000,${25 + scrollY * speed} 1050,${-25 + scrollY * speed} 1100,${scrollY * speed} C 1150,${25 + scrollY * speed} 1200,${-25 + scrollY * speed} 1250,${scrollY * speed} C 1300,${25 + scrollY * speed} 1350,${-25 + scrollY * speed} 1400,${scrollY * speed} C 1450,${25 + scrollY * speed} 1500,${-25 + scrollY * speed} 1550,${scrollY * speed} C 1600,${25 + scrollY * speed} 1650,${-25 + scrollY * speed} 1700,${scrollY * speed} C 1750,${25 + scrollY * speed} 1800,${-25 + scrollY * speed} 1850,${scrollY * speed} C 1900,${25 + scrollY * speed} 1950,${-25 + scrollY * speed} 2000,${scrollY * speed}`
        },
        duration: 0.1,
        ease: "none"
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      waveAnimation.kill();
      breathingAnimation.kill();
      glowAnimation.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="wave-line-container">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 2000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRef}
          d="M 50,0 C 100,25 150,-25 200,0 C 250,25 300,-25 350,0 C 400,25 450,-25 500,0 C 550,25 600,-25 650,0 C 700,25 750,-25 800,0 C 850,25 900,-25 950,0 C 1000,25 1050,-25 1100,0 C 1150,25 1200,-25 1250,0 C 1300,25 1350,-25 1400,0 C 1450,25 1500,-25 1550,0 C 1600,25 1650,-25 1700,0 C 1750,25 1800,-25 1850,0 C 1900,25 1950,-25 2000,0"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="2"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
};

export default WaveLine; 
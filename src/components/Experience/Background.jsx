import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Background = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollSpeedRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create fluid material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScrollSpeed: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScrollSpeed;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // Noise functions
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          vec2 uv = vUv;
          vec2 mouse = uMouse;
          float time = uTime * 0.5 + uScrollSpeed;
          
          // Create multiple layers of noise
          float n1 = noise(uv * 3.0 + time * 0.1);
          float n2 = noise(uv * 5.0 - time * 0.15);
          float n3 = noise(uv * 7.0 + time * 0.2);
          
          // Combine noise layers
          float combined = (n1 + n2 + n3) / 3.0;
          
          // Create streaks
          float streaks = pow(combined, 3.0);
          
          // Add mouse interaction
          float dist = length(uv - mouse);
          float mouseEffect = smoothstep(0.5, 0.0, dist);
          
          // Create color
          vec3 color = vec3(0.0, 0.2, 0.4); // Base color (dark blue)
          color += vec3(0.0, 0.5, 1.0) * streaks * (1.0 + mouseEffect * 0.5); // Glowing streaks
          
          // Add subtle movement
          color += vec3(0.0, 0.1, 0.2) * sin(time * 0.5 + uv.x * 10.0) * 0.1;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true
    });

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(10, 10);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Handle mouse movement
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Handle scroll
    const handleScroll = () => {
      scrollSpeedRef.current = Math.min(window.scrollY * 0.001, 1.0);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;
      material.uniforms.uTime.value = timeRef.current;
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      material.uniforms.uScrollSpeed.value = scrollSpeedRef.current;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Background; 
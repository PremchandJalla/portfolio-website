import React from 'react';

const LazyImage = ({ href, src, alt, className }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={alt}>
    <img src={src} alt={alt} className={className} style={{ width: '55px', height: '55px' }} />
  </a>
);

export default LazyImage; 
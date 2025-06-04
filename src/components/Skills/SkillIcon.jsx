import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './Skills.css'; // Assuming shared styles, or create SkillIcon.css

const SkillIcon = ({ skill, categoryColor }) => {
  const { name, iconSet, iconName } = skill;
  const [iconSrc, setIconSrc] = useState(null);
  const [hasError, setHasError] = useState(false);

  const deviconBaseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
  const simpleIconsBaseUrl = 'https://cdn.simpleicons.org/';

  useEffect(() => {
    setHasError(false); // Reset error state on skill change
    let src = null;
    if (iconSet === 'devicon') {
      // Devicon names can be like 'python/python-original.svg' or just 'python-original'
      // We need to ensure the path is correctly formed.
      const parts = iconName.includes('/') ? iconName.split('/') : [iconName.split('-')[0], iconName];
      const iconPath = parts.length > 1 ? `${parts[0]}/${parts[1]}.svg` : `${parts[0]}/${parts[0]}-original.svg`;
      src = `${deviconBaseUrl}${iconPath}`;
    } else if (iconSet === 'simpleicons') {
      // Simple Icons CDN: simpleicons.org/icons/ALPHABET.svg
      // Or with color: simpleicons.org/icons/ALPHABET/HEXCOLOR.svg
      const color = categoryColor ? categoryColor.substring(1) : 'FFFFFF'; // Default to white if no color
      src = `${simpleIconsBaseUrl}${iconName}/${color}`;
    }
    setIconSrc(src);
  }, [skill, iconSet, iconName, categoryColor]);

  if (hasError && iconSet !== 'fontawesome' && iconSet !== 'iconify') {
    // Fallback for failed image loads (Devicon, SimpleIcons)
    return <i className="fas fa-question-circle skill-fa-icon" aria-label={`${name} (icon not found)`}></i>;
  }

  switch (iconSet) {
    case 'devicon':
    case 'simpleicons':
      return (
        <img 
          src={iconSrc} 
          alt={`${name} icon`} 
          className="skill-svg-icon" 
          loading="lazy"
          onError={() => setHasError(true)}
        />
      );
    case 'iconify':
      return (
        <Icon 
          icon={iconName} 
          className="skill-iconify-icon" 
          aria-label={`${name} icon`}
        />
      );
    case 'fontawesome':
      return <i className={`${iconName} skill-fa-icon`} aria-label={`${name} icon`}></i>;
    default:
      return <i className="fas fa-cog skill-fa-icon" aria-label={`${name} (default icon)`}></i>; // Generic fallback
  }
};

export default SkillIcon; 
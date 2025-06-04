import React, { useState, useEffect } from 'react';
import './AccessibilityPanel.css';

const ACPContext = React.createContext();

export const useACP = () => React.useContext(ACPContext);

const AccessibilityPanel = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showFocusGuide, setShowFocusGuide] = useState(false);
  const [screenReaderInfo, setScreenReaderInfo] = useState(false);

  // Apply accessibility settings to <body>
  useEffect(() => {
    document.body.style.transition = 'font-size 0.3s cubic-bezier(0.4,0,0.2,1)';
    document.body.style.fontSize = textSize === 'large' ? '1.25em' : '';
    if (highContrast) {
      document.body.classList.add('acp-high-contrast');
    } else {
      document.body.classList.remove('acp-high-contrast');
    }
    if (reduceMotion) {
      document.body.classList.add('acp-reduce-motion');
    } else {
      document.body.classList.remove('acp-reduce-motion');
    }
  }, [textSize, highContrast, reduceMotion]);

  // Honor prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) setReduceMotion(true);
  }, []);

  // Keyboard accessibility for button
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setOpen(o => !o);
    }
  };

  // Reset all settings
  const resetAll = () => {
    setTextSize('normal');
    setHighContrast(false);
    setReduceMotion(false);
    setShowFocusGuide(false);
    setScreenReaderInfo(false);
  };

  return (
    <ACPContext.Provider value={{ textSize, highContrast, reduceMotion, showFocusGuide, screenReaderInfo }}>
      {children}
      <button
        className="acp-fab"
        aria-label="Open Accessibility Control Panel"
        aria-haspopup="dialog"
        aria-expanded={open}
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className="acp-icon" aria-hidden="true">♿</span>
      </button>
      {open && (
        <div className="acp-modal-overlay" role="dialog" aria-modal="true" aria-label="Accessibility Control Panel">
          <div className="acp-modal" tabIndex={-1}>
            <h2 className="acp-modal-title">Accessibility Control Panel</h2>
            <div className="acp-modal-options">
              <label className="acp-toggle">
                <input
                  type="checkbox"
                  checked={textSize === 'large'}
                  onChange={e => setTextSize(e.target.checked ? 'large' : 'normal')}
                />
                <span>Increase Text Size</span>
              </label>
              <label className="acp-toggle">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={e => setHighContrast(e.target.checked)}
                />
                <span>High Contrast Mode</span>
              </label>
              <label className="acp-toggle">
                <input
                  type="checkbox"
                  checked={reduceMotion}
                  onChange={e => setReduceMotion(e.target.checked)}
                />
                <span>Reduce Motion</span>
              </label>
              <label className="acp-toggle">
                <input
                  type="checkbox"
                  checked={showFocusGuide}
                  onChange={e => setShowFocusGuide(e.target.checked)}
                />
                <span>Keyboard Navigation Guide</span>
              </label>
              <label className="acp-toggle">
                <input
                  type="checkbox"
                  checked={screenReaderInfo}
                  onChange={e => setScreenReaderInfo(e.target.checked)}
                />
                <span>Screen Reader Mode Info</span>
              </label>
            </div>
            <div className="acp-modal-info">
              {showFocusGuide && (
                <div className="acp-guide">
                  <strong>Keyboard Navigation:</strong> Use <kbd>Tab</kbd> to move, <kbd>Enter</kbd> to activate, <kbd>Shift+Tab</kbd> to go back. Focus rings are visible.
                </div>
              )}
              {screenReaderInfo && (
                <div className="acp-guide" aria-live="polite">
                  Screen reader compatible via semantic landmarks and ARIA roles.
                </div>
              )}
            </div>
            <button className="acp-reset" onClick={resetAll}>
              Reset Accessibility Settings
            </button>
            <button className="acp-close" aria-label="Close Accessibility Control Panel" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </ACPContext.Provider>
  );
};

export default AccessibilityPanel; 
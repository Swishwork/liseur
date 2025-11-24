import React, { useState, useEffect } from 'react';
import { getRandomEncouragingMessage } from '../data/curriculum';
import '../styles/warmTheme.css';

interface EncouragementMessageProps {
  show: boolean;
  message?: string;
  duration?: number;
  onHide?: () => void;
}

export const EncouragementMessage: React.FC<EncouragementMessageProps> = ({
  show,
  message,
  duration = 3000,
  onHide
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (show) {
      setDisplayMessage(message || getRandomEncouragingMessage());
      setIsVisible(true);
      setFadeOut(false);

      // Start fade out before hiding
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, duration - 500);

      // Hide completely after duration
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onHide?.();
      }, duration);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [show, message, duration, onHide]);

  if (!isVisible) return null;

  return (
    <div className={`encouragement-message ${fadeOut ? 'fade-out' : ''}`}>
      {displayMessage}
    </div>
  );
};

export default EncouragementMessage;
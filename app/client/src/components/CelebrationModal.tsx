import React, { useEffect, useState } from 'react';
import { celebrationMessages } from '../data/curriculum';
import '../styles/warmTheme.css';

interface CelebrationModalProps {
  isOpen: boolean;
  levelId: number;
  onContinue: () => void;
  onPracticeAgain: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  levelId,
  onContinue,
  onPracticeAgain
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const celebration = celebrationMessages[levelId as keyof typeof celebrationMessages];
  
  if (!celebration) return null;

  return (
    <div className="celebration-modal" onClick={onContinue}>
      <div className="celebration-content" onClick={(e) => e.stopPropagation()}>
        {showConfetti && <Confetti />}
        
        <div className="celebration-stars">
          ⭐ ⭐ ⭐
        </div>
        
        <h2 className="celebration-title">{celebration.title}</h2>
        <p className="celebration-message">{celebration.message}</p>
        
        {celebration.nextLevelPreview && (
          <div className="celebration-preview">
            <p className="celebration-preview__text">{celebration.nextLevelPreview}</p>
          </div>
        )}
        
        <div className="celebration-buttons">
          <button 
            className="btn-warm btn-warm-primary celebration-button"
            onClick={onContinue}
          >
            Continue Journey
          </button>
          <button 
            className="btn-warm btn-warm-secondary celebration-button"
            onClick={onPracticeAgain}
          >
            Practice Again
          </button>
        </div>
      </div>
    </div>
  );
};

const Confetti: React.FC = () => {
  const colors = ['#FFA500', '#90EE90', '#87CEEB', '#DDA0DD', '#FFB5B5'];
  const confettiCount = 50;
  
  return (
    <div className="confetti-container">
      {[...Array(confettiCount)].map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default CelebrationModal;
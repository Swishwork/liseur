import React, { useEffect, useState } from 'react';
import '../styles/warmTheme.css';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showMilestones?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showMilestones = true,
  animated = true
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const percentage = Math.min(100, Math.round((current / total) * 100));
  
  useEffect(() => {
    if (animated) {
      // Animate progress bar fill
      const timer = setTimeout(() => {
        setDisplayProgress(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(percentage);
    }
  }, [percentage, animated]);
  
  const getMilestoneClass = (milestone: number) => {
    const milestonePercentage = (milestone / total) * 100;
    return displayProgress >= milestonePercentage ? 'milestone--reached' : '';
  };
  
  const getMilestones = () => {
    if (!showMilestones || total <= 10) return [];
    
    const milestones = [];
    const step = total <= 20 ? 5 : 10;
    
    for (let i = step; i < total; i += step) {
      milestones.push(i);
    }
    
    return milestones;
  };
  
  return (
    <div className="progress-bar-wrapper">
      {label && (
        <div className="progress-bar-label">
          <span className="progress-bar-label__text">{label}</span>
          <span className="progress-bar-label__count">
            {current} / {total} blends completed
          </span>
        </div>
      )}
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${displayProgress}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
        >
          {displayProgress > 0 && <div className="progress-bar-shimmer" />}
        </div>
        
        {showMilestones && getMilestones().map((milestone) => (
          <div
            key={milestone}
            className={`progress-bar-milestone ${getMilestoneClass(milestone)}`}
            style={{ left: `${(milestone / total) * 100}%` }}
            title={`${milestone} blends`}
          >
            <span className="progress-bar-milestone__marker" />
            {milestone % 10 === 0 && (
              <span className="progress-bar-milestone__label">{milestone}</span>
            )}
          </div>
        ))}
        
        {displayProgress >= 100 && (
          <div className="progress-bar-complete">
            <span className="progress-bar-complete__icon">✨</span>
          </div>
        )}
      </div>
      
      <div className="progress-bar-info">
        <span className="progress-bar-percentage">{displayProgress}%</span>
        {displayProgress >= 50 && displayProgress < 100 && (
          <span className="progress-bar-encouragement">
            {displayProgress >= 75 ? "Almost there!" : "You're halfway!"}
          </span>
        )}
        {displayProgress >= 100 && (
          <span className="progress-bar-encouragement progress-bar-encouragement--complete">
            Level complete! 🎉
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
import React from 'react';
import { Level, UserProgress } from '../data/curriculum';
import { isLevelUnlocked, isLevelComplete, getLevelProgress } from '../services/progressStorage';
import '../styles/warmTheme.css';

interface LevelMapProps {
  levels: Level[];
  userProgress: UserProgress;
  onLevelSelect: (level: Level) => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({ levels, userProgress, onLevelSelect }) => {
  return (
    <div className="level-map">
      <div className="level-map__header">
        <h1 className="level-map__title">Your Learning Journey</h1>
        <p className="level-map__subtitle">Master French reading one step at a time!</p>
      </div>
      
      <div className="level-map__path">
        {levels.map((level, index) => {
          const isUnlocked = isLevelUnlocked(userProgress, level.id);
          const isCompleted = isLevelComplete(userProgress, level.id);
          const isCurrent = userProgress.currentLevelId === level.id && !isCompleted;
          const progress = getLevelProgress(userProgress, level.id);
          
          return (
            <React.Fragment key={level.id}>
              <div className="level-map__node">
                <button
                  className={`level-card ${
                    !isUnlocked ? 'level-card--locked' : ''
                  } ${isCompleted ? 'level-card--completed' : ''} ${
                    isCurrent ? 'level-card--current' : ''
                  }`}
                  onClick={() => isUnlocked && onLevelSelect(level)}
                  disabled={!isUnlocked}
                  aria-label={`${level.name} - ${isCompleted ? 'Completed' : isUnlocked ? 'Click to play' : 'Locked'}`}
                >
                  <div className="level-card__icon">{level.icon}</div>
                  <h3 className="level-card__name">{level.name}</h3>
                  <p className="level-card__description">{level.description}</p>
                  
                  {isCompleted && (
                    <div className="level-card__badge">
                      <span className="level-card__checkmark">✓</span>
                      <span className="level-card__status">Complete!</span>
                    </div>
                  )}
                  
                  {!isCompleted && isUnlocked && progress > 0 && (
                    <div className="level-card__progress">
                      <div className="level-card__progress-bar">
                        <div 
                          className="level-card__progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="level-card__progress-text">{progress}%</span>
                    </div>
                  )}
                  
                  {!isUnlocked && (
                    <div className="level-card__lock">
                      <span className="level-card__lock-icon">🔒</span>
                      <span className="level-card__lock-text">
                        Complete {levels[index - 1]?.name} to unlock
                      </span>
                    </div>
                  )}
                  
                  <div className="level-card__requirements">
                    <span className="level-card__blends">
                      {level.requiredSuccesses} blends to complete
                    </span>
                  </div>
                </button>
              </div>
              
              {index < levels.length - 1 && (
                <div className={`level-map__connector ${
                  isCompleted ? 'level-map__connector--completed' : ''
                }`}>
                  <svg width="40" height="60" viewBox="0 0 40 60">
                    <path
                      d="M20 0 L20 60"
                      stroke={isCompleted ? '#90EE90' : '#E0D0C0'}
                      strokeWidth="3"
                      strokeDasharray={isCompleted ? '0' : '5,5'}
                      fill="none"
                    />
                    <circle
                      cx="20"
                      cy="30"
                      r="5"
                      fill={isCompleted ? '#90EE90' : '#E0D0C0'}
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="level-map__stats">
        <div className="level-map__stat">
          <span className="level-map__stat-label">Levels Complete</span>
          <span className="level-map__stat-value">
            {userProgress.completedLevels.length} / {levels.length}
          </span>
        </div>
        <div className="level-map__stat">
          <span className="level-map__stat-label">Total Blends</span>
          <span className="level-map__stat-value">{userProgress.totalBlendsCompleted}</span>
        </div>
      </div>
    </div>
  );
};

export default LevelMap;
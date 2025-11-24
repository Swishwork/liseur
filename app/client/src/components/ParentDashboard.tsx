import React, { useState } from 'react';
import { UserProgress, curriculum } from '../data/curriculum';
import { resetProgress, getTotalPracticeTime, getRecentActivity } from '../services/progressStorage';
import '../styles/warmTheme.css';

interface ParentDashboardProps {
  userProgress: UserProgress;
  onProgressReset: () => void;
  onClose: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  userProgress,
  onProgressReset,
  onClose
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  
  const handleResetClick = () => {
    setShowConfirmReset(true);
  };
  
  const handleConfirmReset = () => {
    resetProgress();
    onProgressReset();
    setShowConfirmReset(false);
  };
  
  const handleCancelReset = () => {
    setShowConfirmReset(false);
  };
  
  const totalLevels = curriculum.length;
  const completedLevels = userProgress.completedLevels.length;
  const practiceTime = getTotalPracticeTime(userProgress);
  const recentActivity = getRecentActivity(userProgress);
  const completionPercentage = Math.round((completedLevels / totalLevels) * 100);
  
  return (
    <div className="parent-dashboard">
      <div className="parent-dashboard__header">
        <h2 className="parent-dashboard__title">Parent Dashboard</h2>
        <button 
          onClick={onClose}
          className="parent-dashboard__close"
          aria-label="Close dashboard"
        >
          ✕
        </button>
      </div>
      
      <div className="parent-dashboard__content">
        <section className="parent-dashboard__section">
          <h3 className="parent-dashboard__section-title">Progress Overview</h3>
          
          <div className="parent-dashboard__stats">
            <div className="parent-stat-card">
              <div className="parent-stat-card__icon">📚</div>
              <div className="parent-stat-card__content">
                <div className="parent-stat-card__value">{completedLevels} / {totalLevels}</div>
                <div className="parent-stat-card__label">Levels Completed</div>
              </div>
            </div>
            
            <div className="parent-stat-card">
              <div className="parent-stat-card__icon">⏱️</div>
              <div className="parent-stat-card__content">
                <div className="parent-stat-card__value">{practiceTime}</div>
                <div className="parent-stat-card__label">Practice Time</div>
              </div>
            </div>
            
            <div className="parent-stat-card">
              <div className="parent-stat-card__icon">🎯</div>
              <div className="parent-stat-card__content">
                <div className="parent-stat-card__value">{userProgress.totalBlendsCompleted}</div>
                <div className="parent-stat-card__label">Total Blends</div>
              </div>
            </div>
            
            <div className="parent-stat-card">
              <div className="parent-stat-card__icon">📈</div>
              <div className="parent-stat-card__content">
                <div className="parent-stat-card__value">{completionPercentage}%</div>
                <div className="parent-stat-card__label">Journey Progress</div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="parent-dashboard__section">
          <h3 className="parent-dashboard__section-title">Level Details</h3>
          
          <div className="parent-dashboard__levels">
            {curriculum.map((level) => {
              const isCompleted = userProgress.completedLevels.includes(level.id);
              const levelProgress = userProgress.levelProgress[level.id];
              const blendsCompleted = levelProgress?.blendsCompleted || 0;
              
              return (
                <div key={level.id} className="parent-level-item">
                  <div className="parent-level-item__icon">{level.icon}</div>
                  <div className="parent-level-item__info">
                    <div className="parent-level-item__name">{level.name}</div>
                    <div className="parent-level-item__progress">
                      {isCompleted ? (
                        <span className="parent-level-item__status parent-level-item__status--completed">
                          ✓ Completed
                        </span>
                      ) : (
                        <span className="parent-level-item__status">
                          {blendsCompleted} / {level.requiredSuccesses} blends
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        {recentActivity.length > 0 && (
          <section className="parent-dashboard__section">
            <h3 className="parent-dashboard__section-title">Recent Activity</h3>
            
            <div className="parent-dashboard__activity">
              {recentActivity.map((activity, index) => (
                <div key={index} className="parent-activity-item">
                  <span className="parent-activity-item__icon">📖</span>
                  <span className="parent-activity-item__text">{activity}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <section className="parent-dashboard__section parent-dashboard__section--actions">
          <button 
            onClick={handleResetClick}
            className="btn-warm btn-warm-danger"
          >
            Reset All Progress
          </button>
          
          <p className="parent-dashboard__warning">
            Warning: Resetting progress will clear all completed levels and practice history.
          </p>
        </section>
      </div>
      
      {showConfirmReset && (
        <div className="parent-dashboard__modal">
          <div className="parent-dashboard__modal-content">
            <h3>Confirm Reset</h3>
            <p>Are you sure you want to reset all progress? This action cannot be undone.</p>
            <div className="parent-dashboard__modal-buttons">
              <button 
                onClick={handleConfirmReset}
                className="btn-warm btn-warm-danger"
              >
                Yes, Reset Progress
              </button>
              <button 
                onClick={handleCancelReset}
                className="btn-warm btn-warm-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
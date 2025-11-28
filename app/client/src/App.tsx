import { useState, useEffect } from 'react'
import BlendingBoard from './components/BlendingBoard'
import LevelMap from './components/LevelMap'
import CelebrationModal from './components/CelebrationModal'
import ParentDashboard from './components/ParentDashboard'
import EncouragementMessage from './components/EncouragementMessage'
import { curriculum, Level } from './data/curriculum'
import { 
  loadProgress, 
  saveProgress, 
  updateLevelProgress, 
  completeLevel
} from './services/progressStorage'
import { UserState } from './data/curriculum'
import './styles/warmTheme.css'
import './styles/levelMap.css'
import './styles/progressBar.css'
import './styles/parentDashboard.css'

type ViewMode = 'journey' | 'practice' | 'parent'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('journey')
  const [userState, setUserState] = useState<UserState>(() => loadProgress())
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationLevelId, setCelebrationLevelId] = useState<number>(1)
  const [showEncouragement, setShowEncouragement] = useState(false)

  // Apply warm theme to body
  useEffect(() => {
    document.body.classList.add('warm-theme')
    return () => {
      document.body.classList.remove('warm-theme')
    }
  }, [])

  // Save progress whenever userState changes
  useEffect(() => {
    saveProgress(userState)
  }, [userState])

  // Update curriculum data with user progress
  const curriculumWithProgress = curriculum.map(level => ({
    ...level,
    unlocked: level.id === 1 || userState.progress.completedLevels.includes(level.id - 1),
    completed: userState.progress.completedLevels.includes(level.id)
  }))

  const handleLevelSelect = (level: Level) => {
    setCurrentLevel(level)
    setViewMode('practice')
  }

  const handleBlendComplete = () => {
    if (!currentLevel) return

    const currentProgress = userState.progress.levelProgress[currentLevel.id]?.blendsCompleted || 0
    const newProgress = currentProgress + 1
    
    // Update progress
    const updatedState = updateLevelProgress(userState, currentLevel.id, newProgress)
    setUserState(updatedState)
    
    // Show encouragement every 3 blends
    if (userState.settings.encouragementEnabled && newProgress % 3 === 0 && newProgress < currentLevel.requiredSuccesses) {
      setShowEncouragement(true)
    }
  }

  const handleLevelComplete = () => {
    if (!currentLevel) return

    // Complete the level
    const updatedState = completeLevel(userState, currentLevel.id)
    setUserState(updatedState)
    
    // Show celebration
    setCelebrationLevelId(currentLevel.id)
    setShowCelebration(true)
  }

  const handleCelebrationContinue = () => {
    setShowCelebration(false)
    setCurrentLevel(null)
    setViewMode('journey')
  }

  const handleCelebrationPracticeAgain = () => {
    setShowCelebration(false)
  }

  const handleBackToMap = () => {
    setCurrentLevel(null)
    setViewMode('journey')
  }

  const handleOpenParentDashboard = () => {
    setViewMode('parent')
  }

  const handleCloseParentDashboard = () => {
    setViewMode('journey')
  }

  const handleProgressReset = () => {
    const freshState = loadProgress() // This will load default state after reset
    setUserState(freshState)
    setCurrentLevel(null)
    setViewMode('journey')
  }

  const currentLevelProgress = currentLevel 
    ? userState.progress.levelProgress[currentLevel.id]?.blendsCompleted || 0
    : 0

  return (
    <div className="app">
      {viewMode === 'journey' && (
        <>
          <div className="app-header">
            <h1 className="app-title">Liseur - Learn to Read French</h1>
            <button 
              onClick={handleOpenParentDashboard}
              className="btn-warm btn-parent-dashboard"
              aria-label="Open parent dashboard"
            >
              👨‍👩‍👧 Parent Area
            </button>
          </div>
          
          <LevelMap
            levels={curriculumWithProgress}
            userProgress={userState.progress}
            onLevelSelect={handleLevelSelect}
          />
        </>
      )}

      {viewMode === 'practice' && currentLevel && (
        <BlendingBoard 
          levelConfig={currentLevel}
          onBlendComplete={handleBlendComplete}
          onLevelComplete={handleLevelComplete}
          currentProgress={currentLevelProgress}
          showProgress={true}
          onBackToMap={handleBackToMap}
        />
      )}

      {viewMode === 'parent' && (
        <ParentDashboard
          userProgress={userState.progress}
          onProgressReset={handleProgressReset}
          onClose={handleCloseParentDashboard}
        />
      )}

      <CelebrationModal
        isOpen={showCelebration}
        levelId={celebrationLevelId}
        onContinue={handleCelebrationContinue}
        onPracticeAgain={handleCelebrationPracticeAgain}
      />

      <EncouragementMessage
        show={showEncouragement}
        onHide={() => setShowEncouragement(false)}
      />
    </div>
  )
}

export default App
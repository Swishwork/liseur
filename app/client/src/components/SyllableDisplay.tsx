import React, { useEffect, useRef, useState } from 'react'

interface SyllableDisplayProps {
  consonant: string | null
  vowel: string | null
  syllable: string | null
  audioUrl: string | null
  isBlending: boolean
}

const SyllableDisplay: React.FC<SyllableDisplayProps> = ({
  consonant,
  vowel,
  syllable,
  audioUrl,
  isBlending
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [animationState, setAnimationState] = useState<'idle' | 'sliding' | 'complete'>('idle')

  useEffect(() => {
    if (isBlending && consonant && vowel) {
      setAnimationState('sliding')
      
      const animationTimer = setTimeout(() => {
        setAnimationState('complete')
        
        if (audioRef.current && audioUrl) {
          audioRef.current.src = audioUrl
          audioRef.current.play().catch(err => {
            console.warn('Audio playback failed:', err)
          })
        }
      }, 1500)

      return () => clearTimeout(animationTimer)
    } else {
      setAnimationState('idle')
    }
  }, [isBlending, consonant, vowel, audioUrl])

  const renderContent = () => {
    if (animationState === 'idle') {
      return (
        <div className="syllable-display__placeholder">
          <span>Sélectionnez une consonne et une voyelle</span>
        </div>
      )
    }

    if (animationState === 'sliding') {
      return (
        <div className="syllable-display__animation">
          <span className="syllable-display__letter syllable-display__letter--consonant">
            {consonant}
          </span>
          <span className="syllable-display__letter syllable-display__letter--vowel">
            {vowel}
          </span>
        </div>
      )
    }

    if (animationState === 'complete' && syllable) {
      return (
        <div className="syllable-display__result">
          <span className="syllable-display__syllable">{syllable}</span>
        </div>
      )
    }

    return null
  }

  return (
    <div className="syllable-display" aria-live="polite" aria-atomic="true">
      <div className="syllable-display__container">
        {renderContent()}
      </div>
      <audio 
        ref={audioRef} 
        preload="auto"
        aria-label={`Prononciation de ${syllable || ''}`}
      />
    </div>
  )
}

export default SyllableDisplay
import React, { useState, useEffect } from 'react'
import LetterSelector from './LetterSelector'
import SyllableDisplay from './SyllableDisplay'
import ProgressBar from './ProgressBar'
import { Level } from '../data/curriculum'
import { 
  fetchConsonants, 
  fetchVowels, 
  blendSyllable,
  BlendResponse 
} from '../services/api'

interface BlendingBoardProps {
  levelConfig?: Level;
  onBlendComplete?: () => void;
  onLevelComplete?: () => void;
  currentProgress?: number;
  showProgress?: boolean;
  onBackToMap?: () => void;
}

const BlendingBoard: React.FC<BlendingBoardProps> = ({ 
  levelConfig,
  onBlendComplete,
  onLevelComplete,
  currentProgress = 0,
  showProgress = false,
  onBackToMap
}) => {
  const [consonants, setConsonants] = useState<string[]>([])
  const [vowels, setVowels] = useState<string[]>([])
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null)
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null)
  const [blendResult, setBlendResult] = useState<BlendResponse | null>(null)
  const [isBlending, setIsBlending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blendsCompleted, setBlendsCompleted] = useState(currentProgress)

  useEffect(() => {
    if (levelConfig) {
      // Use level-specific letters
      setConsonants(levelConfig.consonants)
      setVowels(levelConfig.vowels)
      setLoading(false)
    } else {
      // Load all letters (legacy mode)
      loadLetters()
    }
  }, [levelConfig])

  useEffect(() => {
    setBlendsCompleted(currentProgress)
  }, [currentProgress])

  useEffect(() => {
    if ((selectedConsonant && selectedVowel) || 
        (levelConfig?.consonants.length === 0 && selectedVowel && selectedConsonant === null)) {
      performBlending()
    } else {
      setBlendResult(null)
      setIsBlending(false)
    }
  }, [selectedConsonant, selectedVowel])

  useEffect(() => {
    // Check if level is complete
    if (levelConfig && blendsCompleted >= levelConfig.requiredSuccesses) {
      setTimeout(() => {
        onLevelComplete?.()
      }, 1000)
    }
  }, [blendsCompleted, levelConfig, onLevelComplete])

  const loadLetters = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [consonantsData, vowelsData] = await Promise.all([
        fetchConsonants(),
        fetchVowels()
      ])
      
      setConsonants(consonantsData.letters)
      setVowels(vowelsData.letters)
    } catch (err) {
      setError('Erreur lors du chargement des lettres')
      console.error('Failed to load letters:', err)
    } finally {
      setLoading(false)
    }
  }

  const performBlending = async () => {
    const consonantToBlend = selectedConsonant || '';
    const vowelToBlend = selectedVowel || '';
    
    // For vowel-only levels, allow blending with empty consonant
    // For consonant-vowel levels, require both selections
    const isVowelOnlyLevel = levelConfig?.consonants.length === 0;
    if (!vowelToBlend) return;
    if (!isVowelOnlyLevel && !consonantToBlend && !selectedConsonant) return;

    try {
      setIsBlending(true)
      setError(null)
      
      const result = await blendSyllable(consonantToBlend, vowelToBlend)
      setBlendResult(result)
      
      // Track progress
      const newCount = blendsCompleted + 1
      setBlendsCompleted(newCount)
      onBlendComplete?.()
      
    } catch (err) {
      setError('Erreur lors de la création de la syllabe')
      console.error('Failed to blend syllable:', err)
      setIsBlending(false)
    }
  }

  const handleConsonantSelect = (consonant: string) => {
    if (selectedConsonant === consonant) {
      setSelectedConsonant(null)
    } else {
      setSelectedConsonant(consonant)
    }
  }

  const handleVowelSelect = (vowel: string) => {
    if (selectedVowel === vowel) {
      setSelectedVowel(null)
    } else {
      setSelectedVowel(vowel)
    }
  }

  const handleReset = () => {
    setSelectedConsonant(null)
    setSelectedVowel(null)
    setBlendResult(null)
    setIsBlending(false)
  }

  if (loading) {
    return (
      <div className="blending-board blending-board--loading">
        <div className="loading-message">Chargement...</div>
      </div>
    )
  }

  if (error && !consonants.length && !vowels.length) {
    return (
      <div className="blending-board blending-board--error">
        <div className="error-message">{error}</div>
        <button onClick={loadLetters} className="retry-button">
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <div className="blending-board">
      <header className="blending-board__header">
        <div className="blending-board__header-left">
          {onBackToMap && (
            <button 
              onClick={onBackToMap}
              className="btn-warm btn-warm-secondary"
              aria-label="Back to journey map"
            >
              ← Journey Map
            </button>
          )}
          <h1>{levelConfig?.name || 'Le Mélangeur de Syllabes'}</h1>
        </div>
        <button 
          onClick={handleReset}
          className="reset-button btn-warm btn-warm-info"
          aria-label="Réinitialiser la sélection"
        >
          Recommencer
        </button>
      </header>

      {showProgress && levelConfig && (
        <ProgressBar 
          current={blendsCompleted}
          total={levelConfig.requiredSuccesses}
          label={`Level ${levelConfig.id}: ${levelConfig.name}`}
          animated={true}
        />
      )}

      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}

      <div className="blending-board__content">
        <div className="blending-board__selectors">
          {consonants.length > 0 && (
            <LetterSelector
              letters={consonants}
              selectedLetter={selectedConsonant}
              onLetterSelect={handleConsonantSelect}
              label="Consonnes"
              type="consonant"
            />
          )}
          
          <LetterSelector
            letters={vowels}
            selectedLetter={selectedVowel}
            onLetterSelect={handleVowelSelect}
            label={consonants.length > 0 ? "Voyelles" : "Select Vowels"}
            type="vowel"
          />
        </div>

        <SyllableDisplay
          consonant={selectedConsonant}
          vowel={selectedVowel}
          syllable={blendResult?.syllable || null}
          audioUrl={blendResult?.audio_url || null}
          isBlending={isBlending}
        />
      </div>
    </div>
  )
}

export default BlendingBoard
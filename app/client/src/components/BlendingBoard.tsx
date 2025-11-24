import React, { useState, useEffect } from 'react'
import LetterSelector from './LetterSelector'
import SyllableDisplay from './SyllableDisplay'
import { 
  fetchConsonants, 
  fetchVowels, 
  blendSyllable,
  BlendResponse 
} from '../services/api'

const BlendingBoard: React.FC = () => {
  const [consonants, setConsonants] = useState<string[]>([])
  const [vowels, setVowels] = useState<string[]>([])
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null)
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null)
  const [blendResult, setBlendResult] = useState<BlendResponse | null>(null)
  const [isBlending, setIsBlending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLetters()
  }, [])

  useEffect(() => {
    if (selectedConsonant && selectedVowel) {
      performBlending()
    } else {
      setBlendResult(null)
      setIsBlending(false)
    }
  }, [selectedConsonant, selectedVowel])

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
    if (!selectedConsonant || !selectedVowel) return

    try {
      setIsBlending(true)
      setError(null)
      
      const result = await blendSyllable(selectedConsonant, selectedVowel)
      setBlendResult(result)
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

  if (error && !consonants.length) {
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
        <h1>Le Mélangeur de Syllabes</h1>
        <button 
          onClick={handleReset}
          className="reset-button"
          aria-label="Réinitialiser la sélection"
        >
          Recommencer
        </button>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}

      <div className="blending-board__content">
        <div className="blending-board__selectors">
          <LetterSelector
            letters={consonants}
            selectedLetter={selectedConsonant}
            onLetterSelect={handleConsonantSelect}
            label="Consonnes"
            type="consonant"
          />
          
          <LetterSelector
            letters={vowels}
            selectedLetter={selectedVowel}
            onLetterSelect={handleVowelSelect}
            label="Voyelles"
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
import React from 'react'

interface LetterSelectorProps {
  letters: string[]
  selectedLetter: string | null
  onLetterSelect: (letter: string) => void
  label: string
  type: 'consonant' | 'vowel'
}

const LetterSelector: React.FC<LetterSelectorProps> = ({
  letters,
  selectedLetter,
  onLetterSelect,
  label,
  type
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, letter: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onLetterSelect(letter)
    }
  }

  return (
    <div className={`letter-selector letter-selector--${type}`}>
      <h2 className="letter-selector__label">{label}</h2>
      <div className="letter-selector__grid" role="group" aria-label={label}>
        {letters.map((letter) => (
          <button
            key={letter}
            className={`letter-selector__button ${
              selectedLetter === letter ? 'letter-selector__button--selected' : ''
            }`}
            onClick={() => onLetterSelect(letter)}
            onKeyDown={(e) => handleKeyDown(e, letter)}
            aria-pressed={selectedLetter === letter}
            aria-label={`${type === 'consonant' ? 'Consonne' : 'Voyelle'} ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LetterSelector
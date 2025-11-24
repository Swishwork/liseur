"""Phonics logic for French syllable blending."""

from typing import List, Set, Tuple

FRENCH_CONSONANTS: List[str] = [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
    'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'
]

FRENCH_VOWELS: List[str] = [
    'a', 'e', 'é', 'è', 'i', 'o', 'u', 'y',
    'ou', 'ai', 'ei', 'au', 'eu', 'oi'
]

SIMPLE_VOWELS: List[str] = ['a', 'e', 'i', 'o', 'u']

INVALID_COMBINATIONS: Set[Tuple[str, str]] = {
    ('h', 'i'),
    ('h', 'u'),
    ('q', 'e'),
    ('q', 'i'),
    ('q', 'o'),
}

def get_consonants() -> List[str]:
    """Get list of available French consonants."""
    return FRENCH_CONSONANTS.copy()

def get_vowels() -> List[str]:
    """Get list of available French vowels (simple for MVP)."""
    return SIMPLE_VOWELS.copy()

def is_valid_combination(consonant: str, vowel: str) -> bool:
    """Check if consonant-vowel combination is valid in French."""
    consonant = consonant.lower().strip()
    vowel = vowel.lower().strip()
    
    if consonant not in FRENCH_CONSONANTS:
        return False
    
    if vowel not in SIMPLE_VOWELS and vowel not in FRENCH_VOWELS:
        return False
    
    if (consonant, vowel) in INVALID_COMBINATIONS:
        return False
    
    if consonant == 'q' and vowel != 'u':
        return False
    
    return True

def blend_syllable(consonant: str, vowel: str) -> str:
    """Blend consonant and vowel to create syllable."""
    consonant = consonant.lower().strip()
    vowel = vowel.lower().strip()
    
    if not is_valid_combination(consonant, vowel):
        raise ValueError(f"Invalid combination: {consonant} + {vowel}")
    
    return f"{consonant}{vowel}"

def get_syllable_variations(base_syllable: str) -> List[str]:
    """Get common variations of a syllable for practice."""
    variations = [base_syllable]
    
    if len(base_syllable) == 2:
        consonant = base_syllable[0]
        vowel = base_syllable[1]
        
        if vowel in ['a', 'e', 'o']:
            variations.append(f"{consonant}{vowel}n")
            variations.append(f"{consonant}{vowel}r") 
            variations.append(f"{consonant}{vowel}s")
    
    return variations
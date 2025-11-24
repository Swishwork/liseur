"""Unit tests for phonics logic."""

import pytest
from core.phonics import (
    get_consonants,
    get_vowels,
    is_valid_combination,
    blend_syllable,
    get_syllable_variations
)


def test_get_consonants():
    """Test that consonants list is returned correctly."""
    consonants = get_consonants()
    assert isinstance(consonants, list)
    assert len(consonants) == 20
    assert 'b' in consonants
    assert 'm' in consonants
    assert 'p' in consonants
    assert 'a' not in consonants


def test_get_vowels():
    """Test that vowels list is returned correctly."""
    vowels = get_vowels()
    assert isinstance(vowels, list)
    assert len(vowels) == 5
    assert 'a' in vowels
    assert 'e' in vowels
    assert 'i' in vowels
    assert 'o' in vowels
    assert 'u' in vowels
    assert 'b' not in vowels


def test_is_valid_combination():
    """Test valid and invalid consonant-vowel combinations."""
    assert is_valid_combination('m', 'a') is True
    assert is_valid_combination('p', 'o') is True
    assert is_valid_combination('l', 'i') is True
    
    assert is_valid_combination('q', 'a') is False
    assert is_valid_combination('q', 'e') is False
    assert is_valid_combination('q', 'u') is True
    
    assert is_valid_combination('z', 'a') is True
    assert is_valid_combination('invalid', 'a') is False
    assert is_valid_combination('m', 'invalid') is False
    
    assert is_valid_combination('M', 'A') is True
    assert is_valid_combination(' m ', ' a ') is True


def test_blend_syllable():
    """Test syllable blending."""
    assert blend_syllable('m', 'a') == 'ma'
    assert blend_syllable('p', 'o') == 'po'
    assert blend_syllable('l', 'i') == 'li'
    assert blend_syllable('r', 'e') == 're'
    assert blend_syllable('t', 'u') == 'tu'
    
    assert blend_syllable('M', 'A') == 'ma'
    assert blend_syllable(' p ', ' o ') == 'po'


def test_blend_syllable_invalid():
    """Test that invalid combinations raise ValueError."""
    with pytest.raises(ValueError) as excinfo:
        blend_syllable('q', 'a')
    assert 'Invalid combination' in str(excinfo.value)
    
    with pytest.raises(ValueError) as excinfo:
        blend_syllable('invalid', 'a')
    assert 'Invalid combination' in str(excinfo.value)
    
    with pytest.raises(ValueError) as excinfo:
        blend_syllable('m', 'invalid')
    assert 'Invalid combination' in str(excinfo.value)


def test_get_syllable_variations():
    """Test syllable variations generation."""
    variations = get_syllable_variations('ma')
    assert 'ma' in variations
    assert 'man' in variations
    assert 'mar' in variations
    assert 'mas' in variations
    
    variations = get_syllable_variations('po')
    assert 'po' in variations
    assert 'pon' in variations
    
    variations = get_syllable_variations('li')
    assert 'li' in variations
    assert len(variations) == 1
    
    variations = get_syllable_variations('complex')
    assert 'complex' in variations


def test_edge_cases():
    """Test edge cases and boundary conditions."""
    assert is_valid_combination('', '') is False
    assert is_valid_combination('m', '') is False
    assert is_valid_combination('', 'a') is False
    
    with pytest.raises(ValueError):
        blend_syllable('', '')
    
    with pytest.raises(ValueError):
        blend_syllable('m', '')
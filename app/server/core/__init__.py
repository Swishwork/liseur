"""Core module for Syllable Blender backend."""

from .phonics import (
    get_consonants,
    get_vowels,
    blend_syllable,
    is_valid_combination
)

__all__ = [
    'get_consonants',
    'get_vowels', 
    'blend_syllable',
    'is_valid_combination'
]
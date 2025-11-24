"""Audio generation and management for syllables."""

import asyncio
import hashlib
import os
from pathlib import Path

from gtts import gTTS

AUDIO_CACHE_DIR = Path(os.getenv("AUDIO_CACHE_DIR", "./audio_cache"))
AUDIO_FORMAT = os.getenv("AUDIO_FORMAT", "mp3")
TTS_LANGUAGE = os.getenv("TTS_LANGUAGE", "fr")

AUDIO_CACHE_DIR.mkdir(parents=True, exist_ok=True)

def get_audio_filename(syllable: str) -> str:
    """Generate consistent filename for syllable audio."""
    syllable_hash = hashlib.md5(syllable.encode()).hexdigest()[:8]
    safe_syllable = syllable.replace("/", "_").replace("\\", "_")
    return f"{safe_syllable}_{syllable_hash}.{AUDIO_FORMAT}"

def get_audio_path(syllable: str) -> Path:
    """Get the full path for a syllable's audio file."""
    filename = get_audio_filename(syllable)
    return AUDIO_CACHE_DIR / filename

async def generate_audio(syllable: str, speed: float = 0.8) -> Path:
    """Generate audio file for syllable using gTTS."""
    audio_path = get_audio_path(syllable)
    
    if audio_path.exists():
        return audio_path
    
    try:
        tts = gTTS(
            text=syllable,
            lang=TTS_LANGUAGE,
            slow=True if speed < 1.0 else False,
            lang_check=False
        )
        
        await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: tts.save(str(audio_path))
        )
        
        return audio_path
        
    except Exception as e:
        if audio_path.exists():
            audio_path.unlink()
        raise Exception(f"Failed to generate audio for '{syllable}': {str(e)}")

async def pregenerate_common_syllables():
    """Pre-generate audio for common French syllables."""
    common_consonants = ['b', 'c', 'd', 'f', 'l', 'm', 'n', 'p', 'r', 's', 't']
    common_vowels = ['a', 'e', 'i', 'o', 'u']
    
    tasks = []
    for consonant in common_consonants:
        for vowel in common_vowels:
            syllable = f"{consonant}{vowel}"
            tasks.append(generate_audio(syllable))
    
    if tasks:
        await asyncio.gather(*tasks, return_exceptions=True)

def clear_audio_cache():
    """Clear all cached audio files."""
    if AUDIO_CACHE_DIR.exists():
        for audio_file in AUDIO_CACHE_DIR.glob(f"*.{AUDIO_FORMAT}"):
            audio_file.unlink()

def get_cache_size() -> int:
    """Get total size of audio cache in bytes."""
    if not AUDIO_CACHE_DIR.exists():
        return 0
    
    total_size = 0
    for audio_file in AUDIO_CACHE_DIR.glob(f"*.{AUDIO_FORMAT}"):
        total_size += audio_file.stat().st_size
    
    return total_size
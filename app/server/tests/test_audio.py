"""Unit tests for audio generation and management."""

import pytest
from pathlib import Path
import tempfile
from unittest.mock import patch, MagicMock

from core.audio import (
    get_audio_filename,
    get_audio_path,
    generate_audio,
    clear_audio_cache,
    get_cache_size
)


def test_get_audio_filename():
    """Test audio filename generation."""
    filename = get_audio_filename('ma')
    assert filename.endswith('.mp3')
    assert 'ma' in filename
    
    filename1 = get_audio_filename('ma')
    filename2 = get_audio_filename('ma')
    assert filename1 == filename2
    
    filename3 = get_audio_filename('po')
    assert filename3 != filename1
    
    filename_special = get_audio_filename('a/b')
    assert '/' not in filename_special
    assert 'a_b' in filename_special


def test_get_audio_path():
    """Test audio path generation."""
    path = get_audio_path('ma')
    assert isinstance(path, Path)
    assert str(path).endswith('.mp3')
    assert 'ma' in str(path)
    
    path1 = get_audio_path('ma')
    path2 = get_audio_path('ma')
    assert path1 == path2


@pytest.mark.asyncio
async def test_generate_audio_creates_file():
    """Test that audio generation creates a file."""
    with tempfile.TemporaryDirectory() as tmpdir:
        with patch('core.audio.AUDIO_CACHE_DIR', Path(tmpdir)):
            with patch('core.audio.gTTS') as mock_gtts:
                mock_tts_instance = MagicMock()
                mock_gtts.return_value = mock_tts_instance
                
                result = await generate_audio('ma')
                
                assert isinstance(result, Path)
                assert 'ma' in str(result)
                mock_gtts.assert_called_once_with(
                    text='ma',
                    lang='fr',
                    slow=True,
                    lang_check=False
                )
                mock_tts_instance.save.assert_called_once()


@pytest.mark.asyncio
async def test_generate_audio_uses_cache():
    """Test that cached audio files are reused."""
    with tempfile.TemporaryDirectory() as tmpdir:
        with patch('core.audio.AUDIO_CACHE_DIR', Path(tmpdir)):
            test_file = Path(tmpdir) / get_audio_filename('ma')
            test_file.write_text('dummy audio content')
            
            with patch('core.audio.gTTS') as mock_gtts:
                result = await generate_audio('ma')
                
                assert result == test_file
                mock_gtts.assert_not_called()


@pytest.mark.asyncio
async def test_generate_audio_error_handling():
    """Test error handling in audio generation."""
    with tempfile.TemporaryDirectory() as tmpdir:
        with patch('core.audio.AUDIO_CACHE_DIR', Path(tmpdir)):
            with patch('core.audio.gTTS') as mock_gtts:
                mock_gtts.side_effect = Exception('TTS error')
                
                with pytest.raises(Exception) as excinfo:
                    await generate_audio('ma')
                
                assert 'Failed to generate audio' in str(excinfo.value)
                assert 'TTS error' in str(excinfo.value)


def test_clear_audio_cache():
    """Test clearing the audio cache."""
    with tempfile.TemporaryDirectory() as tmpdir:
        cache_dir = Path(tmpdir) / 'audio_cache'
        cache_dir.mkdir()
        
        test_file1 = cache_dir / 'test1.mp3'
        test_file2 = cache_dir / 'test2.mp3'
        test_file3 = cache_dir / 'test.txt'
        
        test_file1.write_text('audio1')
        test_file2.write_text('audio2')
        test_file3.write_text('text')
        
        with patch('core.audio.AUDIO_CACHE_DIR', cache_dir):
            clear_audio_cache()
            
            assert not test_file1.exists()
            assert not test_file2.exists()
            assert test_file3.exists()


def test_get_cache_size():
    """Test getting cache size."""
    with tempfile.TemporaryDirectory() as tmpdir:
        cache_dir = Path(tmpdir) / 'audio_cache'
        cache_dir.mkdir()
        
        with patch('core.audio.AUDIO_CACHE_DIR', cache_dir):
            size = get_cache_size()
            assert size == 0
            
            test_file1 = cache_dir / 'test1.mp3'
            test_file2 = cache_dir / 'test2.mp3'
            
            test_file1.write_text('12345')
            test_file2.write_text('1234567890')
            
            size = get_cache_size()
            assert size == 15
            
            other_file = cache_dir / 'other.txt'
            other_file.write_text('should not count')
            
            size = get_cache_size()
            assert size == 15


def test_get_cache_size_no_directory():
    """Test cache size when directory doesn't exist."""
    with patch('core.audio.AUDIO_CACHE_DIR', Path('/nonexistent/dir')):
        size = get_cache_size()
        assert size == 0
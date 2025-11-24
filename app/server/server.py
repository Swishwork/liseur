#!/usr/bin/env python3
"""FastAPI server for Syllable Blender - Digital Montessori Blending Board."""

import os
from typing import List, Dict, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

load_dotenv()

app = FastAPI(
    title="Liseur - Syllable Blender API",
    description="Backend API for the Digital Montessori Blending Board",
    version="1.0.0"
)

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
ENV = os.getenv("ENV", "development")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL] if ENV == "production" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthResponse(BaseModel):
    status: str
    message: str
    version: str

class LettersResponse(BaseModel):
    letters: List[str]

class BlendRequest(BaseModel):
    consonant: str
    vowel: str

class BlendResponse(BaseModel):
    consonant: str
    vowel: str
    syllable: str
    audio_url: str

class LevelResponse(BaseModel):
    id: int
    name: str
    description: str
    intro_message: str
    consonants: List[str]
    vowels: List[str]
    required_successes: int
    color: str
    icon: Optional[str]

class LevelsListResponse(BaseModel):
    levels: List[LevelResponse]

class LevelLettersResponse(BaseModel):
    consonants: List[str]
    vowels: List[str]

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Liseur - Syllable Blender API", "version": "1.0.0"}

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        message="Server is running",
        version="1.0.0"
    )

@app.get("/api/phonics/consonants", response_model=LettersResponse)
async def get_consonants():
    """Get available French consonants."""
    from core.phonics import get_consonants
    return LettersResponse(letters=get_consonants())

@app.get("/api/phonics/vowels", response_model=LettersResponse)
async def get_vowels():
    """Get available French vowels."""
    from core.phonics import get_vowels
    return LettersResponse(letters=get_vowels())

@app.post("/api/phonics/blend", response_model=BlendResponse)
async def blend_syllable(request: BlendRequest):
    """Blend consonant and vowel to create syllable."""
    from core.phonics import blend_syllable, is_valid_combination
    
    if not is_valid_combination(request.consonant, request.vowel):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid combination: {request.consonant} + {request.vowel}"
        )
    
    syllable = blend_syllable(request.consonant, request.vowel)
    audio_url = f"/api/audio/{syllable}"
    
    return BlendResponse(
        consonant=request.consonant,
        vowel=request.vowel,
        syllable=syllable,
        audio_url=audio_url
    )

@app.get("/api/audio/{syllable}")
async def get_audio(syllable: str):
    """Get audio file for syllable."""
    from core.audio import get_audio_path, generate_audio
    
    audio_path = get_audio_path(syllable)
    if not audio_path.exists():
        try:
            audio_path = await generate_audio(syllable)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to generate audio: {str(e)}"
            )
    
    return FileResponse(
        path=str(audio_path),
        media_type="audio/mpeg",
        headers={"Cache-Control": "public, max-age=3600"}
    )

@app.get("/api/levels", response_model=LevelsListResponse)
async def get_all_levels():
    """Get all available learning levels."""
    from core.levels import get_all_levels
    
    levels = get_all_levels()
    return LevelsListResponse(
        levels=[LevelResponse(**level.to_dict()) for level in levels]
    )

@app.get("/api/levels/{level_id}", response_model=LevelResponse)
async def get_level(level_id: int):
    """Get a specific level by ID."""
    from core.levels import get_level_by_id
    
    level = get_level_by_id(level_id)
    if not level:
        raise HTTPException(
            status_code=404,
            detail=f"Level {level_id} not found"
        )
    
    return LevelResponse(**level.to_dict())

@app.get("/api/levels/{level_id}/letters", response_model=LevelLettersResponse)
async def get_level_letters(level_id: int):
    """Get consonants and vowels for a specific level."""
    from core.levels import get_letters_for_level
    
    letters = get_letters_for_level(level_id)
    if not letters["consonants"] and not letters["vowels"]:
        raise HTTPException(
            status_code=404,
            detail=f"Level {level_id} not found"
        )
    
    return LevelLettersResponse(**letters)

@app.post("/api/levels/{level_id}/validate")
async def validate_blend_for_level(level_id: int, request: BlendRequest):
    """Validate if a blend is valid for the given level."""
    from core.levels import validate_blend_for_level
    
    is_valid = validate_blend_for_level(level_id, request.consonant, request.vowel)
    
    return {
        "level_id": level_id,
        "consonant": request.consonant,
        "vowel": request.vowel,
        "is_valid": is_valid
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host=HOST,
        port=PORT,
        reload=ENV == "development"
    )
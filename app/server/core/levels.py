"""Level configuration and validation logic for the learning journey."""

from typing import List, Dict, Optional
from dataclasses import dataclass, asdict


@dataclass
class LevelConfig:
    """Configuration for a single learning level."""
    
    id: int
    name: str
    description: str
    intro_message: str
    consonants: List[str]
    vowels: List[str]
    required_successes: int
    color: str
    icon: Optional[str] = None
    
    def to_dict(self) -> Dict:
        """Convert to dictionary for JSON serialization."""
        return asdict(self)
    
    def validate_letters(self, consonant: str, vowel: str) -> bool:
        """Validate if the given letters are valid for this level."""
        # Allow empty consonant for vowel-only levels
        if not consonant and not self.consonants:
            return vowel in self.vowels
        
        # Both must be valid for the level
        consonant_valid = consonant in self.consonants if consonant else not self.consonants
        vowel_valid = vowel in self.vowels
        
        return consonant_valid and vowel_valid


# Define the curriculum levels
CURRICULUM_LEVELS = [
    LevelConfig(
        id=1,
        name="Garden of Vowels",
        description="Start your journey by mastering the beautiful French vowels",
        intro_message="Welcome to the Garden of Vowels! Here you'll discover the musical sounds of French vowels. Take your time and enjoy each sound!",
        consonants=[],
        vowels=["a", "e", "i", "o", "u"],
        required_successes=10,
        color="#90EE90",
        icon="🌱"
    ),
    LevelConfig(
        id=2,
        name="Stone Path",
        description="Add simple consonants to create your first real syllables",
        intro_message="Great work in the garden! Now let's walk the Stone Path and combine consonants with the vowels you've mastered.",
        consonants=["m", "p", "b", "t", "d"],
        vowels=["a", "e", "i", "o", "u"],
        required_successes=15,
        color="#FFB347",
        icon="🪨"
    ),
    LevelConfig(
        id=3,
        name="Whispering Woods",
        description="Explore softer sounds that flow like whispers through trees",
        intro_message="Listen carefully... The Whispering Woods are full of gentle sounds. Let's discover the soft consonants of French!",
        consonants=["f", "s", "v", "z", "l", "n"],
        vowels=["a", "e", "i", "o", "u", "é", "è"],
        required_successes=20,
        color="#8FBC8F",
        icon="🌲"
    ),
    LevelConfig(
        id=4,
        name="Rolling Hills",
        description="Master the rolling R and harder consonant combinations",
        intro_message="You're doing wonderfully! The Rolling Hills will help you master the French R and more complex sounds.",
        consonants=["r", "g", "k", "j", "c", "q"],
        vowels=["a", "e", "i", "o", "u", "é", "è", "ê"],
        required_successes=25,
        color="#87CEEB",
        icon="⛰️"
    ),
    LevelConfig(
        id=5,
        name="Crystal Cave",
        description="Complete your journey with complex blends and special sounds",
        intro_message="You've come so far! The Crystal Cave holds the final treasures: complex blends and special French sounds. You're almost a reading champion!",
        consonants=["ch", "gn", "ph", "qu", "x", "w", "y"],
        vowels=["a", "e", "i", "o", "u", "é", "è", "ê", "à", "ù", "ou", "eu", "au", "eau", "ai", "ei", "oi"],
        required_successes=30,
        color="#DDA0DD",
        icon="💎"
    )
]


def get_level_by_id(level_id: int) -> Optional[LevelConfig]:
    """Get a level configuration by its ID."""
    for level in CURRICULUM_LEVELS:
        if level.id == level_id:
            return level
    return None


def get_all_levels() -> List[LevelConfig]:
    """Get all level configurations."""
    return CURRICULUM_LEVELS


def get_letters_for_level(level_id: int) -> Dict[str, List[str]]:
    """Get the consonants and vowels for a specific level."""
    level = get_level_by_id(level_id)
    if not level:
        return {"consonants": [], "vowels": []}
    
    return {
        "consonants": level.consonants,
        "vowels": level.vowels
    }


def validate_blend_for_level(level_id: int, consonant: str, vowel: str) -> bool:
    """Validate if a blend is valid for the given level."""
    level = get_level_by_id(level_id)
    if not level:
        return False
    
    return level.validate_letters(consonant, vowel)


def get_next_level_id(current_level_id: int) -> Optional[int]:
    """Get the ID of the next level in the progression."""
    if current_level_id < len(CURRICULUM_LEVELS):
        return current_level_id + 1
    return None
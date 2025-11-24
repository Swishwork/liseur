# Feature: The Syllable Blender MVP

## Metadata
issue_number: `3`
adw_id: `e3a8c8ab`
issue_json: `{"number":3,"title":"The Good Version","body":"adw_plan suggest a plan for the texh stack and approach to build the \"good\" version of \\nthe outline below, but would be scalable to build out all the way the best version eventually.   The Roadmap1. GOOD: \"The Syllable Blender\" (Tonight's MVP)The \\nConcept: A digital version of the Montessori \"blending board.\"The Goal: Pure decoding practice. No fluff.The Mechanics:Select a consonant (Left side).Select a \\nvowel (Right side).Watch them slide together physically (Visualizing the blend).Hear the sound (Audio reinforcement).Why it works: It isolates the skill. It \\nprevents guessing because there are no pictures to guess from. It creates the \"click\" moment of $M + A = MA$.2. BETTER: \"The Phonics Arcade\" (Weekend Project)The\\n Concept: Gamified drills with progression.The Goal: Fluency and speed.The Mechanics:Levels: Unlock \"Level 2\" (Complex sounds: ou, on, ch) only after mastering \\nLevel 1.Real vs. Alien: A game where two words appear (e.g., Mato vs. Moto). The child must click the \"Real\" word. This forces them to read carefully.Streaks: A \\nsimple counter for how many correct answers in a row.3. BEST: \"Liseur: The Adaptive Engine\" (The Dream)The Concept: A full immersive world.The Goal: \\nComprehension and autonomy.The Mechanics:Voice Recognition: The child reads to the app, and the app highlights words as they say them, correcting pronunciation \\nerrors in real-time.Adaptive Stories: If they struggle with 'ou', the next story is generated to have 20% more 'ou' words.Parent Heatmap: You see exactly which \\nphonemes remain \"red\" (unlearned)"}`

## Feature Description
The Syllable Blender MVP is a digital implementation of the Montessori "blending board" designed to teach French phonics to children through pure decoding practice. This interactive learning tool allows children to select consonants and vowels, visualize their blending animation, and hear the resulting sound. The feature focuses on isolating the phonics skill without distractions, preventing guessing through elimination of picture cues, and creating that crucial "click" moment when children understand how letters combine to form sounds (e.g., M + A = MA). This MVP will serve as the foundation for future gamification and adaptive learning features.

## User Story
As a child learning to read French
I want to blend consonants and vowels together visually and auditorily
So that I can understand how letters combine to form sounds without relying on guessing from pictures

## Problem Statement
Children learning to read often rely on picture cues and contextual guessing rather than actual decoding skills. Traditional learning tools mix multiple cognitive tasks (picture recognition, memory, guessing) with phonics, making it difficult for children to isolate and master the fundamental skill of blending sounds. There's a need for a focused tool that teaches pure phonics decoding without distractions, following Montessori principles of isolated skill development.

## Solution Statement
Build an interactive digital blending board that focuses exclusively on the mechanics of phonics. The solution provides a clean, distraction-free interface where children can select French consonants and vowels, watch them physically slide together through smooth animations, and hear the blended sound through audio playback. The architecture will be designed with scalability in mind, using a modular component system and API structure that can later support gamification features, adaptive learning algorithms, and voice recognition capabilities.

## Relevant Files
Use these files to implement the feature:

- `README.md` - Project overview and development instructions, essential for understanding the overall architecture
- `app/server/server.py` - FastAPI backend server that will host the phonics API endpoints for sound data and blending logic
- `app/server/pyproject.toml` - Python dependencies, will need updates for audio processing libraries
- `app/client/src/main.ts` - TypeScript entry point that will initialize the Syllable Blender application
- `app/client/index.html` - HTML template that will host the blending board interface
- `app/client/package.json` - Frontend dependencies, will need updates for animation and audio libraries
- `app/client/tsconfig.json` - TypeScript configuration for proper module resolution
- `app/client/vite.config.ts` - Vite configuration for development server and build optimization
- `.claude/commands/test_e2e.md` - E2E test runner documentation for understanding test structure
- `.claude/commands/e2e/test_basic_query.md` - Example E2E test format to follow for creating blender tests

### New Files
- `app/server/routers/phonics.py` - API router for phonics endpoints
- `app/server/models/phonics.py` - Pydantic models for phonics data structures
- `app/server/services/phonics_service.py` - Business logic for phonics blending
- `app/server/data/phonics_data.py` - French phonics data (consonants, vowels, sounds)
- `app/client/src/components/BlendingBoard.ts` - Main blending board component
- `app/client/src/components/ConsonantSelector.ts` - Consonant selection interface
- `app/client/src/components/VowelSelector.ts` - Vowel selection interface
- `app/client/src/components/BlendAnimation.ts` - Animation component for letter sliding
- `app/client/src/services/phonicsApi.ts` - API client for phonics endpoints
- `app/client/src/services/audioService.ts` - Audio playback service
- `app/client/src/types/phonics.ts` - TypeScript types for phonics data
- `app/client/src/styles/blending-board.css` - Styles for the blending board
- `app/server/tests/test_phonics.py` - Unit tests for phonics endpoints
- `.claude/commands/e2e/test_syllable_blender.md` - E2E test for syllable blender functionality

## Implementation Plan
### Phase 1: Foundation
Set up the core data structures and API foundation for the phonics system. This includes creating the French phonics data repository with consonants, vowels, and their corresponding audio mappings. Establish the backend service architecture with proper separation of concerns between routers, models, and services. Create the TypeScript type definitions and interfaces that will be shared between frontend and backend.

### Phase 2: Core Implementation
Build the interactive blending board interface with three main zones: consonant selector (left), vowel selector (right), and the central blending area. Implement the smooth sliding animation that visually demonstrates how letters combine. Create the audio playback system that pronounces the blended syllable. Ensure proper state management for selected letters and user interactions.

### Phase 3: Integration
Connect the frontend components to the backend API through a clean service layer. Implement proper error handling and loading states. Add keyboard navigation support for accessibility. Create a responsive design that works on tablets and phones. Set up the development environment with hot module replacement for rapid iteration.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create E2E Test Specification
- Read `.claude/commands/test_e2e.md` to understand E2E test structure
- Read `.claude/commands/e2e/test_basic_query.md` as an example format
- Create `.claude/commands/e2e/test_syllable_blender.md` with test scenarios for:
  - Initial page load and component visibility
  - Consonant selection interaction
  - Vowel selection interaction
  - Blending animation trigger
  - Audio playback verification
  - Reset functionality

### 2. Set Up Backend Data Layer
- Create `app/server/data/phonics_data.py` with French phonics data:
  - Define consonants list: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
  - Define vowels list: ['a', 'e', 'i', 'o', 'u', 'y']
  - Create syllable sound mapping structure
- Create `app/server/models/phonics.py` with Pydantic models:
  - Letter model (value, type, displayName)
  - Syllable model (consonant, vowel, sound)
  - BlendRequest and BlendResponse models

### 3. Implement Backend Services
- Create `app/server/services/phonics_service.py`:
  - Implement get_consonants() method
  - Implement get_vowels() method
  - Implement blend_syllable(consonant, vowel) method
  - Add audio file path generation logic
- Create `app/server/routers/phonics.py`:
  - GET /api/phonics/consonants endpoint
  - GET /api/phonics/vowels endpoint
  - POST /api/phonics/blend endpoint
  - GET /api/phonics/audio/{syllable} endpoint
- Update `app/server/server.py` to include phonics router

### 4. Create Frontend Type Definitions
- Create `app/client/src/types/phonics.ts`:
  - Define Letter interface
  - Define Syllable interface
  - Define BlendRequest and BlendResponse interfaces
  - Define PhonicsState interface for state management

### 5. Build API Client Service
- Create `app/client/src/services/phonicsApi.ts`:
  - Implement fetchConsonants() method
  - Implement fetchVowels() method
  - Implement blendSyllable() method
  - Add error handling and retry logic
- Create `app/client/src/services/audioService.ts`:
  - Implement playSound() method with Web Audio API
  - Add preloading functionality for better performance
  - Implement volume control

### 6. Develop UI Components
- Create `app/client/src/components/ConsonantSelector.ts`:
  - Build grid layout for consonant buttons
  - Implement selection state management
  - Add hover and active states
  - Include accessibility attributes
- Create `app/client/src/components/VowelSelector.ts`:
  - Build grid layout for vowel buttons
  - Implement selection state management
  - Add visual feedback for selection
  - Include keyboard navigation

### 7. Implement Blending Animation
- Create `app/client/src/components/BlendAnimation.ts`:
  - Build sliding animation using CSS transitions
  - Implement letter positioning logic
  - Create merge effect at center
  - Add timing controls for animation duration
- Create `app/client/src/styles/blending-board.css`:
  - Define grid layouts for selectors
  - Style buttons with child-friendly design
  - Add animation keyframes
  - Implement responsive breakpoints

### 8. Build Main Blending Board Component
- Create `app/client/src/components/BlendingBoard.ts`:
  - Integrate ConsonantSelector, VowelSelector, and BlendAnimation
  - Implement state management for selections
  - Add blend trigger button
  - Include reset functionality
  - Wire up audio playback on successful blend
- Update `app/client/src/main.ts`:
  - Initialize BlendingBoard component
  - Set up application state
  - Add error boundary

### 9. Add Audio Assets
- Create `app/server/static/audio/` directory structure
- Generate or source French syllable audio files
- Implement audio file serving through FastAPI
- Add audio preloading strategy

### 10. Write Unit Tests
- Create `app/server/tests/test_phonics.py`:
  - Test consonant endpoint returns correct data
  - Test vowel endpoint returns correct data
  - Test blend endpoint with valid inputs
  - Test blend endpoint with invalid inputs
  - Test audio endpoint file serving
- Run tests with `cd app/server && uv run pytest`

### 11. Update Dependencies
- Update `app/server/pyproject.toml`:
  - Add audio processing libraries if needed
  - Update FastAPI static file serving dependencies
- Update `app/client/package.json`:
  - Add animation libraries if needed
  - Ensure TypeScript types are up to date
- Run `cd app/server && uv sync` to install Python dependencies
- Run `cd app/client && bun install` to install JavaScript dependencies

### 12. Run Validation Commands
- Run server tests: `cd app/server && uv run pytest`
- Check TypeScript compilation: `cd app/client && bun tsc --noEmit`
- Build frontend: `cd app/client && bun run build`
- Read `.claude/commands/test_e2e.md`
- Execute `.claude/commands/e2e/test_syllable_blender.md` to validate functionality

## Testing Strategy
### Unit Tests
- Test phonics data structure integrity (all consonants and vowels are defined)
- Test syllable blending logic (correct combination of letters)
- Test API endpoints with various input combinations
- Test audio file path generation
- Test frontend component state management
- Test animation timing and sequencing
- Test error handling for missing audio files

### Edge Cases
- Empty or null letter selections
- Invalid consonant/vowel combinations
- Rapid clicking during animation
- Audio playback failures (network issues, unsupported format)
- Browser audio context restrictions
- Multiple simultaneous blend requests
- Screen reader compatibility
- Keyboard-only navigation
- Touch device interactions
- Very small screen sizes

## Acceptance Criteria
- User can see a grid of French consonants on the left side of the screen
- User can see a grid of French vowels on the right side of the screen
- Clicking a consonant highlights it and shows visual feedback
- Clicking a vowel highlights it and shows visual feedback
- When both a consonant and vowel are selected, the blend button becomes active
- Clicking the blend button triggers a smooth sliding animation where letters move to center
- The blended syllable is displayed prominently after animation completes
- Audio pronunciation plays automatically after blending animation
- User can reset selections with a clear button
- Interface is responsive and works on tablets (primary target device)
- All interactions provide immediate visual feedback
- No external dependencies on CDNs for core functionality
- Page loads in under 2 seconds on average connection
- Audio files are preloaded for instant playback

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `cd app/server && uv run pytest` - Run server tests to validate the feature works with zero regressions
- `cd app/client && bun tsc --noEmit` - Run frontend tests to validate the feature works with zero regressions
- `cd app/client && bun run build` - Run frontend build to validate the feature works with zero regressions
- Read `.claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_syllable_blender.md` test file to validate this functionality works.

## Notes
- This MVP is designed with scalability in mind for future enhancements:
  - The API structure supports adding complex phonemes (ou, on, ch, etc.) for Level 2
  - The component architecture allows easy addition of gamification elements
  - The service layer is prepared for adaptive learning algorithms
  - The audio system can be extended for voice recognition features
- Consider using the Web Speech API for future voice recognition features
- The animation system uses CSS transitions for performance but can be upgraded to more complex animations
- Audio files should be in MP3 format for broad browser compatibility
- The design should follow child-friendly UI principles with large touch targets
- Consider implementing a parent/teacher dashboard API in future iterations
- The phonics data structure is intentionally simple but extensible for digraphs and trigraphs
- Future database integration can replace the static phonics_data.py file
- Consider adding progressive web app capabilities for offline usage
# Feature: The Syllable Blender (MVP)

## Metadata
issue_number: `3`
adw_id: `78dfaca0`
issue_json: `{"number":3,"title":"The Good Version","body":"adw_plan suggest a plan for the texh stack and approach to build the \"good\" version of \nthe outline below, but would be scalable to build out all the way the best version eventually.   The Roadmap1. GOOD: \"The Syllable Blender\" (Tonight's MVP)The \nConcept: A digital version of the Montessori \"blending board.\"The Goal: Pure decoding practice. No fluff.The Mechanics:Select a consonant (Left side).Select a \nvowel (Right side).Watch them slide together physically (Visualizing the blend).Hear the sound (Audio reinforcement).Why it works: It isolates the skill. It \nprevents guessing because there are no pictures to guess from. It creates the \"click\" moment of $M + A = MA$.2. BETTER: \"The Phonics Arcade\" (Weekend Project)The\n Concept: Gamified drills with progression.The Goal: Fluency and speed.The Mechanics:Levels: Unlock \"Level 2\" (Complex sounds: ou, on, ch) only after mastering \nLevel 1.Real vs. Alien: A game where two words appear (e.g., Mato vs. Moto). The child must click the \"Real\" word. This forces them to read carefully.Streaks: A \nsimple counter for how many correct answers in a row.3. BEST: \"Liseur: The Adaptive Engine\" (The Dream)The Concept: A full immersive world.The Goal: \nComprehension and autonomy.The Mechanics:Voice Recognition: The child reads to the app, and the app highlights words as they say them, correcting pronunciation \nerrors in real-time.Adaptive Stories: If they struggle with 'ou', the next story is generated to have 20% more 'ou' words.Parent Heatmap: You see exactly which \nphonemes remain \"red\" (unlearned)"}`

## Feature Description
The Syllable Blender is a digital implementation of the Montessori "blending board" designed to teach French phonics through pure decoding practice. This MVP focuses on the fundamental skill of blending consonants with vowels to form syllables, providing visual and auditory reinforcement without relying on picture clues. The application will provide a distraction-free learning environment where children can practice letter-sound correspondence and syllable formation with immediate feedback. This foundation is designed to be extensible, allowing future iterations to add gamification, adaptive learning, and voice recognition capabilities.

## User Story
As a child learning to read French
I want to practice blending consonants and vowels
So that I can understand how letters combine to make sounds without guessing from context clues

## Problem Statement
Children learning to read often struggle with the fundamental skill of decoding - understanding how letters combine to create sounds. Traditional methods often rely on picture clues or contextual hints, which can lead to guessing rather than true phonetic understanding. This creates a weak foundation that becomes problematic as texts become more complex. Children need a way to practice pure decoding skills in isolation, focusing on the mechanics of how consonants and vowels blend together to form syllables, which is the building block of French reading.

## Solution Statement
The Syllable Blender provides a focused, distraction-free environment for practicing pure phonics decoding. By presenting consonants and vowels as interactive elements that physically slide together with animation, children can visualize the blending process. The application reinforces learning through multiple sensory channels: visual (letter movement and combination), auditory (sound playback), and kinesthetic (interactive selection). This approach follows Montessori principles of isolated skill development while leveraging modern technology to provide immediate feedback and engaging animations. The architecture is designed to be modular and extensible, allowing future features like progress tracking, adaptive difficulty, and voice recognition to be added seamlessly.

## Relevant Files
Use these files to implement the feature:

- `README.md` - Project overview and structure reference
- `scripts/start.sh` - Understanding how to run the development environment
- `app/server/` - Backend API implementation location
- `app/client/` - Frontend React application location
- `.claude/commands/test_e2e.md` - E2E test execution template
- `.claude/commands/e2e/test_basic_query.md` - E2E test format example

### New Files

- `app/server/pyproject.toml` - Python project configuration with FastAPI dependencies
- `app/server/.env.sample` - Environment variables template
- `app/server/server.py` - FastAPI server entry point
- `app/server/core/__init__.py` - Core module initialization
- `app/server/core/phonemes.py` - French phoneme data and rules
- `app/server/core/audio_service.py` - Text-to-speech service for phoneme pronunciation
- `app/server/api/__init__.py` - API module initialization
- `app/server/api/syllables.py` - Syllable blending API endpoints
- `app/server/tests/test_syllables.py` - API unit tests
- `app/client/package.json` - Frontend dependencies and scripts
- `app/client/tsconfig.json` - TypeScript configuration
- `app/client/vite.config.ts` - Vite bundler configuration
- `app/client/index.html` - Main HTML entry point
- `app/client/src/main.tsx` - React application entry point
- `app/client/src/App.tsx` - Main application component
- `app/client/src/components/ConsonantSelector.tsx` - Consonant selection interface
- `app/client/src/components/VowelSelector.tsx` - Vowel selection interface
- `app/client/src/components/BlendingBoard.tsx` - Main blending board component
- `app/client/src/components/AnimatedBlend.tsx` - Syllable blending animation
- `app/client/src/services/api.ts` - API client service
- `app/client/src/services/audio.ts` - Audio playback service
- `app/client/src/styles/app.css` - Application styles
- `app/client/src/types/phonemes.ts` - TypeScript type definitions
- `.claude/commands/e2e/test_syllable_blender.md` - E2E test for syllable blending functionality

## Implementation Plan
### Phase 1: Foundation
Set up the project infrastructure with FastAPI backend and React/TypeScript frontend. Configure development environment with proper tooling for both Python and TypeScript. Establish the core data structures for French consonants and vowels with their phonetic representations. Create the API contract for syllable operations and audio generation.

### Phase 2: Core Implementation
Build the syllable blending logic on the backend with French phoneme rules. Implement text-to-speech service for generating audio pronunciation. Create the interactive UI components for consonant and vowel selection with visual feedback. Develop the blending animation that shows letters sliding together. Integrate audio playback synchronized with visual animation.

### Phase 3: Integration
Connect frontend components with backend API endpoints. Implement error handling and loading states. Add keyboard navigation for accessibility. Create responsive design for tablet and mobile devices. Set up comprehensive testing including unit tests and E2E tests to validate the complete user flow.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Initialize Backend Infrastructure
- Create `app/server/pyproject.toml` with FastAPI, uvicorn, pydantic, and gTTS dependencies
- Create `app/server/.env.sample` with configuration variables
- Create `app/server/server.py` with FastAPI application setup and CORS configuration
- Create core module structure with `__init__.py` files
- Verify backend starts with `uv run python server.py`

### 2. Create E2E Test Specification
- Read `.claude/commands/test_e2e.md` to understand E2E test format
- Read `.claude/commands/e2e/test_basic_query.md` to see example structure
- Create `.claude/commands/e2e/test_syllable_blender.md` with test steps for the syllable blending functionality
- Define user story, test steps, and success criteria for validating the MVP works correctly

### 3. Implement Phoneme Data Layer
- Create `app/server/core/phonemes.py` with French consonants and vowels data
- Define consonant list: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
- Define vowel list: ['a', 'e', 'é', 'è', 'i', 'o', 'u', 'y']
- Add syllable formation rules and validation logic
- Create unit test `app/server/tests/test_syllables.py`

### 4. Build Audio Service
- Create `app/server/core/audio_service.py` with text-to-speech functionality
- Implement French pronunciation using gTTS library
- Add caching mechanism for generated audio files
- Create endpoint to serve audio files
- Test audio generation with sample syllables

### 5. Create API Endpoints
- Create `app/server/api/syllables.py` with FastAPI routes
- Implement GET `/api/phonemes` endpoint for consonant and vowel lists
- Implement POST `/api/blend` endpoint for syllable creation with audio
- Implement GET `/api/audio/{syllable}` endpoint for audio playback
- Add proper error handling and validation

### 6. Initialize Frontend Infrastructure
- Create `app/client/package.json` with React, TypeScript, Vite dependencies
- Create `app/client/tsconfig.json` with strict TypeScript configuration
- Create `app/client/vite.config.ts` with proxy configuration for API
- Create `app/client/index.html` with viewport and title
- Create `app/client/src/main.tsx` as React entry point
- Verify frontend starts with `npm run dev`

### 7. Define TypeScript Types
- Create `app/client/src/types/phonemes.ts` with interfaces
- Define Consonant and Vowel types
- Define Syllable interface with text and audio properties
- Define API response types
- Add type exports for component usage

### 8. Build API Client Service
- Create `app/client/src/services/api.ts` with fetch wrappers
- Implement getPhonemes() function
- Implement blendSyllable() function
- Add error handling and retry logic
- Configure base URL for development

### 9. Create Letter Selection Components
- Create `app/client/src/components/ConsonantSelector.tsx` with grid layout
- Create `app/client/src/components/VowelSelector.tsx` with grid layout
- Add visual feedback for selected letters
- Implement click handlers for selection
- Style with CSS Grid for responsive layout

### 10. Implement Blending Animation
- Create `app/client/src/components/AnimatedBlend.tsx` component
- Implement CSS animations for letters sliding together
- Add timing synchronization with audio playback
- Create visual feedback for successful blend
- Add reset functionality for new selections

### 11. Build Main Blending Board
- Create `app/client/src/components/BlendingBoard.tsx` as container
- Integrate ConsonantSelector and VowelSelector components
- Add state management for selected letters
- Implement blend trigger logic
- Add AnimatedBlend component integration

### 12. Create Audio Service
- Create `app/client/src/services/audio.ts` for playback
- Implement preloading for audio files
- Add play/pause/stop functionality
- Handle audio promise rejections
- Synchronize with animation timing

### 13. Build Main Application Component
- Create `app/client/src/App.tsx` with layout structure
- Add BlendingBoard as main component
- Implement loading states
- Add error boundary for graceful failures
- Create header with app title

### 14. Style the Application
- Create `app/client/src/styles/app.css` with base styles
- Add Montessori-inspired clean design
- Implement responsive breakpoints
- Add animations and transitions
- Ensure accessibility with proper contrast

### 15. Add Keyboard Navigation
- Implement keyboard controls in selection components
- Add arrow key navigation for letter grids
- Add Enter key for triggering blend
- Add Escape key for reset
- Test with screen reader compatibility

### 16. Run Validation Commands

Execute every command to validate the feature works correctly with zero regressions.

- `cd app/server && uv run pytest` - Run server tests to validate the feature works with zero regressions
- `cd app/client && bun tsc --noEmit` - Run frontend tests to validate the feature works with zero regressions
- `cd app/client && bun run build` - Run frontend build to validate the feature works with zero regressions
- Read `.claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_syllable_blender.md` test file to validate this functionality works

## Testing Strategy
### Unit Tests
- Test phoneme data structure validity
- Test syllable formation rules
- Test audio file generation
- Test API endpoint responses
- Test component rendering
- Test state management
- Test animation triggers
- Test error handling

### Edge Cases
- Empty consonant or vowel selection
- Invalid phoneme combinations
- Audio playback failures
- Network request timeouts
- Rapid selection changes
- Browser audio policy restrictions
- Touch vs click interactions
- Different screen sizes and orientations

## Acceptance Criteria
- User can select any French consonant from a visual grid
- User can select any French vowel from a visual grid
- Selected letters are visually highlighted
- Clicking "Blend" triggers animation of letters sliding together
- Audio pronunciation plays synchronized with animation
- Syllable formation follows French phonetic rules
- Interface is responsive on tablets and mobile devices
- All interactions work with both mouse and touch
- Keyboard navigation is fully functional
- Application loads in under 3 seconds
- Audio playback works on all modern browsers
- Error states are handled gracefully with user feedback

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `./scripts/start.sh` - Start both backend and frontend servers
- `cd app/server && uv run pytest` - Run server tests to validate the feature works with zero regressions
- `cd app/client && npm run type-check` - Validate TypeScript types compile correctly
- `cd app/client && npm run build` - Run frontend build to validate the feature works with zero regressions
- Read `.claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_syllable_blender.md` test file to validate syllable blending functionality works
- `curl http://localhost:8000/api/phonemes` - Verify API returns consonant and vowel lists
- `curl -X POST http://localhost:8000/api/blend -H "Content-Type: application/json" -d '{"consonant":"m","vowel":"a"}'` - Test syllable blending API

## Notes
- This MVP is designed with extensibility in mind for future features like progress tracking, user profiles, and adaptive difficulty
- The architecture separates concerns clearly between API, business logic, and UI components
- Audio generation uses gTTS which requires internet connection; consider offline alternatives for production
- The modular component structure allows easy addition of new game modes without major refactoring
- Consider implementing PWA capabilities in future iterations for offline functionality
- The animation timing (currently 1 second) can be adjusted based on user testing feedback
- Future versions can add more complex phoneme combinations (digraphs, trigraphs) by extending the phoneme data structure
- Consider adding haptic feedback for mobile devices to enhance the kinesthetic learning aspect
- Database integration can be added later for progress tracking without changing the core API structure
- The design intentionally avoids gamification elements in the MVP to focus on pure learning mechanics
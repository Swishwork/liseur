# Feature: The Syllable Blender - Digital Montessori Blending Board

## Metadata
issue_number: `3`
adw_id: `27dba6d0`
issue_json: `{"number":3,"title":"The Good Version","body":"adw_plan suggest a plan for the texh stack and approach to build the \"good\" version of \nthe outline below, but would be scalable to build out all the way the best version eventually.   The Roadmap1. GOOD: \"The Syllable Blender\" (Tonight's MVP)The \nConcept: A digital version of the Montessori \"blending board.\"The Goal: Pure decoding practice. No fluff.The Mechanics:Select a consonant (Left side).Select a \nvowel (Right side).Watch them slide together physically (Visualizing the blend).Hear the sound (Audio reinforcement).Why it works: It isolates the skill. It \nprevents guessing because there are no pictures to guess from. It creates the \"click\" moment of $M + A = MA$.2. BETTER: \"The Phonics Arcade\" (Weekend Project)The\n Concept: Gamified drills with progression.The Goal: Fluency and speed.The Mechanics:Levels: Unlock \"Level 2\" (Complex sounds: ou, on, ch) only after mastering \nLevel 1.Real vs. Alien: A game where two words appear (e.g., Mato vs. Moto). The child must click the \"Real\" word. This forces them to read carefully.Streaks: A \nsimple counter for how many correct answers in a row.3. BEST: \"Liseur: The Adaptive Engine\" (The Dream)The Concept: A full immersive world.The Goal: \nComprehension and autonomy.The Mechanics:Voice Recognition: The child reads to the app, and the app highlights words as they say them, correcting pronunciation \nerrors in real-time.Adaptive Stories: If they struggle with 'ou', the next story is generated to have 20% more 'ou' words.Parent Heatmap: You see exactly which \nphonemes remain \"red\" (unlearned)"}`

## Feature Description
The Syllable Blender is a digital implementation of the Montessori "blending board" methodology for teaching French phonics to children. This MVP provides pure decoding practice without distractions, allowing children to visually and auditorily understand how consonants and vowels combine to form syllables. The interface features two columns - consonants on the left and vowels on the right - with smooth animations showing letters sliding together and audio reinforcement for each blend. This foundational feature establishes the core architecture and patterns that will scale to support the future "Phonics Arcade" and "Adaptive Engine" phases.

## User Story
As a child learning to read French
I want to select letters and see/hear them blend together
So that I can understand how syllables are formed without guessing from pictures

## Problem Statement
Children learning to read often struggle with the fundamental skill of blending sounds to form syllables. Traditional methods often include pictures or context clues that allow children to guess rather than truly decode. This prevents the crucial "click" moment of understanding that M + A = MA. Children need isolated, focused practice on the mechanical skill of blending without distractions or shortcuts.

## Solution Statement
We will create a clean, distraction-free digital blending board that presents consonants and vowels in separate columns. When a child selects one letter from each column, they will see a smooth animation of the letters sliding together while simultaneously hearing the blended sound. This multi-sensory approach (visual animation + audio reinforcement) creates strong neural pathways for understanding phoneme blending. The architecture will be built with scalability in mind, using a modular component system and API structure that can easily accommodate future features like gamification, adaptive learning, and voice recognition.

## Relevant Files
Use these files to implement the feature:

- `README.md` - Project overview and setup instructions; understand the ADW system and development workflow
- `scripts/start.sh` - Startup script showing Python backend (port 8000) and Node.js frontend (port 5173) architecture
- `scripts/stop_apps.sh` - Script for stopping running services
- `.claude/commands/test_e2e.md` - E2E test runner documentation; understand how to create E2E tests
- `.claude/commands/e2e/test_basic_query.md` - Example E2E test format to follow when creating our test

### New Files
- `app/server/server.py` - Main FastAPI server application
- `app/server/core/__init__.py` - Core module initialization
- `app/server/core/phonics.py` - Phonics logic and syllable combinations
- `app/server/core/audio.py` - Audio generation/serving functionality
- `app/server/tests/test_phonics.py` - Unit tests for phonics logic
- `app/server/tests/test_audio.py` - Unit tests for audio functionality
- `app/server/.env.sample` - Environment variables template
- `app/server/pyproject.toml` - Python project dependencies
- `app/client/package.json` - Frontend dependencies and scripts
- `app/client/index.html` - Main HTML entry point
- `app/client/src/main.tsx` - React application entry point
- `app/client/src/App.tsx` - Main application component
- `app/client/src/components/BlendingBoard.tsx` - Core blending board component
- `app/client/src/components/LetterSelector.tsx` - Letter selection component
- `app/client/src/components/SyllableDisplay.tsx` - Animated syllable display
- `app/client/src/services/api.ts` - API client for backend communication
- `app/client/src/styles/app.css` - Application styles
- `app/client/vite.config.ts` - Vite configuration
- `app/client/tsconfig.json` - TypeScript configuration
- `.claude/commands/e2e/test_syllable_blender.md` - E2E test for syllable blending functionality

## Implementation Plan
### Phase 1: Foundation
Set up the basic project infrastructure with Python/FastAPI backend and React/TypeScript frontend. Establish the development environment with proper tooling, create the initial API structure for phonics data, and set up the component architecture for the UI.

### Phase 2: Core Implementation
Implement the blending board functionality with consonant and vowel selectors, sliding animation for letter combination, and audio playback for blended syllables. Create the phonics engine that manages valid French syllable combinations and audio generation or pre-recorded audio files.

### Phase 3: Integration
Connect the frontend and backend through REST APIs, implement state management for selected letters and blended syllables, add error handling and loading states, and ensure smooth animations and audio synchronization. Add reset functionality and keyboard navigation for accessibility.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Task 1: Initialize Backend Infrastructure
- Create `app/server/pyproject.toml` with dependencies (uv, fastapi, uvicorn, pydantic, pytest, python-dotenv, gtts for text-to-speech)
- Create `app/server/.env.sample` with necessary environment variables
- Create `app/server/server.py` with basic FastAPI application setup
- Set up CORS middleware for frontend communication
- Create health check endpoint `/api/health`

### Task 2: Initialize Frontend Infrastructure
- Create `app/client/package.json` with React, TypeScript, Vite dependencies
- Create `app/client/vite.config.ts` with proxy configuration for API
- Create `app/client/tsconfig.json` for TypeScript configuration
- Create `app/client/index.html` entry point
- Create `app/client/src/main.tsx` to bootstrap React application

### Task 3: Create E2E Test Specification
- Create `.claude/commands/e2e/test_syllable_blender.md` following the existing test format
- Define user story for syllable blending
- Specify test steps for selecting consonants, vowels, and verifying animations/audio
- Include screenshot capture points for validation

### Task 4: Implement Phonics Core Logic
- Create `app/server/core/phonics.py` with French consonants and vowels lists
- Define valid syllable combinations
- Create API endpoint `/api/phonics/consonants` to return available consonants
- Create API endpoint `/api/phonics/vowels` to return available vowels
- Create API endpoint `/api/phonics/blend` that accepts consonant and vowel and returns syllable info

### Task 5: Implement Audio Generation
- Create `app/server/core/audio.py` for audio handling
- Implement text-to-speech using gTTS for French pronunciation
- Create audio caching mechanism to avoid regenerating same syllables
- Create API endpoint `/api/audio/{syllable}` to serve audio files
- Add proper MIME types and streaming support

### Task 6: Create Letter Selector Components
- Create `app/client/src/components/LetterSelector.tsx` with grid layout for letters
- Implement selection highlighting and click handlers
- Add visual feedback for selected letters
- Create responsive design for mobile and desktop
- Add accessibility attributes (ARIA labels, keyboard navigation)

### Task 7: Create Blending Animation Component
- Create `app/client/src/components/SyllableDisplay.tsx` for displaying blended result
- Implement CSS animations for sliding letters together
- Add transition effects with proper timing
- Create reset animation for new selections
- Synchronize animation with audio playback

### Task 8: Create Main Blending Board Component
- Create `app/client/src/components/BlendingBoard.tsx` as container component
- Manage state for selected consonant and vowel
- Coordinate between selectors and display
- Handle API calls to backend
- Implement loading and error states

### Task 9: Implement API Client
- Create `app/client/src/services/api.ts` with fetch wrappers
- Add methods for fetching consonants, vowels, and blending
- Implement proper error handling and retries
- Add TypeScript interfaces for API responses
- Configure base URL from environment

### Task 10: Style the Application
- Create `app/client/src/styles/app.css` with Montessori-inspired clean design
- Use calming colors appropriate for children
- Implement responsive grid layouts
- Add smooth transitions and hover effects
- Ensure large, touch-friendly buttons for tablet use

### Task 11: Add Unit Tests
- Create `app/server/tests/test_phonics.py` to test syllable blending logic
- Create `app/server/tests/test_audio.py` to test audio generation
- Add frontend component tests for user interactions
- Test API endpoints with various inputs
- Verify error handling scenarios

### Task 12: Run Validation Commands
Execute the `Validation Commands` to validate the feature works correctly with zero regressions.

## Testing Strategy
### Unit Tests
- Test phonics engine for correct syllable formation
- Test audio generation for proper French pronunciation
- Test API endpoints for correct responses and error handling
- Test React components for proper state management
- Test animation timing and synchronization

### Edge Cases
- Invalid consonant-vowel combinations
- Rapid clicking between selections
- Network failures during audio loading
- Browser audio playback restrictions
- Screen reader compatibility
- Mobile touch vs desktop click interactions
- Slow network conditions affecting animation/audio sync

## Acceptance Criteria
- User can select any consonant from the left column
- User can select any vowel from the right column
- Selected letters visually slide together with smooth animation
- Blended syllable audio plays automatically after animation
- Audio pronunciation is accurate French text-to-speech
- Interface works on desktop, tablet, and mobile devices
- All interactions are keyboard accessible
- Page loads in under 2 seconds
- Audio plays within 500ms of selection
- No pictures or context clues that allow guessing
- Clean, distraction-free Montessori-inspired design

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `cd app/server && uv run python server.py` - Start backend server and verify it runs without errors
- `cd app/client && npm install && npm run dev` - Start frontend and verify it compiles without errors
- `curl http://localhost:8000/api/health` - Verify backend health endpoint returns 200 OK
- `curl http://localhost:8000/api/phonics/consonants` - Verify consonants API returns data
- `curl http://localhost:8000/api/phonics/vowels` - Verify vowels API returns data
- Read `.claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_syllable_blender.md` test file to validate the blending functionality works end-to-end
- `cd app/server && uv run pytest` - Run server tests to validate the feature works with zero regressions
- `cd app/client && npm run tsc --noEmit` - Run TypeScript type checking to validate frontend code
- `cd app/client && npm run build` - Run frontend build to validate the feature works with zero regressions

## Notes
- This MVP establishes the foundation for future features (Phonics Arcade and Adaptive Engine)
- Audio files will be generated on-demand and cached for performance
- Using gTTS (Google Text-to-Speech) for French pronunciation - may want to consider professional voice recordings in the future
- The modular architecture allows easy addition of new languages beyond French
- Consider adding a parent/teacher mode to track usage statistics in a future iteration
- Animation timing is crucial for the learning experience - the slide should be slow enough to visualize but fast enough to maintain engagement
- Future enhancement: Add haptic feedback for mobile devices during letter selection
- Accessibility is critical - ensure the app works with screen readers and keyboard-only navigation
- Consider offline mode in future to cache common syllables for use without internet
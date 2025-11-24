# Feature: Learning Journey - Structured Progression with Joyful UI

## Metadata
issue_number: `8`
adw_id: `ce63d882`
issue_json: `{"number":8,"title":"Phase 2: The Learning Journey","body":"adw_sdlc\n\nPhase 2: The Learning Journey - Structured Progression with Joyful UI\n\nProblem\n\nThe Syllable Blender MVP (Issue https://github.com/Swishwork/liseur/issues/3) works well for isolated practice, but lacks structure and doesn't feel like an inviting place for\na child to learn. Kids need:\n\nA clear sense of progression (what's next?)\nA warm, friendly environment that feels safe and encouraging\nTheir progress saved so they can continue where they left off\nSolution\n\nTransform the MVP into a structured learning journey with:\n\n5 progressive levels (vowels → simple consonants → complex sounds)\nMastery-based unlocking (complete level to unlock next)\nProgress persistence (localStorage for now)\nWarm, joyful UI that feels like a cozy place to learn\nDesign Philosophy\n\nFollow science-backed learning principles:\n\n✅ Intrinsic motivation (Montessori approach)\n✅ Mastery-based progression\n✅ Immediate, consistent feedback\n❌ No variable rewards or streak anxiety\n❌ No manipulative gamification\nUI should feel: Warm library corner, gentle mentor, cozy blanket\n\nSoft rounded shapes, warm colors (ambers, greens, blues)\nFriendly typography, encouraging messages\nSmooth transitions, satisfying interactions\nThink: Khan Academy Kids meets Montessori classroom\nCore Requirements\n\nRefactor for Modularity\nMake BlendingBoard accept a levelConfig prop instead of hardcoded letters\nCreate curriculum with 5 levels: \"Garden of Vowels\", \"Stone Path\", \"Whispering Woods\", \"Rolling Hills\", \"Crystal Cave\"\nLevel Progression System\nVisual map showing all 5 levels (completed, current, locked)\nUser clicks level to start practice\nComplete required blends (10-30 depending on difficulty) to unlock next level\nCan replay any completed level\nProgress Persistence\nSave progress in localStorage\nTrack: current level, completed levels, blend counts, last played date\nProgress loads automatically on return\nWarm UI/UX\nReplace clinical blue theme with warm, inviting colors\nAdd encouraging messages: \"Great work!\", \"You're getting stronger!\"\nSmooth transitions and gentle micro-interactions\nCompletion celebrations (gentle, not overwhelming)\nProgress tracker during practice: \"8 / 10 blends completed\"\nParent Dashboard\nSimple stats view: levels completed, total practice\nReset progress button\nUser Flow\n\nFirst visit: Welcome screen → Level 1 unlocked, others locked\nDuring practice: Progress bar fills, encouraging messages appear\nComplete level: Gentle celebration → Level 2 unlocks\nReturn visit: Resume at current level, see completed levels with checkmarks\nExample Level Structure\n\n{\n\"id\": 1,\n\"name\": \"The Garden of Vowels\",\n\"consonants\": [],\n\"vowels\": [\"a\", \"e\", \"i\", \"o\", \"u\"],\n\"requiredSuccesses\": 10\n}\n\nSuccess Criteria\n\nUser can progress through 5 levels in order\nProgress persists across sessions\nUI feels warm and encouraging (not clinical)\nAll existing audio/animation functionality preserved\nWorks on mobile, tablet, desktop\nOut of Scope\n\nVoice recognition\nAdaptive difficulty algorithms\nDatabase backend (localStorage only)\nSpaced repetition\nMulti-user profiles\nReferences\n\nCurrent MVP: Issue https://github.com/Swishwork/liseur/issues/3, app_docs/feature-27dba6d0-syllable-blender.md\nDesign inspiration: Duolingo's friendly tone (not streaks), Khan Academy Kids' warm colors, Montessori classroom aesthetics"}`

## Feature Description
Transform the existing Syllable Blender MVP into a structured learning journey with progressive levels, mastery-based unlocking, and a warm, inviting UI designed following Montessori principles. This feature adds a clear learning path with 5 progressive levels (from vowels to complex sounds), progress persistence via localStorage, and a joyful, encouraging user interface that creates a safe and nurturing environment for children learning to read French. The system emphasizes intrinsic motivation and mastery-based progression without manipulative gamification elements.

## User Story
As a child learning to read French
I want to progress through structured levels that gradually increase in difficulty
So that I can build my reading skills systematically while feeling encouraged and motivated

## Problem Statement
The current Syllable Blender MVP provides excellent isolated practice for syllable blending but lacks the structure and warmth needed for sustained learning. Children need a clear sense of progression to understand what comes next, a warm and encouraging environment that feels safe, and the ability to save their progress so they can continue learning across multiple sessions. The clinical blue interface doesn't create the inviting atmosphere that encourages children to engage with the learning material.

## Solution Statement
Create a structured learning journey by refactoring the existing BlendingBoard to accept level configurations, implementing a 5-level curriculum progression system with mastery-based unlocking, adding progress persistence through localStorage, and completely redesigning the UI with warm colors, encouraging messages, and gentle animations. The solution follows Montessori principles by focusing on intrinsic motivation and avoiding manipulative gamification tactics while creating an experience that feels like a warm library corner with a gentle mentor.

## Relevant Files
Use these files to implement the feature:

- `README.md` - Project overview and development instructions for understanding the overall structure
- `app/client/src/components/BlendingBoard.tsx` - Main component that needs refactoring to accept levelConfig prop
- `app/client/src/components/LetterSelector.tsx` - Letter selection component that will be reused for each level
- `app/client/src/components/SyllableDisplay.tsx` - Syllable display component that needs progress tracking integration
- `app/client/src/services/api.ts` - API service that may need updates for level-based data fetching
- `app/client/src/styles/app.css` - Current styles that need complete overhaul for warm UI theme
- `app/client/src/App.tsx` - Main app component that will manage routing between journey map and practice
- `app/server/core/phonics.py` - Phonics engine that may need level-specific letter combinations
- `app/server/server.py` - Backend server that may need new endpoints for level configurations
- `app_docs/feature-27dba6d0-syllable-blender.md` - Documentation of existing MVP implementation for reference
- `.claude/commands/test_e2e.md` - E2E test runner documentation for creating test files
- `.claude/commands/e2e/test_basic_query.md` - Example E2E test for reference

### New Files
- `app/client/src/components/LevelMap.tsx` - Visual journey map showing all 5 levels with progression status
- `app/client/src/components/ProgressBar.tsx` - Progress tracking component for practice sessions
- `app/client/src/components/CelebrationModal.tsx` - Gentle celebration component for level completion
- `app/client/src/components/ParentDashboard.tsx` - Simple statistics and progress reset interface
- `app/client/src/components/EncouragementMessage.tsx` - Component for displaying encouraging feedback
- `app/client/src/services/progressStorage.ts` - LocalStorage service for progress persistence
- `app/client/src/data/curriculum.ts` - Level configurations and curriculum structure
- `app/client/src/styles/warmTheme.css` - New warm color theme and UI styles
- `app/server/core/levels.py` - Level configuration and validation logic
- `.claude/commands/e2e/test_learning_journey.md` - E2E test file for the learning journey feature

## Implementation Plan
### Phase 1: Foundation
Create the data layer for level configurations and progress tracking. This includes setting up the curriculum structure with 5 levels, implementing the localStorage service for progress persistence, and creating the backend support for level-specific letter combinations. This phase establishes the structural foundation that all UI components will build upon.

### Phase 2: Core Implementation
Build the main learning journey components including the level map visualization, progress tracking system, and refactored BlendingBoard that accepts level configurations. Implement the mastery-based unlocking logic, progress persistence across sessions, and encouraging feedback system. Create the warm UI theme with new colors, typography, and animations.

### Phase 3: Integration
Integrate all components into a cohesive learning journey experience. Wire up navigation between the level map and practice sessions, implement smooth transitions and micro-interactions, add celebration animations for level completion, and create the parent dashboard. Ensure all existing audio and animation functionality is preserved while adding the new features.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create Curriculum Data Structure
- Define TypeScript interfaces for Level, Progress, and UserState
- Create curriculum.ts with 5 level configurations
- Define level names: "Garden of Vowels", "Stone Path", "Whispering Woods", "Rolling Hills", "Crystal Cave"
- Specify consonants, vowels, and required successes for each level
- Add level descriptions and encouraging intro messages

### 2. Implement Progress Storage Service
- Create progressStorage.ts with localStorage wrapper functions
- Implement saveProgress() to persist user state
- Implement loadProgress() to retrieve saved state
- Add resetProgress() for clearing user data
- Include error handling and fallback defaults
- Add lastPlayedDate tracking

### 3. Create E2E Test Specification
- Create `.claude/commands/e2e/test_learning_journey.md` following the format from test_syllable_blender.md
- Define test steps for level progression flow
- Include tests for progress persistence
- Add tests for UI warmth validation (colors, messages)
- Test mobile responsiveness for journey features

### 4. Design New Warm UI Theme
- Create warmTheme.css with new color palette
- Define warm colors: ambers (#FFA500, #FFB347), greens (#8FBC8F, #90EE90), soft blues (#87CEEB)
- Update typography for friendly, readable fonts
- Add CSS variables for rounded corners and soft shadows
- Create animation classes for smooth transitions
- Define styles for encouraging messages

### 5. Build Level Map Component
- Create LevelMap.tsx showing visual journey
- Display all 5 levels as connected nodes/cards
- Show completed levels with checkmarks
- Highlight current level with animation
- Gray out locked levels
- Add click handlers for level selection
- Include progress badges showing completion percentage

### 6. Create Progress Bar Component
- Build ProgressBar.tsx for practice session tracking
- Display "X / Y blends completed" text
- Show visual progress bar that fills smoothly
- Add milestone markers for encouragement
- Include animation when progress increases
- Style with warm, encouraging colors

### 7. Refactor BlendingBoard for Modularity
- Update BlendingBoard.tsx to accept levelConfig prop
- Replace hardcoded letters with dynamic level data
- Add progress tracking to blend completion
- Integrate ProgressBar component
- Add level completion detection
- Pass completion callback to parent

### 8. Build Encouragement System
- Create EncouragementMessage.tsx component
- Define pool of encouraging messages
- Implement message rotation logic
- Add fade-in/out animations
- Position messages appropriately
- Style with warm, friendly appearance

### 9. Implement Celebration Modal
- Create CelebrationModal.tsx for level completion
- Design gentle, non-overwhelming animation
- Add congratulatory message
- Show next level preview
- Include "Continue" and "Practice Again" buttons
- Use confetti or star animations (subtle)

### 10. Create Parent Dashboard
- Build ParentDashboard.tsx component
- Display total levels completed
- Show total practice time/sessions
- Add recent activity summary
- Implement reset progress button with confirmation
- Style with clean, adult-friendly design

### 11. Update Backend for Level Support
- Create levels.py in app/server/core/
- Add level configuration endpoints
- Implement level-specific letter validation
- Update blend endpoint to accept level context
- Add progress tracking endpoints (optional)

### 12. Integrate Navigation Flow
- Update App.tsx to handle routing
- Add state management for current view
- Implement navigation from map to practice
- Handle level completion flow
- Add back navigation from practice
- Ensure smooth transitions between views

### 13. Add Progress Persistence Integration
- Wire up progressStorage in main app
- Load saved progress on app mount
- Save progress after each blend
- Update progress on level completion
- Handle first-time user experience
- Add error recovery for corrupted data

### 14. Polish Animations and Interactions
- Add micro-interactions for button hovers
- Implement smooth page transitions
- Add loading states with gentle animations
- Polish letter selection feedback
- Enhance syllable blending animation
- Add subtle sound effects (optional)

### 15. Mobile Responsiveness Updates
- Test and adjust level map for mobile
- Ensure touch targets are appropriately sized
- Optimize progress bar for small screens
- Adjust typography for readability
- Test swipe gestures (if applicable)
- Verify parent dashboard on mobile

### 16. Run Validation Commands
- Execute all validation commands to ensure zero regressions
- Run the new E2E test for learning journey
- Verify all existing functionality still works
- Check TypeScript compilation
- Validate build process
- Test on multiple browsers

## Testing Strategy
### Unit Tests
- Test curriculum data structure validity
- Test progress storage save/load functions
- Test level completion logic
- Test progress calculation accuracy
- Test encouragement message rotation
- Test level unlocking conditions
- Test parent dashboard statistics

### Edge Cases
- User with no saved progress (first time)
- Corrupted localStorage data
- Switching between levels rapidly
- Completing a level multiple times
- Browser with localStorage disabled
- Network issues during audio loading
- Attempting to access locked levels
- Progress bar at boundary conditions (0%, 100%)
- Very long practice sessions
- Quick succession of blend completions

## Acceptance Criteria
- All 5 levels are displayed on a visual journey map with clear progression indicators
- Users can only access unlocked levels (complete previous level first)
- Progress persists across browser sessions using localStorage
- Each level requires the specified number of successful blends to complete
- UI uses warm colors (ambers, greens, soft blues) instead of clinical blue
- Encouraging messages appear during practice ("Great work!", "You're getting stronger!")
- Gentle celebration animation plays upon level completion
- Parent dashboard shows accurate statistics and allows progress reset
- Progress bar accurately tracks blend completion during practice
- All existing audio and animation functionality works correctly
- Application remains responsive on mobile, tablet, and desktop devices
- Smooth transitions and micro-interactions enhance user experience
- No manipulative gamification elements (no streaks, no pressure)

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `cd app/server && uv run pytest` - Run server tests to validate the feature works with zero regressions
- `cd app/client && bun tsc --noEmit` - Run frontend tests to validate the feature works with zero regressions
- `cd app/client && bun run build` - Run frontend build to validate the feature works with zero regressions
- Read `.claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_learning_journey.md` - Validate the learning journey functionality works end-to-end
- `cd app/server && uv run python server.py` - Start backend server to test integration
- `cd app/client && npm run dev` - Start frontend to manually verify UI warmth and interactions
- Open browser localStorage inspector to verify progress persistence
- Test on mobile device or responsive mode to verify mobile compatibility

## Notes
- Consider adding subtle sound effects for level completion and progress milestones in future iteration
- The warm color palette should be tested with color-blind users for accessibility
- Parent dashboard could be expanded in future to show detailed practice patterns
- Consider adding optional background music (gentle, concentration-friendly) in future version
- The 5 levels provide good foundation but could expand to more levels based on user feedback
- LocalStorage has 5-10MB limit which is more than sufficient for progress data
- Consider adding data export feature for parents in future iteration
- Animation performance should be monitored on older devices
- Future consideration: Add difficulty variations within each level for advanced learners
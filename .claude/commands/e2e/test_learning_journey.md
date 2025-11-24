# E2E Test: Learning Journey

## User Story
As a child learning to read French
I want to progress through structured levels that gradually increase in difficulty
So that I can build my reading skills systematically while feeling encouraged and motivated

## Test Environment Setup
- Frontend URL: http://localhost:5173
- Backend URL: http://localhost:8000
- Browser: Chrome
- Viewport: 1280x720

## Test Steps

### Step 1: Verify Application Loads with Journey Map
1. Navigate to http://localhost:5173
2. Wait for page to fully load (max 5 seconds)
3. Verify the learning journey map is displayed
4. Verify warm colors are present (not clinical blue)
5. Take screenshot: `learning_journey_initial.png`

### Step 2: Check Level Map Display
1. Verify 5 levels are displayed: "Garden of Vowels", "Stone Path", "Whispering Woods", "Rolling Hills", "Crystal Cave"
2. Verify Level 1 "Garden of Vowels" is unlocked (green color #90EE90)
3. Verify Levels 2-5 are locked (grayed out)
4. Verify each level shows an icon (🌱, 🪨, 🌲, ⛰️, 💎)
5. Take screenshot: `level_map_initial.png`

### Step 3: Start First Level
1. Click on "Garden of Vowels" level
2. Verify intro message appears: "Welcome to the Garden of Vowels!"
3. Click "Start Practice" button
4. Verify BlendingBoard loads with only vowels (no consonants)
5. Take screenshot: `level_1_start.png`

### Step 4: Test Progress Bar
1. Verify progress bar shows "0 / 10 blends completed"
2. Select vowel 'a' twice (creates blend)
3. Verify progress bar updates to "1 / 10 blends completed"
4. Verify progress bar fills proportionally (10%)
5. Take screenshot: `progress_bar_update.png`

### Step 5: Test Encouragement Messages
1. Complete 2 more blends
2. Verify encouraging message appears (e.g., "Great work!", "Keep going!")
3. Verify message has warm styling and fade animation
4. Complete another blend
5. Verify different encouraging message appears
6. Take screenshot: `encouragement_message.png`

### Step 6: Complete Level 1
1. Complete remaining blends to reach 10 total
2. Verify celebration modal appears with title "Garden of Vowels Complete!"
3. Verify gentle animation plays (not overwhelming)
4. Verify next level preview shows: "Next up: Simple consonants like M, P, and B!"
5. Click "Continue" button
6. Take screenshot: `level_1_complete.png`

### Step 7: Verify Level Progression
1. Verify return to level map
2. Verify Level 1 shows checkmark (completed)
3. Verify Level 2 "Stone Path" is now unlocked (amber color #FFB347)
4. Verify Levels 3-5 remain locked
5. Take screenshot: `level_2_unlocked.png`

### Step 8: Test Progress Persistence
1. Refresh the browser page (F5)
2. Wait for page to reload
3. Verify Level 1 still shows as completed
4. Verify Level 2 is still unlocked
5. Verify progress data persists
6. Take screenshot: `progress_persisted.png`

### Step 9: Start Level 2
1. Click on "Stone Path" level
2. Verify consonants ["m", "p", "b", "t", "d"] are available
3. Verify vowels ["a", "e", "i", "o", "u"] are available
4. Verify progress bar shows "0 / 15 blends completed"
5. Complete 3 blends
6. Take screenshot: `level_2_practice.png`

### Step 10: Test Parent Dashboard
1. Navigate to parent dashboard (click parent icon/menu)
2. Verify total levels completed shows "1 / 5"
3. Verify total practice time is displayed
4. Verify recent activity shows "Practiced 'Garden of Vowels'"
5. Take screenshot: `parent_dashboard.png`

### Step 11: Test Progress Reset
1. Click "Reset Progress" button in parent dashboard
2. Verify confirmation dialog appears
3. Click "Confirm" to reset
4. Verify return to level map
5. Verify all progress is cleared (Level 1 unlocked, others locked)
6. Take screenshot: `progress_reset.png`

### Step 12: Test Mobile Responsiveness
1. Resize viewport to 375x667 (iPhone SE)
2. Verify level map adjusts to vertical layout
3. Verify touch targets are appropriately sized
4. Verify progress bar is visible and readable
5. Test level selection with touch
6. Take screenshot: `mobile_journey_view.png`

### Step 13: Test Warm UI Theme
1. Verify background uses warm colors (not clinical blue)
2. Verify buttons have rounded corners and soft shadows
3. Verify typography is friendly and readable
4. Verify animations are smooth and gentle
5. Take screenshot: `warm_ui_theme.png`

### Step 14: Test Level Replay
1. Complete Level 1 again (10 blends)
2. Verify can replay completed level
3. Verify progress updates but level stays completed
4. Verify no duplicate unlock of Level 2
5. Take screenshot: `level_replay.png`

### Step 15: Verify localStorage Data
1. Open browser Developer Tools
2. Navigate to Application > Local Storage
3. Find key "liseur-learning-journey"
4. Verify data structure contains progress and settings
5. Verify version is "1.0"
6. Take screenshot: `localstorage_data.png`

## Expected Results
- Learning journey map displays 5 progressive levels
- Only Level 1 is initially unlocked
- Completing required blends unlocks next level
- Progress persists across browser sessions
- Warm UI with amber, green, and soft blue colors
- Encouraging messages appear during practice
- Gentle celebration on level completion
- Parent dashboard shows accurate statistics
- Progress reset works correctly
- Mobile responsive design works
- No manipulative gamification (no streaks, no pressure)
- Smooth transitions and micro-interactions

## Test Data
- Level 1: 10 vowel blends required
- Level 2: 15 consonant-vowel blends required
- Level 3: 20 soft consonant blends required
- Level 4: 25 rolling R blends required
- Level 5: 30 complex blends required
- localStorage key: "liseur-learning-journey"
- Progress version: "1.0"

## Cleanup
1. Clear localStorage to reset for next test run
2. No backend cleanup required

## Notes
- This test validates the complete learning journey experience
- Progress persistence is critical for user retention
- Warm UI should feel inviting, not clinical
- Encouragement messages should rotate randomly
- Celebration should be gentle, not overwhelming
- Test covers both first-time and returning user flows
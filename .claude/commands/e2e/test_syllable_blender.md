# E2E Test: Syllable Blender

## User Story
As a child learning to read French
I want to select letters and see/hear them blend together
So that I can understand how syllables are formed without guessing from pictures

## Test Environment Setup
- Frontend URL: http://localhost:5173
- Backend URL: http://localhost:8000
- Browser: Chrome
- Viewport: 1280x720

## Test Steps

### Step 1: Verify Application Loads
1. Navigate to http://localhost:5173
2. Wait for page to fully load (max 5 seconds)
3. Verify the title "Liseur - Syllable Blender" is present
4. Take screenshot: `syllable_blender_initial.png`

### Step 2: Check Consonant Column
1. Verify consonant selector is visible on the left side
2. Verify at least 10 consonants are displayed (b, c, d, f, g, etc.)
3. Verify no consonant is selected initially
4. Take screenshot: `consonants_column.png`

### Step 3: Check Vowel Column  
1. Verify vowel selector is visible on the right side
2. Verify at least 5 vowels are displayed (a, e, i, o, u)
3. Verify no vowel is selected initially
4. Take screenshot: `vowels_column.png`

### Step 4: Select a Consonant
1. Click on the consonant 'm'
2. Verify 'm' is highlighted/selected
3. Verify no syllable is displayed yet
4. Take screenshot: `consonant_selected.png`

### Step 5: Select a Vowel
1. Click on the vowel 'a'
2. Verify 'a' is highlighted/selected
3. Verify animation starts showing letters sliding together
4. Wait for animation to complete (max 2 seconds)
5. Take screenshot: `syllable_animation.png`

### Step 6: Verify Syllable Display
1. Verify the syllable "ma" is displayed
2. Verify audio plays automatically (check for audio element)
3. Verify syllable is displayed prominently
4. Take screenshot: `syllable_displayed.png`

### Step 7: Test Different Combination
1. Click on consonant 'p'
2. Click on vowel 'o'
3. Verify animation plays
4. Verify syllable "po" is displayed
5. Verify audio plays
6. Take screenshot: `second_syllable.png`

### Step 8: Test Mobile Responsiveness
1. Resize viewport to 375x667 (iPhone SE)
2. Verify layout adjusts appropriately
3. Verify touch interactions work
4. Take screenshot: `mobile_view.png`

### Step 9: Test Keyboard Navigation
1. Press Tab key to focus first consonant
2. Press Enter to select focused consonant
3. Press Tab to navigate to vowels
4. Press Enter to select focused vowel
5. Verify syllable forms correctly
6. Take screenshot: `keyboard_navigation.png`

### Step 10: Verify API Health
1. Send GET request to http://localhost:8000/api/health
2. Verify response status is 200
3. Verify response contains `"status": "healthy"`

## Expected Results
- Application loads within 2 seconds
- Consonants and vowels are clearly displayed in separate columns
- Letter selection provides visual feedback
- Animation smoothly slides letters together
- Audio plays automatically after animation
- No pictures or context clues present (pure decoding practice)
- Interface is clean and distraction-free
- Works on both desktop and mobile devices
- Keyboard navigation is fully functional

## Test Data
- Test syllables: ma, po, li, re, tu, ba, de, fi, go, nu
- Invalid combinations should show error message
- Audio should be clear French pronunciation

## Cleanup
No cleanup required - test is read-only

## Notes
- This test validates the core MVP functionality
- Audio playback may require user interaction in some browsers
- Animation timing is critical for learning experience
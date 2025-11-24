# Patch: Fix vowel-only blending for Level 1

## Metadata
adw_id: `ce63d882`
review_change_request: `Level 1 'Garden of Vowels' cannot create vowel blends. When selecting any vowel, the backend returns error 'Invalid combination: + a'. The phonics validation requires a consonant, but Level 1 has no consonants (vowel-only level).`

## Issue Summary
**Original Spec:** specs/issue-8-adw-ce63d882-sdlc_planner-learning-journey-progression.md
**Issue:** Backend validation in phonics.py rejects blends when consonant is empty, preventing Level 1 vowel-only blending
**Solution:** Allow vowel-only blends in backend validation and ensure frontend properly sends vowel-vowel combinations for Level 1

## Files to Modify
Use these files to implement the patch:

- `app/server/core/phonics.py` - Update validation logic to allow empty consonants for vowel-only levels
- `app/server/server.py` - Update blend endpoint to handle vowel-only blends
- `app/client/src/components/BlendingBoard.tsx` - Ensure proper vowel-vowel blending for consonant-free levels

## Implementation Steps
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Update backend validation to allow vowel-only blends
- Modify `is_valid_combination()` in phonics.py to accept empty consonant for vowel-only blends
- Update blend creation logic to handle vowel-vowel combinations
- Ensure consonant can be empty string or None

### Step 2: Update blend endpoint to handle vowel-only requests
- Modify the `/api/phonics/blend` endpoint in server.py
- Allow consonant to be optional or empty in the request
- Pass empty consonant correctly to phonics functions

### Step 3: Fix frontend blending logic for Level 1
- Update BlendingBoard.tsx performBlending function
- When level has no consonants, send empty string for consonant parameter
- Ensure vowel-vowel blending triggers correctly

## Validation
Execute every command to validate the patch is complete with zero regressions.

- `cd app/server && uv run pytest` - Run server tests to validate the feature works with zero regressions
- `cd app/client && bun tsc --noEmit` - Run frontend tests to validate the feature works with zero regressions
- `cd app/client && bun run build` - Run frontend build to validate the feature works with zero regressions
- Start both server and client, navigate to Level 1, and verify vowel blending works without errors
- Verify that levels with consonants still work correctly (no regressions)

## Patch Scope
**Lines of code to change:** ~15-20
**Risk level:** low
**Testing required:** Test vowel-only blending in Level 1 and ensure existing consonant-vowel blending still works
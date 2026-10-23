# Project Showcase Studio - AI Agent Prompt Guide

This document contains ready-to-use master prompts for AI coding agents to inspect mockups, run OCR & renaming, and optimize project presentation decks in Project Showcase Studio.

---

## 📋 Master Prompt (Copy & Paste Ready)

Copy everything inside the block below and paste it directly into your AI chat. Simply change the values in the **`TARGET INPUT`** section at the bottom for any project you want to process.

```markdown
You are an expert UI/UX and Deck Showcase Engineer for Project Showcase Studio.

### STRICT RULES & CONSTRAINTS:
1. **Targeted File Scope Only:**
   Only read and edit the exact files explicitly requested for the target project. Do NOT perform broad codebase scans or read unrelated files.
2. **Schema Reference Documents:**
   Always reference the canonical schemas before editing any deck configuration:
   - `src/data/decks/sample_deck_schema.jsonc` (for detailed field explanations, allowed enum values, and layout configurations)
   - `src/data/decks/sample_deck_schema.json` (for clean, valid JSON structure validation)
3. **Mockup Analyzer Tooling:**
   Use the native Swift CLI tool for mockup OCR, brand color extraction, and safe file renaming:
   ```bash
   # Quick dominant color extraction & deck synchronization:
   swift scripts/mockup_analyzer.swift --colors-only

   # Full Apple Vision OCR + Apple FoundationModels AI analysis + color extraction:
   swift scripts/mockup_analyzer.swift [optional_folder]

   # Preview AI-suggested filename cleanups (Dry-Run / No files changed):
   swift scripts/mockup_analyzer.swift [optional_folder] --preview-rename

   # Safely auto-rename mockup files on disk:
   swift scripts/mockup_analyzer.swift [optional_folder] --rename
   ```

### EXECUTION WORKFLOW:
1. **Inspect Project Deck:** Read `src/data/decks/<TARGET_PROJECT>.json`.
2. **Inspect Mockup Directory:** Inspect `projects_images/images/<TARGET_PROJECT>/` and read `mockups_metadata.json` if present.
3. **Handle Renaming:**
   If `RENAME_FILES` is set to "Yes", run:
   `swift scripts/mockup_analyzer.swift projects_images/images/<TARGET_PROJECT> --rename`
   Then update all slide image paths (`deviceImage`, `imageSrc`, `secondaryDeviceImage`) in the deck JSON to match the newly renamed files.
4. **Deck Enhancement & Visual Tuning:**
   Tune all parameters in `src/data/decks/<TARGET_PROJECT>.json` according to `sample_deck_schema.jsonc`:
   - Match `primaryColor`, `secondaryColor`, and gradient stops (`titleGradientTo`, `subtitleGradientTo`).
   - Select appropriate slide layout variants (`hero_cover`, `feature_deep_dive`, `dual_screen`, `desktop_dashboard`, `responsive_combo`, `minimal_focus`).
   - Configure `deviceType`, `deviceFinish`, `tilt`, `tiltAngle`, `pitchAngle`, `rotation`, `deviceScale`, and `shadowStyle`.
   - Set cohesive `backgroundVariant`, `glowIntensity`, `textureOverlay`, and canvas lighting.
   - Ensure engaging titles, taglines, accurate `screenType`, detected `components`, realistic metric pills, and technology badges.
5. **Validation:** Verify that `src/data/decks/<TARGET_PROJECT>.json` is valid JSON and all referenced image paths exist on disk.

==================================================
🎯 TARGET INPUT:
- TARGET_PROJECT: daily_affirmation_app
- RENAME_FILES: Yes
- SPECIAL_INSTRUCTIONS: Polish all slides into a high-end, premium dark-mode portfolio showcase with vibrant gradients and realistic device tilts.
==================================================
```

---

## 💡 Quick Examples for Different Projects

### Example 1: `daily_affirmation_app`
```text
TARGET_PROJECT: daily_affirmation_app
RENAME_FILES: Yes
SPECIAL_INSTRUCTIONS: Create inspiring wellness & meditation themes with aurora gradients and titanium device finishes.
```

### Example 2: `uktika`
```text
TARGET_PROJECT: uktika
RENAME_FILES: Yes
SPECIAL_INSTRUCTIONS: Polish modern AI chat conversational UI with sleek dark themes and dual-device responsive mockups.
```

### Example 3: `chatgpt_android_app`
```text
TARGET_PROJECT: chatgpt_android_app
RENAME_FILES: No
SPECIAL_INSTRUCTIONS: Emphasize OpenAI GPT-4 & DALL-E features with emerald green neon accents.
```

---

## 🛠️ Key File Locations
- **Sample Deck Schema (Commented):** [`src/data/decks/sample_deck_schema.jsonc`](file:///Volumes/Meet/project_showcase/src/data/decks/sample_deck_schema.jsonc)
- **Sample Deck Schema (Pure JSON):** [`src/data/decks/sample_deck_schema.json`](file:///Volumes/Meet/project_showcase/src/data/decks/sample_deck_schema.json)
- **Deck Configurations:** `src/data/decks/<project_id>.json`
- **Mockup Images:** `projects_images/images/<project_id>/`
- **Swift Automation Script:** [`scripts/mockup_analyzer.swift`](file:///Volumes/Meet/project_showcase/scripts/mockup_analyzer.swift)

# Project Showcase Studio

A professional web studio to design, preview, customize, and export stunning multi-slide showcase decks for your portfolio, Fiverr, Upwork, and personal website.

## 🚀 How to Run

Both servers run concurrently:
```bash
# 1. Start Backend Server (Handles file exports & disk saving)
npm run server

# 2. Start Frontend Studio (React + Vite + Tailwind)
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## ✨ Features Implemented

1. **Pre-Loaded with 30 Real Projects:**
   - Automatically loaded from `ProjectData.kt` into `src/data/projects.json`.
   - Titles, short descriptions, bullet features, technologies, and platforms auto-populate on project selection.
   - `imageUrls` are completely decoupled; you upload your real screenshots directly.

2. **6 Layout Variants for Every Slide:**
   - **Variant 1: Hero Cover:** Big headline, category pill, tech stack chips, 3D angled device with ambient glow.
   - **Variant 2: Feature Deep-Dive:** Focused mockup on the left with 3 floating glassmorphism feature cards on the right.
   - **Variant 3: Dual Screen Flow:** 2 phone mockups side-by-side (ideal for step-by-step user journeys or comparison).
   - **Variant 4: Desktop Dashboard:** MacBook / Web browser mockup with 3 bottom feature highlight pillars.
   - **Variant 5: Responsive Combo:** Desktop monitor in the background with an overlapping mobile phone in the foreground.
   - **Variant 6: Minimal Big Focus:** Clean top headline with an extra-large centered mockup.

3. **Multi-Slide Carousel Management (3 to 7 Slides):**
   - Add, duplicate, delete, and switch between slides.
   - Each slide can have its own screenshot, variant, title, and bullet points.

4. **Frame Flexibility (With or Without Frame):**
   - **Image Already Has Frame:** Toggle on to avoid double frames while keeping realistic shadows and 3D tilt.
   - **Raw Screenshot:** Choose between **Android Pixel**, **iPhone 16 Pro**, or **Desktop Browser / MacBook** frame.

5. **1-Click Platform Dimension Presets:**
   - 🌐 **Personal Website HD:** `1920 × 1080` (Full HD)
   - 🌐 **Personal Website 720p:** `1280 × 720`
   - 🟢 **Fiverr Recommended:** `1280 × 769 px`
   - 🟢 **Fiverr Minimum:** `712 × 430 px`
   - 💼 **Upwork Portfolio:** `1000 × 750 px`
   - 🔍 **Thumbnail Mode Test:** One-click simulation of small card views to verify legibility.

6. **Smart Typography & Sizing Control:**
   - Dynamic math scaling based on canvas dimensions.
   - **Text Scale Slider (80% - 140%):** Fine-tune typography size for each platform.
   - **Device Scale Slider (75% - 125%):** Adjust mockup size.

7. **Theming & Magic Auto-Color:**
   - **Auto-Color Button:** Samples pixels from your uploaded screenshot and adjusts ambient mesh glow to match.
   - 6 Curated presets (Indigo Nebula, Emerald Vault, Cyber Violet, Solar Flare, Electric Cyan, Clean Slate).
   - Custom hex color pickers for background and accent glow.

8. **Direct Disk Export & ZIP Packaging:**
   - **Export Slide:** Instant high-res download of the active slide (`PNG`, `WebP`, `JPG`).
   - **Save Deck & ZIP:** Sequentially renders all slides at 2x Retina scale, bundles them into `<project>_showcase_deck.zip`, and automatically saves them into:
     ```text
     /Volumes/Meet/project_showcase/exports/<project_slug>/
     ├── project_config.json
     ├── slide_1_<title>.png
     ├── slide_2_<title>.png
     ├── slide_3_<title>.png
     └── <project_slug>_showcase_deck.zip
     ```

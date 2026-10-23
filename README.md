# Project Showcase Studio

A high-performance, developer-grade web application to design, customize, preview, and export multi-slide showcase decks for your portfolios, GitHub repositories, Fiverr gigs, Upwork projects, and personal websites.

---

## 🚀 How to Run the Application

The studio consists of a React + Vite frontend and a lightweight Node.js persistence/export backend.

### 1. Start Both Servers

Run the backend and frontend concurrently in your terminal:

```bash
# Terminal 1: Start Backend Server (Handles file exports, zip packaging & disk sync)
npm run server

# Terminal 2: Start Frontend Studio (React + Vite + Tailwind CSS)
npm run dev
```

### 2. Open in Browser

Open [http://localhost:5173](http://localhost:5173) in Google Chrome or any modern browser.

---

## 📖 Step-by-Step Guide: How to Use the Studio

### Step 1: Select Your Project
- In the top header bar, click the **Project Dropdown** to select one of the **30 pre-loaded projects** (sourced dynamically from `src/data/decks/<project_id>.json`) or create custom slide decks.
- Titles, taglines, technologies, platforms, primary/secondary brand colors, and feature bullets are automatically populated.

### Step 2: Choose Your Canvas Dimension Preset
In the top bar, pick the ideal resolution for your target platform:
- 🌐 **Personal Website HD:** `1920 × 1080` (16:9 Full HD)
- 🌐 **Personal Website 720p:** `1280 × 720` (16:9 Standard)
- 🟢 **Fiverr Recommended:** `1280 × 769` (Official Fiverr Gig Gallery Ratio)
- 🟢 **Fiverr Minimum:** `712 × 430` (Compact Fiverr Card)
- 💼 **Upwork Portfolio:** `1000 × 750` (4:3 Upwork Project Gallery Standard)
- ⚙️ **Custom:** Enter custom pixel Width × Height.
- 🔍 **Thumbnail Mode:** Toggle to preview how your slide looks at small card scale to ensure headline legibility.

### Step 3: Manage Multi-Slide Carousel Deck
- Use the **Slide Dock** floating at the bottom of the screen.
- **Select Slide:** Click any slide badge (e.g., `Slide 1: hero`, `Slide 2: dual`, etc.) to switch active slide.
- **Add Slide:** Click the `+ Add Slide` button to append a new slide (up to 20 slides per project).
- **Duplicate Slide:** Click the copy icon to duplicate the active slide with all its customizations intact.
- **Delete Slide:** Click the trash icon to remove a slide.

### Step 4: Customize the Slide Layout Template
Click the **Template** tab in the right Inspector:
- Select from **6 unique composition layouts**:
  1. **Hero Cover:** Cover slide featuring 3D isometric mockup, title, subtitle, eyebrow badge, status pill, and tech stack pills.
  2. **Feature Deep-Dive:** Device mockup on the left with 3 floating glassmorphism feature cards on the right.
  3. **Dual Screen Flow:** Two phone mockups side-by-side with primary & secondary screenshot uploads.
  4. **Desktop Dashboard:** MacBook / Web browser window frame with feature highlight pillars.
  5. **Responsive Combo:** Desktop monitor with overlapping mobile phone and Universal UI badge.
  6. **Minimal Focus:** Ultra-clean centered device mockup with focused typography.

> **Note:** The Inspector dynamically filters controls based on the selected layout template. Irrelevant properties are automatically hidden to keep your workspace clean.

### Step 5: Upload Screenshots & Set Hardware Frame
Click the **Mockup** tab in the Inspector:
- **Upload Screenshot:** Drag and drop or browse for your screenshot (`PNG`, `JPG`, `WebP`). You can also type local image paths (e.g., `/images/screenshot.png`) or data URLs. Newly uploaded screenshots with empty transparent margins are automatically detected and auto-trimmed!
- **✂️ Trim Transparent Padding:** If a pre-framed screenshot has empty transparent spacing at the top/bottom that causes offset shadows or weird card boxes, click the **Trim Transparent Padding** button under the preview thumbnail to crop it cleanly via 1-click canvas alpha scanning.
- **Secondary Screenshot:** For *Dual Screen* and *Responsive Combo*, upload a 2nd screenshot for the mobile device.
- **Auto-Color:** Click the ✨ **Auto-Color** button to sample dominant colors from your screenshot and automatically tune the ambient lighting.
- **Hardware Frame Model:** Choose from **33 real hardware specifications** (Pixel 9/10, iPhone 16 Pro/17, Galaxy S25, iPad Pro M4, macOS Desktop Window, or Frameless).
- **Image Has Frame Toggle:** Turn ON if your image already includes bezels/frames. When enabled:
  - Studio synthetic bezels are bypassed to prevent double bezels.
  - Standard rectangular `box-shadow` is automatically replaced with **alpha-aware CSS `drop-shadow`** so transparent margins never cast awkward rectangular card shadows.
  - Screen reflection is blended with `mix-blend-mode: overlay` to preserve transparent PNG backgrounds.
- **Device Body Finish:** Toggle ON/OFF or select `None (∅)` to preserve the original OEM stock frame, or pick from 10 metallic chassis finishes (Natural Titanium, Desert Titanium, Space Gray, etc.).
- **3D Isometric Tilt (Hero Cover):** Adjust perspective tilt angle Y (-25° to 25°) and pitch angle X (-15° to 15°).
- **Device Shadows & Reflection:** Choose shadow styles (*Dramatic, Soft, Neon, None*), shadow intensity, and glossy screen reflection.
- **Scale & Offsets:** Adjust device zoom scale (50% to 140%) and X/Y offset positioning.

### Step 6: Customize Typography & Gradient Styles
Click the **Content** tab in the Inspector:
- **Slide Headline & Subtitle:** Type custom text (supports multiline with Enter or `\n`).
- **Headline & Subtitle Color Customizer:**
  - ✨ **Gradient Mode:** Choose from 8 presets (*Metallic Silver, Cyber Violet, Sunset Gold, Emerald Ice, Electric Cyan, Luxury Gold, Neon Rose, Deep Ocean*) OR build a **Custom 2-Color Gradient** with live angle controls (`0° ↑`, `45° ↗`, `90° →`, `135° ↘`, `180° ↓`).
  - 🎨 **Solid Color Mode:** Pick from 11 curated swatches or type custom hex values.
- **Eyebrow Badge & Tags:** Customize badge text, accent color, and choose from 17 Lucide icons (*Sparkles, Flame, Star, Shield, Terminal, Lightning, Rocket, Award, Crown, Code, Globe, AI/Cpu, Heart, Lock, Verified, Growth, Layers, Mobile*).
- **Feature Cards:** Edit 3 key feature bullets and card text color (for Feature Deep-Dive & Desktop Dashboard).
- **Font Library & Boldness:** Access the full **Google Fonts Library (1,600+ fonts)** with 80+ curated fonts across 6 categories (*Modern Sans, Display & Bold, Luxury Serif, Tech & Code, Futuristic, Creative / Script*) plus live search and custom Google Font importer, with 6 boldness weights (*Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800, Black 900*).
- **Element Sizing:** Adjust individual sliders for Headline Size, Subtitle Size, Eyebrow Badge Size, Icon Size, Feature Text Size, Tech Pills Size, and Global Text Scale.

### Step 7: Tune Background Atmosphere
Click the **Canvas** tab in the Inspector:
- **Background Lighting:** Select from 9 lighting variants (*Aurora Mesh, Spotlight Cone, Studio Radial, Cyber Grid, Linear Gradient, Sunset Glow, Concentric Rings, Studio Vignette, Horizon Ray*).
- **Lighting Alignment:** Choose directional focus (*Behind Device Auto, Top-Left, Top-Center, Top-Right, Center-Left, Center, Center-Right, Bottom-Left, Bottom-Center, Bottom-Right*).
- **18 Curated Color Themes:** 1-click themes including *Indigo Aura, Emerald Mint, Neon Violet, Sunset Amber, Pure Obsidian, Cyberpunk Rose, Neon Lime, Sapphire Deep, Luxury Gold*, etc.
- **Custom Texture & Background:** Upload custom wallpaper or enable Dots / Grid texture overlays.
- **Canvas Radius:** Adjust corner roundness (0px to 48px).
- **Live Canvas Specs Card:** Displays real-time output dimensions (e.g. `2560 × 1538 px` at 2x Retina), active format (`PNG/WebP/JPG`), and live estimated file size.

### Step 8: Export Your Showcase
- **⚡ Live File Size Estimator:** A real-time badge in the top header (e.g. `~3.8 MB (Retina 4K)` or `~820 KB`) dynamically calculates your file size using our physics-grounded mathematical estimator (`estimateImageFileSize`) based on canvas dimensions, upscale factor, format, and compression quality.
- **Export Single Slide:** Click **Export Slide** in the header to instantly download the active slide in high resolution (`PNG`, `JPG`, or `WebP`).
- **Save & Export Deck (ZIP):** Click **Save Deck & ZIP** to render all slides sequentially at 2x Retina scale. The backend saves files directly to disk and downloads a packaged ZIP archive:
  ```text
  /Volumes/Meet/project_showcase/exports/<project_slug>/
  ├── project_config.json
  ├── slide_1_<title>.png
  ├── slide_2_<title>.png
  ├── slide_3_<title>.png
  └── <project_slug>_showcase_deck.zip
  ```

---

## 🎛️ Complete Properties Reference

### 1. Slide Layout Templates (`variant`)
| Template ID | Name | Description | Key Visible Properties |
|---|---|---|---|
| `hero_cover` | Hero Cover | High-impact 3D cover slide | 3D Isometric Tilt, Eyebrow Badge, Status Callout Pill, Tech Stack Pills, Single Screenshot |
| `feature_deep_dive` | Feature Deep-Dive | Mockup with feature breakdown | 3 Feature Cards, Card Text Color, Eyebrow Badge, Feature Text Size Slider |
| `dual_screen` | Dual Screen Flow | Two phones side-by-side | Primary Screenshot, Secondary Screenshot, Centered Title & Subtitle |
| `desktop_dashboard` | Desktop Dashboard | MacBook / Web desktop frame | Desktop Window Frames, 3 Feature Highlights, Single Screenshot |
| `responsive_combo` | Responsive Combo | Multiplatform desktop + mobile | Primary (Desktop) + Secondary (Mobile) Screenshot, Universal UI Badge |
| `minimal_focus` | Minimal Focus | Large centered clean mockup | Single Screenshot, Large Centered Device, Clean Headline & Subtitle |

---

### 2. Hardware Frame Models (33 Real Specifications)
| Brand / Category | Model IDs | Specifications Included |
|---|---|---|
| **Google Pixel** | `google-pixel-9`, `google-pixel-10`, `google-pixel-10-pro-fold` | Real aspect ratios, camera visors, punch-holes, precise corner radii |
| **Apple iPhone** | `apple-iphone-16-pro`, `apple-iphone-16-pro-max`, `apple-iphone-16`, `apple-iphone-16-plus`, `apple-iphone-17-pro`, `apple-iphone-17-pro-max`, `apple-iphone-17`, `apple-iphone-17e`, `apple-iphone-air`, `apple-iphone-se-3` | Dynamic Island, Titanium bezels, home button (SE), ultra-thin bezels |
| **Samsung Galaxy** | `samsung-galaxy-s25`, `samsung-galaxy-s24`, `samsung-galaxy-z-fold-8`, `samsung-galaxy-z-fold-8-ultra`, `samsung-galaxy-z-flip-8` | Ultra bezels, foldable aspect ratios, camera punch holes |
| **Tablets & iPads** | `apple-ipad-pro-11-m4`, `apple-ipad-pro-13-m4`, `apple-ipad-air-11-m2`, `apple-ipad-air-13-m2`, `apple-ipad-mini`, `apple-ipad-10`, `samsung-galaxy-tab-s11`, `samsung-galaxy-tab-s10-plus` | Landscape & portrait aspect ratios, slim uniform bezels |
| **Desktop Windows** | `desktop-large` (macOS Window), `desktop-small` (Windows Window) | Window chrome titlebars, macOS traffic lights, Windows controls |
| **Special Frames** | `frameless` | Clean card with customizable shadow and border radius |

---

### 3. Mockup & Device 3D Controls
| Property | Control Type | Default | Range / Options | Description |
|---|---|---|---|---|
| `imageSrc` | Upload / URL | `null` | Base64 / Local URL | Primary screenshot displayed inside the device |
| `secondaryImageSrc` | Upload / URL | `null` | Base64 / Local URL | Secondary screenshot (Dual Screen & Responsive Combo) |
| `hasFrame` | Checkbox | `false` | `true` / `false` | Enable if screenshot already has frames to prevent double bezels. Automatically activates alpha-aware `filter: drop-shadow` so transparent PNG margins never cast rectangular card shadows. |
| `autoTrim` | 1-Click Button + Auto | Action | N/A | **Trim Transparent Padding**: Detects & strips empty alpha=0 padding margins on upload or via manual 1-click button using Canvas alpha scanning |
| `deviceType` | Select / Badges | `google-pixel-9` | 33 Real Hardware Models | Frame bezel and aspect ratio specifications |
| `deviceFinish` | Toggle Switch + 10 Swatches + None | `natural_titanium` | `none` (OFF/Stock OEM), Natural Titanium, Desert Titanium, White Titanium, Black Titanium, Space Gray, Silver Aluminum, Midnight Navy, Alpine Emerald, Cosmic Orange, Rose Gold | Realistic metallic chassis finish & gradient rim or None (original OEM stock frame) |
| `frameGleam` | Checkbox | `true` | `true` / `false` | Specular metallic rim light reflection along device edges |
| `deviceCornerRadius`| Slider | `36px` | `10px` to `54px` | Inner & outer device corner curvature |
| `layoutAlign` | Toggle Button | `left` | `left` ⇄ `right` | **Swap Layout Alignment**: Swaps mockup and content positions (Hero Cover & Feature Deep-Dive) |
| `layoutSplit` | Slider + 3 Quick Pills | `48` | `30%` to `70%` | **Layout Balance & Split**: Width ratio between Content and Mockup (`35/65` Focus Device, `48/52` Balanced, `60/40` Focus Content) |
| `autoScaleEnabled` | Switch Toggle | `true` | `true` / `false` | **Auto-Scale Text & Elements**: Toggle dynamic proportional font & element scaling when switching canvas resolutions |
| `autoScaleIntensity`| Slider | `1.0` (100%) | `0.0` (0%) to `1.0` (100%) | **Auto-Scale Intensity**: Control responsiveness (0% locked size, 50% subtle scaling, 100% full auto-scale) |
| `deviceAutoFit` | Switch Toggle | `true` | `true` / `false` | **Device Height Auto-Fit**: Auto-shrinks device on low-height canvas (e.g. 712x430) to prevent viewport clipping |
| `tilt` | Checkbox | `true` (Hero) | `true` / `false` | Enables 3D perspective transform (Hero Cover only) |
| `tiltAngle` | Slider | `-8°` | `-25°` to `+25°` | 3D perspective rotation on the Y-axis |
| `pitchAngle` | Slider | `4°` | `-15°` to `+15°` | 3D perspective rotation on the X-axis |
| `shadowStyle` | Buttons | `dramatic` | `dramatic`, `soft`, `neon`, `none` | Realistic drop shadow styling under device |
| `shadowIntensity` | Slider | `0.8` | `0.2` to `1.0` (20% - 100%) | Opacity and darkness of device drop shadow |
| `screenReflection` | Checkbox | `true` | `true` / `false` | Diagonal high-gloss glass reflection sheen |
| `deviceScale` | Slider | `1.0` | `0.5` to `1.4` (50% - 140%) | Size zoom scale of the mockup |
| `offsetX` | Slider | `0px` | `-80px` to `+80px` | Horizontal fine-tuning translation offset |
| `offsetY` | Slider | `0px` | `-80px` to `+80px` | Vertical fine-tuning translation offset |

---

### 4. Typography, Colors, Trust Badges & Conversion Elements
| Property | Control Type | Options / Values | Description |
|---|---|---|---|
| `title` | Textarea | Text string | Slide headline (supports `\n` for linebreaks) |
| `tagline` | Textarea | Text string | Subtitle / description paragraph |
| `titleGradient` | Mode Toggle / Grid | `metallic`, `cyber`, `sunset`, `emerald`, `cyan`, `gold`, `rose`, `ocean`, `custom`, `solid` | Headline color style (Gradient presets, Custom, or Solid) |
| `titleColor` | Swatches / Color / Hex | Hex string (e.g. `#ffffff`) | Solid headline color |
| `titleGradientFrom` | Color / Hex | Hex string | Custom gradient start color |
| `titleGradientTo` | Color / Hex | Hex string | Custom gradient end color |
| `titleGradientAngle`| Slider / Quick Pills | `0°`, `45°`, `90°`, `135°`, `180°` | Custom gradient directional angle |
| `subtitleGradient` | Mode Toggle / Grid | `none`, `metallic`, `cyber`, `sunset`, `emerald`, `cyan`, `gold`, `rose`, `ocean`, `custom`, `solid` | Subtitle color style |
| `subtitleColor` | Swatches / Color / Hex | Hex string (e.g. `#cbd5e1`) | Solid subtitle text color |
| `subtitleGradientFrom` | Color / Hex | Hex string | Subtitle custom gradient start color |
| `subtitleGradientTo` | Color / Hex | Hex string | Subtitle custom gradient end color |
| `subtitleGradientAngle`| Slider / Quick Pills | `0°` to `360°` | Subtitle custom gradient angle |
| `storeBadgeType` | Dropdown | `none`, `both`, `app_store`, `google_play` | **App Store & Google Play Badges**: Official Apple and Google vector badges |
| `storeBadgeStyle` | Buttons | `official` (Solid Black), `glass` (Frosted Glass) | Badge visual design theme |
| `showTechIcons` | Checkbox | `true` / `false` | **Brand Logos**: Toggle tech badges on/off. Priority: Local `./logo/` folder → native vector SVGs → **theSVG** open CDN (7,600+ logos) |
| `techLogoVariant` | Segmented Toggle | `icon` / `wordmark` | **Logo Asset Style**: `icon` renders only the icon mark (`logoname_logo.png`); `wordmark` renders the full logo with name (`logoname_logo_2.png`) |
| `technologies` | Interactive Browser + Input | Visual Chip Manager / Comma list | **Tech Stack Manager**: Live chip removal, local logo folder quick-picks (45+ pre-indexed logos), and live theSVG CDN brand search |
| `showMetricPill` | Checkbox | `true` / `false` | **Social Proof / Metric Pill**: High-converting trust element |
| `metricText` | Text Input | e.g. `4.9 ★ Rating • 50K+ Downloads` | Custom metric or star rating text |
| `metricIcon` | Interactive Icon Picker | `star` | **Lucide Icon Library (100+ Curated + Search)** | Trust pill metric icon with category filters (Trust, Tech, Business, Navigation, Media, etc.) |
| `metricStyle` | Dropdown | `gold`, `emerald`, `indigo`, `glass`, `ruby` | Trust pill color aesthetic |
| `eyebrowText` | Input | Text string | Top tag / platform badge text |
| `eyebrowIcon` | Interactive Icon Picker | `Sparkles` | **Lucide Icon Library (100+ Curated + Search)** | Interactive searchable picker drawer across 8 categories (Trust & Badges, Tech & Code, Business & Metrics, Media, Navigation, Security, Tools, Energy & AI) or custom Lucide lookup |
| `badgeColor` | Swatches / Color / Hex | Hex string (e.g. `#818cf8`) | Accent color for eyebrow tag and callout badge |
| `statusBadge` | Input | Text string | Callout status pill (e.g., `⭐ 88 Stars on GitHub`) |
| `features` | 3 Inputs | Array of 3 strings | Key feature bullets for Feature Deep-Dive |
| `featureColor` | Swatches / Color / Hex | Hex string | Text color for floating feature cards |
| `fontFamily` | Interactive Font Picker | `Plus Jakarta Sans` | **1,600+ Google Fonts** (80+ Curated across 6 categories + Live Search & Custom Google Font Importer) | Full typography library with real-time Google Fonts CDN loader |
| `fontWeight` | 6 Buttons | `400`, `500`, `600`, `700`, `800`, `900` | Headline boldness (Regular, Medium, SemiBold, Bold, ExtraBold, Black) |
| `titleSize` | Slider | `28px` - `76px` | Headline font size |
| `subtitleSize` | Slider | `13px` - `26px` | Subtitle font size |
| `badgeSize` | Slider | `10px` - `18px` | Eyebrow badge font size |
| `iconSize` | Slider | `12px` - `28px` | Badge icon size |
| `featureSize` | Slider | `11px` - `20px` | Feature cards text size |
| `techChipSize` | Slider | `10px` - `18px` | Tech stack pills font size |
| `textScale` | Slider | `0.75` - `1.4` (75% - 140%) | Global typography scaling multiplier |

---

### 5. Canvas, Lighting & Atmosphere
| Property | Control Type | Default | Options / Values | Description |
|---|---|---|---|---|
| `backgroundVariant` | 2-Col Grid | `aurora` | 9 Variants | `aurora` (Mesh), `spotlight` (Cone ray), `radial` (Apple studio), `grid` (Cyber matrix), `linear` (Directional wash), `mesh_sunset` (Warm sunset glow), `cyber_rings` (Radar target circles), `deep_void` (Studio vignette), `split_horizon` (Cinematic beam) |
| `bgAlignment` | 3x3 Grid + Auto | `behind_device` | 10 Alignments | `behind_device` (Auto aligns with device focus), `top_left`, `top_center`, `top_right`, `center_left`, `center`, `center_right`, `bottom_left`, `bottom_center`, `bottom_right` |
| `backgroundColor` | Color Picker / Hex | `#080a12` | Any Hex Color | Main canvas backdrop solid color |
| `accentColor` | Color Picker / Hex | `#6366f1` | Any Hex Color | Primary glowing light / ambient spotlight color |
| `glowIntensity` | Slider | `0.35` | `0.05` - `1.0` (5% - 100%) | Brightness and spread multiplier of lighting glow |
| `customBgImage` | File Upload | `null` | Image URL / Base64 | Custom uploaded background wallpaper or texture |
| `textureOverlay` | Buttons | `dots` | `dots`, `grid`, `none` | Subtle texture grid or dot matrix overlay on canvas |
| `canvasRadius` | Slider | `28px` | `0px` - `48px` | Corner roundness of the exported canvas |
| `exportScale` | Dropdown + 4 Pills | `2` (4K) | `1` (1080p), `2` (4K Retina), `3` (6K Ultra), `4` (8K Master) | **Export Resolution Multiplier**: Upscale factor for exported slides and ZIP decks |
| `exportQuality` | Slider | `1.0` (100%) | `0.7` (70%) to `1.0` (100% Lossless) | Compression quality for JPG and WebP export formats |
| `exportFormat` | Dropdown | `png` | `png`, `webp`, `jpg` | Image output file encoding format |

---

### 6. Curated Color Themes (18 Designer Presets)
| Theme Name | Background Hex | Accent Glow Hex | Aesthetic Description |
|---|---|---|---|
| **Indigo Aura** | `#080a12` | `#6366f1` | Modern SaaS & Developer Dark Mode |
| **Emerald Mint** | `#050f0e` | `#10b981` | Fintech, Health & Sustainable Tech |
| **Neon Violet** | `#0c0714` | `#a855f7` | AI, Web3 & Creative Studio |
| **Sunset Amber** | `#100a06` | `#f97316` | Warm, energetic, consumer lifestyle |
| **Electric Cyan** | `#060d14` | `#06b6d4` | Cloud computing & developer tools |
| **Slate Minimal** | `#0e1117` | `#94a3b8` | Clean Apple-like monochrome |
| **Pure Obsidian** | `#000000` | `#38bdf8` | Deep OLED true black with cyan ray |
| **Cyberpunk Rose** | `#0f050b` | `#f43f5e` | Bold neon hot rose for gaming/entertainment |
| **Neon Lime** | `#080e05` | `#84cc16` | High-voltage electric green tech |
| **Sapphire Deep** | `#030712` | `#3b82f6` | Professional enterprise & corporate tech |
| **Midnight Teal** | `#020f0f` | `#14b8a6` | Deep ocean cyan for productivity apps |
| **Luxury Gold** | `#100d04` | `#eab308` | Premium, crypto & luxury showcases |
| **Lavender Mist** | `#0b0813` | `#c084fc` | Soft pastel purple for consumer apps |
| **Ruby Crimson** | `#120407` | `#e11d48` | High-energy automotive & sports apps |
| **Titanium Dark** | `#0a0a0c` | `#e2e8f0` | Industrial Apple Titanium finish |
| **Deep Space** | `#050510` | `#4f46e5` | Ultra-deep indigo galaxy glow |
| **Matrix Forest** | `#040d06` | `#22c55e` | Terminal hacker green matrix |
| **Hot Coral** | `#120706` | `#fb7185` | Playful coral peach display |

---

## 💾 Project Persistence & Disk Auto-Sync

All project customizations are automatically synchronized in real time:
- **Disk Directory:** `src/data/decks/<project_id>.json` (individual, clean ~160-line JSON files for each project).
- **Backend Auto-Save:** The Express backend (`server.js`) listens on port 3001 and writes changes every time a slide or project property is modified.
- **Browser Fallback:** Synchronized with `localStorage` so your work is never lost even if the backend is temporarily offline.

---

## 📁 Modular Data Architecture (Single Source of Truth)

Project Showcase Studio uses a clean, 100% modular architecture where **each project is completely self-contained**:

```text
/Volumes/Meet/project_showcase/
├── src/data/
│   ├── projects.json          # Master Project Knowledge Base (Full descriptions, features & what each project actually is)
│   ├── decks/                 # Visual Presentation Decks (Individual 3-Slide decks, tilts, lighting & mockups)
│   │   ├── news_kotlin_multiplatform_app.json
│   │   ├── pokemon_app_mvi_compose_multiplatform.json
│   │   ├── devanalyzer.json
│   │   └── ... (30 individual files, self-contained)
│   ├── localLogos.js          # 45+ Local Brand Logos Catalog & Wordmark Index
│   └── deviceSpecs.js         # 33 Hardware Specifications & Bezels
├── projects_images/images/    # Organized Mockup Screenshots by Project ID
│   ├── news_kotlin_multiplatform_app/
│   ├── pokemon_app_mvi_compose_multiplatform/
│   ├── chatgpt_android_app/
│   └── ...
└── logo/                      # Brand Logo Files (_logo.png vs _logo_2.png)
```

### 1. `src/data/projects.json` (Master Project Knowledge Base & Feature Catalog)
- **Purpose:** Yeh file har project ke **complete details, comprehensive features, aur deep descriptions** ko reference ke liye store karti hai:
  - `longDescription`: Project ka detailed explanation ki application actually kya karta hai aur kis problem ko solve karta hai.
  - `shortDescription`: Ek-line ka compact elevator pitch / tagline.
  - `features`: Application ki puri exhaustive features list (10–15 bullet points per project).
  - `technologies`: Full architecture aur tech stack items (`Kotlin`, `Compose Multiplatform`, `Room`, `Ktor`, `QiSDK`, etc.).
  - `platform`: Target operating systems (`Android`, `iOS`, `Windows`, `macOS`, `Linux`).

### 2. `src/data/decks/<project_id>.json` (Studio 3-Slide Visual Decks)
- Each project has its own dedicated file containing all project metadata and slide configurations:
  - **Metadata:** `id`, `title`, `shortDescription`, `features`, `technologies`, `platform`, `primaryColor`, `secondaryColor`.
  - **Slide 1 (`hero_cover` / `desktop_dashboard` / `featured_card`):** Cover slide with 3D isometric tilt, project headline, tagline, trust pill, and real app screenshot.
  - **Slide 2 (`feature_deep_dive`):** 3 key feature highlight cards, accent glow, and secondary screen.
  - **Slide 3 (`responsive_combo` / `dual_screen`):** Multiplatform layout showing mobile and desktop variants side by side.
  - **Visual Atmosphere:** Canvas lighting theme (`aurora`), accent glow, 3D tilt angles, custom gradient angles, hardware finish (`natural_titanium`), and store badges.

### 2. Automation Scripts (`scripts/`)
- **Extract Colors from Mockups:**
  ```bash
  python3 scripts/extract_project_colors.py
  ```
  Scans all mockup screenshots in `projects_images/images/<project_id>/`, filters noise and device bezels, calculates the dominant `primaryColor` and `secondaryColor`, and updates `src/data/decks/<project_id>.json` directly.

- **Apple Vision OCR Mockup Recognizer (macOS Native):**
  ```bash
  swift scripts/ocr_recognize_mockups.swift [optional_directory]
  ```
  Uses macOS native Apple Vision Neural Engine (`VNRecognizeTextRequest`) to read text inside phone/desktop screenshots to instantly identify unclassified app mockups without third-party dependencies.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React Icons, HTML2Canvas, JSZip
- **Backend:** Node.js, Express, File System (`fs/promises`), CORS
- **Typography:** Google Fonts (Plus Jakarta Sans, Outfit, Inter, Cabinet Grotesk, Space Grotesk, Poppins, JetBrains Mono)
- **Hardware Mockups:** SVG & CSS-based 3D hardware device frames with sub-pixel precision.

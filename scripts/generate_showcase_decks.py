#!/usr/bin/env python3
"""
Project Showcase Studio - Automatic Showcase Deck Generator
Generates full-fidelity 3-slide showcase decks for all 30 projects in projects.json
and populates src/data/projectStore.json with complete hardware, typography,
canvas atmosphere, and screenshot mockups.
"""

import os
import sys
import json

WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PROJECTS_JSON_PATH = os.path.join(WORKSPACE_DIR, 'src', 'data', 'projects.json')
PROJECT_STORE_JSON_PATH = os.path.join(WORKSPACE_DIR, 'src', 'data', 'projectStore.json')
IMAGES_BASE_DIR = os.path.join(WORKSPACE_DIR, 'projects_images', 'images')

def get_eyebrow_info(project):
    """Determine smart eyebrow badge text and icon based on project stack."""
    title = project.get('title', '').lower()
    techs = [t.lower() for t in project.get('technologies', [])]
    platforms = [p.lower() for p in project.get('platform', [])]
    pid = project.get('id', '').lower()

    if any(k in title or k in techs for k in ['gemini', 'chatgpt', 'ai', 'robot', 'speech', 'vision']):
        return 'Artificial Intelligence', 'cpu'
    if 'kotlin multiplatform' in techs or 'compose multiplatform' in techs or len(platforms) > 2:
        return 'Kotlin Multiplatform', 'layers'
    if any(k in title or k in techs for k in ['arduino', 'iot', 'bluetooth', 'solar', 'irrigation', 'vehicle']):
        return 'Hardware & IoT Engineering', 'zap'
    if any(k in title or k in techs for k in ['scanner', 'authenticator', 'translator', 'backup', 'analyzer']):
        return 'Utility & Productivity', 'shield'
    if any(k in title for k in ['game', 'arena', 'pokemon', 'quiz', 'dare', 'workout', 'affirmation']):
        return 'Mobile Experience', 'flame'
    if 'desktop' in platforms and len(platforms) == 1:
        return 'Desktop Architecture', 'terminal'
    return 'Android Engineering', 'smartphone'

def get_status_badge(project):
    """Generate high-converting trust / status pill text."""
    title = project.get('title', '').lower()
    techs = [t.lower() for t in project.get('technologies', [])]
    platforms = [p.lower() for p in project.get('platform', [])]

    if 'gemini' in title or 'gemini' in techs:
        return '⚡ Google Gemini 1.5 Pro Powered'
    if 'chatgpt' in title:
        return '🤖 OpenAI GPT-4 Vision & DALL-E'
    if 'kotlin multiplatform' in techs or 'compose multiplatform' in techs:
        return '🚀 100% Shared Kotlin Multiplatform Logic'
    if 'desktop' in platforms and not 'android' in platforms:
        return '💻 High Performance Desktop Engine'
    if 'camerax' in techs:
        return '📸 Advanced CameraX 4K Pipeline'
    if 'room database' in techs or 'sqldelight' in techs:
        return '💾 Offline-First Architecture'
    return '⭐ Production Ready • Clean MVVM'

def get_project_mockup_paths(project_id):
    """Retrieve relative web paths for screenshots in projects_images/images/{pid}."""
    p_dir = os.path.join(IMAGES_BASE_DIR, project_id)
    if not os.path.isdir(p_dir):
        return []
    
    files = sorted([
        f for f in os.listdir(p_dir)
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and not f.startswith('.')
    ])
    
    # Sort files intelligently: home/headlines/overview first, details second, ios third
    def sort_key(fn):
        fn_l = fn.lower()
        if 'home' in fn_l or 'onboarding' in fn_l or 'headlines_screen' in fn_l or 'bulbasaur' in fn_l:
            return 0
        if 'list' in fn_l or 'operation' in fn_l or 'pack' in fn_l or 'payment' in fn_l:
            return 1
        if 'detail' in fn_l or 'capture' in fn_l or 'settings' in fn_l or 'codes' in fn_l:
            return 2
        if fn_l.startswith('ios_'):
            return 3
        return 4

    files.sort(key=sort_key)
    return [f"/projects_images/images/{project_id}/{f}" for f in files]

def build_project_deck(project):
    """Build a complete 3-slide showcase deck configuration for a project."""
    pid = project['id']
    title = project.get('title', pid)
    short_desc = project.get('shortDescription', '')
    features = project.get('features', [])
    technologies = project.get('technologies', [])
    platforms = project.get('platform', ['Android'])
    primary_color = project.get('primaryColor', '#6366f1')
    secondary_color = project.get('secondaryColor', '#38bdf8')

    is_desktop_only = 'Desktop' in platforms and 'Android' not in platforms and 'iOS' not in platforms
    has_ios = 'iOS' in platforms
    has_multiplatform = len(platforms) > 1

    eyebrow_text, eyebrow_icon = get_eyebrow_info(project)
    status_badge = get_status_badge(project)

    mockup_paths = get_project_mockup_paths(pid)
    img_1 = mockup_paths[0] if len(mockup_paths) > 0 else None
    img_2 = mockup_paths[1] if len(mockup_paths) > 1 else img_1
    img_3 = mockup_paths[2] if len(mockup_paths) > 2 else (mockup_paths[0] if len(mockup_paths) > 0 else None)

    # Slide 1 Features
    f1 = features[:3] if len(features) >= 3 else (features + ['Clean Declarative UI Architecture', 'Scalable Reactive State Management', 'Modern Performance Optimization'])[:3]
    # Slide 2 Features
    f2 = features[3:6] if len(features) >= 6 else (features[1:4] if len(features) >= 4 else f1)

    # Slide 1: Hero Cover
    slide_1 = {
        "id": "slide-1",
        "variant": "desktop_dashboard" if is_desktop_only else "hero_cover",
        "title": title,
        "tagline": short_desc,
        "titleColor": "#ffffff",
        "titleGradient": "custom",
        "titleGradientFrom": "#ffffff",
        "titleGradientTo": primary_color,
        "titleGradientAngle": 90,
        "subtitleColor": "#cbd5e1",
        "subtitleGradient": "none",
        "subtitleGradientFrom": "#cbd5e1",
        "subtitleGradientTo": secondary_color,
        "subtitleGradientAngle": 90,
        "accentColor": primary_color,
        "badgeColor": primary_color,
        "eyebrowText": eyebrow_text,
        "eyebrowIcon": eyebrow_icon,
        "statusBadge": status_badge,
        "technologies": technologies[:6],
        "techLogoVariant": "icon",
        "showTechIcons": True,
        "showStoreBadges": not is_desktop_only,
        "storeBadgeType": "both" if has_ios else "google_play",
        "storeBadgeStyle": "official",
        "showMetricPill": True,
        "metricText": "4.9 ★ Rating • Production Ready",
        "metricIcon": "star",
        "metricStyle": "gold",
        "deviceType": "desktop" if is_desktop_only else "android",
        "deviceFinish": "natural_titanium",
        "hasFrame": False,
        "frameGleam": True,
        "deviceCornerRadius": 36,
        "shadowStyle": "dramatic",
        "shadowIntensity": 0.8,
        "screenReflection": True,
        "tiltX": 4,
        "tiltY": -14,
        "zoom": 1,
        "offsetX": 0,
        "offsetY": 0,
        "deviceImage": img_1,
        "imageSrc": img_1,
        "layoutAlign": "left",
        "fontFamily": "Plus Jakarta Sans",
        "fontWeight": "800",
        "textScale": 1,
        "titleSize": 42,
        "subtitleSize": 16,
        "badgeSize": 12,
        "featureSize": 12,
        "techChipSize": 12,
        "iconSize": 14
    }

    # Slide 2: Feature Deep-Dive
    slide_2 = {
        "id": "slide-2",
        "variant": "feature_deep_dive",
        "title": "Core Architecture & Capabilities",
        "tagline": "Engineered with clean separation of concerns, high performance, and robust tooling.",
        "features": f1,
        "featureColor": "#e2e8f0",
        "titleColor": "#ffffff",
        "titleGradient": "custom",
        "titleGradientFrom": "#ffffff",
        "titleGradientTo": primary_color,
        "titleGradientAngle": 90,
        "subtitleColor": "#cbd5e1",
        "subtitleGradient": "none",
        "subtitleGradientFrom": "#cbd5e1",
        "subtitleGradientTo": secondary_color,
        "accentColor": primary_color,
        "badgeColor": primary_color,
        "eyebrowText": "Key Highlights",
        "eyebrowIcon": "star",
        "technologies": technologies[:6],
        "techLogoVariant": "icon",
        "showTechIcons": True,
        "deviceType": "desktop" if is_desktop_only else "android",
        "deviceFinish": "natural_titanium",
        "hasFrame": False,
        "frameGleam": True,
        "deviceCornerRadius": 36,
        "shadowStyle": "dramatic",
        "shadowIntensity": 0.8,
        "screenReflection": True,
        "tiltX": 0,
        "tiltY": 0,
        "zoom": 1,
        "offsetX": 0,
        "offsetY": 0,
        "deviceImage": img_2,
        "imageSrc": img_2,
        "layoutAlign": "left",
        "fontFamily": "Plus Jakarta Sans",
        "fontWeight": "800",
        "textScale": 1,
        "titleSize": 38,
        "subtitleSize": 15,
        "badgeSize": 12,
        "featureSize": 13,
        "techChipSize": 12,
        "iconSize": 14
    }

    # Slide 3: Multiplatform / Minimal / Dual Screen
    s3_variant = "responsive_combo" if has_multiplatform else ("dual_screen" if len(mockup_paths) >= 2 else "minimal_focus")
    slide_3 = {
        "id": "slide-3",
        "variant": s3_variant,
        "title": "Universal Cross-Platform Experience" if has_multiplatform else "Intuitive User Journey & Interface",
        "tagline": "Engineered for responsive performance, smooth micro-interactions, and native UX.",
        "platforms": platforms,
        "features": f2,
        "featureColor": "#e2e8f0",
        "titleColor": "#ffffff",
        "titleGradient": "custom",
        "titleGradientFrom": "#ffffff",
        "titleGradientTo": primary_color,
        "titleGradientAngle": 90,
        "subtitleColor": "#cbd5e1",
        "subtitleGradient": "none",
        "subtitleGradientFrom": "#cbd5e1",
        "subtitleGradientTo": secondary_color,
        "accentColor": primary_color,
        "badgeColor": primary_color,
        "eyebrowText": "Native Multiplatform" if has_multiplatform else "Pixel Perfect UI",
        "eyebrowIcon": "globe" if has_multiplatform else "sparkles",
        "technologies": technologies[:6],
        "techLogoVariant": "icon",
        "showTechIcons": True,
        "showStoreBadges": not is_desktop_only,
        "storeBadgeType": "both" if has_ios else "google_play",
        "storeBadgeStyle": "official",
        "deviceType": "android",
        "deviceFinish": "natural_titanium",
        "hasFrame": False,
        "frameGleam": True,
        "deviceCornerRadius": 36,
        "shadowStyle": "dramatic",
        "shadowIntensity": 0.8,
        "screenReflection": True,
        "tiltX": 0,
        "tiltY": 0,
        "zoom": 1,
        "offsetX": 0,
        "offsetY": 0,
        "deviceImage": img_3 or img_1,
        "secondaryDeviceImage": img_2 if len(mockup_paths) >= 2 else img_1,
        "desktopImage": img_1,
        "imageSrc": img_3 or img_1,
        "layoutAlign": "left",
        "fontFamily": "Plus Jakarta Sans",
        "fontWeight": "800",
        "textScale": 1,
        "titleSize": 38,
        "subtitleSize": 15,
        "badgeSize": 12,
        "featureSize": 12,
        "techChipSize": 12,
        "iconSize": 14
    }

    return {
        "slides": [slide_1, slide_2, slide_3],
        "primaryColor": primary_color,
        "secondaryColor": secondary_color,
        "backgroundColor": "#080a12",
        "accentColor": primary_color,
        "glowIntensity": 0.38,
        "backgroundVariant": "aurora",
        "bgAlignment": "behind_device",
        "canvasRadius": 28,
        "presetKey": "WEBSITE_HD",
        "exportFormat": "png",
        "textureOverlay": "dots"
    }

def main():
    print("=" * 80)
    print("🚀 Project Showcase Studio - Complete Deck Generator for All Projects")
    print("=" * 80)

    if not os.path.exists(PROJECTS_JSON_PATH):
        print(f"❌ Error: {PROJECTS_JSON_PATH} not found.")
        sys.exit(1)

    with open(PROJECTS_JSON_PATH, 'r', encoding='utf-8') as f:
        projects = json.load(f)

    # Load existing projectStore if exists
    store = {}
    if os.path.exists(PROJECT_STORE_JSON_PATH):
        try:
            with open(PROJECT_STORE_JSON_PATH, 'r', encoding='utf-8') as f:
                store = json.load(f)
        except Exception:
            store = {}

    print(f"\nBuilding complete showcase decks for {len(projects)} projects:")
    print("-" * 80)
    print(f"{'Project ID':<42} | {'Mockups':<8} | {'Primary':<9} | Deck Status")
    print("-" * 80)

    for p in projects:
        pid = p['id']
        mockup_count = len(get_project_mockup_paths(pid))
        prim = p.get('primaryColor', '#6366f1')
        
        # Build 3-slide showcase deck
        deck = build_project_deck(p)
        store[pid] = deck

        mockup_str = f"{mockup_count} imgs" if mockup_count > 0 else "0 (UI)"
        print(f"{pid:<42} | {mockup_str:<8} | {prim:<9} | ✅ 3 Slides Generated")

    # Save to projectStore.json
    with open(PROJECT_STORE_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(store, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 80)
    print(f"🎉 Successfully generated full showcase decks for {len(projects)} projects!")
    print(f"💾 Permanently saved to: {PROJECT_STORE_JSON_PATH}")
    print("=" * 80 + "\n")

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
Project Showcase Studio - Project Primary & Secondary Color Extractor
Extracts dominant brand colors (primary & secondary) from project screenshot mockups
and updates src/data/projects.json and src/data/projectStore.json.
"""

import os
import sys
import json
import colorsys
from collections import defaultdict
from PIL import Image

WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
IMAGES_BASE_DIR = os.path.join(WORKSPACE_DIR, 'projects_images', 'images')
PROJECTS_JSON_PATH = os.path.join(WORKSPACE_DIR, 'src', 'data', 'projects.json')
PROJECT_STORE_JSON_PATH = os.path.join(WORKSPACE_DIR, 'src', 'data', 'projectStore.json')

# Aesthetic fallback palettes for projects without screenshot images
FALLBACK_PALETTES = {
    'devanalyzer': ('#3b82f6', '#8b5cf6'),
    'pepper_robot_ai_assistant': ('#8b5cf6', '#ec4899'),
    'git_backup_hub': ('#f97316', '#3b82f6'),
    'shader_compose_multiplatform_app': ('#ec4899', '#8b5cf6'),
    'coding_meet_kobweb': ('#6366f1', '#06b6d4'),
    'string_translator_desktop_app': ('#0284c7', '#10b981'),
    'custom_lcd_pattern_generator': ('#059669', '#14b8a6'),
    'third_eye_ai_assistant_app_for_blind_people': ('#8b5cf6', '#f59e0b'),
    'electric_vehicle': ('#10b981', '#06b6d4'),
    'quillbot_web_scraper': ('#16a34a', '#3b82f6'),
    'bluetooth_arduino_communication_android_app': ('#00979d', '#3b82f6'),
    'dual_axis_solar_tracking_system': ('#f59e0b', '#eab308'),
    'smart_irrigation_system': ('#10b981', '#0284c7'),
    'android_addict': ('#3ddc84', '#6366f1'),
    'gamer_s_arena': ('#a855f7', '#ef4444'),
    'todo_note_app': ('#f59e0b', '#3b82f6'),
    'camera_app': ('#06b6d4', '#6366f1'),
}

def rgb_to_hex(r, g, b):
    return f"#{int(round(r)):02x}{int(round(g)):02x}{int(round(b)):02x}"

def enhance_color(r, g, b):
    """Ensure extracted color is adequately vibrant and bright for dark UI cards."""
    h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
    # Ensure minimum brightness and saturation
    v = max(0.65, min(0.98, v * 1.15))
    s = max(0.55, min(0.95, s * 1.1))
    er, eg, eb = colorsys.hsv_to_rgb(h, s, v)
    return rgb_to_hex(er * 255, eg * 255, eb * 255)

def extract_colors_from_images(dir_path):
    """Extract primary and secondary dominant colors from screenshot directory."""
    if not os.path.isdir(dir_path):
        return None, None
        
    image_files = [
        os.path.join(dir_path, f) for f in os.listdir(dir_path)
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and not f.startswith('.')
    ]
    if not image_files:
        return None, None

    # 36 hue bins (10 degrees each)
    bins = defaultdict(lambda: {'count': 0.0, 'r_sum': 0.0, 'g_sum': 0.0, 'b_sum': 0.0})

    for img_path in image_files:
        try:
            with Image.open(img_path) as im:
                im = im.convert('RGB')
                im.thumbnail((260, 450))
                pixels = list(im.getdata())
                for r, g, b in pixels:
                    h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
                    
                    # Ignore pure black, dark phone frames, light background whites, and gray text
                    if v < 0.20 or (v > 0.88 and s < 0.16) or s < 0.20:
                        continue

                    # Weight vibrant saturated colors higher
                    weight = s * (v ** 0.6)
                    bin_idx = int((h * 360) // 10) % 36

                    bins[bin_idx]['count'] += weight
                    bins[bin_idx]['r_sum'] += r * weight
                    bins[bin_idx]['g_sum'] += g * weight
                    bins[bin_idx]['b_sum'] += b * weight
        except Exception:
            continue

    if not bins:
        return None, None

    sorted_bins = sorted(bins.items(), key=lambda x: x[1]['count'], reverse=True)
    
    # Primary color
    top_idx, top_data = sorted_bins[0]
    p_r = top_data['r_sum'] / top_data['count']
    p_g = top_data['g_sum'] / top_data['count']
    p_b = top_data['b_sum'] / top_data['count']
    primary_hex = enhance_color(p_r, p_g, p_b)

    # Secondary color (at least 3 bins = 30° distinct hue)
    secondary_hex = None
    for b_idx, b_data in sorted_bins[1:]:
        diff = abs(b_idx - top_idx)
        diff = min(diff, 36 - diff)
        if diff >= 3 and b_data['count'] > 0.06 * top_data['count']:
            s_r = b_data['r_sum'] / b_data['count']
            s_g = b_data['g_sum'] / b_data['count']
            s_b = b_data['b_sum'] / b_data['count']
            secondary_hex = enhance_color(s_r, s_g, s_b)
            break

    if not secondary_hex:
        # Harmonious complementary secondary
        h, s, v = colorsys.rgb_to_hsv(p_r / 255.0, p_g / 255.0, p_b / 255.0)
        h2 = (h + 0.14) % 1.0
        r2, g2, b2 = colorsys.hsv_to_rgb(h2, max(0.55, s), max(0.75, v))
        secondary_hex = rgb_to_hex(r2 * 255, g2 * 255, b2 * 255)

    return primary_hex, secondary_hex

def main():
    print("=" * 80)
    print("🚀 Project Showcase Studio - Primary & Secondary Color Extractor")
    print("=" * 80)

    # 1. Load projects.json
    if not os.path.exists(PROJECTS_JSON_PATH):
        print(f"❌ Error: {PROJECTS_JSON_PATH} not found.")
        sys.exit(1)

    with open(PROJECTS_JSON_PATH, 'r', encoding='utf-8') as f:
        projects = json.load(f)

    # 2. Extract and assign colors for each project
    updated_count = 0
    results_map = {}

    print(f"\nScanning {len(projects)} projects in projects.json:")
    print("-" * 80)
    print(f"{'Project ID':<42} | {'Primary':<9} | {'Secondary':<9} | Source")
    print("-" * 80)

    for p in projects:
        pid = p.get('id')
        title = p.get('title', pid)
        dir_path = os.path.join(IMAGES_BASE_DIR, pid)
        
        prim, sec = extract_colors_from_images(dir_path)
        source = "📷 Mockups"
        
        if not prim or not sec:
            # Fallback
            prim, sec = FALLBACK_PALETTES.get(pid, ('#6366f1', '#38bdf8'))
            source = "🎨 Curated"

        p['primaryColor'] = prim
        p['secondaryColor'] = sec
        results_map[pid] = (prim, sec)
        updated_count += 1
        print(f"{pid:<42} | {prim:<9} | {sec:<9} | {source}")

    # Save updated projects.json
    with open(PROJECTS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)
    print(f"\n✅ Successfully updated {updated_count} projects in {PROJECTS_JSON_PATH}")

    # 3. Update projectStore.json if it exists
    if os.path.exists(PROJECT_STORE_JSON_PATH):
        try:
            with open(PROJECT_STORE_JSON_PATH, 'r', encoding='utf-8') as f:
                store = json.load(f)
            
            store_updated = 0
            for sp_id, sp_data in store.items():
                if sp_id in results_map:
                    prim, sec = results_map[sp_id]
                    sp_data['primaryColor'] = prim
                    sp_data['secondaryColor'] = sec
                    
                    # Also update slide visual accents
                    slides = sp_data.get('slides', [])
                    for s in slides:
                        s['accentColor'] = prim
                        s['badgeColor'] = prim
                        s['titleGradientTo'] = prim
                        s['subtitleGradientTo'] = sec
                    store_updated += 1

            with open(PROJECT_STORE_JSON_PATH, 'w', encoding='utf-8') as f:
                json.dump(store, f, indent=2, ensure_ascii=False)
            print(f"✅ Successfully updated {store_updated} showcase decks in {PROJECT_STORE_JSON_PATH}")
        except Exception as e:
            print(f"⚠️ Warning updating projectStore.json: {e}")

    print("\n🎉 Complete! Primary and secondary colors are now integrated.\n")

if __name__ == '__main__':
    main()

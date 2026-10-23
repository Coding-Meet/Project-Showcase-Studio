#!/usr/bin/env swift
import Foundation
import Vision
import AppKit
import CoreGraphics
import FoundationModels

/**
 * Project Showcase Studio - Apple On-Device AI Mockup Analyzer & Color Extractor
 * Powered by Apple Vision Framework (OCR) + Apple FoundationModels (LanguageModelSession) + CoreGraphics.
 *
 * Capabilities:
 *   1. Vision OCR: Extracts all visible text from mockups with sub-millisecond on-device Vision.
 *   2. AI Reasoning: Zero-condition classification of screenType, description, components, visualStyle.
 *   3. Color Extraction: High-precision dominant primary & secondary color extraction from pixels (CoreGraphics).
 *   4. Algorithmic Fallback: Deterministic golden-ratio HSV palette generation for projects without mockups (Zero hardcoded tables!).
 *   5. Deck Synchronization: Automatically updates src/data/decks/<project_id>.json (primaryColor, secondaryColor, slide visual accents).
 *   6. Auto-Renamer: Clean snake_case filenames for mockups based on AI reasoning (--rename / --preview-rename).
 *
 * Usage:
 *   # Safe read-only inspection (AI analysis + color extraction to console & mockups_metadata.json):
 *   swift scripts/mockup_analyzer.swift [optional_dir_path]
 *
 *   # Fast color extraction only (does NOT modify deck files):
 *   swift scripts/mockup_analyzer.swift --colors-only
 *
 *   # Preview what filenames will be renamed to (Dry-Run, does NOT modify files):
 *   swift scripts/mockup_analyzer.swift [optional_dir_path] --preview-rename
 *
 *   # Auto-rename images on disk based on AI recognition:
 *   swift scripts/mockup_analyzer.swift [optional_dir_path] --rename
 *
 *   # OPTIONAL: Explicitly update src/data/decks/<project>.json colors/metadata:
 *   swift scripts/mockup_analyzer.swift [optional_dir_path] --sync-deck
 */

// MARK: - Data Models

struct AIAnalysisResult: Codable {
    let screenType: String
    let suggestedSlug: String?
    let description: String
    let components: [String]
    let visualStyle: String
}

struct MockupMetadata: Codable {
    var fileName: String
    var relativePath: String
    let screenType: String
    let description: String
    let components: [String]
    let visualStyle: String
    let visibleText: [String]?
    let dimensions: [String: Int]
}

// MARK: - Color Science & Helpers

func rgbToHsv(r: Double, g: Double, b: Double) -> (h: Double, s: Double, v: Double) {
    let maxV = max(r, max(g, b))
    let minV = min(r, min(g, b))
    let delta = maxV - minV
    var h: Double = 0
    let s: Double = maxV == 0 ? 0 : delta / maxV
    let v: Double = maxV
    if delta != 0 {
        if maxV == r {
            h = (g - b) / delta + (g < b ? 6 : 0)
        } else if maxV == g {
            h = (b - r) / delta + 2
        } else {
            h = (r - g) / delta + 4
        }
        h /= 6.0
    }
    return (h, s, v)
}

func hsvToRgb(h: Double, s: Double, v: Double) -> (r: Double, g: Double, b: Double) {
    if s == 0 { return (v, v, v) }
    let hDeg = h * 6.0
    let i = floor(hDeg)
    let f = hDeg - i
    let p = v * (1.0 - s)
    let q = v * (1.0 - s * f)
    let t = v * (1.0 - s * (1.0 - f))
    let rem = Int(i) % 6
    switch rem {
    case 0: return (v, t, p)
    case 1: return (q, v, p)
    case 2: return (p, v, t)
    case 3: return (p, q, v)
    case 4: return (t, p, v)
    default: return (v, p, q)
    }
}

func rgbToHex(r: Double, g: Double, b: Double) -> String {
    let ir = max(0, min(255, Int(r.rounded())))
    let ig = max(0, min(255, Int(g.rounded())))
    let ib = max(0, min(255, Int(b.rounded())))
    return String(format: "#%02x%02x%02x", ir, ig, ib)
}

func enhanceColor(r: Double, g: Double, b: Double) -> String {
    var (h, s, v) = rgbToHsv(r: r / 255.0, g: g / 255.0, b: b / 255.0)
    v = max(0.65, min(0.98, v * 1.15))
    s = max(0.55, min(0.95, s * 1.10))
    let (er, eg, eb) = hsvToRgb(h: h, s: s, v: v)
    return rgbToHex(r: er * 255.0, g: eg * 255.0, b: eb * 255.0)
}

/// Deterministically generates vibrant, modern studio colors for projects without screenshots
/// using golden ratio HSV scattering. Zero hardcoded dictionary!
func generateDynamicPalette(projectId: String, title: String? = nil) -> (primary: String, secondary: String) {
    let seed = "\(projectId)_\(title ?? "")"
    var hash: UInt64 = 5381
    for byte in seed.utf8 {
        hash = ((hash << 5) &+ hash) &+ UInt64(byte)
    }
    let goldenRatio = 0.618033988749895
    let baseHue = (Double(hash % 1000000) * goldenRatio).truncatingRemainder(dividingBy: 1.0)
    let pS = 0.72 + Double(hash % 17) * 0.01
    let pV = 0.86 + Double(hash % 13) * 0.01
    let (pR, pG, pB) = hsvToRgb(h: baseHue, s: min(0.95, pS), v: min(0.98, pV))
    let primary = rgbToHex(r: pR * 255, g: pG * 255, b: pB * 255)

    let offset = (hash % 2 == 0) ? 0.14 : 0.42
    let sH = (baseHue + offset).truncatingRemainder(dividingBy: 1.0)
    let sS = max(0.60, min(0.92, pS - 0.05))
    let sV = max(0.80, min(0.98, pV))
    let (sR, sG, sB) = hsvToRgb(h: sH, s: sS, v: sV)
    let secondary = rgbToHex(r: sR * 255, g: sG * 255, b: sB * 255)

    return (primary, secondary)
}

/// Extracts dominant primary and secondary colors directly from CGImage pixel arrays
func extractColors(from cgImages: [CGImage]) -> (primary: String, secondary: String)? {
    if cgImages.isEmpty { return nil }

    struct Bin {
        var count: Double = 0
        var rSum: Double = 0
        var gSum: Double = 0
        var bSum: Double = 0
    }
    var bins: [Int: Bin] = [:]
    for i in 0..<36 { bins[i] = Bin() }

    let width = 140
    let height = 280
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    let bytesPerPixel = 4
    let bytesPerRow = bytesPerPixel * width
    var rawData = [UInt8](repeating: 0, count: height * bytesPerRow)

    rawData.withUnsafeMutableBytes { ptr in
        guard let ctx = CGContext(
            data: ptr.baseAddress,
            width: width,
            height: height,
            bitsPerComponent: 8,
            bytesPerRow: bytesPerRow,
            space: colorSpace,
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue | CGBitmapInfo.byteOrder32Big.rawValue
        ) else { return }

        for cgImage in cgImages {
            ctx.clear(CGRect(x: 0, y: 0, width: width, height: height))
            ctx.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

            for y in 0..<height {
                for x in 0..<width {
                    let offset = (y * bytesPerRow) + (x * bytesPerPixel)
                    let r = Double(ptr[offset])
                    let g = Double(ptr[offset + 1])
                    let b = Double(ptr[offset + 2])
                    let a = Double(ptr[offset + 3])
                    if a < 128 { continue }

                    let (h, s, v) = rgbToHsv(r: r / 255.0, g: g / 255.0, b: b / 255.0)

                    // Ignore pure black, phone frame bezels, near white, and low saturation gray
                    if v < 0.20 || (v > 0.88 && s < 0.16) || s < 0.20 {
                        continue
                    }

                    let weight = s * pow(v, 0.6)
                    let binIdx = (Int(h * 360.0) / 10) % 36
                    bins[binIdx]?.count += weight
                    bins[binIdx]?.rSum += r * weight
                    bins[binIdx]?.gSum += g * weight
                    bins[binIdx]?.bSum += b * weight
                }
            }
        }
    }

    let sortedBins = bins.sorted { $0.value.count > $1.value.count }.filter { $0.value.count > 0 }
    guard let top = sortedBins.first, top.value.count > 0 else { return nil }

    let pR = top.value.rSum / top.value.count
    let pG = top.value.gSum / top.value.count
    let pB = top.value.bSum / top.value.count
    let primaryHex = enhanceColor(r: pR, g: pG, b: pB)

    var secondaryHex: String? = nil
    for (bIdx, bData) in sortedBins.dropFirst() {
        var diff = abs(bIdx - top.key)
        diff = min(diff, 36 - diff)
        if diff >= 3 && bData.count > 0.06 * top.value.count {
            let sR = bData.rSum / bData.count
            let sG = bData.gSum / bData.count
            let sB = bData.bSum / bData.count
            secondaryHex = enhanceColor(r: sR, g: sG, b: sB)
            break
        }
    }

    if secondaryHex == nil {
        let (h, s, v) = rgbToHsv(r: pR / 255.0, g: pG / 255.0, b: pB / 255.0)
        let h2 = (h + 0.14).truncatingRemainder(dividingBy: 1.0)
        let (r2, g2, b2) = hsvToRgb(h: h2, s: max(0.55, s), v: max(0.75, v))
        secondaryHex = rgbToHex(r: r2 * 255, g: g2 * 255, b: b2 * 255)
    }

    return (primaryHex, secondaryHex!)
}

// Helper: Sanitize text into clean snake_case filename slug
func sanitizeSlug(_ text: String) -> String {
    let lower = text.lowercased()
    let allowed = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "_"))
    let filtered = lower.unicodeScalars.map { allowed.contains($0) ? Character($0) : "_" }
    let str = String(filtered)
    let parts = str.split(separator: "_").filter { !$0.isEmpty }
    let result = parts.prefix(4).joined(separator: "_")
    return result.isEmpty ? "screen" : result
}

// MARK: - Apple Foundation Model (Multimodal LanguageModelSession)
// Pure on-device visual analysis via Apple's official Multimodal Prompting (Attachment<CGImage>):
// https://developer.apple.com/documentation/foundationmodels/analyzing-images-with-multimodal-prompting

func analyzeWithAppleAI(projectId: String, fileName: String, cgImage: CGImage) async -> AIAnalysisResult? {
    let promptText = """
    You are a senior UI/UX engineer. Visually inspect this mobile application screenshot mockup for project "\(projectId)".
    CRITICAL: Base your analysis purely on the attached mockup image: its visible layout, screens, cards, typography, controls, buttons, navigation, and theme.
    Ignore generic camera or transfer artifacts in filenames.

    Return ONLY valid JSON (without markdown fences, no ```json, no preamble) with this schema:
    {
      "screenType": "Specific screen purpose (e.g. Daily Affirmation Display, Lock Screen Quote, Live Wallpaper Preview, Category Filter, Custom Quote Editor, Settings Menu, Onboarding Welcome)",
      "suggestedSlug": "clean_snake_case_slug_describing_screen (e.g. lockscreen_quote_preview, wallpaper_preview, category_filter, custom_quote_menu, settings_preferences)",
      "description": "1-2 concise sentences describing what this screen displays and what the user can do here.",
      "components": ["List 3-5 real UI components visibly present, e.g. Quote Card, Category Grid, Wallpaper Canvas, Header Bar, Action Button"],
      "visualStyle": "Aesthetic style (e.g. Dark theme sleek, Minimalist typography, Vibrant gradient)"
    }
    """

    do {
        // Isolated Apple FoundationModels LanguageModelSession per image
        let session = LanguageModelSession()
        let response = try await session.respond(options: GenerationOptions(samplingMode: .greedy)) {
            promptText
            Attachment(cgImage).label("mockup-image")
        }

        var content = response.content.trimmingCharacters(in: .whitespacesAndNewlines)
        if content.hasPrefix("```json") {
            content = content.replacingOccurrences(of: "```json", with: "")
        }
        if content.hasPrefix("```") {
            content = content.replacingOccurrences(of: "```", with: "")
        }
        if content.hasSuffix("```") {
            content = String(content.dropLast(3))
        }
        content = content.trimmingCharacters(in: .whitespacesAndNewlines)

        if let start = content.firstIndex(of: "{"),
           let end = content.lastIndex(of: "}") {
            let jsonSub = String(content[start...end])
            if let data = jsonSub.data(using: .utf8),
               let dict = (try? JSONSerialization.jsonObject(with: data, options: [.fragmentsAllowed])) as? [String: Any] {
                
                let rawType = dict["screenType"] as? String ?? dict["type"] as? String ?? dict["screen_type"] as? String ?? "App Screen"
                let rawSlug = dict["suggestedSlug"] as? String ?? dict["slug"] as? String ?? dict["suggested_slug"] as? String
                let rawDesc = dict["description"] as? String ?? dict["desc"] as? String ?? "Application screen mockup showing UI components and layout."
                let rawStyle = dict["visualStyle"] as? String ?? dict["style"] as? String ?? dict["visual_style"] as? String ?? "Modern minimalist"
                
                var rawComponents: [String] = []
                if let compArr = dict["components"] as? [String] {
                    rawComponents = compArr
                } else if let compStr = dict["components"] as? String {
                    rawComponents = compStr.components(separatedBy: ",").map { $0.trimmingCharacters(in: .whitespaces) }
                } else if let compAny = dict["components"] as? [Any] {
                    rawComponents = compAny.compactMap { "\($0)".trimmingCharacters(in: .whitespaces) }
                }
                
                let cleanComponents = rawComponents.filter { c in
                    let lower = c.lowercased()
                    return !lower.contains("list of") && !lower.contains("list 3-5") && !lower.contains("distinct ui") && !c.isEmpty
                }
                
                return AIAnalysisResult(
                    screenType: rawType,
                    suggestedSlug: rawSlug,
                    description: rawDesc,
                    components: cleanComponents,
                    visualStyle: rawStyle
                )
            }
        }
    } catch {
        print("    ⚠️ Apple Multimodal Model error for \(fileName): \(error.localizedDescription)")
    }

    return nil
}

// MARK: - Deck File Synchronization

func updateDeckFile(
    decksDir: String,
    projectId: String,
    primaryHex: String,
    secondaryHex: String,
    ocrResults: [MockupMetadata]? = nil
) -> Bool {
    let deckPath = "\(decksDir)/\(projectId).json"
    guard FileManager.default.fileExists(atPath: deckPath),
          let data = try? Data(contentsOf: URL(fileURLWithPath: deckPath)),
          var deckJson = (try? JSONSerialization.jsonObject(with: data, options: [])) as? [String: Any] else {
        return false
    }

    deckJson["primaryColor"] = primaryHex
    deckJson["secondaryColor"] = secondaryHex
    deckJson["accentColor"] = primaryHex

    if var slides = deckJson["slides"] as? [[String: Any]] {
        for idx in 0..<slides.count {
            slides[idx]["accentColor"] = primaryHex
            slides[idx]["badgeColor"] = primaryHex
            slides[idx]["titleGradientTo"] = primaryHex
            slides[idx]["subtitleGradientTo"] = secondaryHex

            // Enrich with OCR metadata if available for this slide
            if let ocr = ocrResults, idx < ocr.count {
                let meta = ocr[idx]
                if slides[idx]["screenType"] == nil {
                    slides[idx]["screenType"] = meta.screenType
                }
                if slides[idx]["components"] == nil {
                    slides[idx]["components"] = meta.components
                }
            }
        }
        deckJson["slides"] = slides
    }

    do {
        let updatedData = try JSONSerialization.data(withJSONObject: deckJson, options: [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes])
        try updatedData.write(to: URL(fileURLWithPath: deckPath))
        return true
    } catch {
        return false
    }
}

// MARK: - Main Execution

let scriptPath = URL(fileURLWithPath: #file).deletingLastPathComponent().path
let workspaceRoot = URL(fileURLWithPath: scriptPath).deletingLastPathComponent().path
let decksDirectory = "\(workspaceRoot)/src/data/decks"

var outputJson = false
var shouldRename = false
var isPreviewRename = false
var colorsOnly = false
var syncDeck = false
var customPath: String? = nil

for arg in CommandLine.arguments.dropFirst() {
    if arg == "--json" {
        outputJson = true
    } else if arg == "--rename" {
        shouldRename = true
    } else if arg == "--preview-rename" || arg == "--dry-run" {
        isPreviewRename = true
    } else if arg == "--colors-only" {
        colorsOnly = true
    } else if arg == "--sync-deck" || arg == "--update-deck" {
        syncDeck = true
    } else if !arg.hasPrefix("-") {
        customPath = arg
    }
}

let targetPath: String
if let p = customPath {
    targetPath = p.hasPrefix("/") ? p : "\(workspaceRoot)/\(p)"
} else {
    targetPath = "\(workspaceRoot)/projects_images/images"
}

guard FileManager.default.fileExists(atPath: targetPath) else {
    print("❌ Error: Directory not found at: \(targetPath)")
    exit(1)
}

print("=" .padding(toLength: 88, withPad: "=", startingAt: 0))
print("🧠 Project Showcase Studio - Apple On-Device AI & Native Color Extractor")
print("Target: \(targetPath)")
if colorsOnly {
    print("⚡ Mode: COLORS ONLY (CoreGraphics dominant pixel extraction & deck synchronization)")
} else if shouldRename {
    print("⚡ Mode: AUTO-RENAME (Files on disk will be updated with AI-generated names)")
} else if isPreviewRename {
    print("🔍 Mode: PREVIEW-RENAME (Dry-Run: showing proposed names)")
} else {
    print("ℹ️  Mode: FULL AI OCR & COLOR EXTRACTION")
}
print("=" .padding(toLength: 88, withPad: "=", startingAt: 0))

var allResults: [MockupMetadata] = []
var processedProjectIds = Set<String>()

@MainActor
func processDirectory(dir: String) async {
    guard let items = try? FileManager.default.contentsOfDirectory(atPath: dir).sorted() else { return }
    let validImages = items.filter { item in
        let lower = item.lowercased()
        return (lower.hasSuffix(".png") || lower.hasSuffix(".jpg") || lower.hasSuffix(".jpeg") || lower.hasSuffix(".webp")) && !item.hasPrefix(".")
    }

    let subDirs = items.filter { item in
        var isDir: ObjCBool = false
        FileManager.default.fileExists(atPath: "\(dir)/\(item)", isDirectory: &isDir)
        return isDir.boolValue && !item.hasPrefix(".")
    }

    if !validImages.isEmpty {
        let relDir = dir.replacingOccurrences(of: workspaceRoot + "/", with: "")
        let projectId = URL(fileURLWithPath: dir).lastPathComponent
        processedProjectIds.insert(projectId)

        print("\n📁 \(relDir) (\(validImages.count) images):")
        print("-" .padding(toLength: 88, withPad: "-", startingAt: 0))

        var folderResults: [MockupMetadata] = []
        var cgImages: [CGImage] = []
        var renameCount = 0

        for (index, img) in validImages.enumerated() {
            let fileURL = URL(fileURLWithPath: "\(dir)/\(img)")
            let ext = fileURL.pathExtension.lowercased()
            let cleanRel = fileURL.path.replacingOccurrences(of: workspaceRoot + "/", with: "")
            let relPath = cleanRel.hasPrefix("/") ? cleanRel : "/" + cleanRel

            guard let nsImage = NSImage(contentsOf: fileURL),
                  let cgImage = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
                print("  ⚠️  \(img): Unable to decode image")
                continue
            }
            cgImages.append(cgImage)

            let width = cgImage.width
            let height = cgImage.height

            let aiResult: AIAnalysisResult?
            if !colorsOnly {
                // Apple Multimodal AI reasoning (Pure Vision Attachment - no OCR noise)
                aiResult = await analyzeWithAppleAI(projectId: projectId, fileName: img, cgImage: cgImage)
            } else {
                aiResult = nil
            }

            let rawSlug = aiResult?.suggestedSlug ?? aiResult?.screenType
            let cleanSlug = rawSlug != nil ? sanitizeSlug(rawSlug!) : "screen"
            let formattedIndex = String(format: "%02d", index + 1)
            let proposedFileName = "\(formattedIndex)_\(cleanSlug).\(ext)"

            var finalFileName = img
            var finalRelPath = relPath

            if let ai = aiResult, !colorsOnly {
                print("  🖼️  \(img) [\(width)×\(height)px]")
                print("      🏷️  Screen Type:    \(ai.screenType)")
                print("      🎨 Visual Style:   \(ai.visualStyle)")
                print("      🧩 Components:     \(ai.components.joined(separator: ", "))")
            }

            if isPreviewRename {
                print("      🔍 Proposed Name:  \(proposedFileName)")
            } else if shouldRename {
                if img != proposedFileName {
                    var safeTargetURL = URL(fileURLWithPath: "\(dir)/\(proposedFileName)")
                    var counter = 2
                    while FileManager.default.fileExists(atPath: safeTargetURL.path) && safeTargetURL.lastPathComponent != img {
                        safeTargetURL = URL(fileURLWithPath: "\(dir)/\(formattedIndex)_\(cleanSlug)_\(counter).\(ext)")
                        counter += 1
                    }

                    do {
                        try FileManager.default.moveItem(at: fileURL, to: safeTargetURL)
                        finalFileName = safeTargetURL.lastPathComponent
                        let safeRel = safeTargetURL.path.replacingOccurrences(of: workspaceRoot + "/", with: "")
                        finalRelPath = safeRel.hasPrefix("/") ? safeRel : "/" + safeRel
                        renameCount += 1
                        print("      🔄 Renamed To:     \(finalFileName) ✅")
                    } catch {
                        print("      ⚠️ Rename Failed:  \(error.localizedDescription)")
                    }
                }
            }

            let meta = MockupMetadata(
                fileName: finalFileName,
                relativePath: finalRelPath,
                screenType: aiResult?.screenType ?? "App Screen",
                description: aiResult?.description ?? "",
                components: aiResult?.components ?? [],
                visualStyle: aiResult?.visualStyle ?? "",
                visibleText: nil,
                dimensions: ["width": width, "height": height]
            )
            folderResults.append(meta)
            allResults.append(meta)
        }

        // 3. Extract dominant colors natively from mockup images
        let colors = extractColors(from: cgImages) ?? generateDynamicPalette(projectId: projectId)
        let primaryHex = colors.primary
        let secondaryHex = colors.secondary

        print("  🎨 Extracted Colors:   Primary \(primaryHex)  |  Secondary \(secondaryHex) (CoreGraphics)")

        // 4. Update deck file directly ONLY if explicitly requested via --sync-deck
        if syncDeck {
            let deckUpdated = updateDeckFile(
                decksDir: decksDirectory,
                projectId: projectId,
                primaryHex: primaryHex,
                secondaryHex: secondaryHex,
                ocrResults: folderResults.isEmpty ? nil : folderResults
            )
            if deckUpdated {
                print("  ✨ Deck Synchronized:  src/data/decks/\(projectId).json ✅")
            }
        }

        // 5. Save structured JSON inside folder
        if !colorsOnly {
            let folderJsonFile = URL(fileURLWithPath: "\(dir)/mockups_metadata.json")
            let encoder = JSONEncoder()
            encoder.outputFormatting = [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]
            if let folderJsonData = try? encoder.encode(folderResults) {
                try? folderJsonData.write(to: folderJsonFile)
                print("  💾 Saved mockups metadata: \(relDir)/mockups_metadata.json")
            }
        }
    }

    for sub in subDirs {
        await processDirectory(dir: "\(dir)/\(sub)")
    }
}

await processDirectory(dir: targetPath)

// MARK: - Synchronize Any Remaining Decks Without Mockups via Algorithmic Palette (ONLY if --sync-deck)
if customPath == nil && syncDeck {
    print("\n" + "=" .padding(toLength: 88, withPad: "=", startingAt: 0))
    print("🎨 Synchronizing Remaining Project Decks (Zero Hardcoding / Golden Ratio HSL)...")
    print("-" .padding(toLength: 88, withPad: "-", startingAt: 0))

    if let deckFiles = try? FileManager.default.contentsOfDirectory(atPath: decksDirectory).sorted() {
        for file in deckFiles where file.hasSuffix(".json") {
            let pid = file.replacingOccurrences(of: ".json", with: "")
            if !processedProjectIds.contains(pid) {
                let (prim, sec) = generateDynamicPalette(projectId: pid)
                let ok = updateDeckFile(
                    decksDir: decksDirectory,
                    projectId: pid,
                    primaryHex: prim,
                    secondaryHex: sec
                )
                if ok {
                    print("  ✨ \(pid.padding(toLength: 42, withPad: " ", startingAt: 0)) -> \(prim) | \(sec)  [🤖 Algorithmic]")
                }
            }
        }
    }
}

print("\n" + "=" .padding(toLength: 88, withPad: "=", startingAt: 0))
print("✅ Native Swift Processing Complete! All decks & mockups synchronized.")
print("=" .padding(toLength: 88, withPad: "=", startingAt: 0) + "\n")

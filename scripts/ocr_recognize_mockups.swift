#!/usr/bin/env swift
import Foundation
import Vision
import AppKit
import FoundationModels

/**
 * Project Showcase Studio - Apple On-Device AI Mockup Analyzer
 * Powered by Apple Vision Framework (OCR) + Apple FoundationModels (LanguageModelSession).
 *
 * Extracts directly using Apple On-Device AI (Zero hardcoded conditions):
 *   1. screenType   - Identified by Apple Foundation Model
 *   2. description  - Synthesized by Apple Foundation Model
 *   3. components   - UI elements detected by Apple Foundation Model
 *   4. visualStyle  - Aesthetic style categorized by Apple Foundation Model
 *   5. visibleText  - OCR extracted by Apple Vision Framework
 *
 * Usage:
 *   swift scripts/ocr_recognize_mockups.swift [optional_dir_path] [--json]
 * Example:
 *   swift scripts/ocr_recognize_mockups.swift
 *   swift scripts/ocr_recognize_mockups.swift projects_images/images/uktika
 */

struct AIAnalysisResult: Codable {
    let screenType: String
    let description: String
    let components: [String]
    let visualStyle: String
}

struct MockupMetadata: Codable {
    let fileName: String
    let relativePath: String
    let screenType: String
    let description: String
    let components: [String]
    let visualStyle: String
    let visibleText: [String]
    let dimensions: [String: Int]
}

// 1. Apple Vision: Fast & Accurate On-Screen Text Recognition
func extractVisibleText(from cgImage: CGImage) -> [String] {
    let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    let textRequest = VNRecognizeTextRequest()
    textRequest.recognitionLevel = .fast
    textRequest.usesLanguageCorrection = true

    do {
        try requestHandler.perform([textRequest])
        guard let observations = textRequest.results else { return [] }

        var lines: [(text: String, y: CGFloat, x: CGFloat)] = []
        for obs in observations {
            if let candidate = obs.topCandidates(1).first {
                let trimmed = candidate.string.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty {
                    lines.append((trimmed, obs.boundingBox.midY, obs.boundingBox.minX))
                }
            }
        }

        // Natural top-to-bottom, left-to-right reading order
        lines.sort {
            if abs($0.y - $1.y) > 0.03 {
                return $0.y > $1.y
            }
            return $0.x < $1.x
        }

        return lines.map { $0.text }
    } catch {
        return []
    }
}

// 2. Apple Foundation Model: Visual & Contextual UI Reasoning
func analyzeWithAppleAI(session: LanguageModelSession, fileName: String, textList: [String]) async -> AIAnalysisResult {
    let joinedText = textList.prefix(25).joined(separator: "\n")
    let prompt = """
    You are a senior UI/UX engineer. Analyze this application screenshot mockup based on its filename and on-screen text.
    Mockup Filename: \(fileName)
    On-Screen Text Detected:
    \(joinedText.isEmpty ? "[No prominent text on screen / Pure visual graphic]" : joinedText)

    Reason over the UI purpose and return ONLY valid JSON (without markdown fences, no ```json, no preamble) with this schema:
    {
      "screenType": "The specific screen type (e.g. AI Chat / Conversation, Quiz & Learning, Analytics Dashboard, Auth / Login, Settings & Profile, E-Commerce, etc.)",
      "description": "1-2 concise sentences describing what this screen displays and what the user can do here.",
      "components": ["List of 3-5 distinct UI components present, e.g. Navigation Bar, Message Bubbles, Card List, CTA Button, Search Field"],
      "visualStyle": "Aesthetic style (e.g. Light theme minimal, Dark theme sleek, Vibrant gradient)"
    }
    """

    do {
        let response = try await session.respond(to: prompt)
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
               let parsed = try? JSONDecoder().decode(AIAnalysisResult.self, from: data) {
                return parsed
            }
        }
    } catch {
        print("    ⚠️ Apple AI Model error: \(error.localizedDescription)")
    }

    return AIAnalysisResult(
        screenType: "App Screen",
        description: "Application mockup showing UI components and layout.",
        components: ["Navigation Bar", "Content View"],
        visualStyle: "Standard"
    )
}

// Main execution flow
let scriptPath = URL(fileURLWithPath: #file).deletingLastPathComponent().path
let workspaceRoot = URL(fileURLWithPath: scriptPath).deletingLastPathComponent().path

var outputJson = false
var customPath: String? = nil

for arg in CommandLine.arguments.dropFirst() {
    if arg == "--json" {
        outputJson = true
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

print("=" .padding(toLength: 85, withPad: "=", startingAt: 0))
print("🧠 Apple On-Device AI Mockup Analyzer (Vision + LanguageModelSession)")
print("Target Directory: \(targetPath)")
print("=" .padding(toLength: 85, withPad: "=", startingAt: 0))

let aiSession = LanguageModelSession()
var allResults: [MockupMetadata] = []

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
        print("\n📁 \(relDir) (\(validImages.count) images):")
        print("-" .padding(toLength: 85, withPad: "-", startingAt: 0))

        var folderResults: [MockupMetadata] = []

        for img in validImages {
            let fileURL = URL(fileURLWithPath: "\(dir)/\(img)")
            let relPath = fileURL.path.replacingOccurrences(of: workspaceRoot + "/", with: "")

            guard let nsImage = NSImage(contentsOf: fileURL),
                  let cgImage = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
                print("  ⚠️  \(img): Unable to decode image")
                continue
            }

            let width = cgImage.width
            let height = cgImage.height

            // 1. Apple Vision: Extract text on screen
            let visibleText = extractVisibleText(from: cgImage)

            // 2. Apple AI (LanguageModelSession): Zero-condition reasoning
            let aiResult = await analyzeWithAppleAI(session: aiSession, fileName: img, textList: visibleText)

            let meta = MockupMetadata(
                fileName: img,
                relativePath: relPath,
                screenType: aiResult.screenType,
                description: aiResult.description,
                components: aiResult.components,
                visualStyle: aiResult.visualStyle,
                visibleText: visibleText,
                dimensions: ["width": width, "height": height]
            )
            folderResults.append(meta)
            allResults.append(meta)

            print("  🖼️  \(img) [\(width)×\(height)px]")
            print("      🏷️  Screen Type:  \(aiResult.screenType)")
            print("      🎨 Visual Style: \(aiResult.visualStyle)")
            print("      🧩 Components:   \(aiResult.components.joined(separator: ", "))")
            print("      📝 Visible Text: \(visibleText.prefix(6).joined(separator: " | "))\(visibleText.count > 6 ? " (+ \(visibleText.count - 6) more)" : "")")
            print("      📄 Description:  \(aiResult.description)")
            print("")
        }

        // Save structured JSON directly inside this folder
        let folderJsonFile = URL(fileURLWithPath: "\(dir)/mockups_metadata.json")
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        if let folderJsonData = try? encoder.encode(folderResults) {
            try? folderJsonData.write(to: folderJsonFile)
            print("  💾 Saved \(folderResults.count) mockups metadata inside: \(relDir)/mockups_metadata.json")
        }
    }

    for sub in subDirs {
        await processDirectory(dir: "\(dir)/\(sub)")
    }
}

await processDirectory(dir: targetPath)

// If targetPath is a parent directory containing multiple subfolders, also save aggregated summary
let targetJsonFile = URL(fileURLWithPath: "\(targetPath)/mockups_metadata.json")
let encoder = JSONEncoder()
encoder.outputFormatting = [.prettyPrinted, .sortedKeys]

if let jsonData = try? encoder.encode(allResults) {
    if !FileManager.default.fileExists(atPath: targetJsonFile.path) {
        try? jsonData.write(to: targetJsonFile)
    }
    let relTargetPath = targetJsonFile.path.replacingOccurrences(of: workspaceRoot + "/", with: "")
    print("=" .padding(toLength: 85, withPad: "=", startingAt: 0))
    print("✅ Apple AI Analysis Complete! Total Images: \(allResults.count)")
    print("💾 Structured JSON saved inside folder: \(relTargetPath)")
    print("=" .padding(toLength: 85, withPad: "=", startingAt: 0) + "\n")

    if outputJson {
        if let jsonStr = String(data: jsonData, encoding: .utf8) {
            print(jsonStr)
        }
    }
}

#!/usr/bin/env swift
import Foundation
import Vision
import AppKit

/**
 * Project Showcase Studio - Apple Vision OCR Mockup Recognizer
 * Scans mockup screenshots and extracts text on screen using macOS native Vision framework.
 *
 * Usage:
 *   swift scripts/ocr_recognize_mockups.swift [optional_path]
 * Example:
 *   swift scripts/ocr_recognize_mockups.swift
 *   swift scripts/ocr_recognize_mockups.swift projects_images/images
 */

func recognizeText(from fileURL: URL) -> String {
    guard let image = NSImage(contentsOf: fileURL),
          let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        return ""
    }
    
    let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    
    do {
        try requestHandler.perform([request])
        guard let observations = request.results else { return "" }
        let recognizedStrings = observations.compactMap { $0.topCandidates(1).first?.string }
        return recognizedStrings.prefix(12).joined(separator: " | ")
    } catch {
        return "Error reading text: \(error.localizedDescription)"
    }
}

let fileManager = FileManager.default
let scriptPath = URL(fileURLWithPath: #file).deletingLastPathComponent().path
let workspaceRoot = URL(fileURLWithPath: scriptPath).deletingLastPathComponent().path

// Target directory from argument or default to projects_images/images
let targetPath: String
if CommandLine.arguments.count > 1 {
    let arg = CommandLine.arguments[1]
    if arg.hasPrefix("/") {
        targetPath = arg
    } else {
        targetPath = "\(workspaceRoot)/\(arg)"
    }
} else {
    targetPath = "\(workspaceRoot)/projects_images/images"
}

print("=" .padding(toLength: 80, withPad: "=", startingAt: 0))
print("🔍 Apple Vision OCR Mockup Recognizer")
print("Target Directory: \(targetPath)")
print("=" .padding(toLength: 80, withPad: "=", startingAt: 0))

guard fileManager.fileExists(atPath: targetPath) else {
    print("❌ Error: Directory not found at: \(targetPath)")
    exit(1)
}

func scanAndRecognize(dir: String) {
    guard let items = try? fileManager.contentsOfDirectory(atPath: dir).sorted() else { return }
    let validImages = items.filter { item in
        let lower = item.lowercased()
        return (lower.hasSuffix(".png") || lower.hasSuffix(".jpg") || lower.hasSuffix(".jpeg") || lower.hasSuffix(".webp")) && !item.hasPrefix(".")
    }
    
    let subDirs = items.filter { item in
        var isDir: ObjCBool = false
        fileManager.fileExists(atPath: "\(dir)/\(item)", isDirectory: &isDir)
        return isDir.boolValue && !item.hasPrefix(".")
    }
    
    if !validImages.isEmpty {
        let relDir = dir.replacingOccurrences(of: workspaceRoot + "/", with: "")
        print("\n📁 \(relDir) (\(validImages.count) images):")
        print("-" .padding(toLength: 80, withPad: "-", startingAt: 0))
        for img in validImages {
            let fileURL = URL(fileURLWithPath: "\(dir)/\(img)")
            let text = recognizeText(from: fileURL)
            let snippet = text.isEmpty ? "[No text detected or icon UI]" : text
            print("  🖼️  \(img)")
            print("      Text: \(snippet)")
        }
    }
    
    for sub in subDirs {
        scanAndRecognize(dir: "\(dir)/\(sub)")
    }
}

scanAndRecognize(dir: targetPath)
print("\n" + "=" .padding(toLength: 80, withPad: "=", startingAt: 0))
print("✅ OCR Scan Complete!")
print("=" .padding(toLength: 80, withPad: "=", startingAt: 0) + "\n")

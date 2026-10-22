const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../ProjectData.kt'), 'utf-8');

const projects = [];
const parts = content.split(/Project\s*\(/g);

for (let i = 1; i < parts.length; i++) {
  const block = parts[i];
  
  // Extract title
  const titleMatch = block.match(/title\s*=\s*"([^"]+)"/);
  if (!titleMatch) continue;
  const title = titleMatch[1];

  // Extract shortDescription
  const shortDescMatch = block.match(/shortDescription\s*=\s*"([^"]+)"/);
  const shortDescription = shortDescMatch ? shortDescMatch[1] : '';

  // Extract longDescription
  const longDescMatch = block.match(/longDescription\s*=\s*"([^"]+)"/);
  const longDescription = longDescMatch ? longDescMatch[1] : '';

  // Extract features
  const features = [];
  const featuresBlock = block.match(/features\s*=\s*listOf\s*\(([\s\S]*?)\),\s*\n\s*(?:technologies|libraries|githubUrl)/);
  if (featuresBlock) {
    const matches = [...featuresBlock[1].matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)];
    for (const m of matches) {
      features.push(m[1].replace(/\\"/g, '"'));
    }
  }

  // Extract technologies
  const technologies = [];
  const techBlock = block.match(/technologies\s*=\s*listOf\s*\(([\s\S]*?)\),/);
  if (techBlock) {
    const matches = [...techBlock[1].matchAll(/"([^"]+)"/g)];
    for (const m of matches) {
      technologies.push(m[1]);
    }
  }

  // Extract platforms
  const platform = [];
  const platformBlock = block.match(/platform\s*=\s*listOf\s*\(([\s\S]*?)\),/);
  if (platformBlock) {
    const matches = [...platformBlock[1].matchAll(/"([^"]+)"/g)];
    for (const m of matches) {
      platform.push(m[1]);
    }
  }

  projects.push({
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
    title,
    shortDescription,
    longDescription,
    features,
    technologies,
    platform: platform.length > 0 ? platform : ['Android'],
  });
}

const outDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'projects.json'), JSON.stringify(projects, null, 2));
console.log(`Successfully parsed ${projects.length} projects from ProjectData.kt with full platforms!`);

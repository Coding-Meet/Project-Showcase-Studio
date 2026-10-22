import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '100mb' }));

const EXPORTS_DIR = path.join(__dirname, 'exports');
if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true });
}

// Find Google Chrome path on Mac
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const PROJECT_STORE_PATH = path.join(__dirname, 'src/data/projectStore.json');

// 1. Get projects
app.get('/api/projects', (req, res) => {
  const projectsPath = path.join(__dirname, 'src/data/projects.json');
  if (fs.existsSync(projectsPath)) {
    const data = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
    res.json(data);
  } else {
    res.json([]);
  }
});

// 1b. Get permanently saved project store from disk
app.get('/api/project-store', (req, res) => {
  try {
    if (fs.existsSync(PROJECT_STORE_PATH)) {
      const data = JSON.parse(fs.readFileSync(PROJECT_STORE_PATH, 'utf-8'));
      res.json(data);
    } else {
      res.json({});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1c. Save project store permanently to disk (src/data/projectStore.json)
app.post('/api/project-store', (req, res) => {
  try {
    const { projectStore } = req.body;
    if (!projectStore || typeof projectStore !== 'object') {
      return res.status(400).json({ error: 'Invalid projectStore object' });
    }
    fs.writeFileSync(PROJECT_STORE_PATH, JSON.stringify(projectStore, null, 2), 'utf-8');
    res.json({ success: true, count: Object.keys(projectStore).length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1d. Serve local image file from disk path
app.get('/api/file', (req, res) => {
  try {
    const rawPath = req.query.path;
    if (!rawPath) return res.status(400).send('Path required');
    const cleanPath = path.resolve(rawPath.replace(/^file:\/\//, ''));
    if (!fs.existsSync(cleanPath)) {
      return res.status(404).send('File not found: ' + cleanPath);
    }
    res.sendFile(cleanPath);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 2. Get saved projects from exports folder
app.get('/api/saved-projects', (req, res) => {
  try {
    const saved = [];
    if (fs.existsSync(EXPORTS_DIR)) {
      const dirs = fs.readdirSync(EXPORTS_DIR, { withFileTypes: true });
      for (const d of dirs) {
        if (d.isDirectory()) {
          const configPath = path.join(EXPORTS_DIR, d.name, 'project_config.json');
          if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            saved.push({
              folder: d.name,
              title: config.title || d.name,
              updatedAt: fs.statSync(configPath).mtime,
              config,
            });
          }
        }
      }
    }
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Save exports directly to disk
app.post('/api/save-exports', async (req, res) => {
  try {
    const { projectName, config, slides } = req.body;
    const projectSlug = (projectName || 'showcase_project')
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '_');

    const targetDir = path.join(EXPORTS_DIR, projectSlug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Save project_config.json
    fs.writeFileSync(
      path.join(targetDir, 'project_config.json'),
      JSON.stringify(config, null, 2),
      'utf-8'
    );

    const zip = new JSZip();
    zip.file('project_config.json', JSON.stringify(config, null, 2));

    const savedFiles = ['project_config.json'];

    // Save each slide image
    if (Array.isArray(slides)) {
      slides.forEach((slide, index) => {
        if (slide.dataUrl) {
          const ext = slide.format || 'png';
          const base64Data = slide.dataUrl.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          const cleanSlideTitle = (slide.title || `slide_${index + 1}`)
            .toLowerCase()
            .replace(/[^a-z0-9_-]+/g, '_');
          const fileName = `slide_${index + 1}_${cleanSlideTitle}.${ext}`;

          fs.writeFileSync(path.join(targetDir, fileName), buffer);
          zip.file(fileName, buffer);
          savedFiles.push(fileName);
        }
      });
    }

    // Save ZIP bundle
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const zipName = `${projectSlug}_showcase_deck.zip`;
    fs.writeFileSync(path.join(targetDir, zipName), zipBuffer);
    savedFiles.push(zipName);

    res.json({
      success: true,
      message: `Saved ${savedFiles.length} files successfully!`,
      folderPath: targetDir,
      files: savedFiles,
    });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Puppeteer High-Precision Snapshot (100% pixel-perfect)
app.post('/api/puppeteer-render', async (req, res) => {
  try {
    const { html, width, height, format = 'png', quality = 95 } = req.body;

    if (!fs.existsSync(CHROME_PATH)) {
      return res.status(400).json({ error: 'Chrome executable not found at ' + CHROME_PATH });
    }

    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: parseInt(width) || 1920,
      height: parseInt(height) || 1080,
      deviceScaleFactor: 2, // 2x Retina scale for crispness
    });

    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Screenshot options
    const screenshotOptions = {
      type: format === 'jpg' ? 'jpeg' : format,
      encoding: 'base64',
    };
    if (format === 'jpg') {
      screenshotOptions.quality = quality;
    }

    const base64Screenshot = await page.screenshot(screenshotOptions);
    await browser.close();

    res.json({
      success: true,
      dataUrl: `data:image/${format === 'jpg' ? 'jpeg' : format};base64,${base64Screenshot}`,
    });
  } catch (err) {
    console.error('Puppeteer render error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Showcase Studio Backend running at http://localhost:${PORT}`);
  console.log(`Exports directory: ${EXPORTS_DIR}`);
});

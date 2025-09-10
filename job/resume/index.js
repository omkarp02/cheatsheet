const fs = require("fs");
const path = require("path");
const officeToPdf = require("office-to-pdf");

const inputDir = path.join(__dirname, "AllResume");
const outputDir = path.join(__dirname, "AllResumePdf");

// Ensure output folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Mapping rules for renaming
const nameMapping = {
  "Frontend": "Omkar_CV.pdf",
  "Generic": "Omkar Resume.pdf",
  "Go": "Omkar-CV.pdf",
  "Java": "OmkarResume.pdf",
  "JavaGo": "Omkar CV.pdf",
  "JavaNode": "Omkar-Resume.pdf",
  "Node": "Omkar_Resume.pdf"
};

async function convertDocs() {
  try {
    const files = fs.readdirSync(inputDir);

    for (const file of files) {
      if (path.extname(file).toLowerCase() === ".docx") {
        const baseName = path.basename(file, ".docx"); // e.g. "Frontend"

        if (nameMapping[baseName]) {
          const inputPath = path.join(inputDir, file);
          const outputPath = path.join(outputDir, nameMapping[baseName]);

          console.log(`Converting: ${file} -> ${nameMapping[baseName]}`);

          const wordBuffer = fs.readFileSync(inputPath);
          const pdfBuffer = await officeToPdf(wordBuffer);

          fs.writeFileSync(outputPath, pdfBuffer);
          console.log(`✅ Saved: ${outputPath}`);
        } else {
          console.warn(`⚠️ No mapping found for: ${file}`);
        }
      }
    }
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

convertDocs();

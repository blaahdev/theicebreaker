/* eslint-disable no-undef */
// To run this script: npm run generate-index -- ./public/assets/frames
const fs = require("fs");
const path = require("path");

const directoryPath = process.argv[2] || "./images"; // Default to './images' if no argument provided

// Generate the index.js file content
const generateIndexFileContent = (dirPath) => {
  const files = fs.readdirSync(dirPath);

  const exports = files
    .filter((file) => /\.(jpg|jpeg|png|gif|svg|json)$/.test(file)) // Filter for image files
    .map((file) => {
      const name = path.basename(file, path.extname(file)).replaceAll("-", "");
      return `import ${name} from './${file}';`;
    });

  const defaultExport = files
    .filter((file) => /\.(jpg|jpeg|png|gif|svg|json)$/.test(file))
    .map((file) => {
      const name = path.basename(file, path.extname(file)).replaceAll("-", "");
      return `    '${name}': ${name}`;
    });

  return `
${exports.join("\n")}

interface Image {
[key:string]: unknown;
}

const images: Image = {
${defaultExport.join(",\n")}
};

export default images;
    `;
};

// Write to index.js
fs.writeFileSync(
  path.join(directoryPath, "index.ts"),
  generateIndexFileContent(directoryPath)
);
console.log(`index.js has been generated in ${directoryPath}`);

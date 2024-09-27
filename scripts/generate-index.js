/* eslint-disable no-undef */
// To run this script: npm run generate-index -- ./src/assets/wordsListImages
import { readdirSync, writeFileSync } from "fs";
import { basename, extname, join } from "path";

const directoryPath = process.argv[2] || "./images"; // Default to './images' if no argument provided

// Generate the index.js file content
const generateIndexFileContent = (dirPath) => {
  const files = readdirSync(dirPath);

  const exports = files
    .filter((file) => /\.(jpg|jpeg|png|gif|svg|json)$/.test(file)) // Filter for image files
    .map((file) => {
      const name = basename(file, extname(file)).replaceAll("-", "");
      return `import img${name} from './${file}';`;
    });

  const defaultExport = files
    .filter((file) => /\.(jpg|jpeg|png|gif|svg|json)$/.test(file))
    .map((file) => {
      const name = basename(file, extname(file)).replaceAll("-", "");
      return `    img${name}`;
    });

  return `
${exports.join("\n")}
const images = {
${defaultExport.join(",\n")}
};

export default images;
    `;
};

// Write to index.js
writeFileSync(
  join(directoryPath, "index.js"),
  generateIndexFileContent(directoryPath)
);
console.log(`index.js has been generated in ${directoryPath}`);

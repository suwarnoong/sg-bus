import fs from 'fs';

const writeJsonToFile = (filePath, json) => {
  fs.writeFileSync(filePath, JSON.stringify(json, null, 0));
  console.log(`Generated ${filePath}`);
};

export default writeJsonToFile;

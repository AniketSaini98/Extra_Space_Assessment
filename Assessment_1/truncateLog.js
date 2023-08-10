const fs = require('fs');
const path = require('path');

function truncateLogFile(filePath, maxLines) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    if (lines.length > maxLines) {
      const truncatedContent = lines.slice(0, maxLines).join('\n');
      
      // Create a new file with truncated content
      const truncatedFilePath = filePath.replace('.log', '_truncated.log');
      fs.writeFileSync(truncatedFilePath, truncatedContent, 'utf-8');
      
      console.log(`File '${filePath}' truncated to ${maxLines} lines.`);
      console.log(`Truncated data saved in '${truncatedFilePath}'.`);
      console.log('Truncated Content:');
      console.log(truncatedContent);
    } else {
      console.log(`File '${filePath}' already has ${lines.length} lines or fewer.`);
    }
  } catch (error) {
    console.error(`Error truncating file '${filePath}':`, error.message);
  }
}

function processDirectory(directoryPath, maxLines) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err.message);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        processDirectory(filePath, maxLines);
      } else if (file.endsWith('.log')) {
        truncateLogFile(filePath, maxLines);
      }
    });
  });
}

// Specify the root directory you want to start the search from
const rootDirectory = '/path of the log file';

// Specify the maximum number of lines you want to keep
const maxLines = 100;

processDirectory(rootDirectory, maxLines);

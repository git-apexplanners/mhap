/**
 * Script to test file uploads
 */

const fs = require('fs');
const path = require('path');

// Create a test directory if it doesn't exist
const testDir = path.join(process.cwd(), 'public', 'uploads', 'test');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// Create a test file
const testFilePath = path.join(testDir, 'test-file.txt');
fs.writeFileSync(testFilePath, 'This is a test file for upload testing.');

console.log(`Created test file at: ${testFilePath}`);
console.log('File upload test completed successfully!');

// Check if the uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (fs.existsSync(uploadsDir)) {
  console.log('Uploads directory exists.');

  // List the contents of the uploads directory
  const files = fs.readdirSync(uploadsDir);
  console.log('Contents of uploads directory:');
  files.forEach(file => {
    console.log(`- ${file}`);
  });
} else {
  console.log('Uploads directory does not exist.');
}

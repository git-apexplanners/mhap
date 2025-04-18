/**
 * Script to test file uploads
 * 
 * This script tests file uploads by creating a test file and sending it to the upload API.
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testFileUploads() {
  console.log('Testing file uploads...');
  
  // Create test directories if they don't exist
  const testDir = path.join(process.cwd(), 'temp');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  // Create test files
  const testFiles = [
    { name: 'test-image.jpg', content: 'Test image content', folder: 'projects' },
    { name: 'test-document.pdf', content: 'Test document content', folder: 'pages' }
  ];
  
  for (const file of testFiles) {
    const filePath = path.join(testDir, file.name);
    fs.writeFileSync(filePath, file.content);
    
    console.log(`Created test file: ${filePath}`);
    
    // Create a FormData object
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('folder', file.folder);
    
    // Send the file to the upload API
    console.log(`Uploading ${file.name} to ${file.folder}...`);
    
    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: form
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Upload successful! File URL: ${data.url}`);
        
        // Verify that the file exists
        const uploadedFilePath = path.join(process.cwd(), 'public', data.url);
        if (fs.existsSync(uploadedFilePath)) {
          console.log(`✅ Verified that the file exists at: ${uploadedFilePath}`);
          
          // Clean up the uploaded file
          fs.unlinkSync(uploadedFilePath);
          console.log(`Cleaned up uploaded file: ${uploadedFilePath}`);
        } else {
          console.error(`❌ File does not exist at: ${uploadedFilePath}`);
        }
      } else {
        const error = await response.json();
        console.error(`❌ Upload failed:`, error);
      }
    } catch (error) {
      console.error(`❌ Error uploading file:`, error.message);
    }
    
    // Clean up the test file
    fs.unlinkSync(filePath);
    console.log(`Cleaned up test file: ${filePath}`);
  }
  
  // Clean up the test directory
  fs.rmdirSync(testDir);
  console.log(`Cleaned up test directory: ${testDir}`);
  
  console.log('File upload tests completed!');
}

// Run the tests
testFileUploads();

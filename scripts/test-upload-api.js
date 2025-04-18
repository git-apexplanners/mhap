/**
 * Script to test the upload API
 * 
 * This script creates a test file and sends it to the upload API
 * to verify that file uploads are working correctly.
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testUploadAPI() {
  try {
    // Create test directories if they don't exist
    const testDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    
    // Create a test file
    const testFilePath = path.join(testDir, 'test-upload.jpg');
    fs.writeFileSync(testFilePath, 'This is a test file for upload testing.');
    console.log(`Created test file at: ${testFilePath}`);
    
    // Create a FormData object
    const form = new FormData();
    form.append('file', fs.createReadStream(testFilePath));
    form.append('folder', 'projects/test');
    
    // Send the file to the upload API
    console.log('Sending file to upload API...');
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: form
    });
    
    // Check the response
    if (response.ok) {
      const data = await response.json();
      console.log('Upload successful!');
      console.log(`File URL: ${data.url}`);
      
      // Verify that the file exists
      const uploadedFilePath = path.join(process.cwd(), 'public', data.url);
      if (fs.existsSync(uploadedFilePath)) {
        console.log(`Verified that the file exists at: ${uploadedFilePath}`);
      } else {
        console.error(`File does not exist at: ${uploadedFilePath}`);
      }
    } else {
      const error = await response.json();
      console.error('Upload failed:', error);
    }
    
    // Clean up
    fs.unlinkSync(testFilePath);
    console.log(`Deleted test file: ${testFilePath}`);
  } catch (error) {
    console.error('Error testing upload API:', error.message);
  }
}

// Run the test
testUploadAPI();

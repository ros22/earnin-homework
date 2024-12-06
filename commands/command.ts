import fs from 'fs';
import path from 'path';

// Function to delete the image file if it exists
function deleteImageIfExists(imagePath: string): void {
  // Check if the image file exists
  if (fs.existsSync(imagePath)) {
    // If it exists, delete the image
    fs.unlinkSync(imagePath);
    console.log(`Deleted image at: ${imagePath}`);
  } else {
    console.log(`Image not found at: ${imagePath}`);
  }
}

// Example of how you might use this function before running Playwright tests
async function runTests() {
  const imagePath = path.join(__dirname, 'screenshot.png');  // Replace with your image path
  
  // Delete the image before running tests
  deleteImageIfExists(imagePath);

  // Now you can run your Playwright tests
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Example of Playwright test logic
  await page.goto('https://example.com');
  await page.screenshot({ path: imagePath });
  
  console.log('Test completed and screenshot taken.');

  await browser.close();
}

// Run tests
runTests().catch(err => console.error(err));

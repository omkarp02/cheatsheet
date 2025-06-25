const puppeteer = require('puppeteer');

async function openLinkedIn() {
  try {
    // Launch Puppeteer with the existing Chrome user data directory
    const browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode
      userDataDir: `C:\\Users\\395936\\AppData\\Local\\Google\\Chrome\\User Data`,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Navigate to LinkedIn
    await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'networkidle2' });
    
    console.log('Opened LinkedIn in your logged-in session.');
    
    // Keep browser open until manually closed
    // await browser.close(); // Uncomment to close browser automatically
  } catch (error) {
    console.error('Error opening LinkedIn:', error);
  }
}

openLinkedIn();
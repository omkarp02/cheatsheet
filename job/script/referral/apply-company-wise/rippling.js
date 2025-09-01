const puppeteer = require("puppeteer");
const path = require("path");

const resumeLink = "../../../resume/node/Omkar_Resume.pdf";

async function run() {
  const browser = await puppeteer.launch({ headless: false }); // visible browser
  const page = await browser.newPage();

  // 1. Navigate to the job application page
  await page.goto(
    "https://ats.rippling.com/rippling/jobs/8adf6b35-f29d-4cd9-9258-8377003f5dcf/apply?step=application",
    {
      waitUntil: "networkidle2",
    }
  );

  // 2. Wait for résumé input and upload
  const resumeInput = await page.waitForSelector(
    'input[data-testid="input-resume"]'
  );
  await resumeInput.uploadFile(
    path.resolve(__dirname, resumeLink) // <-- change this to your resume path
  );

  // 3. Fill in text fields
  await page.type('input[data-testid="input-first_name"]', "John");
  await page.type('input[data-testid="input-last_name"]', "Doe");
  await page.type('input[data-testid="input-email"]', "john.doe@example.com");
  await page.type('input[data-testid="input-current_company"]', "Acme Corp");
  await page.type('input[data-testid="input-phone_number"]', "+919876543210");
  await page.type('input[id="field-29"]', "Mumbai, Maharashtra, India"); // location
  await page.type(
    'input[data-testid="input-linkedin_link"]',
    "https://www.linkedin.com/in/johndoe"
  );

  // 4. Upload cover letter (if desired)
  const coverInput = await page.$('input[data-testid="input-cover_letter"]');
  if (coverInput) {
    await coverInput.uploadFile(
      path.resolve(__dirname, "your_cover_letter.pdf") // <-- change this
    );
  }

  // 5. Select pronouns dropdown (example)
  const pronounsSelector =
    'input[data-testid="input-select-search-input"][name="IGI7luU8ZQO"]';
  await page.click(pronounsSelector);
  // Select "They/them/theirs" option:
  await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll('ul[role="listbox"] li'));
    const option = list.find((li) => li.innerText.includes("They/them"));
    if (option) option.click();
  });

  // 6. (Optional) Set voluntary demographics if required
  // Example: await page.select('select[name="eeoc.gender"]', 'Female');

  // 7. Submit the form
  const submitBtn = await page.waitForSelector('button[data-testid="Apply"]');
  await submitBtn.click();

  // 8. Wait for navigation or confirmation
  await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 60000 });

  console.log("Application submitted!");

  await browser.close();
}

run();

const puppeteer = require("puppeteer");

const openAndVisitProfiles = async ({
  url,
  accessToken,
  profilePicClassName,
  connectBtnClassName,
  message,
  target,
}) => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
  });

  let count = 0;
  const page = await browser.newPage();

  // Set LinkedIn session cookie
  await page.setCookie({
    name: "li_at",
    value: accessToken,
    domain: ".www.linkedin.com",
  });

  let pageNumber = getPageFromUrl(url);

  // Go to search result page
  while (count < target) {
    await page.goto(url, { waitUntil: "load" });

    await page.waitForSelector(profilePicClassName);
    let profileUrls = await page.$$eval(profilePicClassName, (anchors) =>
      anchors.map((a) => a.href)
    );

    for (let i = 0; i < profileUrls.length; i++) {
      const url = profileUrls[i];
      await page.goto(url, { waitUntil: "load", timeout: 60000 });

      await sleep(2000);

      try {
        const connectButtonSelector = `button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.${connectBtnClassName}`;

        await page.waitForSelector(connectButtonSelector, { timeout: 5000 });

        // Extract the button's visible text
        const buttonText = await page.$eval(connectButtonSelector, (el) =>
          el.innerText.trim()
        );

        if (buttonText.toLowerCase() === "connect") {
          await page.click(connectButtonSelector);
          await connectButtonClickedNowHandleRest(page, message);
          count++;
        } else {
          const res = await handleIfBtnTextIsFollow(page, message, connectBtnClassName);
          if(res) count++;
          
        }

        sleep(1000);
      } catch (e) {
        console.log("❌ Follow button not found on this profile");
      }
    }
    pageNumber += 1;
    url = updatePageInUrl(url, pageNumber);
    await sleep(1000);
    console.log(`Count till now >>>>>>>>> ${count}`);
  }

  await browser.close();
};

function updatePageInUrl(url, newPageNumber) {
  const urlObj = new URL(url);

  // Update or set the `page` parameter
  urlObj.searchParams.set("page", newPageNumber);

  return urlObj.toString();
}

function getPageFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pageParam = urlObj.searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : null;
  } catch (err) {
    console.error("Invalid URL:", err.message);
    return null;
  }
}

async function handleIfBtnTextIsFollow(page, message, connectBtnClassName) {
  return new Promise(async (res) => {
    // Partial class-based selector, omitting dynamic hash class (which may change)
    const selector = `.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view.${connectBtnClassName}.artdeco-button.artdeco-button--secondary.artdeco-button--muted.artdeco-button--2`;

    // Wait until at least one button with this class appears
    await page.waitForSelector(selector);

    // Get all matching buttons
    const buttons = await page.$$(selector);

    for (const btn of buttons) {
      const text = await btn.evaluate((el) =>
        el.innerText.trim().toLowerCase()
      );
      if (text.toLowerCase() === "more") {
        await btn.click();

        const selector =
          ".artdeco-dropdown__item.artdeco-dropdown__item--is-dropdown.ember-view.full-width.display-flex.align-items-center";

        // Wait for elements to be present
        try {
          await page.waitForSelector(selector, { timeout: 1000 });
        } catch (error) {
          res(false)
        }

        // Get all matching divs
        const items = await page.$$(selector);

        for (const item of items) {
          // Get inner text and role
          const [text, role] = await Promise.all([
            item.evaluate((el) => el.innerText.trim().toLowerCase()),
            item.evaluate((el) => el.getAttribute("role")),
          ]);

          // Check both conditions
          if (text === "connect" && role === "button") {
            await item.click();
            await connectButtonClickedNowHandleRest(page, message);
            res(true)
            break;
          }
        }
        res(false)
        break;
      }
    }
  });
}

async function connectButtonClickedNowHandleRest(page, message) {
  await sleep(1000);
  const sendButtonSelector =
    "button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view.mr1";
  try {
    await page.waitForSelector(sendButtonSelector, { timeout: 5000 });
    await page.click(sendButtonSelector);
    await sleep(1000);
    await page.waitForSelector("#custom-message");
    await page.type("#custom-message", message, { delay: 1 });

    await page.waitForSelector(
      "button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1"
    );
    await page.click(
      "button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1"
    );
  } catch (error) {
    console.log(
      "⚠️ Send button not found (maybe already sent or modal didn't open)"
    );
  }
}

const sleep = (milli = 5000) =>
  new Promise((res) => setTimeout(() => res(), milli));

const url =
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%222506186%22%5D&keywords=hubspire&origin=FACETED_SEARCH&sid=)p.";
const accessToken =
  "AQEFAHUBAAAAABZj3swAAAGV-gW6YwAAAZfKxFhoTQAAGHVybjpsaTptZW1iZXI6MTA2MTgwOTY2N47s_HRD-fq3WzQaPCUEdsP7L7H6c7KaNVqtWeFgf9MZPmmpKXjqe9XsKVLAfxr-C-tseghgUQMGLZMz8PaBYya85zA1eY86ZF92SSe2CWVupDV0UrLpx6T2GerAe9rr7KK4uC5eDa8WviXhhADiT02mV7lobpu32Vrb7Uk43UyKMILfIdPO9mbvD0F-uTb_4utnHOQ";
const profilePicClassName =
  "a.ndZLunsmRywyagpqSTKSzifoKwlCqZnbXsnbFA.scale-down";
const connectBtnClassName = "gsFHhsRxZibpSuKMfIrWxMeiBJgEPiyCDfwQ";
const message = `I saw a job opening at your company and would really appreciate a referral. I'm a full-stack dev with 3+ yrs of experience, prepping hard (500+ DSA Qs, system design, Striver A2Z). Happy to share my resume—thanks a ton in advance!`;
const target = 25;

openAndVisitProfiles({
  url,
  accessToken,
  profilePicClassName,
  connectBtnClassName,
  message,
  target,
});

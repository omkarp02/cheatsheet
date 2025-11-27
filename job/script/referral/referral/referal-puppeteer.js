const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const {
  updatePageInUrl,
  sleep,
  getPageFromUrl,
  visitUserProfile,
} = require("../utils");
const { exec } = require("child_process");

puppeteer.use(StealthPlugin());

// Simple random delay function
const randomDelay = (min = 1000, max = 3000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const openAndVisitProfiles = async ({
  url,
  accessToken,
  profilePicClassName,
  connectBtnClassName,
  message,
  target,
  sleepTime,
}) => {
  return new Promise(async (res, rej) => {

    profilePicClassName = profilePicClassName.split(" ").join(".");

    try {
      const browser = await puppeteer.launch({
        headless: false,
        executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        defaultViewport: null,
        args: [
          "--window-size=1680,1000",
          "--disable-blink-features=AutomationControlled",
          "--no-sandbox",
        ],
      });

      let count = 0;
      const page = await browser.newPage();

      // Minimal stealth - just remove webdriver
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, "webdriver", {
          get: () => undefined,
        });
        delete navigator.__proto__.webdriver;
      });

      // Set LinkedIn session cookie
      await page.setCookie({
        name: "li_at",
        value: accessToken,
        domain: ".www.linkedin.com",
      });

      let pageNumber = getPageFromUrl(url);

      // Go to search result page
      while (count < target) {
        // Small random delay before each page
        await sleep(randomDelay(2000, 4000));

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

        // Wait a bit after page load
        await sleep(randomDelay(1500, 3000));

        try {
          await page.waitForSelector(profilePicClassName, { timeout: 10000 });
        } catch (err) {
          console.warn("Profile elements not found, skipping page");
          pageNumber += 1;
          url = updatePageInUrl(url, pageNumber);
          continue;
        }

        let profileUrls = await page.$$eval(profilePicClassName, (anchors) =>
          anchors
            .map((a) => a.href)
            .filter(
              (href) => href && href.startsWith("https://www.linkedin.com/in")
            )
        );

        console.log(`Found ${profileUrls.length} profile urls on page.`);
        if(profileUrls.length === 0){
          console.log("No profile URLs found, ending process.");
          break;
        }

        try {
          const c = await visitUserProfile(
            profileUrls,
            page,
            message,
            connectBtnClassName,
            target,
            count,
            sleepTime
          );
          count = c;
        } catch (err) {
          console.error("Error in visitUserProfile:", err.message || err);
        }

        if (count >= target) {
          console.log(`Target reached: ${count} connections made.`);
          break;
        }

        pageNumber += 1;
        url = updatePageInUrl(url, pageNumber);

        // Longer delay between pages
        await sleep(randomDelay(8000, 12000));
        console.log(`Count till now >>>>>>>>> ${count}`);
      }

      await browser.close();
      res();
    } catch (error) {
      console.error("Error in openAndVisitProfiles:", error);
      try {
        await browser.close();
      } catch (e) {
        // ignore close errors
      }
      rej(error);
    }
  });
};

const url = [
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%2228843444%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%221481%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%223527547%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%224617%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%222337411%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%22272972%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%223165356%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%22106714672%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%2214606010%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%2280260499%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%223878180%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%2280856410%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%223882691%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%222337411%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%223495%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%221068920%22%5D",
];

const accessToken = "AQEDAT9J7gMA5GDbAAABmhcVOIkAAAGa30ZbtU0AMSlNUhuPlBD5PCw3_je6huCYIpH3KUWgrpiFU6Wf_oenijt7wtYeZ_Ix7ULd00Bg1X_wz0gtNBuFtGB6oLLSu-Pp4OQOSlIx6Rx3xrXN5yArL7Y1";
const profilePicClassName = "a.fd341caa _38dfe71d _366480e3 _0959399f _41e6e8fd _38952a3d f5755ef5 e9329a8f bb545261 _0aab64e7";
const connectBtnClassName = "csErJNUJFqXwezdDYcFzqtghwqluDBWGhHhw";
const message = `Hi! I came across a job opening at your company. Over the past year, I’ve been putting in 8+ hrs daily solving 500+ DSA problems, system design, and Striver A2Z, Fraz prep, and I’d truly value a referral. I’ll share everything needed just need a chance to prove myself.`;

const target = 10; // Conservative target
const sleepTime = 5000; // 5 second delays

async function start() {
  for (let item of url) {
    await openAndVisitProfiles({
      url: item,
      accessToken,
      profilePicClassName,
      connectBtnClassName,
      message,
      target,
      sleepTime,
    });
  }

  // Run Windows command to hibernate
  exec("shutdown /h", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log("System is hibernating...");
  });
}

start();

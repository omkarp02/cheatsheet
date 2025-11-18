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
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%221974%22%5D&keywords=software%20enginer&origin=FACETED_SEARCH&searchId=80a1a2fd-3ed9-42cd-9e19-bb7d05a9c681&sid=yON",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%221974%22%5D&keywords=software%20enginer&origin=FACETED_SEARCH&searchId=80a1a2fd-3ed9-42cd-9e19-bb7d05a9c681&sid=yON",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%2220882%22%5D&keywords=software%20enginer&origin=FACETED_SEARCH&searchId=80a1a2fd-3ed9-42cd-9e19-bb7d05a9c681&sid=N)Y",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%22236924%22%5D&keywords=software%20enginer&origin=FACETED_SEARCH&searchId=80a1a2fd-3ed9-42cd-9e19-bb7d05a9c681&sid=Bn*",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%2299177329%22%5D&keywords=software%20engineer&origin=GLOBAL_SEARCH_HEADER&sid=6pS",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%2280726005%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=6pS",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%2233237670%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=bw%40",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%22101881336%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=%3Bsn",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%223882691%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=LA1",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%2240836719%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=OtU",
"https://www.linkedin.com/search/results/people/?currentCompany=%5B%2274370473%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=fe(",
];

const accessToken = "AQEDAT9J7gMA5GDbAAABmhcVOIkAAAGaOyG8iU0AmWWuVGnSqTx8CUOV3BaE82yZhRXHPhlBGKUd8mO-eFE3eEbf0TXYOeVQPIvoCmtwFaFCQ-lslc9GqfO8jiOH3rdeUTdd8Owk_iJs8wE6OR_MrzKT";
const profilePicClassName = "a.yRgCVsjrzAHkdCEjqvAcmnsmCUhbwIZbY.scale-down";
const connectBtnClassName = "DhBcSsKzUnyKdEOWwBJmWavDjlHFWuqygdMVO";
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

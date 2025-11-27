const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const {
  sleep,
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
  noOfTimesloadMoreButtonclickedLimit,
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

      // Small random delay before each page
      await sleep(randomDelay(2000, 4000));

      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

      // Wait a bit after page load
      await sleep(randomDelay(1500, 3000));

      // Keep clicking "Load More" until button disappears
      const loadMoreSelector = "button.scaffold-finite-scroll__load-button";

      let noOfTimesloadMoreButtonclicked = 0;

      while (
        noOfTimesloadMoreButtonclicked < noOfTimesloadMoreButtonclickedLimit
      ) {
        try {
          const loadMoreButton = await page.$(loadMoreSelector);
          if (!loadMoreButton) break;

          await loadMoreButton.click();
          noOfTimesloadMoreButtonclicked++;
          await sleep(2000); // Wait for more profiles to load
        } catch (err) {
          console.error("Error during load more:", err);
          break;
        }
      }

      // After all profiles are loaded, extract their URLs
      const profileUrls = await page.evaluate(() => {
        const anchors = Array.from(
          document.querySelectorAll(
            "a[id^='org-people-profile-card__profile-image']"
          )
        );
        return anchors.map((a) => a.href).filter(Boolean);
      });

      if (profileUrls.length === 0) {
        console.log("No profile URLs found, ending process.");
        res()
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
  "https://www.linkedin.com/company/microsoft/people/?keywords=technical%20recruiter",
];

const accessToken =
  "AQEDAT9J7gMA5GDbAAABmhcVOIkAAAGaOyG8iU0AmWWuVGnSqTx8CUOV3BaE82yZhRXHPhlBGKUd8mO-eFE3eEbf0TXYOeVQPIvoCmtwFaFCQ-lslc9GqfO8jiOH3rdeUTdd8Owk_iJs8wE6OR_MrzKT";
const connectBtnClassName = "DhBcSsKzUnyKdEOWwBJmWavDjlHFWuqygdMVO";
const message = `Hi! I’m currently looking for software engineering roles. If you’re hiring, I’d love for you to check my LinkedIn and portfolio: https://pawaromkar.in. Open to discussing opportunities!`;

const target = 10; // Conservative target
const sleepTime = 5000; // 5 second delays

async function start() {
  for (let item of url) {
    await openAndVisitProfiles({
      url: item,
      accessToken,
      profilePicClassName: "",
      connectBtnClassName,
      message,
      target,
      sleepTime,
      noOfTimesloadMoreButtonclickedLimit: 5,
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

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

// Human-like mouse movements
const humanMouseMove = async (page) => {
  const width = await page.evaluate(() => window.innerWidth);
  const height = await page.evaluate(() => window.innerHeight);

  // Random movements (3-7 movements)
  const movements = Math.floor(Math.random() * 5) + 3;

  for (let i = 0; i < movements; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    await page.mouse.move(x, y, { steps: Math.floor(Math.random() * 10) + 5 });
    await sleep(randomDelay(100, 500));
  }
};

// Random scrolling behavior
const humanScroll = async (page) => {
  const scrolls = Math.floor(Math.random() * 3) + 2; // 2-4 scrolls

  for (let i = 0; i < scrolls; i++) {
    await page.evaluate(() => {
      window.scrollBy({
        top: Math.random() * 300 + 200,
        left: 0,
        behavior: "smooth",
      });
    });
    await sleep(randomDelay(500, 1500));
  }

  // Scroll back up sometimes
  if (Math.random() > 0.5) {
    await page.evaluate(() => {
      window.scrollBy({
        top: -(Math.random() * 200 + 100),
        left: 0,
        behavior: "smooth",
      });
    });
    await sleep(randomDelay(500, 1000));
  }
};

const openAndVisitProfiles = async ({
  url,
  accessToken,
  message,
  target,
  sleepTime,
  index,
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
          "--disable-web-security",
          "--disable-features=IsolateOrigins,site-per-process",
          "--disable-dev-shm-usage",
        ],
        protocolTimeout: 0,
      });

      let count = 0;
      const page = await browser.newPage();

      // Enhanced stealth configurations
      await page.evaluateOnNewDocument(() => {
        // Remove webdriver property
        Object.defineProperty(navigator, "webdriver", {
          get: () => undefined,
        });

        // Override plugins
        Object.defineProperty(navigator, "plugins", {
          get: () => [1, 2, 3, 4, 5],
        });

        // Override languages
        Object.defineProperty(navigator, "languages", {
          get: () => ["en-US", "en"],
        });

        // Chrome runtime
        window.chrome = {
          runtime: {},
        };

        // Permissions
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) =>
          parameters.name === "notifications"
            ? Promise.resolve({ state: Notification.permission })
            : originalQuery(parameters);
      });

      // Set realistic user agent
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );

      // Set extra headers
      await page.setExtraHTTPHeaders({
        "accept-language": "en-US,en;q=0.9",
        "accept-encoding": "gzip, deflate, br",
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
        await sleep(randomDelay(3000, 6000));

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

        // Human-like behavior after page load
        await sleep(randomDelay(2000, 4000));
        await humanMouseMove(page);
        await sleep(randomDelay(1000, 2000));
        await humanScroll(page);
        await sleep(randomDelay(1500, 3000));

        try {
          await page.waitForSelector('a[href^="https://www.linkedin.com/in/"]', {
            timeout: 15000,
          });
        } catch (err) {
          console.warn("Profile elements not found, Then End at page:", count);
          break;
        }


        const profileAnchorClass = await page.$$eval('a[href^="https://www.linkedin.com/in/"]', anchors =>
          anchors
            .map(a => a.className)
        );

        const classSelector =
          "a." + profileAnchorClass[0].trim().split(/\s+/).join(".");

        let profileUrls = await page.$$eval(classSelector, (anchors) =>
          anchors
            .map((a) => a.href)
            .filter(
              (href) => href && href.startsWith("https://www.linkedin.com/in/")
            )
        );

        console.log(`Found ${profileUrls.length} profile urls on page.`);
        if (profileUrls.length === 0) {
          console.log(
            "No profile URLs found, ending process.",
            index,
            "<<<<<<<< here is index"
          );
          break;
        }

        try {
          const c = await visitUserProfile(
            profileUrls,
            page,
            message,
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

        // Longer delay between pages with human behavior
        await humanMouseMove(page);
        await sleep(randomDelay(10000, 20000)); // Increased delay
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
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%22104967197%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%223762143%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%225360261%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%229498084%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%2213250135%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%2213250912%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%22104967197%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%2228843444%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%2280856410%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%223882691%22%5D",
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=FACETED_SEARCH&currentCompany=%5B%223495%22%5D",
];

const accessToken =
  "AQEDAT9J7gMDcQ13AAABmwgox3YAAAGbLDVLdk0Av9Nd-Mg-zQJjTyLM_eozjiSY76D1a0MiEqgZp5EEixO3G-5Rwcf5DWH3fYbRSy5XMB8t8ggr1uAznUrrM0lIlNSCr93hoUnd7y9yo0LqncYhRLym";
const message = `Hi! I came across a job opening at your company. Over the past year, I’ve been putting in 8+ hrs daily solving 500+ DSA problems, system design, and Striver A2Z, Fraz prep, and I’d truly value a referral. I’ll share everything needed just need a chance to prove myself.`;

const target = 5; // Very conservative target to avoid detection (reduced from 10)
const sleepTime = 15000; // 15 second delays - more human-like (increased)

async function start() {
  let index = 0;
  for (let item of url) {
    try {
      await openAndVisitProfiles({
        url: item,
        accessToken,
        message,
        target,
        sleepTime,
        index,
      });
      index++;
    } catch (error) {
      console.log(error);
    }
    console.log("at index ", index);
    console.log("Continuing to next URL...");
    await sleep(randomDelay(30000, 60000)); // 30-60 seconds delay between different URLs (much longer)
  }

  // Run Windows command to hibernate
  // exec("shutdown /h", (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log("System is hibernating...");
  // });
}

start();

// stdbuf -oL -eL node ./job/script/referral/referral/referal-puppeteer.js > log.log 2>&1

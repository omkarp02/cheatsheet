const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const {
  updatePageInUrl,
  sleep,
  getPageFromUrl,
  visitUserProfile,
  randomDelay,
} = require("../utils");

puppeteer.use(StealthPlugin());

// Helper: choose a realistic (but generic) user agent
const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";

const openAndVisitProfiles = async ({
  url,
  accessToken,
  profilePicClassName,
  connectBtnClassName,
  message,
  target = 10,
  sleepTime = 5000,
  proxy = null,
}) => {
  // Return a promise to keep your original API
  return new Promise(async (res, rej) => {
    let browser;
    try {
      const launchArgs = [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled",
        "--disable-features=VizDisplayCompositor",
        "--window-size=1680,1000",
        "--start-maximized",
        "--disable-web-security",
        "--disable-features=site-per-process",
      ];

      const launchOpts = {
        headless: false,
        defaultViewport: null,
        args: launchArgs,
        executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        userDataDir: "C:\\temp\\chrome-profile", // Use persistent profile
      };

      // If proxy provided, add to args
      if (proxy) {
        launchOpts.args = launchOpts.args.concat([`--proxy-server=${proxy}`]);
      }

      browser = await puppeteer.launch(launchOpts);
      const [page] = await browser.pages();

      // Make the new page more "human" before any navigation
      await page.setUserAgent(DEFAULT_USER_AGENT);
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Cache-Control": "max-age=0",
      });

      // Reduce navigator.webdriver and other common automation flags
      await page.evaluateOnNewDocument(() => {
        // Pass the WebDriver test.
        Object.defineProperty(navigator, "webdriver", {
          get: () => undefined,
        });

        // Mock plugins and languages
        Object.defineProperty(navigator, "plugins", {
          get: () => [1, 2, 3, 4, 5],
        });

        Object.defineProperty(navigator, "languages", {
          get: () => ["en-US", "en"],
        });

        // Remove automation indicators
        delete navigator.__proto__.webdriver;

        // Mock chrome object
        window.chrome = {
          runtime: {},
          loadTimes: function () {},
          csi: function () {},
          app: {},
        };

        // Mock permissions
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) =>
          parameters.name === "notifications"
            ? Promise.resolve({ state: Notification.permission })
            : originalQuery(parameters);

        // Override the plugin array to be more realistic
        Object.defineProperty(navigator, "plugins", {
          get: () => [
            {
              0: {
                type: "application/x-google-chrome-pdf",
                suffixes: "pdf",
                description: "Portable Document Format",
                enabledPlugin: Plugin,
              },
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              length: 1,
              name: "Chrome PDF Plugin",
            },
          ],
        });

        // Mock hardwareConcurrency
        Object.defineProperty(navigator, "hardwareConcurrency", {
          get: () => 4,
        });

        // Mock deviceMemory
        Object.defineProperty(navigator, "deviceMemory", {
          get: () => 8,
        });
      });

      // Set LinkedIn session cookie (li_at) - keep domain as .www.linkedin.com
      await page.setCookie({
        name: "li_at",
        value: accessToken,
        domain: ".www.linkedin.com",
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "None",
        // don't set expiry here; LinkedIn will manage it
      });

      // Add additional realistic cookies
      await page.setCookie({
        name: "bcookie",
        value: "v=2&" + Math.random().toString(36).substring(7),
        domain: ".linkedin.com",
        path: "/",
      });

      await page.setCookie({
        name: "bscookie",
        value: "v=1&" + Math.random().toString(36).substring(7),
        domain: ".www.linkedin.com",
        path: "/",
      });

      // Override timezone via CDP (Asia/Kolkata)
      const client = await page.target().createCDPSession();
      try {
        await client.send("Emulation.setTimezoneOverride", {
          timezoneId: "Asia/Kolkata",
        });
      } catch (err) {
        // not fatal — continue
      }

      // Optional: maximize window (works in many environments)
      try {
        const session = await page.target().createCDPSession();
        await session.send("Browser.getWindowForTarget").then(async (w) => {
          // no-op if fails
        });
      } catch (e) {
        // ignore
      }

      let count = 0;
      let pageNumber = getPageFromUrl(url);

      // Main loop: go through search pages until target reached
      while (count < target) {
        // navigate
        console.log(`→ Visiting search page: ${url}`);

        // Add random delays before navigation
        await sleep(randomDelay());

        // Add mouse movement before navigation
        await page.mouse.move(Math.random() * 1680, Math.random() * 1000);
        await sleep(randomDelay());

        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        // Simulate more realistic human behavior
        await sleep(randomDelay());

        // Random mouse movements
        for (let i = 0; i < 3; i++) {
          await page.mouse.move(Math.random() * 1680, Math.random() * 1000);
          await sleep(randomDelay(100, 500));
        }

        // More human-like scrolling
        await page.evaluate(() => {
          return new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100 + Math.random() * 50; // Random scroll distance
            let timer = setInterval(() => {
              let scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if (totalHeight >= scrollHeight / 3) {
                clearInterval(timer);
                resolve();
              }
            }, 150 + Math.random() * 100); // Random timing
          });
        });

        await sleep(randomDelay());

        // wait for profile elements
        try {
          await page.waitForSelector(profilePicClassName, {
            timeout: 15000,
          });
        } catch (err) {
          console.warn(
            "profilePicClassName selector not found on page; trying to continue."
          );
          // try to continue to next page after a small wait
          pageNumber += 1;
          url = updatePageInUrl(url, pageNumber);
          await sleep(randomDelay());
          continue;
        }

        // extract profile URLs
        let profileUrls = await page.$$eval(profilePicClassName, (anchors) =>
          anchors
            .map((a) => {
              // handle anchors or images wrapped in anchors
              if (a.href) return a.href;
              // if it's a nested anchor
              const parentAnchor = a.closest && a.closest("a");
              return parentAnchor ? parentAnchor.href : null;
            })
            .filter(
              (href) => href && href.startsWith("https://www.linkedin.com/in")
            )
        );

        // unique & filter
        profileUrls = Array.from(new Set(profileUrls));

        console.log(`Found ${profileUrls.length} profile urls on page.`);

        // visit each profile using your existing util, but make sure it returns updated count
        try {
          // visitUserProfile is expected to handle profile clicks/connecting.
          // We pass the page and a few extra options. If your util doesn't accept these options,
          // it should still work; otherwise adapt the util accordingly.
          const c = await visitUserProfile(
            profileUrls,
            page,
            message,
            connectBtnClassName,
            target,
            count,
            sleepTime,
            {
              // extra runtime options we hope your util can accept or ignore
              randomDelayFn: randomDelay,
              betterClick: true,
            }
          );

          // if visitUserProfile returns a number (new count) use it; else keep original
          if (typeof c === "number") {
            count = c;
          } else {
            // fall back: try to increment by how many profiles we visited
            count += profileUrls.length;
          }
        } catch (err) {
          console.error("Error in visitUserProfile:", err.message || err);
        }

        if (count >= target) {
          console.log(`Target reached: ${count} connections made.`);
          break;
        }

        // go to next search page
        pageNumber += 1;
        url = updatePageInUrl(url, pageNumber);

        await sleep(randomDelay());
     

        console.log(`Count till now >>>>>>>>> ${count}`);
      }

      // done
      await browser.close();
      res();
    } catch (err) {
      console.error("openAndVisitProfiles error:", err);
      try {
        if (browser) await browser.close();
      } catch (e) {
        // ignore close errors
      }
      rej(err);
    }
  });
};

const url = [
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2217719%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=%2C0_",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2218922914%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=QF*",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2271562193%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=Lp1",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%22862672%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=PIY",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%224286466%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&searchId=5528b337-761c-4e71-bc54-25697089f8f5&sid=e(a",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2222243%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&searchId=5528b337-761c-4e71-bc54-25697089f8f5&sid=F0z",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2270469563%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&searchId=5528b337-761c-4e71-bc54-25697089f8f5&sid=FAV",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2264905036%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&searchId=5528b337-761c-4e71-bc54-25697089f8f5&sid=B(S",
];

const accessToken =
  "AQEDAT9J7gMA8gSdAAABme3x2GcAAAGaEf5cZ00AB9wB8_Ir3Z1RezYsrwITsIcB_CG4ALcKryymKQNdYGMoIxKtzwoDaPr6YolBOYQ-_17nt-upJsm62zalzegqtRdWt2lhYolFPWRMmcDK7jS4uo0d";
const profilePicClassName = "a.SpPziwuQCIKEdNMPWPohPnKsxYABoyFM.scale-down";
const connectBtnClassName = "scWJlwzDHzWKDfVLZAQeivbLDjCWazKCOJ";
const message = `Hi! I came across a job opening at your company. Over the past year, I’ve been putting in 8+ hrs daily solving 500+ DSA problems, system design, and Striver A2Z, Fraz prep, and I’d truly value a referral. I’ll share everything needed just need a chance to prove myself.`;
// const message = `Hi, I’m a full stack dev with 3+ yrs of exp 👨‍💻, been putting in 8+ hrs a day for the past year to move into a product role — 500+ DSA Qs, system design, Striver A2Z. I’ve been giving it my all. A referral from you could mean a lot. I’ll share everything needed — just need a shot to prove myself`;
const target = 3;
const sleepTime = 8000;

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
}

start();

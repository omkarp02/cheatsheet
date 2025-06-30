const puppeteer = require("puppeteer");

const openAndVisitProfiles = async ({
  url,
  accessToken,
  profilePicClassName,
  connectBtnClassName,
  message,
}) => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Set LinkedIn session cookie
  await page.setCookie({
    name: "li_at",
    value: accessToken,
    domain: ".www.linkedin.com",
  });

  // Go to search result page
  await page.goto(url, { waitUntil: "load" });

  // await page.waitForSelector(profilePicClassName);
  // let profileUrls = await page.$$eval(
  //   "a.wsMvqdsCQwHMdXuvCLlSAkmVYButhGSUc.scale-down",
  //   (anchors) => anchors.map((a) => a.href)
  // );

  // console.log("Found profiles:", profileUrls.length);

  profileUrls = ["https://www.linkedin.com/in/vrindagupta6828/"];

  for (let i = 0; i < profileUrls.length; i++) {
    const url = profileUrls[i];
    console.log(`Visiting profile ${i + 1}: ${url}`);
    await page.goto(url, { waitUntil: "load", timeout: 60000 });

    await sleep();

    try {
      const connectButtonSelector =
        "button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.HPcxDmiFjMinmNTnZZCqqqBWZrSFpBBBS";

      await page.waitForSelector(connectButtonSelector, { timeout: 5000 });

      // Extract the button's visible text
      const buttonText = await page.$eval(connectButtonSelector, (el) =>
        el.innerText.trim()
      );

      console.log(buttonText, "<<<<<<<")

      if (buttonText.toLowerCase() === "connect") {
        await page.click(connectButtonSelector);
        await connectButtonClickedNowHandleRest(page, message);
      } else if(buttonText.toLowerCase() === "follow") {
        
      }
    } catch (e) {
      console.log("❌ Follow button not found on this profile");
    }
  }

  await browser.close();
};

async function connectButtonClickedNowHandleRest(page, message) {
  await sleep(1000);
  const sendButtonSelector =
    "button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view.mr1";
  try {
    await page.waitForSelector(sendButtonSelector, { timeout: 5000 });
    await page.click(sendButtonSelector);
    await sleep(1000);
    await page.waitForSelector("#custom-message");
    await page.type("#custom-message", message, { delay: 100 });

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
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%221441%22%5D&keywords=software%20developer%20in%20goole&origin=FACETED_SEARCH&sid=whc";
const accessToken =
  "AQEFAHUBAAAAABZj3swAAAGV-gW6YwAAAZfKxFhoTQAAGHVybjpsaTptZW1iZXI6MTA2MTgwOTY2N47s_HRD-fq3WzQaPCUEdsP7L7H6c7KaNVqtWeFgf9MZPmmpKXjqe9XsKVLAfxr-C-tseghgUQMGLZMz8PaBYya85zA1eY86ZF92SSe2CWVupDV0UrLpx6T2GerAe9rr7KK4uC5eDa8WviXhhADiT02mV7lobpu32Vrb7Uk43UyKMILfIdPO9mbvD0F-uTb_4utnHOQ";
const profilePicClassName = "a.wsMvqdsCQwHMdXuvCLlSAkmVYButhGSUc.scale-down";
const connectBtnClassName = "";
const message = `Hi, I'm a full stack dev with 3+ yrs exp. For the past 1 year (and continuing), I’ve been prepping 8+ hrs daily for product roles (Striver A2Z, 500+ DSA Qs, Sys Design via HelloInterview & JHNL). A referral could truly change my career. Can share resume & job code!`;

openAndVisitProfiles({ url, accessToken, profilePicClassName, message });

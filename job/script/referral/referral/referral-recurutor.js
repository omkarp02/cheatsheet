const puppeteer = require("puppeteer");
const { sleep, visitUserProfile } = require("../utils");

const openAndVisitProfiles = async ({
  url,
  accessToken,
  noOfTimesloadMoreButtonclickedLimit = 5,
  target,
  message,
  connectBtnClassName,
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
    domain: ".linkedin.com",
  });

  // Go to LinkedIn page
  await page.goto(url, { waitUntil: "load" });

  // Keep clicking "Load More" until button disappears
  const loadMoreSelector = "button.scaffold-finite-scroll__load-button";

  let noOfTimesloadMoreButtonclicked = 0;
  sleep(2000);

  while (noOfTimesloadMoreButtonclicked < noOfTimesloadMoreButtonclickedLimit) {
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

  const c = await visitUserProfile(
    profileUrls,
    page,
    message,
    connectBtnClassName,
    target,
    0
  );
  console.log(`Total profiles visited: ${c}`);
  await browser.close();
};

const url = "https://www.linkedin.com/company/pwc/people/?keywords=recruiter";
const accessToken =
  "AQEFAHUBAAAAABZj3swAAAGV-gW6YwAAAZfKxFhoTQAAGHVybjpsaTptZW1iZXI6MTA2MTgwOTY2N47s_HRD-fq3WzQaPCUEdsP7L7H6c7KaNVqtWeFgf9MZPmmpKXjqe9XsKVLAfxr-C-tseghgUQMGLZMz8PaBYya85zA1eY86ZF92SSe2CWVupDV0UrLpx6T2GerAe9rr7KK4uC5eDa8WviXhhADiT02mV7lobpu32Vrb7Uk43UyKMILfIdPO9mbvD0F-uTb_4utnHOQ";
const connectBtnClassName = "CsxDsEEFjhjMVzkHWhOfnjPxZLGFufNuFZA";
const message = `Hi, I’m a full stack dev with 3+ yrs of exp 👨‍💻, been putting in 8+ hrs a day for the past year to move into a product role — 500+ DSA Qs, system design, Striver A2Z. I’ve been giving it my all. A referral from you could mean a lot. I’ll share everything needed — just need a shot to prove myself `;

openAndVisitProfiles({
  url,
  accessToken,
  noOfTimesloadMoreButtonclickedLimit: 5,
  target: 20,
  message,
  connectBtnClassName,
});

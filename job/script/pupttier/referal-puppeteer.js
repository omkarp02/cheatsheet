const puppeteer = require("puppeteer");
const {
  updatePageInUrl,
  sleep,
  getPageFromUrl,
  visitUserProfile,
} = require("./utils");

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

    const c = await visitUserProfile(
      profileUrls,
      page,
      message,
      connectBtnClassName,
      target,
      count
    );
    count = c;
    if (count >= target) {
      console.log(`Target reached: ${count} connections made.`);
      return;
    }
    pageNumber += 1;
    url = updatePageInUrl(url, pageNumber);
    await sleep(1000);
    console.log(`Count till now >>>>>>>>> ${count}`);
  }

  await browser.close();
};



const url = [
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2222688%22%5D&keywords=atlassin%20software%20engineer&origin=FACETED_SEARCH&sid=68P",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%221382%22%5D&keywords=goldman%20sach%20software%20engineer&origin=FACETED_SEARCH&sid=B%3AY",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%221068%22%5D&keywords=jpmorgan%20software%20engineer&origin=GLOBAL_SEARCH_HEADER&sid=dTR"
];
const accessToken =
  "AQEFAHUBAAAAABZj3swAAAGV-gW6YwAAAZfKxFhoTQAAGHVybjpsaTptZW1iZXI6MTA2MTgwOTY2N47s_HRD-fq3WzQaPCUEdsP7L7H6c7KaNVqtWeFgf9MZPmmpKXjqe9XsKVLAfxr-C-tseghgUQMGLZMz8PaBYya85zA1eY86ZF92SSe2CWVupDV0UrLpx6T2GerAe9rr7KK4uC5eDa8WviXhhADiT02mV7lobpu32Vrb7Uk43UyKMILfIdPO9mbvD0F-uTb_4utnHOQ";
const profilePicClassName = "a.DGvtWMHHFxUFucvarCuTmPvyMuWuwlaQNuYA.scale-down";
const connectBtnClassName = "faqzinvCiVXCcrTKmfaOyagkrhoCys";
const message = `Hi, I’m a full stack dev with 3+ yrs of exp 👨‍💻, been putting in 8+ hrs a day for the past year to move into a product role — 500+ DSA Qs, system design, Striver A2Z. I’ve been giving it my all. A referral from you could mean a lot. I’ll share everything needed — just need a shot to prove myself`;
const target = 20;

openAndVisitProfiles({
  url: url[2],
  accessToken,
  profilePicClassName,
  connectBtnClassName,
  message,
  target,
});

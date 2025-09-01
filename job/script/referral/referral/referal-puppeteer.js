const puppeteer = require("puppeteer");
const {
  updatePageInUrl,
  sleep,
  getPageFromUrl,
  visitUserProfile,
} = require("../utils");

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
    const browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      defaultViewport: null,
      args: [
        "--window-size=1680,1000", // width=1280, height=800
      ],
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
        anchors
          .map((a) => a.href)
          .filter((href) => href.startsWith("https://www.linkedin.com/in"))
      );

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
      if (count >= target) {
        console.log(`Target reached: ${count} connections made.`);
        break;
      }
      pageNumber += 1;
      url = updatePageInUrl(url, pageNumber);
      await sleep(sleepTime);
      console.log(`Count till now >>>>>>>>> ${count}`);
    }

    await browser.close();
    res();
  });
};

const url = [
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2210479149%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=X%3B~&page=2",
];

const accessToken =
  "AQEDAT9J7gMApYrQAAABmOZizeMAAAGZCm9R41YA0X0wVCcSQDOFeXf07K5kE0wqAtbmSO-ci_NIJUTxcOAsCrtZqzpflGLuGEa1iabwZzzb5o0bHVLji3V1LUIFchuu02IbGXgQLig2Twfz2Lyl8sat";
const profilePicClassName =
  "a.EaWzLdfjwgloMRCqeXHrsnLLcqdpxKtzA.scale-down";
const connectBtnClassName = "FfIPuXrmRfyODFGvFlVcWkcgYCJHDQBATgY";
const message = `Hi, I’m a full stack dev with 3+ yrs of exp 👨‍💻, been putting in 8+ hrs a day for the past year to move into a product role — 500+ DSA Qs, system design, Striver A2Z. I’ve been giving it my all. A referral from you could mean a lot. I’ll share everything needed — just need a shot to prove myself`;
const target = 10;
const sleepTime = 3000

async function start() {
  for (let item of url) {
    await openAndVisitProfiles({
      url: item,
      accessToken,
      profilePicClassName,
      connectBtnClassName,
      message,
      target,
      sleepTime
    });
  }
}

start();

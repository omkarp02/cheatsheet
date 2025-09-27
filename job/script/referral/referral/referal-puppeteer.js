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
 
  "https://www.linkedin.com/search/results/people/?keywords=software%20engineer%20goldman%20sachs&origin=SWITCH_SEARCH_VERTICAL&searchId=fe81c71f-bf26-421f-9ada-e04fc69b8a68&sid=dAA",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%221068%22%2C%221067%22%5D&keywords=jp%20morgan%20software%20engineer&origin=FACETED_SEARCH&sid=%408p",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%221035%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=H-~",
  "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2280918929%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=93S",
  // "https://www.linkedin.com/search/results/people/?currentCompany=%5B%22497017%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=I7Z",
  // "https://www.linkedin.com/search/results/people/?currentCompany=%5B%221482%22%5D&keywords=paypal%20software%20engineer&origin=FACETED_SEARCH&searchId=1d561ecd-3c9f-40e1-bc60-e4d6cf76cbf9&sid=-Em",
  // "https://www.linkedin.com/search/results/people/?currentCompany=%5B%222340144%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=y3a",
  // "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2210479149%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=X%3B~",
  // "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2217988315%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=lLq",
  // "https://www.linkedin.com/search/results/people/?currentCompany=%5B%221815218%22%5D&keywords=software%20engineer&origin=FACETED_SEARCH&sid=EDp",
  // "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2211174522%22%2C%229390173%22%2C%222646%22%5D&keywords=walmart%20software%20engineer&origin=FACETED_SEARCH&sid=a~X",
];

const accessToken =
  "AQEDAT9J7gMD0g2nAAABmS51whEAAAGZhivWu00AXr177QMmh0XNygE7Gs_b64xRDxxQA8UupST1IomTkScqI9duobu-qCur7pxRRIB_nm765urkhEqPNo2PByhGjRr_aMp9_ZRZII-M1ZI8KYfF8jpc";
const profilePicClassName = "a.pVgHQJscSHWSyOoSAQIMWsVcRbnRZrJxuo.scale-down";
const connectBtnClassName = "gyZFeomkAChcAYBbVgryEqYTorPWI";
const message = `Hey, I was wondering if you could kindly review my resume. I recently applied to your company through a referral, but unfortunately, my resume didn’t make it through. I’d really appreciate any suggestions or feedback that could help me improve for future opportunities. Resume: https://surl.lt/nbeuwi`;
// const message = `Hi, I’m a full stack dev with 3+ yrs of exp 👨‍💻, been putting in 8+ hrs a day for the past year to move into a product role — 500+ DSA Qs, system design, Striver A2Z. I’ve been giving it my all. A referral from you could mean a lot. I’ll share everything needed — just need a shot to prove myself`;
const target = 20;
const sleepTime = 2000;

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

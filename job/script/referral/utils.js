function updatePageInUrl(url, newPageNumber) {
  const urlObj = new URL(url);

  // Update or set the `page` parameter
  urlObj.searchParams.set("page", newPageNumber);

  return urlObj.toString();
}

function getPageFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pageParam = urlObj.searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  } catch (err) {
    console.error("Invalid URL:", err.message);
    return null;
  }
}

function randomDelay(min = 1500, max = 4000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function handleIfBtnTextIsFollow(
  page,
  message,
  connectBtnClassName,
  sleepTime
) {
  return new Promise(async (res) => {
    // Partial class-based selector, omitting dynamic hash class (which may change)
    const selector = `.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view.${connectBtnClassName}.artdeco-button.artdeco-button--secondary.artdeco-button--muted.artdeco-button--2`;

    // Wait until at least one button with this class appears
    await page.waitForSelector(selector);

    // Get all matching buttons
    const buttons = await page.$$(selector);

    for (const btn of buttons) {
      const text = await btn.evaluate((el) =>
        el.innerText.trim().toLowerCase()
      );
      if (text.toLowerCase() === "more") {
        await btn.click();

        const selector =
          ".artdeco-dropdown__item.artdeco-dropdown__item--is-dropdown.ember-view.full-width.display-flex.align-items-center";

        // Wait for elements to be present
        try {
          await page.waitForSelector(selector, { timeout: 1000 });
        } catch (error) {
          res(false);
        }

        // Get all matching divs
        const items = await page.$$(selector);

        for (const item of items) {
          // Get inner text and role
          const [text, role] = await Promise.all([
            item.evaluate((el) => el.innerText.trim().toLowerCase()),
            item.evaluate((el) => el.getAttribute("role")),
          ]);

          // Check both conditions
          if (text === "connect" && role === "button") {
            await item.click();
            await connectButtonClickedNowHandleRest(page, message, sleepTime);
            res(true);
            break;
          }
        }
        res(false);
        break;
      }
    }
  });
}

async function connectButtonClickedNowHandleRest(page, message, sleepTime) {
  await sleep(randomDelay());
  const sendButtonSelector =
    "button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view.mr1";
  try {
    await page.waitForSelector(sendButtonSelector, { timeout: 5000 });
    await page.click(sendButtonSelector);
    await sleep(randomDelay());
    await page.waitForSelector("#custom-message");
    await page.type("#custom-message", message, { delay: 40 });

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

async function visitUserProfile(
  profileUrls,
  page,
  message,
  connectBtnClassName,
  target,
  countUntilNow,
  sleepTime
) {
  let count = countUntilNow;
  for (let i = 0; i < profileUrls.length; i++) {
    const url = profileUrls[i];
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await sleep(randomDelay());

    try {
      const connectButtonSelector = `button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.${connectBtnClassName}`;

      await page.waitForSelector(connectButtonSelector, { timeout: 5000 });

      // Extract the button's visible text
      const buttonText = await page.$eval(connectButtonSelector, (el) =>
        el.innerText.trim()
      );

      if (buttonText.toLowerCase() === "connect") {
        await page.click(connectButtonSelector);
        await connectButtonClickedNowHandleRest(page, message, sleepTime);
        count++;
      } else {
        const res = await handleIfBtnTextIsFollow(
          page,
          message,
          connectBtnClassName,
          sleepTime
        );
        if (res) count++;
      }

      if (count >= target) {
        return count;
      }
      await sleep(randomDelay());
    } catch (e) {
      console.log("❌ Follow button not found on this profile");
    }
  }
  return count;
}

const sleep = (milli = 5000) =>
  new Promise((res) => setTimeout(() => res(), milli));

module.exports = {
  sleep,
  updatePageInUrl,
  visitUserProfile,
  getPageFromUrl,
  handleIfBtnTextIsFollow,
  connectButtonClickedNowHandleRest,
  randomDelay,
};

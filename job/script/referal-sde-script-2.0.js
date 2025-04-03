
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function manuallySendConnectionRequest(timer, company) {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      const buttons = document.querySelectorAll(
        ".artdeco-dropdown__item.artdeco-dropdown__item--is-dropdown.ember-view.full-width.display-flex.align-items-center"
      );

      for (const button of buttons) {
        const ariaLabel = button.getAttribute("aria-label");
        if (ariaLabel?.startsWith("Invite")) {
          var name = ariaLabel.split(" ")[1];
          const sentence = generateSentence(name, company);
          button.click();
          await sleep(timer);
          await dothedeeds(timer, sentence);
          window.history.back();
          res();
          break; // Clicks only the first matching button
        }
      }
      console.log(" INVITE BUTTON NOT FOUND");
      res();
      window.history.back();
    }, timer);
  }, timer);
}

function generateSentence(name, company) {
    return `Hi ${name}, hope you're having a fantastic week! I came across your profile, and your journey to ${company} stood out to me. If you don't mind sharing, what resource helped you the most? Would love to connect and learn from your insights!`;
  }

  async function dothedeeds(timeout, sentence) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const addanotebtn = document.getElementsByClassName(
          "artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1"
        )[0];
        if (addanotebtn) {
          addanotebtn.click();
        }
  
        setTimeout(() => {
          var textArea = document.getElementById("custom-message");
  
          // Define the sentence you want to type
  
          // Function to simulate typing
          function simulateTyping(textArea, sentence) {
            let index = 0;
  
            function typeNextChar() {
              if (index < sentence.length) {
                const char = sentence[index];
  
                // Create and dispatch the keydown event for the current character
                const keyDownEvent = new KeyboardEvent("keydown", {
                  key: char,
                  keyCode: char.charCodeAt(0),
                  code: "Key" + char.toUpperCase(),
                  bubbles: true,
                });
                textArea.dispatchEvent(keyDownEvent);
  
                // Create and dispatch the input event
                const inputEvent = new Event("input", { bubbles: true });
                textArea.dispatchEvent(inputEvent);
  
                // Add the character to the textarea (simulating user input)
                textArea.value += char;
  
                index++;
                typeNextChar(); // Delay between characters (in milliseconds)
              }
            }
  
            // Start the typing simulation
            typeNextChar();
          }
  
          simulateTyping(textArea, sentence);
          setTimeout(() => {
            const sendbtn = document.getElementsByClassName(
              "artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1"
            )[0];
            if (sendbtn) {
              sendbtn.click();
              res();
            }
          }, timeout);
        }, timeout);
      }, timeout);
    });
  }

manuallySendConnectionRequest(1000, "PWC")

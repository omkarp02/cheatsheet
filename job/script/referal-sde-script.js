const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function asdf(company, timeout) {
    let count = 0
  //sciprt to get name and click on connect button
  let sentence = "";
  for (let containerElement of document.getElementsByClassName(
    "pSKuFErhtfvgKSlouhoEsFcdRYwFbaeAQ omkzJTCjkFOThHPMVNEiiakGTTyJmYDCjH"
  )) {
    await sleep(timeout)
    var button = containerElement.querySelector("button");
    if(!button) continue
    var ariaLabel = button?.getAttribute("aria-label");
    if(!ariaLabel) continue
    if (ariaLabel.startsWith("Invite")) {
      var name = ariaLabel.split(" ")[1];
      console.log(name); // Output the name
      sentence = `Hi ${name}, hope you're having a fantastic week! I came across your profile, and your journey to ${company} stood out to me. If you don't mind sharing, what resource helped you the most? Would love to connect and learn from your insights!`;
      button.click(); // Simulate clicking the button

      await dothedeeds(timeout, sentence)
      count++
    } else {
      console.log('aria-label does not start with "Invite". No action taken.');
    }
  }

  console.log("total send are ", count)
}

async function dothedeeds(timeout, sentence){
    return new Promise((res, rej)=> {
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
                  res()
                }
              }, timeout);
            }, timeout);
          }, timeout);
    })
}


asdf("Google", 1000);

//*************************************************** */


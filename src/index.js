//this file is responsible for what happens in the popup window. They are kept separate because they refer to different DOMs.
import './styles.css'


/*This function is called once the summary or error message has been gathered. It first changes the progress message to "Click to reveal summary". Upon the clicking of the "body" of the page, that text is removed. 
Then, if the error variable passed is 1 (symbolizing success), the previously invisible "copy to clipboard" button is revealed and an event listener is added for when that button is clicked. Upon clicking, using the Web Clipboard API, the summary message is copied to the users clipboard.
The .then/.catch method is used to handle errors in using the api. Upon success and failure of the API, the message of the tooltip is changed to say success or failure. Finally, the paragraph, or error message, is presented to the user, and the event listener is removed to prevent more summaries from being presented.*/
function manipulateDOM(message, error) {
  const h3 = document.querySelector("h3")
    
  h3.textContent = "Click to reveal summary"
    
  const body = document.getElementById("body")
    
  body.addEventListener("click", function presentMessage() {
    h3.remove()

    if(error){
      const buttonCopy = document.getElementById("button-copy")
      const tooltipCopy = document.getElementById("tooltip-copy")
      
      buttonCopy.style.visibility = "visible"
    
      buttonCopy.style.pointerEvents = "all"

      buttonCopy.addEventListener("click", () => {
        navigator.clipboard.writeText(message)
        .then(function() {
          tooltipCopy.innerText = "Summary copied!"
          setTimeout(function() {
            tooltipCopy.innerText = "Copy summary to clipboard"
          }, 1000)
        })
        .catch(function(error) {
          tooltipCopy.innerText = "Failed to copy summary."
          console.error("Unable to copy text to clipboard", error)
          setTimeout(function() {
            tooltipCopy.innerText = "Copy summary to clipboard"
          }, 1000)
        })
      })
    }

    const para = document.createElement("p")
      
    const text = document.createTextNode(message)
      
    para.appendChild(text)

    body.style.alignItems = "flex-start"
      
    body.appendChild(para)
    
    body.removeEventListener("click", presentMessage)
  })
}

//upon opening of the extension, a tabs query uses the active and current window params to find the current tab. It then sends a message with that tabs id and with the action 'scrape!'.

/*Takes place upon clicking of the icon of the popup. It first grabs the current tab of the current window of chrome. Then it sends a message to the content script and awaits a response (because within the content script is asynchronous code). Upon a response, it is tested for legitimacy. If it is legit, then it will be sent to the manipulate DOM function along with an error code of one.
Upon illegitimacy, the error message to be presented to the user is passed to manipulate DOM with an error code of 0.*/ 
async function beginQuery() {
  const tabs = await new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      resolve(tabs)
    });
  });
  const activeTab = tabs[0]
  try {
    const response = await new Promise(resolve => {
      chrome.tabs.sendMessage(activeTab.id, { action: 'scrape!' }, function (response) {
        console.log("Response success!")
        console.log(response)
        resolve(response)
      })
    })

    // Now that we have the response, check if 'data' is defined before proceeding
    if (response && response.data !== undefined) {
      manipulateDOM(response.data, response.error)
    } else {
      console.error('Error: Response or response.data is undefined.')
      const errMessage = 'Summary failed. Please refresh the page and try again!'
      manipulateDOM(errMessage, 0)
    }
  } catch (error) {
    console.error('Error in beginQuery:', error)
  }
}

/*Handles pressing of the close button*/
const closeButton = document.getElementById("button-close")
closeButton.addEventListener("click", () => {
  window.close()
});

/*Puts the vehicle in motion.*/
beginQuery()
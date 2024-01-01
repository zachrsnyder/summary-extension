import OpenAI from 'openai'

/*This asynchronous function makes a call to chat gpt using the OpenAI API. It uses try-catch to process any errors that may occur in the usage of the API. Upon success the function returns the generated summary. Upon failure it returns an error message.*/
async function callAPI(paragraph) {
  const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true })
  /*This API Key is no longer in use.*/
    try{
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You summarize articles.",
          },
          { role: "user", content: paragraph },
        ],
        model: "gpt-3.5-turbo-1106",
      })
      const summary = completion.choices[0].message.content
      return summary
    }
    catch(error){
      const gptError = "An error has occured in the creation of the summary."
      return gptError
    }
}


/*This event listener is waiting for a request from index.js telling it "scrape!". Because the content script has access to the DOM of the webpage (rather than to the extension), it is able to scrape the title and paragraph text from the page to construct a prompt. It then uses the callApi function to get the summary that has been requested by the user. It uses .then/.catch to handle the promise returned by the function.*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action === 'scrape!') {
        
        const title = document.title
        
        const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.textContent)
        
        const prompt = 'Summarize this in 150 words or less:\nTitle: '+ title + '\n\nContent:\n' + paragraphs.join('/n')
        
        console.log('fuck')

        callAPI(prompt)
            .then(summary => {
                // Send the response only once
                sendResponse({ action: 'summaryReturned', data: summary, error: 1})
            })
            .catch(error => {
                console.error(error)
                // Send the response only once
                sendResponse({ action: 'summaryReturned', data: error.message,  error: 0})
            });
    }
    return true
})

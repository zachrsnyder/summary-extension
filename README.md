# I Ain't Readin' Allat

Hello! This is my first attempt at developing something for the web. I am going to attempt to **Summarize** some of the things I learned in the process in hopes that someone might read this and find it interesting and to help wrap my brain around everything I learned.

### The Mission

#### The problem:
The problem is rooted in laziness. I do not like to read, especially about politics. 

#### The solution:
So to make that task, that I feel as though I should do, a little easier, I wanted to make a chrome extension that could summarize and shorten the passage I was reading. I had used ChatGpt to generate summaries for me in the past so I knew it was legit and could be used to create a good solution to my problem.

This was also a subproblem in my teams' tigerhacks project this year: [The Otherside](https://github.com/aaron-yang799/tiger-hacks), but we had no experience with web development prior to that so not much was accomplished. However, the idea and attempt got us 6th place!

--------------

## Code Overview

#### manifest.json

- Used in chrome extension (like this one) to provide the browser with essential metadata that gives information into how the files are to be interpreted.
- There are three versions of manifest with different key-value requirements. For this application the most recent version was used.
- Some of the important members:
  * "permissions": gave myself access to the current tab of the window of chrome as well as access to the clipboard (copy and paste).
  * "default_popup": the html file that contains the content of the popup window. (which has my index.js linked inside).
  * "content_scripts": I have one bundled content script that is to be applied to all urls (although its use is only for some urls).
  * "background"/"service_worker": this bundled script has essentially no content but it starts upon opening of the window and has access to no DOMs.

#### package.json

- Used in Node.js projects to manage dependencies (as found in node_modules), some metadata similar to the manifest file, as well as some scripts that can be used to build (puts package manager to work), start the project, or test it.
- Some of my uses:
  * "build": build commands can do a lot of things such as compile code into machine code or run quality tests. My purpose for the build command is to utilize the webpack package manager to bundle my code and its dependencies together. Bundled code can be found in the dist folder.
  * "dependencies": These are essentially the outsourced things my code uses. The "openai" depency is the big ticket item here because that is how the summary was generated. I did not use a .env file because it caused some problems I didn't really feel like working around with webpack and some things within the dotenv module.
  * "devDependencies": In here are some loaders that I used. Loaders are used to transform the source code of certain things like style sheets and images so that they can be bundled. Webpack (the bundler) is also listed as a dependency.

#### webpack.config.cjs

- Gives Webpack direction on how to bundle my code and its dependcies.
- The entry is where to find the code to be bundled.
- The output is what to name and where to place the bundled code.
- The module gives rules on how to handle certain file types. For my use I included a test for .css files and told it to use the required laoders, then I tested for moduler and normal .js files and specified that the file extension (.mjs or .js) won't necessarily be included in the importing of files of this type. Then I have a test for all image types then a test for all font types.

#### src

This folder contains my JavaScipt code as well as an assets folder containing all of the images and fonts used in my project.

##### content.js

- content scripts are useful because they can manipulate and scrape from the DOM of the html you are accessing on the web. So, that is exactly what this script is doing.
- Upon receiving a message from the popup script (index.js), this script scrapes the information essential for the summary (the body paragraphs and the title).
- A prompt is constructed and passed to the "callAPI" asynchronous function where the program waits for the eventual response from GPT using gpt-3.5-turbo.
  * I have been having issues with extensive wait times in generating summaries on occasion. I have not yet run testing to see where the hold up is but I am assuming it is rooted in the chat completion. Other suspect is the chrome.tabs.query in the index.js file, but the query's params narrow it down to one obvious tab (the current one!).
- The summary is then sent back to index.js using sendResponse.

##### index.js

- Once index.html is opened (the extension is opened) the asynchronous "beginQuery" function is invoked.
- Chrome.tabs.query is used to find the active tab of the current instance of chrome via a Promise object.
- Then, similarly, a Promise object is used to send a message to the content script telling it that it is time to scrape.
- After the wait is over and a response has been returned, the response is checked for legitimacy.
- If it is valid, then the summary is sent to manipulateDOM. If it is invalid, then an error message is sent instead.
- manipulateDOM does a lot of self explanatory DOM manipulate as well as creating an event listener for when the #body elemenent is pressed.
- When that element is pressed prompt to reveal the summary is deleted and the summary is displayed. The copy to clipboard button is then revealed and it's event listener is added.

---------------------

## Usage

There are some things intentionally left out of this repository. If you want to try this out for yourself there are some things to do first.

- This is a Node.js project and uses node modules. So Node.js will need to be installed.
- Once it's installed, you can use the "npm i" command to download all of the necessary modules (they are listed in package.json and that is how it'll know what to install).
- Then, you need to go onto OpenAi's website and get an api key and replace the inactive on that is in content.js.
- Because that was just changed, you need to change the build of content done by webpack to match that key. This can be done with "npm run build".
- Then go to chrome, click on the extension icon, click manage extension, turn on developer mode, then click load unpacked and insert the folder with all of the files in it.







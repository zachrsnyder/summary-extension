# I Ain't Readin' Allat

Hello! This is my first attempt at developing something for the web. I am going to attempt to **Summarize** some of the things I learned in the process in hopes that someone might read this and find it interesting and to help wrap my brain around everything I learned.

### The Mission

#### The problem:
The problem is rooted in laziness. I do not like to read, especially about politics. 

#### The solution:
So to make that task, that I feel as though I should do, a little easier, I wanted to make a chrome extension that could summarize and shorten the passage I was reading. I had used ChatGpt to generate summaries for me in the past so I knew it was legit and could be used to create a good solution to my problem.

This was also a subproblem in my teams' tigerhacks project this year: [The Otherside](https://github.com/aaron-yang799/tiger-hacks), but we had no experience with web development prior to that so not much was accomplished. However, the idea and attempt got us 6th place!.

--------------

## Code Overview

#### Manifest.json

- Used in chrome extension (like this one) to provide the browser with essential metadata that gives information into how the files are to be interpreted.
- There are three versions of manifest with different key-value requirements. For this application the most recent version was used.
- Some of the important members:
  * "permissions": gave myself access to the current tab of the window of chrome as well as access to the clipboard (copy and paste).
  * "default_popup": the html file that contains the content of the popup window. (which has my index.js linked inside).
  * "content_scripts": I have one bundled content script that is to be applied to all urls (although its use is only for some urls).
  * "background"/"service_worker": this bundled script has essentially no content but it starts upon upon opening of the window and has access to no DOMs.

#### Package.json

- Used in Node.js projects to manage dependencies (as found in node_modules), some metadata similar to the manifest file, as well as some scripts that can be used to build (puts package manager to work), start the project, or test it.
- Some of my uses:
  * "build" 




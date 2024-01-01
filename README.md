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
- Some of the essential keys in my manifest file (besides the obvious name, version, manifest_version, etc):
    -"permissions": Tells the browser what permissions my extension has. My extension required the "activeTab" permission (allows access to the content and information on the currently active tab) and the "clipboardWrite" permission (gives ability to write things to the users clipboard. i.e copy and paste).
    -

## What the website blacklist does:

The website blacklist is one of the filters used by the spam detection bot SmokeDetector. It consists of a list of websites associated with known spam that automatically raise suspicion when posted anywhere on Stack Exchange.

Blacklisting a website makes SmokeDetector report every post that is posted or modified with a link to the website (formatted as a link or otherwise) in its text. The website blacklist is maintained in the [SmokeDetector GitHub repository](https://github.com/Charcoal-SE/SmokeDetector), specifically in the file [blacklisted_websites.txt](https://github.com/Charcoal-SE/SmokeDetector/blob/master/blacklisted_websites.txt).

## When to blacklist a website:

Generally, it makes sense to blacklist a website if all of the following criteria are met:

- Website has been used in **at least** 2 confirmed instances (tp fed back reports) of spam (You can use https://metasmoke.erwaysoftware.com/search to find other instances of a website being used for spam).

- Website is not used legitimately in other posts on Stack Exchange.

- Website is not currently caught in either of these filters:
	- bad keyword in body
	- blacklisted website
	- pattern matching website

You can test this by using the **!!/test <string to test>** command. (or **!!/test-a <string to test>** to test as an answer).

## How to blacklist a website:

Everyone with SmokeDetector privileges (if you don't have those and would like them, read up on [how to get them](Privileges)) can blacklist a website, though the action will require admin-approval for most people. Additions to the blacklist (via both methods) must be valid regular expressions (regex). In reality that means for largely exact matches (like the website blacklist) that you ensure that special characters (like `.`) are escaped. (Example: `thisisspam\.com`)

There are 2 methods to add a website to the blacklist:

- Propose a change to the [blacklisted_websites.txt](https://github.com/Charcoal-SE/SmokeDetector/blob/master/blacklisted_websites.txt) file on GitHub and create a pull request specifying why you want to blacklist the website.

- Use the "!!/blacklist-website <regex string>" command in any of the Smoke Detector chatrooms. This will create a pull request containing your change for you.
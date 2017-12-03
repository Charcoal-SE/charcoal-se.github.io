Blacklisting or watching a keyword or a web site address cause the spam detection bot SmokeDetector to trigger an alert whenever that keyword or web site address appears in a post.  In other words, it basically says that any post containing this expression is spam, or at least suspicious.

## The Website Blacklist

The website blacklist consists of a list of websites associated with known spam that automatically raise suspicion when posted anywhere on Stack Exchange.

Blacklisting a website makes SmokeDetector report every post that is posted or modified with a link to the website (formatted as a link or otherwise) in its text.

The website blacklist is maintained in the [SmokeDetector GitHub repository](https://github.com/Charcoal-SE/SmokeDetector), specifically in the file [blacklisted_websites.txt](https://github.com/Charcoal-SE/SmokeDetector/blob/master/blacklisted_websites.txt).

## The Keyword Blacklist

The keyword blacklist consists of a list of phrases which are frequently seen in spam, and rarely outside of spam posts.

Blacklisting a "keyword" (which can actually be a regular expression matching a phrase or a more-complex expression with alternatives, like `find (true )?love` which matches either of "find love" or "find true love") causes any post which matches it to be reported as probable spam by SmokeDetector.  Matches are not reported in the middle of a word; the keyword expression "dog" does not match "doggone" or "endogenous".

The keyword blacklist is maintained in the [SmokeDetector GitHub repository](https://github.com/Charcoal-SE/SmokeDetector), specifically in the file [bad_keywords.txt](https://github.com/Charcoal-SE/SmokeDetector/blob/master/bad_keywords.txt).

## Watch Expressions

"Watching" an expression causes SmokeDetector to report it just like a blacklist expression, but the rule weight is kept low, so as to prevent matches from triggering autoflagging. Posts which only match watched expressions and no other rules are not reported in other chat rooms, just in Charcoal. That means you can use `!!/watch` to try out different patterns experimentally, just to get an idea of what sorts of posts match a particular expression.

The list of watched expressions is maintained in the [SmokeDetector GitHub repository](https://github.com/Charcoal-SE/SmokeDetector), specifically in the file [watched_keywords.txt](https://github.com/Charcoal-SE/SmokeDetector/blob/master/watched_keywords.txt).  The format is slightly different from the other similar files; each entry is a tab-delimited record which includes a date stamp (expressed as Unix epoch, i.e. seconds since midnight Jan 1 1970 UTC) and the user name of the person who added the expression.

## Rules for Blacklisting and Watching

We have established the following rules for watching and blacklisting.

* **Blacklisted websites:** reserved for sites which we are highly confident that are used only in spam. You may add a site to this list if *one of* the following is true.
  * The site has at least five hits in Metasmoke, with no false positives, and at least one of them is below the default autoflagging threshold (currently, 280) and no older than six months.
  * There are more than twenty hits in the last six months, and no false positives.
  * There are recent hits, and more than 30 hits overall, and no false positives.
* **Blacklisted keywords:** reserved for phrases which we are highly confident that are used only in spam.  You may add a phrase to this list if the following is true.
  * The phrase has been used repeatedly in recent spam and has no false positives in Metasmoke, and searching on Stack Exchange indicates that it is not a common phrase on any site in the network.
* **Watched keywords:** anything is game, but be prepared to have it removed if circumstances require it.
  * We will be removing patterns periodically; you can reduce the risk of having useful patterns removed by proactively removing patterns you no longer are interested in, or which produce very uncertain value.
  * Autoflagging weight for this reason is technically forced to stay at 1.
  * Smoke Detector will regard these rules as "experimental"; it will not alert in other rooms than Charcoal HQ if there are hits solely from this set of rules.

## How to Blacklist or Watch Something

You will want to test that the expression you want to blacklist or watch isn't already covered by one of the existing patterns.

You can test this by using the `!!/test <string to test>` command (or `!!/test-a <string to test>` to test as an answer).

Everyone with SmokeDetector privileges (if you don't have those and would like them, read up on [how to get them](Privileges)) can blacklist a website, though this will need to be approved by someone with code privileges if you don't already have them. Additions to the blacklist must be valid regular expressions (regex). In reality that means for largely exact matches (like the website blacklist) that you ensure that special characters (like `.`) are escaped. (Example: `thisisspam\.com`)

There are two methods to add a website to a watch list or blacklist:

- Propose a change to the relevant file on GitHub and create a pull request specifying why you want to blacklist the website.

- Use the pertinent chat command in any of the Smoke Detector chatrooms. This will create a pull request containing your change for you.
  - `!!/blacklist-website <regex>` to blacklist a web site
  - `!!/blacklist-keyword <regex>` to blacklist a keyword expression
  - `!!/watch <regex>` to add something to the watch list

If you're blacklisting or watching a complex regex to match a whole bunch of different stuff, it's probably better off in the pattern-matching section of `findspam.py`. You'll need to propose a change to the file on GitHub for this; ask for help if you're unsure what to do.
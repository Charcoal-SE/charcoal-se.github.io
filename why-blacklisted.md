---
published: false
---
<!-- Please delete the above Front Matter key when this page is ready to be published -->

<section>
# Why is the domain *example.com* in the "watched keywords" or "blacklisted websites" list?

Charcoal's goal is to detect and delete every spam post on the Stack Exchange network that violates the [self-promotion guidelines](https://stackoverflow.com/help/promotion). Our bot, [SmokeDetector](/#whats-smokey), uses a variety of methods to detect this spam, including watching for any mentions of particular keywords/websites in our series of curated watchlists/blacklists. These lists encompass a large number of keywords and domain names, and it's not always clear why a particular item was added to the list. This information should help clarify that; if you need more detail, feel free to ping a member of the Charcoal team or [email us](mailto:smokey@charcoal-se.org).

For a summary (TL;DR) of this page, [scroll down](#tldr).
</section>

<section>
## Why do domains get watched? {#why-watched}

From our past experience, websites that have appeared on Stack Exchange in confirmed spam posts are likely to appear again in future spam posts, so we "watch" them upon spotting any *potentially suspicious* appearance. This brings any future posts containing the link to our attention, so we can further review the posts to determine if they're actually unsuitable on Stack Exchange.

That says, being on the watchlist doesn't imply that the website is definitely spam, but rather one of our members *thinks it __might__ be correlated to spam*, and is worth future attention.
</section>

<section>
## Why do domains get blacklisted? {#why-blacklisted}

In the future, if the website turns out to be legitimate (i.e. not spam) then we remove it from the watchlist. However, if this is not the case, and the website continues to appear in future spam posts, then we may decide to 'upgrade' the site from the watchlist to the __blacklist__. The blacklist is subject to several stronger criteria than the watchlist, [as documented here](/smokey/Guidance-for-Blacklisting-and-Watching) - at present, we require that a website appear in a sufficient number of spam posts with no legitimate standing.

If a website appears on our blacklist, it means that the website is a __strong indicator of spam on the Stack Exchange network__. As such, blacklisted websites carry a greater weight in our system.

Similar to the watchlists, websites may be removed from the blacklist; however, this is a rarer occurence. Any external parties requesting for a domain to be removed from the blacklist must follow the [defined process](/smokey/Process-for-blacklist-removal).
</section>

<section>
## So, does that mean that it's a scam? {#scam}

Not necessarily. Our watchlists/blacklists are designed to help identify content on the Stack Exchange network that would be classified by their rules as spam: *"exists only to promote a product or service, and does not disclose the author's affiliation."*.

There are several websites on our lists that are generally considered legitimate (e.g. [fiverr](https://github.com/Charcoal-SE/SmokeDetector/blob/3df3268/watched_keywords.txt#L6326)), but are watched because they are commonly used in self-promotion on Stack Exchange. Similarly, there are many scammy or otherwise unsavory websites that do not appear on our lists, because they have not been seen in Stack Exchange spam before. Because of this, **we do not recommend using our lists to judge the legitimacy of a website**, rather we suggest that you perform further research of your own.
</section>

<section>
## How should I look for further details regarding a blacklisted website? {#investigation}

Glad you asked. [Here](https://metasmoke.erwaysoftware.com/search) is the search page for our backend database, [metasmoke](https://metasmoke.erwaysoftware.com). Using this tool, you can access data for every post that we have ever classified, including archived post text, feedback on whether or not it was spam, why it was caught, and any general comments. The [domain tracking tool](https://metasmoke.erwaysoftware.com/domains) may also be of use to track down related posts. You can use these tools to investigate the context in which any websites/keywords have been used on Stack Exchange in spam.

We also suggest exploring other avenues of research:
 - The Stack Exchange [network-wide search page](https://stackexchange.com/search) - if a website appears in several posts by trusted Stack Exchange users, then it adds to the credibility of the website
 - Searching the name of the spammer and any prominent individuals related to the website may reveal any spamming activities outside Stack Exchange, as well as LinkedIn profiles etc
 - Performing a reverse image search of the profile picture of the spammer/prominent personnel (e.g. CEO etc) - if the image is taken from a stock image provider, there is a good chance that the website is a scam (legitimate companies will be staffed by - surprise - actual people)
 - Check to see if the website/service is mentioned by any other prominent/trustworthy figures e.g. bloggers, YouTubers etc

When in doubt, it may be worth getting in contact with the website/company directly - if the service is legitimate, then they should be more than happy to answer your concerns. It is always possible that their spam posts on Stack Exchange were simply a misunderstanding of the self-promotion rules. Whatever the case, it is up to you to make an informed decision about the service based on all the information avaliable.
</section>

<section>
## What should I take from all this, anyway? {#tldr}

As a summary:
 - We watch/blacklist sites that are featured in spam on Stack Exchange in order to help identify future questionable posts
 - Just because a site is on on our lists does not mean that it is a scam
 - You should always do further research and make your own informed decision based on this information
 - We have tools which can assist you in doing this research

Hopefully this page has answered all of your concerns. If you have any further questions, feel free to contact `smokey@charcoal-se.org` and we will be happy to help.
</section>

<section>
## A legal note {#legal}

This page does not constitute legal advice. Charcoal does not condone or take any responsibility for any contact, interactions or business deals between any third parties (including Stack Exchange), as a result of, or in relation to, the information presented on this page.
</section>

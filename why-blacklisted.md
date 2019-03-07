---
published: false
---
<!-- Please delete the above Front Matter key when this page is ready to be published -->

# Why is X domain blacklisted?

One of the major parts of SmokeDetector is a set of blacklists of varying degrees of severity. These encompass a large number of
keywords and domain names, and it's not always clear why a particular item was added to the list. This information should help clarify
that; if you need more detail, feel free to ping a member of the Charcoal team or [email us](mailto:smokey@charcoal-se.org).

<section>
# Why is domain *xxx* inside "watched keywords" or "blacklisted websites"

Our goal is to catch every single spam post on the Stack Exchange network.
From our past experiences, websites that have appeared on Stack Exchange in a spammy manner are likely to appear again as spam,
therefore we "watch" them upon spotting any *potentially suspicious* appearance.
Putting them on our watchlist makes [the SmokeDetector bot](/#whats-smokey) bring any posts containing a link to them from new users
to our attention, so we can further review the posts to determine if they're actually unsuitable on Stack Exchange.

We remove websites from our watchlist if it turns out to be legitimate (i.e. not spam).
That says, being on the watchlist doesn't imply that the website is spam, but often as simple as
"one of our members thinks it *might be* spam".

Praeter the watchlist, we have much stricter criteria before putting a website on the blacklist.
At present, we require that a website appear in a sufficient number of spam posts with no legitimate standing.

In short, if a website appears on our blacklist, it means that the website has been spammed on the Stack Exchange network, and we believe it will continue to get spammed.

<!-- Where to insert https://charcoal-se.org/smokey/Guidance-for-Blacklisting-and-Watching ??? -->
</section>

<section>
## Where can I learn about the past records of a website? {#hows-search}

Glad you asked. [Here](https://metasmoke.erwaysoftware.com/search) is the search page of our backend database, [metasmoke](https://metasmoke.erwaysoftware.com).
</section>

<section>
# To be added
</section>

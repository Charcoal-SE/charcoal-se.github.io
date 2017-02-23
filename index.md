---
title: ''
---

# we are charcoal

> **Autoflagging**
>
> Charcoal are currently running an autoflagging initiative, to flag spam posts automatically based on past collected data. To find out more, go to [Autoflagging](/flagging).
{: .alert}

[Charcoal](http://chat.stackexchange.com/rooms/11540) are the people behind [SmokeDetector](https://github.com/Charcoal-SE/SmokeDetector), a community bot to detect spam on the [Stack Exchange network](http://stackexchange.com).

<section>
## What is SmokeDetector? {#whats-smokey}

SmokeDetector is a headless chatbot, written in Python, that scans all new and updated content across the Stack Exchange network to try to detect spam. And by 'everything', we mean 'everything' - that's every new post, on every SE site, plus every edit and other update. If it appears on the Stack Exchange-wide [real-time page](http://stackexchange.com/questions?tab=realtime), Smokey has seen it. That's about 100,000 posts scanned every day. Also, the bot is pretty accurate these days - some of the reasons that trip our filters have an accuracy of over 99%.

It's administered and developed by the [team of people](/people) you can find in [Charcoal HQ](http://chat.stackexchange.com/rooms/11540), our co-ordination chatroom. That's also where the posts that Smokey thinks are spam get reported to.

**Fact:** If you wrote all our spam tests out vertically at point size 36, they'd be as tall as the [One World Trade Center](https://en.wikipedia.org/wiki/One_World_Trade_Center).
</section>
<section>
## How does it work? {#technical-details}

*Warning: technical programming details ahead.*

SmokeDetector sets up a websocket connection to the same feed that powers the [Stack Exchange realtime page](http://stackexchange.com/questions?tab=realtime). This websocket provides us with the feed of posts to scan.

Every time a post comes in, we grab the full details of the post from the [Stack Exchange API](https://api.stackexchange.com/docs). Requests are bundled up wherever possible to save on our 10,000 requests per day API quota. Once we have the details, including the full text of the body, we run the post's body, title, and owner's username through [a whole load of tests](https://github.com/Charcoal-SE/SmokeDetector/blob/master/findspam.py), including several miles of regex (not literally) to determine whether or not the post is spam.

If we determine that the post is spam, we post a report of that fact to Charcoal HQ (and to some other chatrooms, based on certain conditions). This report is the cue for some humans to go and look at the post, check if it's spam, and flag it if so. This gets spam posts destroyed quickly. Those humans can then feed back to SmokeDetector to say whether the report was correct or not. We store this feedback in our web dashboard, [metasmoke](https://metasmoke.erwaysoftware.com), which is itself complex enough that it's a story for another day.
</section>
<section>
## Want to get involved? {#get-involved}

Anybody is welcome to get involved; the best way to do this is to drop into [Charcoal HQ](http://chat.stackexchange.com/rooms/11540) and observe. Get yourself familiar with what goes on there; chat to some of the regulars about the system, and you'll figure out how to get involved.

Eventually, when you're familiar with the system, you'll need to ask to be added to the privilege whitelist so that you can interact with SmokeDetector. There's a [wiki page](https://github.com/Charcoal-SE/SmokeDetector/wiki/Privileges) about that you should read before you ask; it'll give you some guidance about what we need from you and what you need to do.
</section>
<section>
## For developers {#for-devs}

If you're interested in integrating with the SmokeDetector system, we have an [API](https://github.com/Charcoal-SE/metasmoke/wiki/API-Documentation) that you can use to get stats about the system and to perform a limited set of write operations. Again, drop into chat for more information, or the docs are all available in the metasmoke wiki.
</section>

## Meta: Who to ping

When an organisation such as Charcoal is maintaining several large projects with many people involved, it can get confusing over who you should ping for help. Welcome to the one-stop shop for all your answers when it comes to getting in contact with the right people.

<section>

### In general - who has access to what {#general}

If you're not sure who has access to which systems, the general rule is this: our six [admins](/people) have the vast majority of access to the vast majority of systems; you'll probably do well to ping one of them. If they don't know, they'll certainly know who to pass it on to. Beyond that, our four metasmoke developers (Undo, ArtOfCode, thesecretmaster, and Makyen) have even higher accesses to metasmoke systems, and both Undo and Thomas Ward run the system and have total control.
</section>
<section>

### I have a question about how to use SmokeDetector, metasmoke, or one of the userscripts {#question}

Just ask in [Charcoal HQ](https://chat.stackexchange.com/rooms/11540/charcoal-hq)! There are always lots of regulars there willing to answer your questions. We also have a [wiki](https://charcoal-se.org/smokey) for SmokeDetector and the MS API which should answer many of your questions.
</section>
<section>

### I have a feature request for one of the projects {#feature-request}

First, put your idea out to the folks in Charcoal HQ (CHQ). If there seems to be a general consensus that it sounds like a good idea, make an issue on the appropriate GitHub repository. That way it's easier to track and discuss, and we won't forget about it.
</section>
<section>

### I'd like to contact the SmokeDetector maintainers {#smokey-maintainers}

Ping whichever of the following people happen to be in the room at the moment: Undo, ArtOfCode, angussidney, Thomas Ward, Andy, tripleee, iBug, and Makyen.
</section>
<section>

### I'd like to contact the metasmoke maintainers {#ms-maintainers}

Ping ArtOfCode or Undo, they do most of the development on metasmoke.
</section>
<section>

### I'd like to contact the FDSC maintainers {#fdsc-maintainers}

Ping one of the authors of the userscript, ArtOfCode or angussidney.
</section>
<section>

### I'd like to contact the AIM maintainers {#aim-maintainers}

Ping one of the authors of the userscript, J F, Glorfindel, or Makyen.
</section>
<section>

### I'd like to contact the FIRE maintainer {#fire-maintainers}

Ping Cerbrus or Makyen.
</section>
<section>

### I'd like to contact the author of one of your userscripts {#userscripts}

Take a look at the script's listing on the [userscripts page](/scripts), the main contributors should be listed. Alternatively, look in the source code of the userscript on GitHub, the author's name can be found in the metablock at the top of the file.
</section>
<section>

### I'd like to contact one of the maintainers of the website {#site}

J F, angussidney, ArtOfCode, and iBug are the primary authors and maintainers of the website.
</section>
<section>

### I'd like to speak with a moderator about something Charcoal-related {#mods}

If you find a post that needs moderator attention in general, please just **flag it** on the site. However, if you need to speak to a moderator about something specifically Charcoal-related, [these mods](/pings/mods) might be able to help you.
</section>
<section>

### I'd like to get someone's help to translate some possible spam into English {#translation}

[This page](/pings/langs) has a list of people who speak languages other than English.
</section>
<section>

### It's dead Jim! {#dead}

First of all, check that Smokey isn't responding to any commands (e.g. `!!/location`, `!!/alive`, etc.). You can also try rebooting Smokey (i.e. `!!/reboot`) from Charcoal Test, SOCVR, or Tavern on the Meta. More often than not, Smokey has just lost connection to Charcoal HQ. Next, check if the instance is still connected to MS [here](https://metasmoke.erwaysoftware.com/status) - if it is, something really bad has happened and you'll need to ask the person who owns the instance to shut it down. In the meantime, you can ask a blacklister (`!!/whois blacklister`) to failover to a new instance.

If all else fails, please ping one of the people with a **bold name** on [this list](/people), they will be able to start a backup instance of SmokeDetector, or reboot metasmoke.

If even that fails, panicking is acceptable (but of course, you know where your towel is and will remain calm). Ping ArtOfCode or Undo - they have a few extra tools in metasmoke that may yet be able to resolve the issue.

If Metasmoke is responding with HTTP 503 errors, make sure that it's not around 05:15 UTC or 17:15 UTC (give or take an hour for timezones) - Metasmoke reboots daily around this time to make sure it's not caching writes to the DB or other resources in swap or RAM.  If it is around that time, then wait a few minutes and try again. Otherwise, if Metasmoke is still not responding, check with Undo or Thomas Ward, they will be able to determine if there's something hindering Metasmoke's availability.
</section>
<section>

### Someone is being disruptive in Charcoal HQ, who can sort the situation out? {#behavior}

Ping one of the [Room Owners](https://chat.stackexchange.com/rooms/info/11540/charcoal-hq#room-ownercards). They will calm down the situation and take further action if necessary. If someone has violated SE's Code of Conduct, you can contact any diamond Moderator using flags.
</section>
<section>

### I'd like to be added to the privilege whitelist for SmokeDetector {#privileges}

Make sure that you've read the [Privileges](/smokey/Privileges) and [Feedback Guidance pages](/smokey/Feedback-Guidance), then ping one of the [SmokeDetector maintainers](#smokey-maintainers) and they will evaluate your request.
</section>
<section>

### I'd like to get further privileges (autoflagging, code access etc), who do I ask? {#more-privileges}

Please ping an admin: Undo, ArtOfCode, angussidney, Andy, tripleee, or Makyen.
</section>
<section>

### I have a userscript which is useful to the regulars of Charcoal HQ, and I'd like to get it included in the Userscripts repository. How can I get that to happen? {#add-userscript}

Ping Undo, ArtOfCode or angussidney, and they will give you push access to the repository to add your US. While you are waiting, you can make a pull request to add the userscript to the repo. Don't forget to leave a message in CHQ to let people know about it!
</section>
<section>

### There's some other code that I'd like to contribute, who can I talk to to get it included? {#code}

Just make a pull request to one of our repositories on GitHub. One of the maintainers will review your code and merge it in. Note that some projects have Continuous Integration (CI) tests that needs to be passed before that can happen.
</section>
<section>

### I need to discuss something with the admins privately, how can I contact them? {#private}

Please email <smokey@charcoal-se.org>, and it will reach the right people. This also applies to security issues; see [Security](https://charcoal-se.org/security).
</section>

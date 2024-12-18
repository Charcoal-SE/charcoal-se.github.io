---
---

# 4. Privileges
SmokeDetector has a limited number of [commands that are available for anyone to use][commandsNonPriv]. However,
all its major functionality requires additional "privileges" to use. Being a privileged user
means your user ID has been added to a list in SmokeDetector's code, which entitles you to
use privileged functionality.

## What do they let you do?
They let you use privileged functionality. That includes running [privileged
commands][commandsPriv] and providing feedback on SmokeDetector reports.
We have a [full list of privileges][Privileges] available in the wiki. More detail on [feedback][4]
is provided in the next section. You can
follow along with reports from SmokeDetector and flag spam without privileges, but if you want to 
interact with SmokeDetector or the wider system, you'll need to be given privileges.

## How do you get them?
Privileges are called that for a reason - they're a privilege, not something everyone gets.
We're pretty free with who we give them out to, but there is a short list of guidelines
to help your case. Those are detailed in full [in the wiki][wiki]. The TL;DR version is that
we want to make sure you're sane and have at least some experience of Stack Exchange and
community moderation. We expect everyone with privileges to be able to get along and act
like an adult.

As always, we're not robots - common sense is applied when dealing out privileges, so give
someone a ping when you want to be added and we'll walk you through what comes next.

## Reporting
One of the major things that privileges let you do is report posts to SmokeDetector as spam.
Since there's been some uncertainty in the past about what should and shouldn't be reported,
here it is in black and white:

 - **Report** posts that would be "red-flaggable" on the site. That is, if it could be
   spam- or abusive-flagged, you can report it to Smokey.
 - **Don't report**... well, anything else. In particular, don't report NAAs (posts that
   are flaggable as Not An Answer), self-vandalism, or plagiarism.

The general principle we work on is that we _want to_ catch anything that's red-flaggable,
so if we've missed one, reporting it is good.

-----

[Next: Handling reports](/training/reports)

[Return to Introduction Index](/training/index)

[commandsNonPriv]: https://github.com/Charcoal-SE/SmokeDetector/wiki/Commands#commands-for-everyone
[commandsPriv]: https://github.com/Charcoal-SE/SmokeDetector/wiki/Commands#privileged-commands
[Privileges]: /smokey/Privileges
[wiki]: https://charcoal-se.org/smokey/Privileges

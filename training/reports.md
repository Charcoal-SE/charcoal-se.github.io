---
---

# 4. Handling reports
When a report comes into Charcoal HQ, there are two major things we need to do with it: flag
and feedback.

## Flagging
This you should be familiar with, since you have experience on Stack Exchange. Follow the link to look 
at the post, decide if it needs flagging, and flag it with the appropriate flag if so.

## Feedback
The point of feedback is to record whether the post was correctly detected or not. Feedback
gets stored in metasmoke so that we can use it for analysis. We have three major types of
feedback: true positives, false positives, and NAA. You should feed back as follows:

 - If the reported post is **spam or abusive**, it's a true positive. Reply to the report
   message with `k`.
 - If the reported post is Not An Answer, reply to the report with `n`.
 - If the reported post is self-vandalism, reply to the report with `tp-`.
 - If the reported post is a legitimate post, reply to the report with `f`.

If that list doesn't cover the post you're looking at, you can assume it's a false positive
unless someone says otherwise. The canonical covers-all guide to feedback is
[in the wiki][wiki].

## Self-promotion
While persistent, undisclosed self-promotion is classed as spam, it's a less clear-cut issue
than regular advertising spam. Some sites are more lenient on the issue than others. You
should exercise judgment while dealing with self-promotion.

 - Take a look at the user's profile. If this is their first post, they almost certainly
   just aren't aware of the policy about disclosure. You can let it go without flagging.
 - On sites you're familiar with, many well-meaning users respond well to a polite comment
   requesting the author to edit in disclosure. If the post content is good it's definitely
   preferred to have disclosure added by the author.
 - If you think it is worth a flag (perhaps because they've been doing this a lot),
   consider using a custom moderator intervention flag rather than a spam flag. Those will
   take longer to be dealt with, but make it much easier for moderators to figure out _why_
   you flagged.

## Comments on reported posts
You should not leave comments under a post reported by SmokeDetector, unless you are otherwise
familiar with that Stack Exchange site. In general, that means you participate on the site for
more than responding to SmokeDetector reports and/or viewing a few Hot Network Questions.
Unfortunately, we've had a case or two where comments left by people responding to a SmokeDetector
report were taken negatively by the user and moderators of the site.

When you're not otherwise familiar with the Stack Exchange site, instead of leaving a comment, you
can raise a custom moderator flag explaining what the issue is.

Note: This isn't a restriction on leaving comments *on metasmoke* on post reports, just on the
actual posts on Stack Exchange sites.

## Userscripts
While responding to SmokeDetector in chat is the original way of feeding back, over time
we've streamlined the process. Most Charcoal members now use FIRE, a userscript that
simplifies the process of viewing the post, flagging, and feeding back, down to two clicks.
You can find it, and all our other userscripts, on the [userscripts page][us].

-----

[Next: Autoflagging][5]

[Return to Introduction Index][8]


[wiki]: https://charcoal-se.org/smokey/Feedback-Guidance
[us]: /scripts
[5]: /training/autoflagging
[8]: /training/index

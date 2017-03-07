Some aspects of feedback to SmokeDetector have historically caused confusion. This page is intended to address some of those confusions.

### Generic Guidance
In very general terms, the litmus test for whether you should use [`k`](https://github.com/Charcoal-SE/SmokeDetector/wiki/Commands#silent-mode-and-aliases) or [`f`](https://github.com/Charcoal-SE/SmokeDetector/wiki/Commands#silent-mode-and-aliases) is this:

> If SmokeDetector was implemented as a system-level block, would we want to catch this type of activity?

If the answer to that question is *yes*, you should mark the post `k`. There are a few types of activity we have specific guidelines for, as outlined below.

### Disclosed affiliation
It's fine to promote your own product or service on Stack Exchange, *as long as*:

- you're not doing it excessively
- you disclose your affiliation
- you only do so where relevant

If all of those conditions are true, then self-promotion is not spam and therefore `f` and not `k` (unless it doesn't answer the question, in which case it's `n`). If any of them are false, self-promotion is `k`.

### Self-vandalism
Self-vandalism is where a user vandalises their own post by replacing all its useful content with something like "xxxxxxxxxxxxxxxxxxxxxxxx", or "deleted deleted deleted". For self-vandalism, use [`tp-`](https://github.com/Charcoal-SE/SmokeDetector/wiki/Commands#privileged-commands-as-reply) (or one of its aliases, such as `v`, `vand` or `vandalism`). At a system level, we'd want to catch and block people doing this, but it's not worth blacklisting the user because it's usually a one-time incident. Most users, when warned, don't do it again.

### Foreign-language posts on English sites (or vice versa)
Treat these as you would an English post. If it's spam, offensive, etc., then mark it as `k`; otherwise use `f` or `n`. Particularly, answers in the wrong language for the target site are NAA, so `n`. Being in the wrong language for the site *alone* doesn't make a post `k`-able.

### Plagiarism
Plagiarism - copying without attribution from another source such as someone else's answer or another website - is not always easy to spot. If you do spot it in an answer, then mark it as `k` - you may wish to explain to other users in the chatroom why you've done that, to avoid arguments about what the feedback should be.

If you get to a post before it's deleted, an easy way to spot plagiarism is to check the other posts on the same page for similar content.

However, while plagiarism should be marked as `k`, the `!!/report` command shouldn't be used to report plagiarism - catching plagiarism is a bonus if we do, but we're not aiming to catch it.

### NAA feedback
NAA feedback has sometimes been a little confusing. Using `n` as your feedback should, in general, be done if:

- the post is not spam, abusive, offensive etc. (use `k`)
- you would flag the post as Not An Answer on the site itself
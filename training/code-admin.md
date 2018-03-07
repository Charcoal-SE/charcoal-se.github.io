---
---

# 7. Further Privileges: Code Admin
When you've been working within Charcoal for a while, there are further levels of privileges
that you may be interested in getting. One of these is Code Admin, which deals with our
blacklisting systems.

## What does code admin give you?
Code admin gives you the ability to `!!/blacklist` and `!!/watch` independently - that is,
without review from another code admin. If you don't know what that means, you're not ready
for it yet.

## How do you get it?
The grant for code admin is fully manual. If you've contributed a significant number of
blacklist items and you seem to know what you're doing, you're likely to be given the code
admin role. That's deliberately _not_ a hard criterion; it's subjective, because subjective
humans are the people granting it.

## How do you use it?
Exactly the same as you've been using the `!!/blacklist` and `!!/watch` commands up to this
point, except now your actions will take effect immediately without waiting for the pull
request to be reviewed by another code admin.

To reiterate our current blacklisting guidelines:

 - **Watching** is for keywords or websites that have been seen in spam. Past that, anything
   is game. Items may be removed as they fall out of use.
 - **Blacklisting websites** should be done when a site has been used repeatedly in spam
   recently (5+ times in the last 6 months), without any false positives. Make sure at least
   one of the posts was under the default autoflagging threshold (280).
 - **Blacklisting keywords** is for phrases that get used in spam particularly frequently,
   and have no false positives.

With all blacklists, remember to search on Stack Exchange as well as on metasmoke to check
for false positives. Searching for spam amongst a dataset of spam is more than likely going
to get some hits, but a Stack Exchange search reveals the real accuracy.

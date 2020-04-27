---
---

# 5. Autoflagging
In January 2017, we started [automatically flagging spam][meta] through metasmoke. This page
details that system.

## What's autoflagging?
Autoflagging is the subsystem of metasmoke that lets us automatically cast spam flags on
posts that we're confident are spam. Users sign up for their accounts to be added to a pool
of available flags, which are used when spam comes in. We send up to 4 autoflags on a post,
significantly reducing the number of spam flags humans need to raise to remove the post.

## How accurate is it?
While SmokeDetector aims for zero false negatives, autoflagging aims for zero false
positives. That is, SmokeDetector aims to catch all spam at the expense of a few caught
legitimate posts; autoflagging aims to flag _only_ spam without hitting any legitimate posts.
Of course, neither of them hit their goals 100%; that's to be expected. Autoflagging is,
however, extremely accurate.

Users set up conditions that govern how confident they want to be that a post is spam before
their account can be used to flag it. All conditions have to be more than 99.75% accurate
before the system will accept them; the default recommended conditions are 100% accurate to
the nearest 0.01%.

## How can you sign up?
Make sure you have a metasmoke account. You can sign up for a metasmoke account
[here][ms-su] if you don't already have an account. Authenticate using Stack Exchange so that we can
associate your SE account with your MS account.

Visit the [authentication page][ms-auth] on metasmoke. If you're happy with the disclaimer,
click the Authenticate with Write Access button to get a write token for metasmoke to use.

Finally, visit the [autoflagging wizard][ms-wiz] to set up your account for autoflagging.
We recommend using the one-click setup wizard first, then customizing your settings later -
that way, you know you've got valid settings.

You're good to go! Flags will now be cast automatically in your name from metasmoke. If you'd
like a report of what's been flagged under your account, that's also on metasmoke - from the
[flagging dashboard][ms-fd], click the link under Flagging & You.

-----

Congrats, you're done! The next two pages in the training guide give some detail about
further privileges you can earn through contribution to Charcoal. Feel free to read those if
you want to, but they're not essential.

[Next: Further Privileges: Blacklister][6]

[Return to Introduction Index][8]

[meta]: https://meta.stackexchange.com/questions/291301
[ms-su]: https://metasmoke.erwaysoftware.com/users/sign_up
[ms-auth]: https://metasmoke.erwaysoftware.com/authentication/status
[ms-wiz]: https://metasmoke.erwaysoftware.com/flagging/ocs
[ms-fd]: https://metasmoke.erwaysoftware.com/flagging
[6]: /training/blacklister
[8]: /training/index

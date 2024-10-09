---
---

# 2. What's spam?
Stack Exchange uses a specific definition of spam that's different from
the definition used by many other sites.
It's most concisely detailed in the flag dialog:

> Exists only to promote a product or service, does not disclose the author's affiliation.

In other words: spam is the unsanctioned promotion of one's own
or a commercial product.

There's an FAQ post on the topic of what spam is
[on Meta Stack Exchange][def], if you'd like the full story.

That means this is spam:

> Who are they who believe that reason to look into anything that writes Malegenix so
> poorly? Do you have to not appear adventurous? It is also rewarding when you discover
> a Malegenix. This can be sized to fit. They were a lot more active after this. I can
> express this touching on Malegenix. That is dirty. It seems very interesting. Isn't this
> exactly the function of Malegenix today?  
> Visit here \<spammy link\>

(That's a [real post][post], by the way.) 

This is also spam, if the blog belongs to the post's author:

> Visit this awesome blog (link) to find the answer!

However, this is not:

> To fix your problem, you should foo your bar and pass your baz to quux.  
> I wrote about this in more detail on my blog (link).

That post discloses the fact that the blog is the author's, so it's okay. 

This isn't spam either:

> delete me delete me delete me delete me delete me

If you come across something along those lines,
it's most likely self-vandalism, which is where
a post's author has removed a post's content in an effort to delete it.
That's not something Stack Exchange allows, but it's not spam.

Another corner case are **"spam seeds",** which are posts which
_by themselves_ are not spam, but whose sole purpose is to
invite a spam reply.
These can be tricky to identify sometimes.
This example could be either/or:

> How can I frobnicate the foobar API on example.com?

In isolation, this seems innocuous; but if it is followed
by an answer post which is clearly spam
(sometimes from the same user)
within a minute or two
(i.e. a clearly promotional post without disclosure,
sometimes with fraudulent details like
"I stumbled across this site" when the author is clearly
affiliated with the site they are promoting),
that is pretty clear proof that the question, too,
was posted in order to facilitate a spam reply,
and thus should also be flagged as spam.

(Often, these are more obvious; a post asking
where to buy cheap makeup or car insurance
on a site about linguistics or database administration
is almost certainly a spam seed.)

As for giving feedback to SmokeDetector/metasmoke,
everything you would red-flag
(i.e. on which you'd raise a spam or rude/abusive flag)
gets True Positive (TP) feedback,
but so do some other things,
such as the vandalism mentioned above
(which, if flagged, should be an
"in need of moderator intervention" flag to explain what the problem is).
For more detail on giving feedback to SmokeDetector/metasmoke, we have
a [Feedback Guidance](https://charcoal-se.org/smokey/Feedback-Guidance)
page.

As always, use your best judgment, and ask if you're not sure.

-----

[Next: When to watch spam?][3]

[Return to Introduction Index][8]


[def]: https://meta.stackexchange.com/q/58032
[post]: https://metasmoke.erwaysoftware.com/post/108626
[3]: /training/watch
[8]: /training/index

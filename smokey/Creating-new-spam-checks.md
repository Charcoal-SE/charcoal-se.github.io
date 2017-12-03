> This document covers how to create a new spam check, which essentially turns out to be a guide on `findspam.py`.

## 1. The `B(are|ear)` Necessities
The *very first* thing you need to do before creating a new spam check is test if it's actually necessary.

- What is your proposed check designed to catch?
- Is it something that's caught by existing checks? This includes regex-based pattern checks, blacklists, and check methods. Use the various `!!/test` commands to check this.
- Is it something *we want to catch*? Remember that Smokey is designed to catch spam and/or abuse — anything else (low quality posts, not-an-answers, etc) is out of scope. There are plenty more moderation bots around the network that might want that kind of check, though.

## 2. Write a Check
...preferably addressed to me, with plenty of money involved. (Ha! Spelling jokes!)

If you've determined that a new check is necessary, now you need to actually write it. The preferred way of doing this is a regex — these are (usually) simpler and easier to maintain than the alternatives. Writing a regex check is pretty easy: just write the regex. You can use regex-checking websites like [regex101](http://regex101.com) to check if you've written it right — doing this is encouraged, because regex is not an easy language to speak.

The alternative, which should only be used if a regex doesn't do the job, is to write a check method. This is done by writing a new method in `findspam.py`, which takes two parameters: `s` and `site`. `s` is a string of stuff that you need to check (like the title, username, or post body), and `site` is the site that the post is on. Give your method a descriptive name, so that its purpose can be judged at a glance.

Your method should return a pair of values. The first is a boolean, indicating whether or not you think the post is spam. The second is a string, which is the `why` data for the post (and if you don't know what that means, you should probably be letting someone more experienced write the check — or go learn about it).

Here's an example check method. This method will say that any `s` longer than 3 characters is spam.

```py
def ridiculous_spam_check(s, site):
  if len(s) > 3:
       return True, "Length is greater than 3 characters"
  else:
       return False, ""
```

## 3. Endless Lists
Checks are our ammunition against spam; now you need a gun to fire it from. In our case, it's a GLOCK — a Giant List of Checks and Keywords.

Scroll to the `rules` array, which is [somewhere around line 641 in `findspam.py`](https://github.com/Charcoal-SE/SmokeDetector/blob/master/findspam.py#L641). This structure describes all the checks that SmokeDetector runs, and how to apply them. (N.B.: It's not actually JSON, don't make that mistake — it's Python dicts.)

You need to add a new entry to this array that describes your check. The general format of this dictionary is:

```py
{
    'regex': r"Include your regex here if it's a regex-based check",
    'method': method_name,  # Pass the name of your method here if it's a method-based check,
    'all': True,  # True if you want to scan all sites in the network, False otherwise,
    'sites': [],  # If `all` is true, these sites are excluded; otherwise, they are the only sites to get scanned
    'reason': "Name of the reason you're categorising these posts as (bad keyword, link at end of body, etc)",
    'title': False,  # True if you want to scan post titles, False otherwise
    'body': True,  # True if you want to scan post bodies, False otherwise
    'username': False,  # True if you want to scan owner usernames, False otherwise
    'body_summary': False,  # True if you want to scan body summaries, False otherwise
    'stripcodeblocks': False,  # True if you want code removed before getting passed to your check
    'max_rep': 20,  # Posts from users above this reputation will not be scanned
    'max_score': 1,  # Posts scoring above this value will not be scanned
}
```

You should only include *one* of `regex` or `method` — checks should not be both at the same time.
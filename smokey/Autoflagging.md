# State of the Project

We are looking into automating flags from Smokey.  Basically, it will look as if though Smokey clicks "flag" → "spam" as soon as Smoke Detector reports a post (though not all reported posts are eligible; see the Spam weight section for details.).

We are working out the specifics of the system right now, so the details are still in flux.

To participate in the development of this feature, please show up in [the Charcoal HQ chat room](http://chat.stackexchange.com/rooms/11540/charcoal-hq) and wait for a good moment to bring up your topic (afternoon UTC seems to be a fairly busy time in the room).

The main dashboard (status, statistics, etc) is at https://metasmoke.erwaysoftware.com/flagging

# Technical details and spam weight

Every time a post is reported, it triggers a [variety of different reasons](https://metasmoke.erwaysoftware.com/dashboard) for being reported (such as bad keyword, blacklisted website, etc). Each of these reasons (also known as "heuristics") contributes to the post's weight. The formula that determines how much weight each reason contributes is as follows:

```
[Number of True Positives caught by reason] / [Total posts caught by the reason] * 100
```

In our current preliminary testing, the threshold that was set for posts to be flagged automatically is at a weight of 280. In our database of over 50,000 records, this score threshold has a predictive accuracy of 99.98% (meaning of all posts hitting 280 score caught by Smokey, 99.98% were true positives).

As with any other projection, you need to understand that past performance is no guarantee for the future.

The flagging is done by Metasmoke (the back end component) using the credentials of users who have signed up to allow the system to cast flags on their behalf.

# Opting In

There is a separate page about [Setting up Autoflagging](Set-Up-Autoflagging).  This brief section is a quick FAQ-like summary.

There is a "big red button" which you can click.  Please be patient and try again until it actually sticks!  This is a known issue which of course we hope to resolve eventually.

Once [your flagging status](https://metasmoke.erwaysoftware.com/flagging/preferences) shows as active (the button stays checked if you navigate away from the page and come back again) and your conditions are met, you are eligible to be drawn randomly when a flag is about to be raised.  This is a random selection out of the list of users whose conditions allow flagging at the given weight on the given site.

You can review the flags cast on your behalf at a URL like `https://metasmoke.erwaysoftware.com/flagging/users/XX/logs` (for example, [Undo's log](https://metasmoke.erwaysoftware.com/flagging/users/1/logs)).  There is a number of other useful links on the personal flagging dashboard where you can tweak conditions or turn off autoflagging.
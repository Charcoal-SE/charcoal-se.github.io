---
---

# Autoflagging

<section>
  ## What is autoflagging? {#whats-flagging}
  
  Autoflagging is a subsystem of [metasmoke](https://metasmoke.erwaysoftware.com/) that lets us automatically cast spam flags
  on Stack Exchange posts if we're certain enough that they're spam. To gain that certainty, we calculate the historical
  accuracy of the spam checks that caught the post in question, and - essentially - if they're over a certain mark, we cast
  some flags. More detail on how exactly that works is at the bottom of this page.
</section>

<section>
  ## How good is it? {#how-good}
  
  In the period from 2017-02-01 through 2018-09-11, we successfully cast 114,089 spam flags. Of those, 113,570 were correctly
  cast - that is, cast on a confirmed spam post - and 519 were cast in error on legitimate posts. Overall, that's a 99.55%
  accuracy rate.
  
  This is the chart of flags over time for that period. The `tp_count` series represents flags cast on spam; the `fp_count`
  series flags cast on legitimate posts.
  
  ![Line chart of count against date containing two series, tp_count and fp_count. tp_count is consistently high, around 1000,
    while fp_count remains low, around 10.](https://i.stack.imgur.com/Hcp12.png)
</section>

<section>
  ## How many flags does it cast? {#how-many}
  
  Autoflagging can cast up to four flags on a post it is confident is spam. However, that's not a flat value - the number of
  flags cast varies with the degree of certainty we have. If the system is more than 99.75%* certain, we cast three flags;
  above 99.90%*, we cast four flags.
  
  This doesn't apply on sites where the number of flags required for auto-deletion of a post is lower. On most Stack Exchange
  sites, posts require 6 flags to be automatically deleted as spam by the system. However, on
  [The Workplace](https://workplace.stackexchange.com/) and on [English Language & Usage](https://english.stackexchange.com/),
  the requirement has been dropped to 3. Hence, on these two sites, autoflagging only ever casts one flag automatically, 
  regardless of certainty.
  
  <sup>* Correct as of 2018-09-11; subject to change.</sup>
</section>
 
<section>
  ## Where do the flags come from? {#where-flags}
  
  We are able to cast more than one spam flag on each post by using regular users' spam flags. Stack Exchange users may grant 
  permission for their accounts to be used for autoflagging by
  [signing up on metasmoke](https://metasmoke.erwaysoftware.com/flagging/ocs). Once signed up, they may specify under what 
  conditions their flags can be used; this enables metasmoke to cast flags in their name.
  
  Moderators' flags will never be used, regardless of whether their settings allow it or not; we don't want to automatically
  nuke posts.
</section>

<section>
  ## How does it work? {#how-work}
  
  This has been alluded to in a number of places here, but for the sake of completeness, autoflagging works along these lines:
  
   - **Users sign up** and grant permission for their flags to be used on metasmoke.  
     Part of this process involves the user setting up "flag conditions", which specify at what degree of certainty
     _they personally_ are happy for their flags to be used, and "site settings", which govern how many of their flags
     autoflagging may use per day and on what sites.
   - Orthogonally, **SmokeDetector detects spam** and sends it to metasmoke.  
     When a new report arrives in metasmoke, among other process, a certainty value is calculated for the post. Using that
     value, the system works out if the post is eligible for flagging, and if so which users' flags may be used.
   - The system **casts flags** by selecting randomly from the available users.
   
  If you'd like more information on the technical side of the system, drop into
  [Charcoal HQ](https://chat.stackexchange.com/rooms/11540) to have a chat about it.
</section>

<section>
  ## More information {#more-info}
  
   - metasmoke has a [flagging dashboard](https://metasmoke.erwaysoftware.com/flagging)
   - We've written a couple of posts on Meta Stack Exchange: [here's the first](https://meta.stackexchange.com/q/291301) and
     [here's the second](https://meta.stackexchange.com/q/307585)
   - You can always drop into [Charcoal HQ](https://chat.stackexchange.com/rooms/11540) for a chat
</section>

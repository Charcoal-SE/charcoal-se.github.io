This document provides instructions on how to set up your account to cast automatic flags via the SmokeDetector/metasmoke system.  The facility is described in brief on the [Autoflagging](Autoflagging) wiki page.

## Prerequisites
Before running through the rest of these instructions, ensure that:

- You have an account on metasmoke. You can get one of those [here](https://metasmoke.erwaysoftware.com/users/sign_up), if you don't have one.
- Your metasmoke account has the "flagger" permission. You can check that [here](https://metasmoke.erwaysoftware.com/users): find your username, and look for the "flagger" role. Ask an admin about this if you don't have it.
- Autoflagging and registrations are enabled. You can check these under [system settings](https://metasmoke.erwaysoftware.com/flagging/settings); verify that the `flagging_enabled` and `registration_enabled` settings have a value of `1`.
- Your metasmoke account is write-access authenticated. If you don't know whether it is or not, it's probably not – visit the [authentication status page](https://metasmoke.erwaysoftware.com/authentication/status) to authenticate.

## Set Up Autoflagging
1. **Enable flags on your account.**  
   Visit [your preferences page](https://metasmoke.erwaysoftware.com/flagging/preferences), and read through the red-boxed disclaimer. If you're happy with that, tick the box to enable flags on your account.
2. **Set up preferences.**  
   On the same preferences page, click "Set up preferences" near the bottom of the page. The page you're taken to lets you set up your preferences, which govern how many of your flags the system can use on any particular site or group of sites. Fill in the maximum number you'd like to allocate, select the sites you want that number to apply to, and click Save. You can repeat this process to have different maxima for different groups of sites.
3. **Set up conditions.**  
   Visit the [flag conditions setup](https://metasmoke.erwaysoftware.com/flagging/conditions/new) page. This page lets you set up combinations of conditions governing how certain you want the system to be that a post is spam before using your account to flag it. The minimum weight controls the minimum cumulative weight of all the reasons a post was caught by (the maximum weight a reason can have is 100; we suggest 280 is a good value for this field). The maximum poster rep controls the most reputation a post author can have. The minimum reason count controls how many reasons you want a post to have been caught by — this performs a *similar* function to minimum weight. Fill in some values, and click Save. Again, you can repeat this process to have different accuracies for different groups of sites.

> **N.B.** There's a threshold of accuracy that all flagging conditions must meet before they're used to cast flags automatically. Currently, this is 99.9% — if you want to get the current value of this threshold, it's stored as the `min_accuracy` system setting. You can use the Preview button during condition setup to find out how accurate your proposed parameters are.

At this point, you should be set up and your account will be used to cast spam flags according to the parameters you've specified. If you've found any bugs, or have feedback on the system, let us know. If you've found a security bug, please [read and follow these instructions](https://charcoal-se.org/security) rather than posting publicly.

## I Opted In, But I Don't See Any Flags

A large number of volunteers have signed up to donate their flags (thanks, everyone!) so the pool of available flags is currently much larger than the actual need.

There is a prioritization mechanism in place which favors autoflags from Metasmoke users who have "core" status. This is to reward them for their contributions to Charcoal (e.g. flagging and giving feedback, contributing code, and participating in discussions in CHQ). Generally, for posts that receive 3 autoflags, 2 will be cast by core users and the other one will be cast by a non-core user. 
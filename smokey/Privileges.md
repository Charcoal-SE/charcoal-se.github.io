SmokeDetector operates a privilege system. That is, before you are able to use a number of commands (most notably the feedback commands), you must be added to a list of privileged users in SmokeDetector's code. 

Please review this page before getting in touch with someone with a request; once you know what you need, see [whom to ping.](/pings/)

## Getting reviewer privileges with SmokeDetector
In theory, anyone can be added to the privilege list. In practice, this doesn't always work out, so *as a general guideline*, we look for a few things to indicate how qualified you are.

- **Reputation**  
  A higher reputation score indicates a higher level of participation on the sites, which is strongly correlated with moderation ability. We're looking for enough rep to indicate that you've been around a little while: generally, 300 on one site will suffice.

- **Participation**  
  We can also simply look through your various accounts on the network. SmokeDetector scans posts for spam network-wide, so the more sites you have accounts on, the better it is for everyone — more accounts means you can flag spam on more sites. We may also look at how active you've been on various sites (and on their meta sites) to determine how able you are to moderate content effectively. Again, we're not looking for a massive or exceptional record, just enough to show that you know what you're doing.

- **Referral**  
  If your request for privileges is supported by a regular of one of the [chat rooms](Chat-Rooms) that SmokeDetector posts reports to, we'll look more favourably upon it — we tend to trust people who are already part of the system to make sound judgements. Additionally, if you've been around in one of the rooms for a while and have made yourself known, you've got a good chance.

These are all general guidelines, rather than hard limits. Really, we're just checking to make sure that you're a sane person who won't abuse the system. We understand that there are cases of users who have little apparent activity who can be excellent at moderation; we're also aware that the converse is true. Take note of what's mentioned here, but also remember that requests are judged on a case-by-case basis.

#### For Moderators
If you're a Stack Exchange network moderator, **you're automatically privileged** with SmokeDetector in [Charcoal HQ](http://chat.stackexchange.com/rooms/11540/charcoal-hq) (and in [SOCVR](http://chat.stackoverflow.com/rooms/41570/so-close-vote-reviewers) if you are a Stack Overflow moderator). You don't need to be added to the explicit privilege lists, as your diamond also gives you privileges with SmokeDetector. We assume that moderators are, on the whole, pretty good at moderation.

## Privilege Levels

There are multiple privilege levels on SmokeDetector and metasmoke, each giving you access to different commands, tools, etc. There isn't any exact threshold that you have to meet in order to be eligible for many of these privileges; rather the admins will grant them to you at their own discretion. If you think that you should have some of these privileges but you don't, please contact [an admin](https://charcoal-se.org/people#admins).

(SD) refers to privileges set in the code of SmokeDetector [here](https://github.com/Charcoal-SE/SmokeDetector/blob/master/globalvars.py#L98), (MS) refers to privileges set from within metasmoke (the admin would then add you using the form on [this page](https://metasmoke.erwaysoftware.com/admin/permissions)), and (GH) refers to privileges set on GitHub.

### SmokeDetector privileges (SD)
The process for acquiring these privileges is listed above. Note that this privilege only works per-chat-server, so if you're privileged in CHQ, you're not automatically privileged in SOCVR or the Tavern (due to your user ID being different), so you'll need to contact an admin so that they can add you there as well.

This privilege level allows you to:
* Give feedback via chat
* Use the privileged commands listed [here](./Commands#privileged-commands).
* Stop autoflagging in the event of an emergency using `!!/stopflagging`. After this, autoflagging can only be re-enabled by an admin.

Technically, this privilege is granted in the Smoke Detector source code by adding the user's numeric account ID to the `privileged_users` list for the room in question.  When this is in place, the `!!/amiprivileged` chat command will cause Smoke Detector to reply "✓ You are a privileged user".

### Reviewer (MS)
Everyone who has SmokeDetector privileges is eligible to get the reviewer role. However, this process is not automatic, so you will need to [sign up for a metasmoke account](https://metasmoke.erwaysoftware.com/users/sign_up) so that an admin can grant it to you. 

This allows you to:
* Review posts from the [metasmoke review queue](https://metasmoke.erwaysoftware.com/review)
* Use applications which require the write API (e.g. userscripts such as FIRE and FDSC)
* Associate your chat feedback with your metasmoke account when [you connect your SE account](https://metasmoke.erwaysoftware.com/authentication/status) (this should be done when you sign up, older users may need to do this manually)
* Overwrite and invalidate your own feedback
* Use the [autoflagging conditions sandbox](https://metasmoke.erwaysoftware.com/flagging/conditions/sandbox)

### Flagger (MS)
Everyone who signs up to metasmoke gets this by default. This privilege will be revoked if you abuse the system.
* Allows you to set up your account so that it will be used for autoflagging

### Core (MS)
Given to people who have contributed to Charcoal in a non-trivial way (e.g. by giving 50+ feedbacks, contributing code, or frequenting CHQ). This signals that you are a core member of our team.

Benefits include:
* Increased autoflagging frequency (see [this](https://charcoal-se.org/smokey/Set-Up-Autoflagging#i-opted-in-but-i-dont-see-any-flags) page for details)
* Access to the [data explorer](https://metasmoke.erwaysoftware.com/data)
* Can create [new announcements](https://metasmoke.erwaysoftware.com/announcements/new) (please don't use this if you don't know what you're doing)
* Can edit domain records, and add/edit domain tags

### Code admin a.k.a. blacklister (MS)

* Can `!!/watch` and `!!/blacklist` without approval. Please make sure that you read the [blacklisting guidelines](https://charcoal-se.org/smokey/Guidance-for-Blacklisting-and-Watching) before using these commands.
* Can approve other user's watches and blacklists on GitHub. Simply add a comment on the auto-generated PR containing the command `!!/approve`, and metasmoke will handle the rest. Note that you will need to be added to PullApprove for this to work properly (which in turn requires you to have a GitHub account which is known to us and added to the [Other Awesome People team on GitHub](https://github.com/orgs/Charcoal-SE/teams/oaps/members)); ping ArtOfCode and he will be able to set you up.
* Can failover standby instances from the [status](https://metasmoke.erwaysoftware.com/status) page. Normally metasmoke handles this automatically if an instance goes down for more than 5 minutes, but you can use this if Smokey isn't working properly. Make sure that you follow the [troubleshooting guidelines](https://charcoal-se.org/pings/#dead) first.

### GitHub push privileges a.k.a. proper code admin (GH)

These people have collaborator access on GitHub. 

* Can push code directly to GitHub, manage PRs and issues, and add people to the SmokeDetector privilege list.
* ***ALWAYS PUSH TO MASTER, NEVER DEPLOY!***
* Generally it's fine to directly push minor changes (e.g. privilege, blacklist, watchlist, regex, and spam check changes, bug fixes) to master without any reviews; it is recommended that you make a PR and ask for reviews on any major changes (e.g. refactoring, changed functionality, new commands, new rules)

One of [the project's owners on GitHub](https://github.com/orgs/Charcoal-SE/people?utf8=%E2%9C%93&query=%20role%3Aowner) will add you as a collaborator to the correct repository by assigning you to [the appropriate team on our GH organisation](https://github.com/orgs/Charcoal-SE/teams). Note: if you're already part of the GH organisation, the team maintainer can also add you.

### SmokeDetector Runner (MS)

Note that you can still run a SmokeDetector instance without this privilege; however its functionality will be limited without it.

* Has a copy of the credentials for the SmokeDetector account on SE and GH
* Has the ability to [generate](https://metasmoke.erwaysoftware.com/smoke_detector/mine) metasmoke integration tokens, required in order for Smokey to integrate with MS (e.g. feedbacks, privilege checks, autoflagging, etc)

### Admin (MS)

These people get access to lots of administrative tools. They are able to see most data that is usually only visible to its owner, and perform system-level administration and maintenance tasks. All admins are also subscribed to the `smokey@charcoal-se.org` mailing list - any email sent to that address will reach the admins.

They can:

* Manage privileges for all users
* See posts which have been flagged for admin attention
* Create API keys, edit them, and revoke write tokens, on the behalf of the application author
* Invalidate other people's feedback
* Manually expire announcements
* View, edit, enable/disable and delete other users' autoflagging conditions
* Invalidate autoflagging API tokens in the event of an emergency
* Edit global autoflagging settings (e.g. enabled/disabled, min accuracy and post count, dry run, and max flags - note that the latter is also hard-coded for extra security)
* Destroy domain records and domain tags
* De-authorize a rogue SmokeDetector instance

### MS Developer (MS)

Only available to our benevolent dictators Art and Undo. Only Undo can grant this privilege level, by editing the database directly from the console.

* Can see production logs
* Can refresh the site list cache
* Can refresh the per-post feedback cache
* Can send messages down metasmoke's websockets for testing and development purposes
 
---
---

# Autoflagging

## What is autoflagging? {#whats-flagging}

Autoflagging is a project to enable us to flag Stack Exchange posts as spam automatically, based on data we've previously collected through SmokeDetector and metasmoke.

It's built into the existing system - SmokeDetector sends the same data to metasmoke as it always has, and metasmoke performs some automated analysis of the post it's just received to determine if it should cast spam flags or not.

## But that's dangerous! {#dangerous}

*Powerful*, yes. *Dangerous*, less so. In designing the flagging system, we've thought through the concerns about doing this and addressed them where necessary.

*   **Concern:** System unilaterally nukes a post that wasn't spam  
    **Mitigation:** We limit the maximum number of flags the system is allowed to cast on a single post. Additionally, false positives are rare.
*   **Concern:** System is faulty/flags things it shouldn't/otherwise goes wrong  
    **Mitigation:** Users with SmokeDetector privileges have access to a command that immediately halts all flagging activity, and requires administrator intervention to reactivate.
*   **Concern:** System is inaccurate, with a high number of false positives  
    **Mitigation:** We make use of past categorised data to select accurate capture reasons, and only flag based on accurate combinations.

## But what about privacy? {#privacy}

There are some privacy concerns with this system. The major one of those is about API write tokens: to be able to cast flags, we need a write token for the Stack Exchange API, which needs to be stored somewhere within metasmoke. This means that whoever hosts metasmoke has access to those tokens, and could use them to carry out any action on the token owner's account.

We deal with this by having clear, prominent disclaimers on metasmoke where any privacy issues are raised. These disclaimers detail exactly what a user is signing up for when clicking a link or button, and what privacy concerns there are. It is then left up to the user to make their own judgement about whether to trust the host.

The other concern is making sure users are aware that autoflags aren't a get-out-of-jail-free card: flags cast on a Stack Exchange account are the responsiblity of the account holder, whether they were cast by an automated system or not, and bad flagging may result in moderators getting involved. This is partially mitigated by mandating accuracy in the system - while users are given some leeway to what the system can flag with their account, a 99.5% accuracy ratio over a sample of 1000 posts is mandatory. There is also another disclaimer used to detail the relevant concerns before users sign up for autoflagging.

## Is it any good? {#any-good}

Yep. As mentioned previously, users are given some leeway to choose how accurate they want autoflags cast using their account to be, but all autoflags must be cast under a policy that is at least 99.5% accurate over a sample of 1000 posts. The suggested flag policy (also known as a flag condition) has an accuracy of 99.98%.

## How does it work? {#technical}

*Warning: this bit is technical.*

The basic design of the system hasn't changed. SmokeDetector sends data about posts it thinks are spam to metasmoke. This data includes data about the post itself, and data about *why* the post was detected. We call the latter "reasons" - we have a reason that catches bad keywords, a reason for known spam websites, and reasons for other common characteristics of spam.

Users can provide feedback to SmokeDetector, either by replying to the bot in chat, or through review on metasmoke. All feedback eventually ends up attached to the relevant post in metasmoke's database. We use this feedback to keep track of how accurate each reason is, and then assign a weight to each reason which is equal to its percentage accuracy to the nearest integer.

When users sign up for autoflagging, they are asked to create conditions that govern which posts their account can flag. This is done in terms of a minimum total reason weight, a maximum author reputation, and a minimum number of reasons. These are checked against the database of posts and feedback to work out how accurate the condition is, which is how we ensure conditions are at least 99.9% accurate.

When a post is sent to metasmoke, the system works out if any conditions allow it to flag the post. If they do, the condition owner's account is used to cast a spam flag, and this process is repeated until the post reaches a maximum number of flags cast.

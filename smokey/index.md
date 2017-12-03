SmokeDetector is a headless chatbot that detects spam and posts it to chatrooms.  
It uses [ChatExchange](https://github.com/Manishearth/ChatExchange) and takes questions from [the Stack Exchange realtime tab](http://stackexchange.com/questions?tab=realtime). For more information on how it works, see our website at [charcoal-se.org](https://charcoal-se.org/).

***

### User information

 - You can find a list of **SmokeDetector's commands** on [the commands page](Commands).

 - Find a list of **chatrooms that SmokeDetector interacts with** on [the chat rooms page](Chat-Rooms).

 - If you're thinking about **asking for privileges**, take a look at [the privileges page](Privileges).

 - To find out what's expected of members of Charcoal, check out our [expected behaviour and procedures page](Behaviour-and-Procedure)

 - If you're looking for **guidance on feeding back to SmokeDetector**, read [the feedback guidance](Feedback-Guidance).

 - If you want to know **when it is appropriate to blacklist or watch something,** check out [the guidance for blacklisting and watching](Guidance-for-Blacklisting-and-Watching).

### Developer information

 - For information on **how to write a new check for spam**, see [the documentation for creating new spam checks](Creating-new-spam-checks).

 - If you wish to **integrate with Smokey** and Metasmoke via our API, see [the API docs](https://charcoal-se.org/ms/API-Documentation).

 - For information on our **build process**, see [Build Infrastructure](Build-Infrastructure).

***
### Glossary:

- **Blacklist** - list of users whose every question or answer will be posted to the appropriate chatrooms. This should be used **only for spammers or** for users whose posts merit **abusive/offensive flags.**

- **Whitelist** - list of users which are free from username checks on their posts. Title and body will still be checked.
# [Bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet)
This is a list of bookmarklets that are convenient for use with Charcoal.
## WARNING
Prior to copying and using any of the bookmarklets here:
* Verify the history of this page and who edited it. If you don't trust the editors, don't trust the bookmarklets.
* If you know JavaScript, it's a good idea to double-check the code.

Clicking on a bookmarklet runs JavaScript in the current page. That means it's possible for the bookmarklet to do anything that code in that page can do. Thus, there are significant security concerns for bookmarklets and you need to trust the bookmarklet code. As things are currently set up, changes to this page are **not secure**, so you need to verify that the code hasn't been nefariously changed.

## What are bookmarklets
Bookmarklets are relatively small amounts of JavaScript code that are stored in a browser bookmark. When the bookmark is clicked, the JavaScript is run in the current page. The advantages of using a bookmarklet, rather than a userscript include:
* Can be used in all browsers, even when the browser doesn't support browser extensions. Creating the bookmarklets may be inconvenient in some browsers.
* Can, usually, be used in browsers/machines where installing browser extensions isn't permitted (e.g., some work environments). You should check the policies for where you are to be sure that having a bookmarklet doesn't violate the policy.
* Can be used on almost all webpages, without the need to have a userscript or browser extension loaded into the page every time (i.e., They consume no resources and present no security issues, until activated by the user's click on the bookmark.).   

## Searching on metasmoke

### Watchlist or blacklisted keyword entries

Select the regex text you desire to search for as a watchlist or blacklisted keyword entry and click the bookmarklet:
```javascript
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use let/const instead of var. */
    let text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    let searchTerm = encodeURIComponent(`(?s)(?:^|\\b)${text}(?:\\b|$)`);
    const textNoNoncaptureGroups = text.replace(/\(\?:/g, '(').replace(/\(\?-i:([^()]+)\)/, '$1');
    if (!/[+?*{}()|]/.test(textNoNoncaptureGroups)) {
        searchTerm = encodeURIComponent(`(?s)${text}(?<=(?:^|\\b)${text})(?:\\b|$)`);
    } else if (/^(?:\w+(?![?*+{])|\(\?-i:[^+?*{}()|]+\)\w*(?![?*+{]))/.test(text)) {
        searchTerm = encodeURIComponent(`(?s)${text.replace(/^(\w+(?![?*+{])|\(\?-i:[^+?*{}()|]+\)\w*(?![?*+{]))/, '$1(?<=(?:^|\\b)$1)')}(?:\\b|$)`);
    }
    const searchTitle = `&title_is_regex=1&title=${searchTerm}`;
    const searchBody = `&body_is_regex=1&body=${searchTerm}`;
    const searchUsername = `&username_is_regex=1&username=${searchTerm}`;
    const url = `https://metasmoke.erwaysoftware.com/search?utf8=%E2%9C%93${searchTitle}${searchBody}${searchUsername}&or_search=1`;
    window.open(url);
})();
```
### Blacklisted website entries
Select the regex text you desire to search for as a blacklisted website entry and click the bookmarklet:
```javascript
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use const instead of var. */
    var text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    const searchTerm = encodeURIComponent(`${text}`);
    const searchTitle = `&title_is_regex=1&title=${searchTerm}`;
    const searchBody = `&body_is_regex=1&body=${searchTerm}`;
    const searchUsername = `&username_is_regex=1&username=${searchTerm}`;
    const url = `https://metasmoke.erwaysoftware.com/search?utf8=%E2%9C%93${searchTitle}${searchBody}${searchUsername}&or_search=1`;
    window.open(url);
})();
```
### Numbers
Select the number text you desire to search for and click the bookmarklet:
```javascript
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use const instead of var. */
    var text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    const textOnlyNumbers = text.replace(/\D/g, '');
    if (textOnlyNumbers.length < 7 || textOnlyNumbers.length > 20) {
        if (!confirm('This text can never be detected by a number watch. Number watches must contain between 7 and 20 digits. Do you still wish to search for this on MS?')) {
            return;
        }
    }
    text = text.replace(/\D/g, '').replace(/(\d)/g, '$1[\\W_]*+').replace(/\[\\W_\]\*\+$/, '(?:\\D|$)').replace(/(\d)/, '$1(?:(?<=^\\d)|(?<=\\D\\d))');
    const searchTerm = encodeURIComponent(text);
    const searchTitle = `&title_is_regex=1&title=${searchTerm}`;
    const searchBody = `&body_is_regex=1&body=${searchTerm}`;
    const searchUsername = `&username_is_regex=1&username=${searchTerm}`;
    /*Why is also searched, as it may contain deobfuscated versions.*/
    const searchWhy = `&why_is_regex=1&why=${searchTerm}`;
    const url = `https://metasmoke.erwaysoftware.com/search?utf8=%E2%9C%93${searchTitle}${searchBody}${searchUsername}${searchWhy}&or_search=1`;
    window.open(url);
})();
```

### Loose number search
Select the number text you desire to loosely search for and click the bookmarklet:
```javascript
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use const instead of var. */
    var text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    const textOnlyNumbers = text.replace(/\D/g, '');
    if (textOnlyNumbers.length < 7 || textOnlyNumbers.length > 20) {
        if (!confirm('This text can never be detected by a number watch. Number watches must contain between 7 and 20 digits. Do you still wish to search for this on MS?')) {
            return;
        }
    }
    text = text.replace(/\D/g, '').replace(/(\d)/g, '$1[\\W_]*+').replace(/\[\\W_\]\*\+$/, '');
    const searchTerm = encodeURIComponent(text);
    const searchTitle = `&title_is_regex=1&title=${searchTerm}`;
    const searchBody = `&body_is_regex=1&body=${searchTerm}`;
    const searchUsername = `&username_is_regex=1&username=${searchTerm}`;
    /*Why is also searched, as it may contain deobfuscated versions.*/
    const searchWhy = `&why_is_regex=1&why=${searchTerm}`;
    const url = `https://metasmoke.erwaysoftware.com/search?utf8=%E2%9C%93${searchTitle}${searchBody}${searchUsername}${searchWhy}&or_search=1`;
    window.open(url);
})();
```

### Blacklisted usernames
Select the regex text you desire to search for as a blacklisted username entry and click the bookmarklet:
```javascript
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use const instead of var. */
    var text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    const searchTerm = encodeURIComponent(`${text}`);
    const searchUsername = `&username_is_regex=1&username=${searchTerm}`;
    const url = `https://metasmoke.erwaysoftware.com/search?utf8=%E2%9C%93${searchUsername}&or_search=1`;
    window.open(url);
})();
```

### Verbatim text
Select the verbatim text you desire to search for as a blacklisted website entry and click the bookmarklet:
```javascript
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use const instead of var. */
    var text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    /*Escaping a regex is from [this SO answer](https://stackoverflow.com/a/3561711) by bobince.*/
    const searchTerm = encodeURIComponent(`${text.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')}`);
    const searchTitle = `&title_is_regex=1&title=${searchTerm}`;
    const searchBody = `&body_is_regex=1&body=${searchTerm}`;
    const searchUsername = `&username_is_regex=1&username=${searchTerm}`;
    const url = `https://metasmoke.erwaysoftware.com/search?utf8=%E2%9C%93${searchTitle}${searchBody}${searchUsername}&or_search=1`;
    window.open(url);
})();
```

### Two searches for the difference between two watchlist/keyword blacklist entries
The following bookmarklet will open two searches on MS to get the differences between two watchlist/keyword blacklist entries. The searches will be the relative complements of the hits for the two entries (i.e., one window showing what's caught by the first entry, but not caught by the second entry; and one window showing what's caught by the second entry, but not caught by the first entry).

The bookmarklet will prompt you for both a description for each entry and the entries (i.e., the prompts are in the order description 1, entry 1, description 2, entry 2). The descriptions are used in a regex comment, so it's easier to know which window is which. The descriptions are not permitted to be blank, nor to include "(" or ")". 
```javascript
javascript:(function(){
    function openSearchForText(text) {
        const searchTerm = encodeURIComponent(text);
        const searchTitle = `&title_is_regex=1&title=${searchTerm}`;
        const searchBody = `&body_is_regex=1&body=${searchTerm}`;
        const searchUsername = `&username_is_regex=1&username=${searchTerm}`;
        const url = `https://metasmoke.erwaysoftware.com/search?utf8=%E2%9C%93${searchTitle}${searchBody}${searchUsername}&or_search=1`;
        window.open(url);
    }
    let description1 = '';
    while (!description1 || description1.includes('(') || description1.includes(')')) {
        description1 = window.prompt('Description for first entry (may not contain "(" or ")"):');
    }
    let entry1 = '';
    while (!entry1) {
        entry1 = window.prompt('First entry:');
    }
    let description2 = '';
    while (!description2 || description2.includes('(') || description2.includes(')')) {
        description2 = window.prompt('Description for second entry (may not contain "(" or ")"):');
    }
    let entry2 = '';
    while (!entry2) {
        entry2 = window.prompt('Second entry:');
    }
    openSearchForText(`(?#IN ${description1}, but NOT IN ${description2})(?s)^(?=[\\W\\w]*?(?:^|\\b)${entry1}(?:\\b|$))(?![\\W\\w]*?(?:^|\\b)${entry2}(?:\\b|$))`);
    openSearchForText(`(?#IN ${description2}, but NOT IN ${description1})(?s)^(?=[\\W\\w]*?(?:^|\\b)${entry2}(?:\\b|$))(?![\\W\\w]*?(?:^|\\b)${entry1}(?:\\b|$))`);
})();
```

## Other searching

### Search for text in Charcoal HQ
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode).*/
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    text = `https://chat.stackexchange.com/search?q=${encodeURIComponent(text)}&room=11540&page=1&pagesize=100&sort=newest`;
    window.open(text);
})();
```

### Search for a domain on Stack Exchange
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode).*/
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    text = text.replaceAll('[\\W_]*+', ' ').replace(/\\/g, '').replace(/(?:https?:)?(?:\/\/)?((?:[a-z\d-]+\.)+[a-z\d-]+)(?:$|[\s"\/].*$)/, '$1').replace(/^www\./,'');
    text = `https://stackexchange.com/search?pagesize=100&q=url%3A"${encodeURIComponent(text)}"`;
    window.open(text);
})();
```

### Search for text on Stack Exchange
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode).*/
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    text = `https://stackexchange.com/search?pagesize=100&q="${encodeURIComponent(text.replaceAll('[\\W_]*+', ' '))}"`;
    window.open(text);
})();
```

### Search for a domain on Stack Overflow
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode).*/
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    text = text.replaceAll('[\\W_]*+', ' ').replace(/\\/g, '').replace(/(?:https?:)?(?:\/\/)?((?:[a-z\d-]+\.)+[a-z\d-]+)(?:$|[\s"\/].*$)/, '$1').replace(/^www\./,'');
    text = `https://stackoverflow.com/search?pagesize=100&q=url%3A"${encodeURIComponent(text)}"`;
    window.open(text);
})();
```

### Search for text on Stack Overflow
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode).*/
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    text = `https://stackoverflow.com/search?pagesize=100&q="${encodeURIComponent(text.replaceAll('[\\W_]*+', ' '))}"`;
    window.open(text);
})();
```

### Username on SEDE user search (with login to SEDE)
This will open a new tab with a search for SE account usernames which match the selected text. The search ignores upper/lowercase.

SEDE typically doesn't keep you logged in, so a CAPTCHA has to be filled out for each search. In order to avoid needing to fill out the CAPTCHA, this bookmarklet will first open another page on SEDE, which will cause you to be logged back in, if you were previously logged in. It will then open the SEDE username search with the selected text.

It only looks at the username on the user's SE account, which means if the user is using a matching username on a site, but not on their SE account, that will not be detected.
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use const instead of var. */
    var text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    const searchTerm = encodeURIComponent(text);
    const searchUsername = `username=${searchTerm}`;
    /*const url = `https://data.stackexchange.com/stackoverflow/query/1242966/users-with-a-certain-name-across-the-network?${searchUsername}`;*/
    const url = `https://data.stackexchange.com/stackoverflow/query/1843461/users-with-a-certain-name-across-the-network-with-usernames?${searchUsername}`;
    /* Authenticate; wait for authentication, then open search. */
    const authenticateURL = `https://data.stackexchange.com/user/authenticate?oauth2url=https://stackoverflow.com/oauth&openid=`;
    const target=`makyen-SEDE-with-authenticate-${Date.now()}`;
    window.open(authenticateURL, target);
    setTimeout(() => window.open(url, target), 10000);
})();
```

### LIKE username on SEDE user search (with login to SEDE)
This will open a new tab with a search for SE account usernames which more loosely match the selected text.

SEDE typically doesn't keep you logged in, so a CAPTCHA has to be filled out for each search. In order to avoid needing to fill out the CAPTCHA, this bookmarklet will first open another page on SEDE, which will cause you to be logged back in, if you were previously logged in. It will then open the SEDE LIKE username search with the selected text. Note that the search ignores upper/lowercase.

It only looks at the username on the user's SE account, which means if the user is using a matching username on a site, but not on their SE account, that will not be detected.
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use const instead of var. */
    var text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    const searchTerm = encodeURIComponent(text);
    const searchUsername = `username=${searchTerm}`;
    const url = `https://data.stackexchange.com/stackoverflow/query/1838818/users-like-a-certain-name-across-the-network?${searchUsername}`;
    /* Authenticate; wait for authentication, then open search. */
    const authenticateURL = `https://data.stackexchange.com/user/authenticate?oauth2url=https://stackoverflow.com/oauth&openid=`;
    const target=`makyen-SEDE-with-authenticate-${Date.now()}`;
    window.open(authenticateURL, target);
    setTimeout(() => window.open(url, target), 10000);
})();
```

### User on SO user search (change the code to the site you're interested in)
Opens a new tab with a search on Stack Overflow's user search for the selected text
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode). It has been modified to use const instead of var. */
    var text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") && /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    const searchTerm = encodeURIComponent(text);
    const searchUsername = `&search=${searchTerm}`;
    const url = `https://stackoverflow.com/users?tab=Reputation&filter=all${searchUsername}`;
    window.open(url);
})();
```

## Various

### Toggle display of SmokeDetector and metasmoke in Charcoal HQ, or other chat.SE room
The messages from the SmokeDetector and metasmoke accounts will be toggled between shown/not shown. Only works for a tab that's actively viewing a chat room on chat.stackexchange.com.
```
javascript:(function(){
    showHideForUser(478536, shouldShowUser(478536));
    showHideForUser(120914, shouldShowUser(120914));
})();
```

### Create "Sill alive" message
the following bookmarklet will create "still alive" messages. 

To use it, click "reply" to the SD message containing the report for the post you're wanting to post a "still alive" message for and then activate the bookmarklet (i.e. activate the bookmarklet when there's just the ":<chat message id>" text in the chat input area):
```
javascript:void((function() {
    const input = $('#input');
    function addStillAliveToInput(msHref, siteHref) {
        if (msHref && siteHref) {
            const stillAliveText = `[Still alive](${siteHref}) \\[[MS](${msHref})]`;
            input.val(currentInputValue + stillAliveText);
        }
    }
    const currentInputValue = input.val();
    const messageId = Number(currentInputValue.match(/\d+/)[0]);
    if (messageId) {
        const replyToContent = $(`#message-${messageId} .content`);
        if (replyToContent.length) {
            const msHref = replyToContent.find('a[href*="erwaysoftware"]').first().attr('href');
            const siteHref = replyToContent.find('a[href*="/q/"],a[href*="/a/"],a[href*="/questions/"],a[href*="/answers/"]').first().attr('href');
            addStillAliveToInput(msHref, siteHref);
        } else {
            $.get(`${window.location.origin}/message/${messageId}?plain=true`).done((response) => {
                const [, msHref, siteHref] = response.match(/\(([^)]+?erwaysoftware[^)]+)\).*?\(([^)]+?\/(?:a(?:nswers)?|q(?:uestions)?)\/[^)]+)\)/);
                addStillAliveToInput(msHref, siteHref);
            });
        }
    }
})())
```

### Minimize metasmoke search URL and escape characters
On a metasmoke search page, this will minimize the current page URL and escape the URL so it can be pasted into chat. The result will be copied to the clipboard.
```
javascript:void(function() {
    const result = location.href
        .replace(/(?:^https?:|&\w+=(?=&|$)|&commit=Search|&user_reputation=0\b|&user_rep_direction=(?:>|%3(?:E))%3(?:D))/g,'')
        .replace(/\?utf8=%E(?:2%9)(?:C%9)(?:3&)/,'?')
        .replaceAll(')','\\)')
        .replaceAll('(','\\(')
        .replaceAll('[','\\[')
        .replaceAll(']','\\]')
        .replaceAll('"','\\"')
        .replace(/^\/\/metasmoke/, '//m');
    const resultInTextArea = '<textarea>' + result + '</textarea>';
    const textarea = $(resultInTextArea).appendTo(document.body);
    try {
        textarea[0].select();
        success = document.execCommand('copy');
        if (!success) throw 1;
        confirm('Copied to clipboard:\n\n' + result);
    } catch (e) {
        alert('UNABLE TO COPY to clipboard:\n\n' + result);
    }
    textarea.remove();
}())
```

### Translate selected text on Google Translate
A new tab will be opened to translate the selected text on Google Translate. Note that this will put the untranslated text as part of a URL in your browser history.
```
javascript:(function(){
    /* The code to get the selected text on multiple platforms is from an [answer to "Get the Highlighted/Selected text"](https://stackoverflow.com/a/5379408) copyright by Tim Down and is under a [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/legalcode).*/
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea" || activeElTagName == "input") &&
        /^(?:text|textarea|search|password|tel|url)$/i.test(activeEl.type) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    window.open('https://translate.google.com/#auto/en/' + text);
})();
```

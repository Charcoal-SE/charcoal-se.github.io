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

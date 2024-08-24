---
---

# 3. When do you watch spam?
Adding websites and keywords to SmokeDetector's watchlists is a big part of being a privileged
user on Charcoal.

Unless a post is ***obvious*** spam, it can sometimes be a bit overwhelming to detect what is a 
legit post and what is not. After you've checked a post, determined that it's spam and found the text
or website you want SmokeDetector to watch, we recommend doing a bit of research before adding it.

 - **Search** for the URL or keyword on [Stack Exchange](https://stackexchange.com/)
   - Use `url:example.com` in the search bar to find all questions and answers that have that website
     in them. Check how many hits come up and if it's only the spam and 2-3 other posts it will
     typically be OK to add it.
   - Keywords can be searched just like normal text, but multiple keywords should be enclosed in
     quotation marks. Example: `"key word"` and `"more words to search for"`. In this way it will
     only show results for the actual text you search for. Stack Exchange will otherwise show results
     for each searched word and this will typically return too many hits.
     You can also use `code:keyword` to search for text that is hidden in a code snippet.
 - **Search** [metasmoke](https://metasmoke.erwaysoftware.com/search) to see if anything already exist.
   Maybe there's a lot of false positives, which would mean, that it shouldn't be added to the watchlist.
   Metasmoke can be a bit complicated, but it can also be the best tool to find posts reported by
   SmokeDetector. If you are good at regex it can be an advantage.
   - Select `regex` in title, body and username. Now select `Use OR for text search (uses AND by default)`.
     Enclose the text or URL you want to search for with `\b` and remember to escape functional regex
     characters (`.` `()` `[]` etc.). You need to exclude `www.` from any URLs.
     Example: Enter `\bsocket\.io\b` in title, body and username. It will now search for posts that
     contain `socket.io` in either one or all of those fields. This broad search will make sure it catches
     posts where spammers, for instance, have added a URL to only the title or maybe even in their username.
 - **Check** [open pull requests](https://github.com/Charcoal-SE/SmokeDetector/pulls) on SmokeDetector
   Github. The watch you want to add might already be queued for approval. It's always a good idea to
   check and make sure it's not a duplicate.

## Bookmarklets
To make life a bit easier, some users have made bookmarklets, that can do all the searching for you. Just
select and mark the text you want to search for in a report from SmokeDetector and then click the
bookmarklet. Depending on the version you choose to use, a new window will open in your browser and
automatically do the search for you.

A bookmarklet is just a normal browser bookmark, where you add javascript code to the URL field. This will
then execute the code when you click the bookmark. When you copy the javascript code in the links below
it's important to convert it first to one line so that it can be pasted into the URL field.

List of bookmarklets:
 - **Makyen** [Link](https://chat.stackexchange.com/rooms/11540/conversation/bookmarklets-for-searching-ms-for-blacklisted-expressions)
   - The general bookmarklet for searching on metasmoke is the third one called **For blacklisted websites**.
 - **Ryan M** [Link](https://gist.github.com/ThatRyanPerson/c3d50439e41f5e19b2b4a51c5f8f88a9)
   - This one will search both metasmoke, but will also open three additional windows that searches
     Stack Exchange with all the proper keywords and formatting. It uses optimized regex for metasmoke
     to minimize load.

-----

[Next: Privileges][3]

[Return to Introduction Index][8]

[3]: /training/privileges
[8]: /training/index

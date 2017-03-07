Metasmoke offers an API to access data in JSON format about posts, reasons, and feedback. This is the documentation for said API.

If you’re looking for the WebSocket API, go [here](WebSocket-API).

## Getting Started
To get started, you'll need an API key. No application can use the API without a key - you'll get a 403 response. To get a key, ping a metasmoke admin in chat - they'll be able to register one for you. Have a name in mind for your app - a name is necessary to register a key. You can edit it later, so it doesn't have to be final. Also make sure that you have an active metasmoke account - this allows the registering admin to tie the key to your account, giving you control of your app.

Once you have your key, you should include it as the `key` query string parameter on **all requests** to the API.

#### Filters
The metasmoke API supports parameter-based filters (like the Stack Exchange API) so that you can filter a response down to only the fields you want.

To create a filter, visit [metasmoke.erwaysoftware.com/api/filters](https://metasmoke.erwaysoftware.com/api/filters) and select the fields you want in the response. **Only select the fields you need.** Selecting fields from unrelated tables may break things.

> **N.B.:** You *can* calculate filters yourself if you really want to, but you should have a thorough understanding of how to do so first. Ask ArtOfCode if you're unsure.

Once you've got your filter, include it as the `filter` parameter on requests to the API that use it.

#### Write Methods
Write methods additionally require you to go through OAuth to get hold of a *write token*, which can be used to authorize the write request. You should follow this flow:

- Send your user to `https://metasmoke.erwaysoftware.com/oauth/request?key=YOUR_KEY_HERE`
- If the user authorizes your app, they'll be given a code to provide you. Ask them to enter that code, then:
- Send an HTTP GET request to `https://metasmoke.erwaysoftware.com/oauth/token?key=YOUR_KEY_HERE&code=THEIR_CODE_HERE`. The response is a JSON object containing one key, `token`, the value of which is your write token.

Write tokens do not expire and can be used to authorize as many requests as you need. If you get a 401 Unauthorized response when you included a write token, that token has likely been revoked by an administrator or by the user, and you need to go through OAuth again.

## API Read Routes
- [Blacklisted Websites](Blacklisted-Websites): `/api/blacklist`
- [Post Feedback](Post-Feedback): `/api/post/:id/feedback`
- [Post Reasons](Post-Reasons): `/api/post/:id/reasons`
- [Posts by Date Range](Posts-by-Date-Range): `/api/posts/between`
- [Posts by Feedback](Posts-by-Feedback): `/api/posts/feedback`
- [Posts by ID](Posts-by-ID): `/api/posts/:ids`
- [Posts by Site](Posts-by-Site): `/api/posts/site`
- [Posts by URLs](Posts-by-URLs): `/api/posts/url`
- [Posts caught by reason](Posts-caught-by-reason): `/api/reason/:id/posts`
- [Reasons by ID](Reasons-by-ID): `/api/reasons/:ids`
- [Search Posts](Search-Posts): `/api/posts/search`
- [Undeleted Posts](Undeleted-Posts): `/api/posts/undeleted`
- [Valid Feedback Types](Valid-Feedback-Types): `/api/post/:id/valid_feedback`

## API Write Routes
- [Create Feedback](Create-Feedback): `POST /api/w/post/:id/feedback`
- [Report Post](Report-Post): `POST /api/w/post/report`
### Route Name
Create Feedback

### Route URL

    POST /api/w/post/:id/feedback

### Description & Usage

This route allows an app to submit feedback through the API. Your app must have passed through the OAuth flow for write routes (see [API documentation home](https://github.com/Charcoal-SE/metasmoke/wiki/API-Documentation)) and must have a valid write token; this token should be passed in the `token` query string parameter.

Specify the feedback type being added by using the `type` parameter. The `:id` parameter in the URL should be replaced with the metasmoke ID of the post; use the [posts by URL](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-URL) route to get the metasmoke ID if you don't already have it.

> **Heads up:** sending *any* type of positive feedback using this route will additionally blacklist the user with SmokeDetector.

This route will return all feedback on the post targeted once it has completed adding the new feedback.

### Example
**Request** (key and token omitted):

    HTTP/1.1 POST /api/w/post/20191/feedback?type=tpu-

**Response:**

    [
        {
            "id":16657,
            "message_link":null,
            "user_name":"Ferrybig",
            "user_link":null,
            "feedback_type":"tpu-",
            "post_id":20191,
            "post_link":"//drupal.stackexchange.com/questions/193526",
            "user_id":null,
            "is_invalidated":false,
            "invalidated_by":null,
            "invalidated_at":null,
            "chat_user_id":null,
            "created_at":null,
            "updated_at":null
        },
        {
            "id":16662,
            "message_link":null,
            "user_name":"JamesENL",
            "user_link":null,
            "feedback_type":"tpu-",
            "post_id":20191,
            "post_link":"//drupal.stackexchange.com/questions/193526",
            "user_id":null,
            "is_invalidated":false,
            "invalidated_by":null,
            "invalidated_at":null,
            "chat_user_id":null,
            "created_at":null,
            "updated_at":null
        }
    ]

(the response will also include the created feedback, which has been omitted here for brevity)

### Smokey websocket
> If you just want to use the route already, you don't need to read this section - it's just additional detail for the interested.

This route also makes use of the metasmoke-Smokey websocket to communicate feedback back to SmokeDetector. Specifically, these cases cause a websocket message to be sent:

- *any* type of true positive feedback will send a blacklist request (like `tpu-` with Smokey; the user will be blacklisted and all posts reported)
- `naa` feedback gets sent back to Smokey to avoid the post being escalated to the Tavern for feedback
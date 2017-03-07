### Route Name
Posts by URLs

### Route URL

    GET  /api/posts/urls
    POST /api/posts/urls

### Description & Usage
This route provides a way to access posts without having their metasmoke IDs; instead, you can use the URL to the post.

Pass a semicolon-delimited list of URLs to the posts in the `urls` query string parameter. Each URL must follow a specific format to match a post successfully. For questions, the URL should look like this:

    //drupal.stackexchange.com/questions/319845

For answers, the URL should be akin to this:

    //drupal.stackexchange.com/a/748265

In each case, replace the site and post ID with the correct values for your targeted post. The ID in this case is the **Stack Exchange ID**, not the metasmoke ID.

This route supports both GET and POST requests, for the event that your list of URLs is too long for a GET.

### Example
**Request:**

    HTTP/1.1 GET /api/posts/urls?urls=//drupal.stackexchange.com/questions/193526

**Response:**
  
    {
        "items": [{  
            "id":20191,
            "title":"It is well known that you should",
            "body":"<truncated>",
            "link":"//drupal.stackexchange.com/questions/193526",
            "post_creation_date":null,
            "created_at":"2016-03-04T08:24:32.000Z",
            "updated_at":"2016-03-04T08:29:54.000Z",
            "site_id":86,
            "user_link":"//drupal.stackexchange.com/u/58614",
            "username":"Yusef Hamid",
            "why":"Body - Position 417-433: musclegrowth.com\nPost - Link at end: http://masspmmusclegrowth.com/pearl-e-whites/\u003c/a\u003e",
            "user_reputation":1,
            "score":null,
            "upvote_count":null,
            "downvote_count":null,
            "stack_exchange_user_id":15384,
            "is_tp":true,
            "is_fp":false
        }],
        "has_more": false
    }
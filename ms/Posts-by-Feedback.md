### Route Name
Posts by Feedback

### Route URL

    /api/posts/feedback

### Description & Usage

This route provides a list of posts that have a specified feedback type on them. Specify the type of feedback by passing a valid feedback type. These include `tpu-`, `fp-`, `naa-`, or `ignore-`, but there are other valid [types](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-Feedback#valid-type-options).

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    HTTP/1.1 GET /api/posts/feedback?type=tpu-

**Response:**

    {
        "items":[
            {
                "id":672,
                "title":"Is \"fugazi\" an English word?",
                "body":"<truncated>",
                "link":"//ell.stackexchange.com/a/65729",
                "post_creation_date":null,
                "created_at":null,
                "updated_at":"2015-09-07T02:25:41.000Z",
                "site_id":186,
                "user_link":null,
                "username":null,
                "why":null,
                "user_reputation":null,
                "score":null,
                "upvote_count":null,
                "downvote_count":null,
                "stack_exchange_user_id":null,
                "is_tp":true,
                "is_fp":false
            },
            {
                "id":674,
                "title":"Is there any difference between Loan and Credit?",
                "body":"<truncated>",
                "link":"//english.stackexchange.com/a/270130",
                "post_creation_date":null,
                "created_at":null,
                "updated_at":"2015-09-07T02:25:41.000Z",
                "site_id":33,
                "user_link":null,
                "username":null,
                "why":null,
                "user_reputation":null,
                "score":null,
                "upvote_count":null,
                "downvote_count":null,
                "stack_exchange_user_id":null,
                "is_tp":true,
                "is_fp":false
            }
        ],
        "has_more":true
    }

### Valid Type options

A summary of *all* `type`s that Meta Smoke has ever seen was [posted](http://chat.stackexchange.com/transcript/message/33128805#33128805) on Oct. 25, 2016. However, not all of these are really useful. The most common `type` values are (in descending order of usage, and anything seen over 100 times since the post linked above):

 - `tpu-`
 - `tp`
 - `fp-`
 - `fp`
 - `naa-`
 - `trueu-`
 - `tpu`
 - `naa`
 - `tp-`
 - `ignore-`
 - `fpu-`
 - `trueu`
 - `Ambiguous`  
 - `ignore`
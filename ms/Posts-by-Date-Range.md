### Route Name
Posts by Date Range

### Route URL

    /api/posts/between

### Description & Usage
This route allows you to discover posts that were reported/recorded in a specific time period. Use the `from_date` and `to_date` query string parameters to adjust the date range you get; both of these parameters should be filled with a Unix timestamp (seconds since the epoch).

> **Note for JavaScript developers:** JavaScript uses pseudo-Unix timestamps, in that it records *milli*seconds since the epoch. To provide a valid value, divide the timestamp by 1000 and round the result.

Behaviour is undefined if only one of these parameters is filled; there is no guarantee what results you get and it may change at any time. Do this at your own risk.

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    GET /api/posts/between?from_date=1477404348&to_date=1477490748 HTTP/1.1

**Response:**

    {
        "items":[
            {
                "id":44810,
                "title":"HL12 Diabetes is a characteristic equation",
                "body":"<truncated for brevity>",
                "link":"//drupal.stackexchange.com/questions/218904",
                "post_creation_date":null,
                "created_at":"2016-10-26T14:03:44.000Z",
                "updated_at":"2016-10-26T14:04:06.000Z",
                "site_id":86,
                "user_link":"//drupal.stackexchange.com/u/68737",
                "username":"Kathleenpochi",
                "why":"Body - Position 277-293: weight reduction\nBody - Position 375-394: supplementsoffer.co, Position 616-635: supplementsoffer.co\nPost - Link at end: http://www.supplementsoffer.com/hl12-diabetes/\u003c/a\u003e",
                "user_reputation":1,
                "score":null,
                "upvote_count":null,
                "downvote_count":null,
                "stack_exchange_user_id":37865,
                "is_tp":true,
                "is_fp":false,
                "is_naa":false
            },
            {
                "id":44809,
                "title":"Best site for git commands line beginning. Try this keep handy www.devcli.com/git",
                "body":"<truncated for brevity>",
                "link":"//stackoverflow.com/questions/40264223",
                "post_creation_date":null,
                "created_at":"2016-10-26T13:59:38.000Z",
                "updated_at":"2016-10-26T13:59:48.000Z",
                "site_id":1,
                "user_link":"//stackoverflow.com/u/6784831",
                "username":"Koshta",
                "why":"Post manually reported by user *Magisch* in room *SO Close Vote Reviewers*.\n",
                "user_reputation":1,
                "score":-3,
                "upvote_count":null,
                "downvote_count":3,
                "stack_exchange_user_id":37864,
                "is_tp":true,
                "is_fp":false,
                "is_naa":false
            },
            {
                "id":44808,
                "title":"It's now or in no manner that you just get well Muscle Boost X?",
                "body":"<truncated for brevity>" rel=\"nofollow\"\u003ehttp://boostupmuscles.com/muscle-boost-x/\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://i.stack.imgur.com/vW69L.jpg\" rel=\"nofollow\"\u003e\u003cimg src=\"https://i.stack.imgur.com/vW69L.jpg\" alt=\"enter image description here\"\u003e\u003c/a\u003e\u003c/p\u003e\n",
                "link":"//graphicdesign.stackexchange.com/questions/79301",
                "post_creation_date":null,
                "created_at":"2016-10-26T13:59:27.000Z",
                "updated_at":"2016-10-26T13:59:27.000Z",
                "site_id":68,
                "user_link":"//graphicdesign.stackexchange.com/u/78948",
                "username":"WilliaStengel",
                "why":"Title - Position 49-55: Muscle\nBody - Position 515-527: .com/muscle-\nBody - Position 508-519: muscles.com, Position 566-577: muscles.com",
                "user_reputation":1,
                "score":null,
                "upvote_count":null,
                "downvote_count":null,
                "stack_exchange_user_id":37863,
                "is_tp":false,
                "is_fp":false,
                "is_naa":false
            }
        ],
        "has_more":true
    }
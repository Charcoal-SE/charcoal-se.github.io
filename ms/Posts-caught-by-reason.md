### Route Name
Posts caught by reason

### Route URL

    /api/reason/:id/posts

### Description & Usage
This route provides data about the posts caught by a specific reason. Replace `:id` in the URL with the ID of the metasmoke reason you want data for, and all database fields for each post caught by that reason will be returned.

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    HTTP/1.1 GET /api/reason/47/posts

**Response:**

    {
        "items":[
            {
                "id":247,
                "title":"Mobile No getting saved in database and upon retrieval generating 2147483647",
                "body":"<truncated>",
                "link":null,
                "post_creation_date":null,
                "created_at":null,
                "updated_at":"2016-03-05T21:01:40.000Z",
                "site_id":null,
                "user_link":null,
                "username":null,
                "why":null,
                "user_reputation":null,
                "score":null,
                "upvote_count":null,
                "downvote_count":null,
                "stack_exchange_user_id":null,
                "is_tp":false,
                "is_fp":true
            },
            {
                "id":249,
                "title":"vagrant up failed, undefined method \\`encode' for 8796761404823:Fixnum (NoMethodError)",
                "body":"<truncated>",
                "link":null,
                "post_creation_date":null,
                "created_at":null,
                "updated_at":"2016-03-05T21:01:41.000Z",
                "site_id":null,
                "user_link":null,
                "username":null,
                "why":null,
                "user_reputation":null,
                "score":null,
                "upvote_count":null,
                "downvote_count":null,
                "stack_exchange_user_id":null,
                "is_tp":false,
                "is_fp":true
            },
            ...
        ],
        "has_more":true
    }
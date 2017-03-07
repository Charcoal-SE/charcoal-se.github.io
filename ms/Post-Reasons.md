### Route Name
Post Reasons

### Route URL

    /api/post/:id/reasons

### Description & Usage
This route provides details of the reasons a post was caught by. Replace `:id` in the URL with the metasmoke post ID you're looking for, and all database fields for each reason will be returned.

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    HTTP/1.1 GET /api/post/20191/reasons

**Response:**

    {
        "items": [
            {
                "id":15,
                "reason_name":"Link at end of body",
                "last_post_title":"VitaPulse by Princeton Vitamins is evidently",
                "inactive":false
            },
            {
                "id":35,
                "reason_name":"Pattern-matching website in body",
                "last_post_title":"VitaPulse by Princeton Vitamins is evidently",
                "inactive":false
            }
        ],
        "has_more": false,
    }
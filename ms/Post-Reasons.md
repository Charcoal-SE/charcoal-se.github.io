### Route Name
Post Reasons

### Route URL

    /api/post/:id/reasons

### Description & Usage
This route provides details of the reasons a post was caught by. Replace `:id` in the URL with the metasmoke post ID you're looking for, and all database fields for each reason will be returned.


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
                "inactive":false,
                "weight": 50,
                "maximum_weight": null
            },
            {
                "id":35,
                "reason_name":"Pattern-matching website in body",
                "last_post_title":"VitaPulse by Princeton Vitamins is evidently",
                "inactive":false,
                "weight": 50,
                "maximum_weight": null
            }
        ],
        "has_more": false
    }
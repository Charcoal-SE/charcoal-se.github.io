### Route Name
Posts by ID

### Route URL

    /api/posts/:ids

### Description & Usage
This route allows you to retrieve data about posts by specifying their IDs. Replace `:ids` in the URL with a semicolon-delimited list of metasmoke post IDs, and all database fields on each post object will be returned.

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    HTTP/1.1 GET /api/posts/20191;20192

**Response:**

    {
        "items": [
            {
                "id": 20192,
                "title": "Poets preferably with an electric toothbrush",
                "link": "//askubuntu.com/questions/741932",
                "post_creation_date": null,
                "created_at": "2016-03-04T08:24:36.000Z",
                "user_link": "//askubuntu.com/u/514570",
                "username": "Yusef Hamid",
                "user_reputation": 1,
                "score": null,
                "is_tp": true,
                "is_fp": false,
                "is_naa": false,
                "count_tp": 2,
                "count_fp": 0,
                "count_naa": 0,
                "autoflagged": false
            },
            {
                "id": 20191,
                "title": "It is well known that you should",
                "link": "//drupal.stackexchange.com/questions/193526",
                "post_creation_date": null,
                "created_at": "2016-03-04T08:24:32.000Z",
                "user_link": "//drupal.stackexchange.com/u/58614",
                "username": "Yusef Hamid",
                "user_reputation": 1,
                "score": null,
                "is_tp": true,
                "is_fp": false,
                "is_naa": false,
                "count_tp": 2,
                "count_fp": 0,
                "count_naa": 0,
                "autoflagged": false
            }
        ],
        "has_more": false
    }
### Route Name
Detailed Time to Deletion

### Route URL

    /api/stats/detailed_ttd

### Description & Usage
This route allows you to view data about the average time to deletion (in seconds) for posts during each hour of the day, given that the posts were marked as spam and determined to be true positives. 

The response shows three groups of "flags", which correspond to post creation dates:
- "0 flags": post created before 1/1/2017
- "1 flag": post created on/after 1/1/2017 and before 2/14/2017
- "3 flags": post created on/after 2/14/2017

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    HTTP/1.1 GET /api/stats/detailed_ttd

**Response:**

        {
            "name": "0 flags",
            "data": [
                [0, "632.0" ],
                [1, "600.0"],
                [2, "631.0"],
                ...
                [21, "481.0"],
                [22, "554.0"],
                [23, "603.0"],
            ]
        }
        {
            "name": "1 flag",
            "data": [
                [0, "564.0" ],
                [1, "610.0"],
                [2, "620.0"],
                ...
                [21, "343.0"],
                [22, "424.0"],
                [23, "474.0"],
            ]
        }
        {
            "name": "3 flags",
            "data": [
                [0, "571.0" ],
                [1, "584.0"],
                [2, "694.0"],
                ...
                [21, "634.0"],
                [22, "622.0"],
                [23, "621.0"],
            ]
        }
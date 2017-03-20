### Route Name
Blacklisted Websites

### Route URL

    /api/blacklist

### Description & Usage
This route supplies a list of active blacklist entries - domain names that have been blacklisted on metasmoke.

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    GET /api/blacklist HTTP/1.1

**Response:**

    {
      "items": [
        {
          "id": 1,
          "host": "spamspamspam.spam",
          "is_active": true,
          "created_at": "2016-07-20T19:18:23Z",
          "updated_at": "2016-07-20T19:18:23Z"
        }
      ],
      "has_more": false
    }
### Route Name
Reasons by ID

### Route URL

    /api/reasons/:ids

### Description & Usage
This route allows you to get data about reasons by specifying their IDs. Replace `:ids` in the URL with a semicolon-delimited list of metasmoke reason IDs (which can be found on the metasmoke dashboard - look in the link to each reason), and all database fields on each reason will be returned.

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    HTTP/1.1 GET /api/reasons/47;67

**Response:**

    {
        "items":[
            {
                "id":47,
                "reason_name":"Phone number detected in title",
                "last_post_title":"1.8.0.0. .8.4.1. 6.4.3.6. N.e.t.f.l.i.x C.u.s.t.o.me.r. S.u.p.po.r.t P.h.on.e N.u.mb.e.r",
                "inactive":false
            },
            {
                "id":67,
                "reason_name":"Black magic in title",
                "last_post_title":"black magic Specialist 9928749449",
                "inactive":false
            }
        ],
        "has_more":false
    }
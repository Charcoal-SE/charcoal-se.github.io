### Route Name
Reasons by ID

### Route URL

    /api/reasons/:ids

### Description & Usage
This route allows you to get data about reasons by specifying their IDs. Replace `:ids` in the URL with a semicolon-delimited list of metasmoke reason IDs (which can be found on the metasmoke dashboard - look in the link to each reason), and all database fields on each reason will be returned.


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
                "inactive":false,
                "weight": 71,
                "maximum_weight": null
            },
            {
                "id":67,
                "reason_name":"Black magic in title",
                "last_post_title":"black magic Specialist 9928749449",
                "inactive":false,
                "weight": 68,
                "maximum_weight": null
            }
        ],
        "has_more":false
    }
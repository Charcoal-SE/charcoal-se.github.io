### Route Name
Posts caught by reason

### Route URL

    /api/reason/:id/posts

### Description & Usage
This route provides data about the posts caught by a specific reason. Replace `:id` in the URL with the ID of the metasmoke reason you want data for, and all database fields for each post caught by that reason will be returned.


### Example
**Request:**

    HTTP/1.1 GET /api/reason/47/posts

**Response:**

    {
        "items":[
            {
                "id": 88771,
                "title": "What 844\*(235)\*O34I Coinbase customer service is Coinbase phone number?",
                "body": "<truncated>",
                "link": "//stackoverflow.com/questions/46708105",
                "post_creation_date": null,
                "created_at": "2017-10-12T11:08:58.000Z",
                "updated_at": "2017-10-12T11:11:08.000Z",
                "site_id": 1,
                "user_link": "https://stackoverflow.com/users/8614650/djsmitparry",
                "username": null,
                "why": "Title - Phone number: 8442350341",
                "user_reputation": 1,
                "score": null,
                "upvote_count": null,
                "downvote_count": null,
                "stack_exchange_user_id": 77652,
                "is_tp": true,
                "is_fp": false,
                "is_naa": false,
                "revision_count": 1,
                "deleted_at": "2017-10-12T11:11:08.000Z",
                "smoke_detector_id": 18,
                "autoflagged": false
            },
            {
                "id": 88414,
                "title": "Connection failed:Access denied for user 'u910188312\_gross'@'156.67.222.30' (using password: YES). Is there any solution?",
                "body": "<truncated>",
                "link": "//stackoverflow.com/questions/46668441",
                "post_creation_date": null,
                "created_at": "2017-10-10T13:47:18.000Z",
                "updated_at": "2017-10-10T13:47:39.000Z",
                "site_id": 1,
                "user_link": "https://stackoverflow.com/users/8720919/deekshith",
                "username": null,
                "why": "Title - Phone number: 1566722230",
                "user_reputation": 1,
                "score": null,
                "upvote_count": null,
                "downvote_count": null,
                "stack_exchange_user_id": 77329,
                "is_tp": false,
                "is_fp": true,
                "is_naa": false,
                "revision_count": 1,
                "deleted_at": null,
                "smoke_detector_id": 18,
                "autoflagged": false
            },
            ...
        ],
        "has_more":true
    }
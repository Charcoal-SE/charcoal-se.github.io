### Route Name
Posts by ID

### Route URL

    /api/posts/:ids

### Description & Usage
This route allows you to retrieve data about posts by specifying their IDs. Replace `:ids` in the URL with a semicolon-delimited list of metasmoke post IDs, and all database fields on each post object will be returned.


### Example
**Request:**

    HTTP/1.1 GET /api/posts/20191;20192

**Response:**

    {
        "has_more": false,
        "items": [
            {
                "id": 20192,
                "title": "Spammy Title",
                "body": "<p>(spammy text, lots of it)</p>\n",
                "link": "//askubuntu.com/questions/741932",
                "site_id": 29,
                "user_link": "//askubuntu.com/u/514570",
                "username": "Redacted User",
                "why": "Body - Position 781-797: example.com\nPost - Link at end: http://example.com/product-promotion/</a>",
                "user_reputation": 1,
                "stack_exchange_user_id": 15385,
                "is_tp": true,
                "is_fp": false,
                "is_naa": false,
                "deleted_at": null,
                "count_tp": 2,
                "count_fp": 0,
                "count_naa": 0,
                "autoflagged": {
                    "flagged": false,
                    "names": [],
                    "users": []
                },
                "manual_flags": {
                    "users": []
                },
                "feedbacks": [
                    {
                        "feedback_type": "tpu-",
                        "user_name": "Meanie"
                    },
                    {
                        "feedback_type": "tpu-",
                        "user_name": "Eenie"
                    }
                ],
                "reason_weight": 196,
                "revision_count": 0
            },
            {
                "id": 20191,
                "title": "This is Spammy Too",
                "body": "<p>(Another similar spam post)</p>\n",
                "link": "//drupal.stackexchange.com/questions/193526",
                "site_id": 86,
                "user_link": "//drupal.stackexchange.com/u/58614",
                "username": "Redacted User",
                "why": "Body - Position 417-433: example.com\nPost - Link at end: http://example.com/product-promotion/</a>",
                "user_reputation": 1,
                "stack_exchange_user_id": 15384,
                "is_tp": true,
                "is_fp": false,
                "is_naa": false,
                "deleted_at": null,
                "count_tp": 2,
                "count_fp": 0,
                "count_naa": 0,
                "autoflagged": {
                    "flagged": false,
                    "names": [],
                    "users": []
                },
                "manual_flags": {
                    "users": []
                },
                "feedbacks": [
                    {
                        "feedback_type": "tpu-",
                        "user_name": "Meanie"
                    },
                    {
                        "feedback_type": "tpu-",
                        "user_name": "Eenie"
                    }
                ],
                "reason_weight": 196,
                "revision_count": 0
            }
        ]
    }
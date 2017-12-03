### Route Name
Post Feedback

### Route URL

    /api/post/:id/feedback

### Description & Usage
This route will give you details of all feedbacks on one post. Replace `:id` in the URL with the metasmoke post ID you're looking for, and all database fields for each feedback will be returned.


### Example
**Request:**

    HTTP/1.1 GET /api/post/20191/feedback

**Response:**

    {
        "items": [
            {
                "id":16657,
                "message_link":null,
                "user_name":"Ferrybig",
                "user_link":null,
                "feedback_type":"tpu-",
                "post_id":20191,
                "post_link":"//drupal.stackexchange.com/questions/193526",
                "user_id":null,
                "is_invalidated":false,
                "invalidated_by":null,
                "invalidated_at":null,
                "chat_user_id":null,
                "created_at":null,
                "updated_at":null,
                "api_key_id": 15,
                "chat_host": null
            },
            {
                "id":16662,
                "message_link":null,
                "user_name":"JamesENL",
                "user_link":null,
                "feedback_type":"tpu-",
                "post_id":20191,
                "post_link":"//drupal.stackexchange.com/questions/193526",
                "user_id":null,
                "is_invalidated":false,
                "invalidated_by":null,
                "invalidated_at":null,
                "chat_user_id":null,
                "created_at":null,
                "updated_at":null,
                "api_key_id": 15,
                "chat_host": null
            }
        ],
        "has_more": false
    }
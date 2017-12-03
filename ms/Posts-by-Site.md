### Route Name
Posts by Site

### Route URL

    /api/posts/site

### Description & Usage
This route allows you to fetch posts based on the Stack Exchange site they were posted on. Use the `site` query string parameter to specify which site you want to check: this parameter should be filled with a valid site domain to the Stack Exchange site in question (such as `stackoverflow.com`, or `drupal.stackexchange.com`.

### Example
**Request:**

    HTTP/1.1 GET /api/posts/site?site=drupal.stackexchange.com

**Response:**

        {
            "id": 88814,
            "title": "For Which Age Group This Face Cream Is Suitable For?",
            "body": "<truncated>",
            "link": "//drupal.stackexchange.com/questions/247905",
            "site_id": 86,
            "user_link": "https://drupal.stackexchange.com/users/79823/aftly-19",
            "username": "Redacted User",
            "why": "<truncated>",
            "user_reputation": 1,
            "stack_exchange_user_id": 77689,
            "is_tp": true,
            "is_fp": false,
            "is_naa": false,
            "deleted_at": "2017-10-12T14:11:09.000Z"
        }
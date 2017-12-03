### Route Name
Users

### Route URL

    /api/users

### Description & Usage
This route supplies a list of metasmoke users, optionally filtered by role.

Adding the option `role` query string parameter and providing one of the available metasmoke roles will filter the list of users that are returned. Currently, the available roles are:

 - reviewer
 - admin
 - code_admin
 - developer
 - flagger
 - core
 - smoke detector runner

### Example
**Request:**

    GET /api/users HTTP/1.1

**Response:**

    {
      "items": [
        {
            "id": 1,
            "username": "Undo",
            "stackexchange_chat_id": 73046,
            "meta_stackexchange_chat_id": 215468,
            "stackoverflow_chat_id": 1849664,
            "stack_exchange_account_id": 1703573,
            "moderator_sites": [
              {
                  "id": 1,
                  "site_name": "Stack Overflow",
                  "site_url": "https://stackoverflow.com",
                  "site_logo": "https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico",
                  "site_domain": "stackoverflow.com",
                  "created_at": "2015-09-07T02:25:11.000Z",
                  "updated_at": "2017-09-16T18:33:57.000Z",
                  "flags_enabled": false,
                  "max_flags_per_post": 3,
                  "is_child_meta": false,
                  "last_users_update": "2017-09-16T18:33:57.000Z"
              }
        },
      ],
      "has_more": true
    }
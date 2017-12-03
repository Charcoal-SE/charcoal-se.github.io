### Route Name
Undeleted Posts

### Route URL

    /api/posts/undeleted

### Description & Usage

This route provides a list of posts that have not been recorded as being deleted. (Technically, this means posts that don't have a `DeletionLog` record associated with them.) **Be aware:** being listed on this route does not necessarily mean that the post is not deleted, only that we didn't record a deletion. Due to system design limitations, we don't always record a post being deleted. You should also check for deletion by attempting to fetch the post from Stack Exchange.

### Example
**Request:**

    GET /api/posts/undeleted HTTP/1.1

**Response:**

    {
        "id": 88844,
        "title": "Should I switch/rollover my IRA to a Gold IRA at Regal Assets?",
        "body": "<truncated>",
        "link": "//money.stackexchange.com/a/86039",
        "site_id": 31,
        "user_link": "https://money.stackexchange.com/users/63591/viktor",
        "username": "Viktor",
        "why": "Body - Position 203-214: wixsite.com, Position 275-286: wixsite.com Post - Keyword *visit my blog* with link <a href="https://goldirainvestments3.wixsite.com/blog"",
        "user_reputation": 1,
        "stack_exchange_user_id": 77713,
        "is_tp": false,
        "is_fp": false,
        "is_naa": false,
        "deleted_at": null
    }
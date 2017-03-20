### Route Name
Undeleted Posts

### Route URL

    /api/posts/undeleted

### Description & Usage

This route provides a list of posts that have not been recorded as being deleted. (Technically, this means posts that don't have a `DeletionLog` record associated with them.) **Be aware:** being listed on this route does not necessarily mean that the post is not deleted, only that we didn't record a deletion. Due to system design limitations, we don't always record a post being deleted. You should also check for deletion by attempting to fetch the post from Stack Exchange.

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
**Request:**

    GET /api/posts/undeleted HTTP/1.1

**Response:**

*(Not yet available; will be provided when the route is activated.)*
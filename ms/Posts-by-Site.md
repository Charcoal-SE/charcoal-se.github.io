### Route Name
Posts by Site

### Route URL

    /api/posts/site

### Description & Usage
This route allows you to fetch posts based on the Stack Exchange site they were posted on. Use the `site` query string parameter to specify which site you want to check: this parameter should be filled with a valid URL to the Stack Exchange site in question (such as `//stackoverflow.com/`, or `//drupal.stackexchange.com/`.

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.
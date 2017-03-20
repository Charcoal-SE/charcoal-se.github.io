### Route Name
Search Posts

### Route URL

    /api/posts/search

### Description & Usage
This route is a unification of a number of other routes, including [Posts by Feedback](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-Feedback), [Posts by Site](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-Site), and [Posts by Date Range](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-Date-Range). More exact documentation for the parameters of this route is available within the documentation for these individual routes. What follows is a list of available parameters for this route:

- [`feedback_type`](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-Feedback)
- [`from_date`](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-Date-Range)
- [`to_date`](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-Date-Range)
- [`site`](https://github.com/Charcoal-SE/metasmoke/wiki/Posts-by-Site)

You can use the `per_page` query string parameter to adjust how many results you get, up to a maximum of 100.

The `has_more` field in the response indicates if there are more results available than have been returned in this result set; use the `page` query string parameter to get the next page of results. `?page=1` will return the first page; `?page=2` the second, and so on.

### Example
Please refer to the individual route documentation for examples of the kind of data returned. This route returns an array (list) of posts, which is the same type returned by each individual route.
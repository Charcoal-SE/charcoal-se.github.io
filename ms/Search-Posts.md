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


### Example
Please refer to the individual route documentation for examples of the kind of data returned. This route returns an array (list) of posts, which is the same type returned by each individual route.
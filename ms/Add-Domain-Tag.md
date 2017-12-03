### Route Name
Add Domain Tag

### Route URL
    POST /api/w/domains/:id/add_tag

### Description & Usage
This route allows you to programmatically add a domain tag to a domain record. Specify the tag to add using the `tag` parameter; if the tag doesn't already exist, it will be created.

This route returns a list of the first _n_ tags on the domain after the requested tag has been added, where _n_ is determined by the `per_page` parameter (max 100). A `more_url` field is also returned, specifying the URL to issue a GET request to in order to get the full list of tags - this is the [Domain Tags route](Domain-Tags).

The `page` parameter is unavailable on this route.
### Route Name
Report Post

### Route URL

    /api/w/post/report

### Description & Usage
Use this route to report a post as spam to SmokeDetector. This functions the same as the `!!/report` command for SmokeDetector in chat, and is implemented by simply sending the details of the report across a websocket connection to SmokeDetector for it to deal with the reporting itself. Use the `post_link` query string parameter to specify a link to the post you want to report.

Since we have no way of knowing the final status of the sent data, this route *always* returns 201 Created and the plaintext response `OK`.

### Example
**Request** (key and token omitted):

    POST /api/w/post/report?post_link=//drupal.stackexchange.com/q/433924 HTTP/1.1

**Response** (status 201):

    OK
### Route Name
Valid Feedback Types

### Route URL

    /api/post/:id/valid_feedback

### Description & Usage
This route provides details of valid feedback types for a given post ID. This is an almost-constant value, but changes depending on whether the queried post is a question or an answer: NAA-type feedback is valid for answers, but not questions.

This route is not paginated.

### Example
**Request:**

    GET /api/post/20191/valid_feedback HTTP/1.1

**Response:**

    [
      {
        "type": "tp",
        "description": "True positive"
      },
      {
        "type": "tp-",
        "description": "True positive (silent)"
      },
      {
        "type": "tpu",
        "description": "True positive, blacklist user"
      },
      {
        "type": "tpu-",
        "description": "True positive, blacklist user (silent)",
        "aliases": ["k"]
      },
      {
        "type": "k",
        "description": "True positive, blacklist user (silent)",
        "alias_for": "tpu-"
      },
      {
        "type": "fp",
        "description": "False positive"
      },
      {
        "type": "fp-",
        "description": "False positive (silent)",
        "aliases": ["f"]
      },
      {
        "type": "fpu",
        "description": "False positive, whitelist user"
      },
      {
        "type": "fpu-",
        "description": "False positive, whitelist user (silent)"
      },
      {
        "type": "f",
        "description": "False positive (silent)",
        "alias_for": "fp-"
      }
    ]
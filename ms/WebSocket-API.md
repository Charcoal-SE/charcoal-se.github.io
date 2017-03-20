# Intro

<sup>**Note**: All JSON is formatted here. Where JSON is contained as a string value of a key, it is formatted. This is not the actual data sent.</sup>

1. Connect to `wss://metasmoke.erwaysoftware.com/cable`
1. When the socket is opened, you can send [subscriptions](#subscriptions)

# Messages Received from metasmoke

## Welcome

This is sent when the socket is first opened.
```json
{
  "type": "welcome"
}
```

## Confirm Subscription

This is sent when a channel has been subscribed to.
```json
{
  "type": "confirm_subscription",
  "identifier": "<subscription>",
}
```

## Ping

This is sent every 3 seconds to keep the socket alive.
`message` is the current Unix time.

```json
{
  "type": "ping",
  "message": 12345678
}
```

## Feedback

The `post_link` is the one that can be sent to the metasmoke API.
`user_name` is the user’s **metasmoke** display name.
`app_name` is the name of the app used to send the feedback (example: `"FDSC"`)
`symbol` is a HTML representation of the appropriate symbol to display.

```json
{
  "identifier": "<identifier>",
  "message": {
    "feedback": {
      "post_link": "//stackoverflow.com/a/12345",
      "feedback_type": "fp-",
      "user_name": "J F",
      "app_name": null,
      "symbol": "\u0026#x2717;"
    }
  }
}
```

# Messages Sent to metasmoke

## Subscription

The `identifier` is sent as the `identifier` of all messages coming from this channel.

```json
{
  "command": "subscribe",
  "identifier": "{
    \"channel\": \"<channel>\",
    \"key\": \"<API Key>\"
  }"
}
```
### Channels

* `ApiChannel`: This is the one you probably want.  

  example:
  ```json
  {"identifier": "{\"channel\":\"ApiChannel\",\"key\":\"<metasmoke API key>\"}", "command": "subscribe"}
  ```
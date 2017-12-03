The metasmoke websocket API allows you to have events pushed to you as they happen, which is useful to avoid having to poll the HTTP API for changes. You can subscribe to events from any model by specifying which models you want to watch when you connect.

**Note:** I recommend you use an ActionCable client rather than trying to communicate directly with the websocket - the latter is *possible*, but AC is weird enough that you're better off letting someone else do that hard work for you. This documentation assumes you're using the ActionCable JS client.

## Connection
Create a consumer using your ActionCable client. The consumer is the underlying connection to the websocket.

```js
const socket = ActionCable.createConsumer('wss://metasmoke.erwaysoftware.com/cable');
```

Using that consumer, you now need to create a subscription to the API channel. At this point, you need to specify both your API key, and which models you want to receive events from.

```js
socket.subscriptions.create({
  channel: 'ApiChannel',
  key: 'abcdef012345',
  events: 'posts;feedbacks;flag_logs'
}, {
  received: function (message) {
    console.log(message);
  }
});
```

With the subscription above, you will be sent an event every time a post, feedback, or flag log is created or updated.

### Specifying event types
With the example above, you will be sent all events for each model you specify - currently, that's creates and updates. You can optionally specify which events you want sent to you by including them in your subscription creation, using this syntax:

```js
socket.subscriptions.create({
  channel: 'ApiChannel',
  key: 'abcdef012345',
  events: 'statistics#create,update;posts#create'
}, {
  received: function (message) {
    console.log(message);
  }
});
```

This example will result in you being sent events when a post is created, and when a statistic is created *or* updated.

## Events
The full message sent to you by the websocket looks like this:

    {"identifier":"{\"channel\":\"ApiChannel\",\"key\":\"abcdef012345\",\"events\":\"announcements\"}","message":{"event_type":"create","event_class":"Announcement","object":{"id":8,"text":null,"expiry":null,"created_at":"2017-07-29T23:41:59.000Z","updated_at":"2017-07-29T23:41:59.000Z"}}}

Your ActionCable client will most likely decode that for you, and just provide you with the event data itself, which looks like this:

```json
{
  "event_type": "create",
  "event_class": "FlagLog",
  "object": { ... }
}
```

 - The `event_type` parameter reflects what kind of event caused the message - a new object being created, or an existing object being updated.
 - The `event_class` parameter is the model class name of the object concerned (such as `Post` or `FlagLog`).
 - The `object` parameter is the object itself: all the fields from that object's database row, minus any sensitive data like API tokens.

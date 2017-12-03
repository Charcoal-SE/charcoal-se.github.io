### Route Name
Smoke Detectors

### Route URL

    /api/smoke_detectors

### Description & Usage
This route supplies a list of smoke detectors.


### Example
**Request:**

    HTTP/1.1 GET /api/smoke_detectors

**Response:**

    {
        "items":[
            {
                "id": 1,
                "last_ping": "2017-02-06T23:20:50.000Z",
                "name": null,
                "location": "Redacted Location",
                "created_at": "2016-02-20T23:25:32.000Z",
                "updated_at": "2017-08-25T18:11:07.000Z",
                "email_date": "2017-02-05T03:36:04.000Z",
                "user_id": 1,
                "is_standby": false,
                "force_failover": false,
                "status_color": "good"
            },
            {
                "id": 2,
                "last_ping": "2017-10-07T00:13:05.000Z",
                "name": "Temp Smokey",
                "location": "Redacted Location",
                "created_at": "2016-05-09T20:21:30.000Z",
                "updated_at": "2017-10-07T00:13:05.000Z",
                "email_date": "2017-05-24T07:18:08.000Z",
                "user_id": 7,
                "is_standby": false,
                "force_failover": false,
                "status_color": "critical"
            }
        ],
        "has_more":false
    }
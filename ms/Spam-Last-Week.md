### Route Name
Spam Last Week

### Route URL

    /api/spam/last_week

### Description & Usage
This route allows you to retrieve data about how many posts were marked as spam and were true positives, for each website in the past week.

### Example
**Request:**

    HTTP/1.1 GET /api/spam/last_week

**Response:**

    {
        "3D Printing": 6,
        "Academia": 4,
        "Android Enthusiasts": 7,
        "Anime & Manga": 4,
        "Arduino": 4,
        "Arqade": 5,
        "Ask Different": 64,
        "Ask Patents": 3,
        "Ask Ubuntu": 222,
        "Astronomy": 30,
        "Aviation": 1,
        "Biblical Hermeneutics": 1,
        "Bicycles": 1,
        "Biology": 1,
        "Bitcoin": 9,
        "Chemistry": 2,
        "CiviCRM": 1,
        "Code Review": 1,
        "Computer Graphics": 1,
        "Computer Science": 2,
        "Craft CMS": 1,
        "Database Administrators": 1,
        "Drupal Answers": 59,
        ...
    }
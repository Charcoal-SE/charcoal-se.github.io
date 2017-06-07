---
title: Announcements
redirect_from: /announcements/index.html
---

# Announcements

{% for post in site.categories.announcements %}

  - [{{ post.title }}]({{ post.url }})
    > {{ post.excerpt }}

{% endfor %}

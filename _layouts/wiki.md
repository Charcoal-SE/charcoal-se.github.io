---
layout: default
---
{% capture sidebar %}
{% include_relative _Sidebar.md %}
{% endcapture %}

<div class="sidebar">
{{ sidebar | markdownify }}
</div>

{{ content }}

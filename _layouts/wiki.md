---
layout: default
---
{% capture sidebar %}
**[<i class="fa fa-pencil"></i> Edit on GitHub](//github.com/Charcoal-SE/{{ page.repo_name }}/wiki/{{ page.name|replace: '.md', '' }}/_edit)**

{% include_relative _Sidebar.md %}
{% endcapture %}
{% capture footer %}
{% include_relative _Footer.md %}
{% endcapture %}

<div class="sidebar">


{{ sidebar | markdownify }}

</div>


{{ content }}

<div class="footer footer-insert text-center">{{ footer | markdownify }}</div>

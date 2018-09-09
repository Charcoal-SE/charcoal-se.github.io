---
layout: default
---
{% capture sidebar %}
**[<i class="fa fa-pencil"></i> Edit on GitHub](//github.com/Charcoal-SE/{{ page.repo_name }}/wiki/{{ page.name|replace:'index.md', 'Home.md'|replace: '.md', '' }}/_edit)**

<div class="sidebar-content sidebar-content-{{ page.path|split:"/"|first }}">

{% include_relative _Sidebar.md %}

</div>
{% endcapture %}
{% capture footer %}
{% include_relative _Footer.md %}
{% endcapture %}

{{ content }}

<div class="sidebar">


{{ sidebar | markdownify }}

</div>


<div class="footer footer-insert text-center">{{ footer | markdownify }}</div>

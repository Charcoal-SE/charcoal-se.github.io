---
title: Code
---

Website built from:

* commit [`{{ site.github.build_revision|slice:0,7 }}`]({{ site.github.repository_url }}/commit/{{ site.github.build_revision }} '{{ site.github.build_revision }}') on [Charcoal-SE/charcoal-se.github.io](https://github.com/Charcoal-SE/charcoal-se.github.io)
* commit [`{{ site.data.commits.smokey|slice:0,7 }}`](https://github.com/Charcoal-SE/SmokeDetector/wiki/_compare/{{ site.data.commits.smokey }} '{{ site.data.commits.smokey }}') on the [Charcoal-SE/SmokeDetector wiki](//github.com/Charcoal-SE/SmokeDetector/wiki)
* commit [`{{ site.data.commits.ms|slice:0,7 }}`](https://github.com/Charcoal-SE/metasmoke/wiki/_compare/{{ site.data.commits.ms }} '{{ site.data.commits.ms }}') on the [Charcoal-SE/metasmoke wiki](//github.com/Charcoal-SE/metasmoke/wiki)

[Live build logs on Travis CI](https://travis-ci.org/Charcoal-SE/charcoal-se.github.io)

This site is powered by [Jekyll](https://jekyllrb.com) [v{{ jekyll.version }}](https://github.com/jekyll/jekyll/releases/v{{ jekyll.version }})

{% img name.svg height: "1" width %}
{% img charcoal.svg height: "1" width %}

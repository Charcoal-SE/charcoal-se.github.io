#= require vendor/autocomplete
#= require vendor/algoliasearchLite

_index = null
index = ->
  if !_index?
    client = algoliasearch(@searchConfig.appId, @searchConfig.key)
    _index = client.initIndex @searchConfig.index

  _index

getHeader = (ob) ->
  for i in [6..1]
    return ob["h#{i}"] if ob["h#{i}"]

escapeHTML = (text) ->
  autocomplete.escapeHighlightedString(
    text,
    '<span class="algolia__result-highlight">',
    '</span>'
  )

_resolver = document.createElement 'a'
resolve = (url) =>
  url = @searchConfig.baseUrl + url if url[0] == '/' && @searchConfig.baseUrl

  _resolver.href = url
  _resolver.href

$(window).on 'turbolinks:load', ->

  $('.search-link, .search-nav .close-icon').click ->
    $('.top-nav').toggleClass('search-mode')
    $('#search-input').focus()
    false

  $('#search-input').focus -> $('.search-nav').addClass 'focus'
  $('#search-input').blur -> $('.search-nav').removeClass 'focus'

  isMobile = window.matchMedia('(max-width: 768px)').matches # from mixins.scss
  hitsPerPage = if isMobile then 5 else 10

  autocomplete('#search-input', keyboardShortcuts: ['s', '/'], debug: true, [
    source: autocomplete.sources.hits(index(), { hitsPerPage })
    templates:
      suggestion: (suggestion) ->
        subsection = ''
        header = getHeader(suggestion._highlightResult) || getHeader(suggestion)
        if header
          subsection = "<small>\xA7 #{escapeHTML(header.value ? header)}</small>"


        """
        <p>
          <strong>
            #{suggestion._highlightResult.title?.value ? escapeHTML(suggestion.title ? 'Home')}
            #{subsection}
          </strong><br>
          <small>#{suggestion._highlightResult.text?.value ? escapeHTML(suggestion.text)}</small><br>
            <small class="aa-link">#{resolve escapeHTML suggestion.url}</small>
        </p>
        """
      footer: """
        <div class="aa-footer">
          <a href="https://algolia.com">#{window.algoliaLogoHTML}</a>
        </div>
      """
  ]).on 'autocomplete:selected', (_, {url, css_selector, css_selector_parent}) =>
    if @searchConfig.baseUrl
      url = @searchConfig.baseUrl + url

    if css_selector[0] == '#'
      url += css_selector
    else if css_selector_parent[0] == '#'
      url += css_selector_parent

    Turbolinks.visit(url)

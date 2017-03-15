$(document).on 'ready turbolinks:load', ->
  openSearch = (term) ->
    if window.search?
      search term
    $.getScript window.searchLoadPath, ->
      $('.search').show()
      search term
  term = decodeURIComponent location.search.substring(3).replace /\+/g, '%20' if location.search.substring(0, 3) == '?q='
  if term
    $('.search-query').val term
    openSearch(term)

  $('.search-link').click (e) ->
    openSearch()
    e.preventDefault()

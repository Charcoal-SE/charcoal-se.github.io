#= require vendor/lunr
$(document).on 'ready turbolinks:load', ->
  index = null
  search = (term) ->
    unless index?
      index = lunr ->
        @field 'id'
        @field 'title',
          boost: 10
        @field 'content'

      $.get '/search.json', (store) ->
        window.store = store
        for own id, page of window.store
          delete store[id] unless page?
        for own id, page of window.store
          index.add
            id: id,
            title: page.title,
            content: page.content
        search term
      .fail console.error

      return
    return unless window.store
    unless term.length
      $('.search-results').empty()
      return

    results = index.search term
    if results.length
      content = results.map (res) ->
        info = window.store[res.ref]
        return $('<li/>').append $('<p/>').append $('<a/>').attr('href', info.url).text info.title
    else
      content = $('<li/>').append $('<em/>').text 'No results'

    $('.search-results').empty().append content
    $('.search .link').attr 'href', '/search?q=' + encodeURIComponent(term).replace /%20/g, '+'

  openSearch = () ->
    $('.search').fadeIn 'fast'
    $('.search-query').focus()
    $(document).on 'keyup', _closeIfNeeded

  closeSearch = () ->
    $('.search').fadeOut 'fast'
    $(document).off 'keyup', _closeIfNeeded

  _closeIfNeeded = (e) ->
    closeSearch() if e.which == 27

  $('.search-link').click (e) ->
    openSearch()
    e.preventDefault()

  $('.search .close').click (e) -> e.preventDefault()
  $('.search').click (e) ->
    closeSearch() if this == e.target || $(e.target).hasClass 'close'

  term = decodeURIComponent location.search.substring(3).replace /\+/g, '%20' if location.search.substring(0, 3) == '?q='
  if term
    $('.search-query').val term
    openSearch()
    setTimeout ->
      search term
    , 500

  $('.search-query').on 'keyup', ->
    search $('.search-query').val()

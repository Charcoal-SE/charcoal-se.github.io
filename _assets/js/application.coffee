#= require vendor/jquery
#= require search-stub
$ ->
  navTimeout = null
  NProgress.configure
    parent: 'html'

  $(window).on 'load turbolinks:load', ->
    $('.hash-target').removeClass 'hash-target'

    if location.hash != ""
      $(location.hash).parent().addClass 'hash-target'

    $('h2,h3,h4,h5,h6').filter('[id]')
    .filter ->
      return !$(this).find('.small').length
    .each ->
      $(this).append(' ').append $('<span class="small">').append $('<a />').attr('href', '#' + this.id).append $ '<i class="fa fa-link" />'

    $('.footer-insert').remove().children().prependTo $ '.body + .footer'
  .on 'turbolinks:before-visit', (event) ->
    return if event.isDefaultPrevented()
    clearTimeout(navTimeout)
    NProgress.start()
    # navTimeout = setTimeout(NProgress.start, 100)
  .on 'turbolinks:visit', (event) ->
    return if event.isDefaultPrevented()
    clearTimeout(navTimeout)
    NProgress.done()
  .on 'click', '.link.alert', (event) ->
    return if event.isDefaultPrevented()
    Turbolinks.visit $(this).find('a').attr 'href'

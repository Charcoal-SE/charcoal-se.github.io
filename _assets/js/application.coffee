#= require vendor/jquery
#= require vendor/turbolinks/index
#= require vendor/nprogress
#= require search
$ ->
  navTimeout = null
  NProgress.configure
    parent: 'html'

  $(document).on 'turbolinks:load', ->
    $('.highlight').removeClass 'highlight'

    if location.hash != ""
      $(location.hash).parent().addClass 'highlight'

    $('h2,h3,h4,h5,h6').filter('[id]')
    .filter ->
      return !$(this).find('.small').length
    .each ->
      $(this).append(' ').append $('<span class="small">').append $('<a />').attr('href', '#' + this.id).append $ '<i class="fa fa-link" />'

    $('.footer-insert').remove().children().prependTo $ '.body + .footer'
  .on 'turbolinks:request-start', ->
    clearTimeout(navTimeout)
    NProgress.start()
    # navTimeout = setTimeout(NProgress.start, 100)
  .on 'turbolinks:request-end', ->
    clearTimeout(navTimeout)
    NProgress.done()
  .on 'click', '.link.alert', ->
    Turbolinks.visit $(this).find('a').attr 'href'

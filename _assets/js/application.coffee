#= require vendor/jquery
#= require search

$ ->
  navTimeout = null
  NProgress.configure
    parent: 'html'

  $(window).on 'load turbolinks:load', ->
    date = new Date()
    p = (n, length = 2) ->
      n = String n
      while n.length < length
        n = '0' + n
      n
    dateStr = "#{p(date.getFullYear(), 4)}-#{p(date.getMonth() + 1)}-#{p(date.getDate())}"
    encodedValue = encodeURIComponent """
    ---
    layout: post
    title: Enter Title Here
    date: #{dateStr}
    categories: announcements
    ---
    Announcement here — don’t forget to edit the filename to include the title.
    """
    $('.new-announcement-link').attr href: "https://github.com/Charcoal-SE/charcoal-se.github.io/new/site?filename=_posts/announcements/#{dateStr}-title-here.md&value=#{encodedValue}"

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

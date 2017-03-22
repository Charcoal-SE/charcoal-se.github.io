#= require vendor/turbolinks/index
#  vendor/turbolinks/start is modified to start on page load.
#= require vendor/turbolinks_prefetch
#  vendor/turbolinks_prefetch is modified to start on page load.
#= require vendor/nprogress

$(document).on 'turbolinks:before-visit', (event) ->
  redirect = window.redirects[new URL(event.originalEvent.data.url).pathname.replace('.html', '')]
  if redirect
    event.preventDefault()
    Turbolinks.visit redirect, action: 'replace'

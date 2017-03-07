$(document).ready(function() {
  var navTimeout = null
  NProgress.configure({ parent: 'html' });

  $(document).on('turbolinks:load', function() {
    $('.highlight').removeClass('highlight')
    if (location.hash && location.hash != "") {
      $(location.hash).parent().addClass('highlight');
    }

    $('h1,h2,h3,h4,h5,h6').filter('[id]').filter(function () {
      return !$(this).find('.small').length
    }).each(function () {
      $(this).append(' ').append($('<span class="small">').append($('<a />').attr('href', '#' + this.id).append($('<i class="fa fa-link" />'))))
    })
    $('.footer-insert').remove().children().prependTo($('.body + .footer'))
  }).on('turbolinks:request-start', function () {
    clearTimeout(navTimeout)
    NProgress.start()
    // navTimeout = setTimeout(NProgress.start, 100)
  }).on('turbolinks:request-end', function () {
    clearTimeout(navTimeout)
    NProgress.done()
  }).on('click', '.link.alert', function () {
    Turbolinks.visit($(this).find('a').attr('href'))
  });
});

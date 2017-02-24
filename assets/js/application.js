$(document).ready(function() {

  function handleHash() {
    $('.highlight').removeClass('highlight')
    if (location.hash && location.hash != "") {
      $(location.hash).parent().addClass('highlight');
    }
  }

  var navTimeout = null
  NProgress.configure({ parent: 'html' });
  $(document).on('turbolinks:load', function() {
    handleHash()
    $('h1,h2,h3,h4,h5,h6').filter('[id]').filter(function () {
      return !$(this).find('.small').length
    }).each(function () {
      $(this).append(' ').append($('<span class="small">').append($('<a />').attr('href', '#' + this.id).append($('<i class="fa fa-link" />'))))
    })
  }).on('turbolinks:request-start', function () {
    clearTimeout(navTimeout)
    NProgress.start()
    // navTimeout = setTimeout(NProgress.start, 100)
  }).on('turbolinks:request-end', function () {
    clearTimeout(navTimeout)
    NProgress.done()
  });
});

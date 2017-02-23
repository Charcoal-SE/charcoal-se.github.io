$(document).ready(function() {

  function handleHash() {
    $('.highlight').removeClass('highlight')
    if (location.hash && location.hash != "") {
      $(location.hash).parent().addClass('highlight');
    }
  }

  $(document).on('click', 'a', function () {
    if (this.hash === $(this).attr('href')) {
      location.hash = this.hash
      handleHash();
      return;
    }
    if (
      $(this).parents('[data-instant]').length
   || !$(this).parents('[data-no-instant]').length) {
      NProgress.start();
    }
  })
  InstantClick.on('change', function() {
    $('h1,h2,h3,h4,h5,h6').filter('[id]').filter(function () {
      return !$(this).find('.small').length
    }).each(function () {
      $(this).append(' ').append($('<span class="small">').append($('<a />').attr('href', '#' + this.id).append($('<i class="fa fa-link" />'))))
    })
    setTimeout(NProgress.done)
  });
  InstantClick.init();

});

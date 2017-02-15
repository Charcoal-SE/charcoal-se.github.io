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
    setTimeout(NProgress.done)
  });
  InstantClick.init();

});

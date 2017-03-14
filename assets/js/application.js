$(document).ready(function() {
  var navTimeout = null
  NProgress.configure({ parent: 'html' });

  $(document).on('turbolinks:load', function() {
    $('.highlight').removeClass('highlight')
    if (location.hash && location.hash != "") {
      $(location.hash).parent().addClass('highlight');
    }

    $('h2,h3,h4,h5,h6').filter('[id]').filter(function () {
      return !$(this).find('.small').length
    }).each(function () {
      $(this).append(' ').append($('<span class="small">').append($('<a />').attr('href', '#' + this.id).append($('<i class="fa fa-link" />'))))
    })
    $('.footer-insert').remove().children().prependTo($('.body + .footer'))

    $('.search-link').click(function (e) {
      openSearch()
      e.preventDefault()
    })
    $('.search .close').click(function (e) {
      e.preventDefault()
    })
    $('.search').click(function (e) {
      if (this === e.target || $(e.target).hasClass('close')) {
        closeSearch()
      }
    })

    var index = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('content');
    });
    for (var key in window.store) {
      if ({}.hasOwnProperty.call(window.store, key)) {
        index.add({
          'id': key,
          'title': window.store[key].title,
          'content': window.store[key].content
        });
      }
    }

    var term = (location.search.substring(0, 3) === '?q=') && decodeURIComponent(location.search.substring(3).replace(/\+/g, '%20'))
    if (term) {
      $('.search-query').val(term)
      openSearch()
      search(term)
    }
    $('.search-query').on('keyup', function (e) {
      if (e.which === 27) {
        closeSearch()
      }
      search(this.value)
    })

    function search (term) {
      if (!term.length) {
        $('.search-results').empty()
        return
      }
      var results = index.search(term)
      $('.search-results').empty().append(results.length ? results.map(function (res) {
        var info = window.store[res.ref]
        return $('<li/>').append($('<p/>').append($('<a/>').attr('href', info.url).text(info.title)))
      }) : $('<li/>').append($('<em/>').text('No results')))
      $('.search .link').attr('href', '/search?q=' + encodeURIComponent(term).replace(/%20/g, '+'))
    }

    function openSearch () {
      $('.search').fadeIn('fast')
      $('.search-query').focus()
    }
    function closeSearch () {
      $('.search').fadeOut('fast')
    }
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

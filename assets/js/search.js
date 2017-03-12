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

var term = location.search.substring(0, 3) === '?q=' && decodeURIComponent(location.search.substring(3).replace(/\+/g, '%20'))
if (term) {
  $('.search-query').val(term)
  search(term)
}
$('.search-query').on('keyup', function () {
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
  history.replaceState(undefined, undefined, '?q=' + encodeURIComponent(term).replace(/%20/g, '+'))
}

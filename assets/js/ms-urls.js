var ANSWER_REGEXII = [
  /^questions\/\d+\/.*?\/(\d+)\/?(?:#\1)?/,
  /^a\/(\d+)(?:\/\d+\/?)?$/
]
var QUESTION_REGEXII = [
  /^questions\/(\d+)(?:\/.*?\/?)?/,
  /^q\/(\d+)(?:\/\d+\/?)?$/
]
var timeout = null
$('input').on('input', function () {
  $('section .huh').remove()
  var matches = this.value.trim().match(/(?:https?:)?\/\/((?:.+\.)?(?:askubuntu|mathoverflow|superuser|serverfault|stack(?:overflow|exchange|apps))\.com)\/(.*)/)
  if (!matches) {
    $('section a').empty()
    $('section div').html('<em class="huh">Huh?</em>')
  }
  var domain = matches[1]
  var path = matches[2]
  var type
  for (var i = 0; i < ANSWER_REGEXII.length; i++) {
    matches = path.match(ANSWER_REGEXII[i])
    if (matches) {
      type = 'a'
      break
    }
  }
  if (!matches) {
    for (var i = 0; i < QUESTION_REGEXII.length; i++) {
      matches = path.match(QUESTION_REGEXII[i])
      if (matches) {
        type = 'questions'
        break
      }
    }
  }
  if (!matches) {
    $('section a').empty()
    $('section div').html('<em>Huh?</em>')
  }
  var id = matches[1]
  var url = '//' + domain + '/' + type + '/' + id
  var msURL = 'https://metasmoke.erwaysoftware.com/posts/by-url?url=' + url
  $('section .by-url').text(msURL).attr('href', msURL)
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(function () {
    $.get('https://metasmoke.erwaysoftware.com/api/posts/urls?key=d897aa9f315174f081309cef13dfd7caa4ddfec1c2f8641204506636751392a4&urls=' + url, function (data) {
      if (data.items.length) {
        var actualURL = 'https://metasmoke.erwaysoftware.com/post/' + data.items[0].id
        $('section div').text('— or —')
        $('section .real').attr('href', actualURL).text(actualURL)
      } else {
        $('section div').html('<em>Post not found</em>')
        $('section .real').empty()
      }
    })
  }, 100)
})

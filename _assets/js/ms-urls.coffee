ANSWER_REGEXII = [
  /^questions\/\d+\/.*?\/(\d+)\/?(?:#\1)?/,
  /^a\/(\d+)(?:\/\d+\/?)?$/
]
QUESTION_REGEXII = [
  /^questions\/(\d+)(?:\/.*?\/?)?/,
  /^q\/(\d+)(?:\/\d+\/?)?$/
]
timeout = null
$('input').on 'input', ->
  $('section .huh').remove()
  matches = this.value.trim().match /(?:https?:)?\/\/((?:.+\.)?(?:askubuntu|mathoverflow|superuser|serverfault|stack(?:overflow|exchange|apps))\.com)\/(.*)/
  unless matches
    $('section a').empty()
    $('section div').html '<em class="huh">Huh?</em>'

  [ x , domain, path] = matches
  type
  for regex in ANSWER_REGEXII
    matches = path.match regex
    if matches
      type = 'a'
      break

  unless matches
    for regex in QUESTION_REGEXII
      matches = path.match regex
      if matches
        type = 'questions'
        break

  unless matches
    $('section a').empty()
    $('section div').html '<em class="huh">Huh?</em>'

  id = matches[1]
  url = "//#{domain}/#{type}/#{id}"
  msURL = "https://metasmoke.erwaysoftware.com/posts/by-url?url=#{url}"
  $('section .by-url').text(msURL).attr 'href', msURL
  clearTimeout timeout if timeout
  timeout = setTimeout ->
    $.get 'https://metasmoke.erwaysoftware.com/api/posts/urls?key=1658080a59604fa5386e39290dd415ed5270dc6f12fab053cd4cc3d32cb154d4&filter=%00%00%00%00%00%00%00%02%00%00%00%00%00%00%00%00&urls=' + url, (data) ->
      if data.items.length
        actualURL = "https://metasmoke.erwaysoftware.com/post/#{data.items[0].id}"
        $('section div').text '— or —'
        $('section .real')
          .attr 'href', actualURL
          .text actualURL
      else
        $('section div').html '<em>Post not found</em>'
        $('section .real').empty()
  , 100

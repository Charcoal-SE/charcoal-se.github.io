#= require vendor/userscript-parser
#= require vendor/listify
#= require vendor/file-size
# globals fileSize, listify, userscriptParser

fail = -> console.error(arguments)

# source: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_1_–_escaping_the_string_before_encoding_it
decodeUTF8 = (b64) -> decodeURIComponent(atob(b64).split('').map((c) -> '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))

setTimeout (_f = ->
  $.get 'https://img.shields.io/travis/Charcoal-SE/userscripts.json', (reply) -> $('.build span').text reply.value
  $.get
    url: 'https://api.travis-ci.org/repos/Charcoal-SE/userscripts',
    headers: {
      Accept: 'application/vnd.travis-ci.2+json'
    }
  .done ({ repo }) -> $('.build a').attr 'href', 'https://travis-ci.org/Charcoal-SE/userscripts/builds/' + repo.last_build_id

  $.get("https://api.github.com/repos/charcoal-se/userscripts/git/trees/master?recursive=1", initUserscripts).fail ->
    setTimeout _f, 1000
    fail.apply this, arguments
)
initUserscripts = (tree) ->
  $ul = $("ul.scripts").empty().css
    listStyleType: "none",
    listStylePosition: "inside"

  tree.tree.forEach (file) ->
    return unless /\.user\.js$/.exec file.path
    $li = $("<li/>").text "Loading #{file.path} info…"
    $ul.append $li
    $.get file.url, (blob) ->
      text = decodeUTF8 blob.content
      meta = userscriptParser text

      authors = (meta.author || []).concat meta.contributor || []
      authorInfo = if authors.length then " by #{listify authors}" else ""
      description = $("<em />").text "No description"
      meta.description = meta.description || meta.desc
      if meta.description.length
        description = $("<p />").css
          marginLeft: "1em"
        italicText = getMeta meta, file, blob
        if italicText.length
          description
            .append $("<em />").text italicText
            .append $ "<br />"
        description.append(line).append $ "<br />" for line in meta.description
        description.children(":last-child").remove()

      $li.empty()
      .append(
        $("<p />").append(
          $("<details />").append(
            $("<summary />").append(
              $ "<a />"
                .text meta.name.join(", ") + authorInfo
                .attr "href", "https://github.com/Charcoal-SE/userscripts/raw/master/#{file.path}"
                .css
                  marginLeft: "0.5em"
              $ "<p style=\"display:inline\" />"
                .text " | "
              $ "<a />"
                .text "Github"
                .attr "href", "https://github.com/Charcoal-SE/userscripts/blob/master/#{file.path}"
            )
          )
          .append description
        )
      )
    .fail fail
  return

getMeta = (meta, file) ->
  joiner = " • "
  return [
    meta.version.length && ["v#{v}" for v in meta.version].join joiner
    fileSize(file.size).human "si"
  ].filter (v) -> v
   .join joiner

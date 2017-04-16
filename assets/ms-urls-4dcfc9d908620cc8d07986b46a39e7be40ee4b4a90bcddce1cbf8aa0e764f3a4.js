(function() {
  var ANSWER_REGEXII, QUESTION_REGEXII, timeout;

  ANSWER_REGEXII = [/^questions\/\d+\/.*?\/(\d+)\/?(?:#\1)?/, /^a\/(\d+)(?:\/\d+\/?)?$/];

  QUESTION_REGEXII = [/^questions\/(\d+)(?:\/.*?\/?)?/, /^q\/(\d+)(?:\/\d+\/?)?$/];

  timeout = null;

  $('input').on('input', function() {
    var domain, i, id, j, len, len1, matches, msURL, path, regex, type, url, x;
    $('section .huh').remove();
    matches = this.value.trim().match(/(?:https?:)?\/\/((?:.+\.)?(?:askubuntu|mathoverflow|superuser|serverfault|stack(?:overflow|exchange|apps))\.com)\/(.*)/);
    if (!matches) {
      $('section a').empty();
      $('section div').html('<em class="huh">Huh?</em>');
    }
    x = matches[0], domain = matches[1], path = matches[2];
    type;
    for (i = 0, len = ANSWER_REGEXII.length; i < len; i++) {
      regex = ANSWER_REGEXII[i];
      matches = path.match(regex);
      if (matches) {
        type = 'a';
        break;
      }
    }
    if (!matches) {
      for (j = 0, len1 = QUESTION_REGEXII.length; j < len1; j++) {
        regex = QUESTION_REGEXII[j];
        matches = path.match(regex);
        if (matches) {
          type = 'questions';
          break;
        }
      }
    }
    if (!matches) {
      $('section a').empty();
      $('section div').html('<em class="huh">Huh?</em>');
    }
    id = matches[1];
    url = "//" + domain + "/" + type + "/" + id;
    msURL = "https://metasmoke.erwaysoftware.com/posts/by-url?url=" + url;
    $('section .by-url').text(msURL).attr('href', msURL);
    if (timeout) {
      clearTimeout(timeout);
    }
    return timeout = setTimeout(function() {
      return $.get('https://metasmoke.erwaysoftware.com/api/posts/urls?key=1658080a59604fa5386e39290dd415ed5270dc6f12fab053cd4cc3d32cb154d4&filter=%00%00%00%00%00%00%00%02%00%00%00%00%00%00%00%00&urls=' + url, function(data) {
        var actualURL;
        if (data.items.length) {
          actualURL = "https://metasmoke.erwaysoftware.com/post/" + data.items[0].id;
          $('section div').text('— or —');
          return $('section .real').attr('href', actualURL).text(actualURL);
        } else {
          $('section div').html('<em>Post not found</em>');
          return $('section .real').empty();
        }
      });
    }, 100);
  });

}).call(this);

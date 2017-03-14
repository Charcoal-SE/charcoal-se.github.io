!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.userscriptParser=e()}}(function(){return function e(r,n,t){function o(i,u){if(!n[i]){if(!r[i]){var c="function"==typeof require&&require;if(!u&&c)return c(i,!0);if(f)return f(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var a=n[i]={exports:{}};r[i][0].call(a.exports,function(e){var n=r[i][1][e];return o(n?n:e)},a,a.exports,e,r,n,t)}return n[i].exports}for(var f="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}({1:[function(e,r,n){"use strict";function t(e){var r={};try{var n=/^[\S\s]+\/\/ ==\/UserScript==/,t=e.match(n)[0],o=t.replace(/ +/," "),f=o.match(/\/\/\s+@\w+ .+/g);f.forEach(function(e){var n=e.match(/@(\w+)\s+(.+)/);r[n[1]]=r[n[1]]||[],r[n[1]].push(n[2])}),r.content=e.replace(n,"")}catch(e){return console&&console.log(e),{}}return r}r.exports=t},{}]},{},[1])(1)});
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.listify=e()}}(function(){return function e(r,n,t){function o(f,u){if(!n[f]){if(!r[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var l=new Error("Cannot find module '"+f+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[f]={exports:{}};r[f][0].call(d.exports,function(e){var n=r[f][1][e];return o(n?n:e)},d,d.exports,e,r,n,t)}return n[f].exports}for(var i="function"==typeof require&&require,f=0;f<t.length;f++)o(t[f]);return o}({1:[function(e,r,n){var t=function(e){"use strict";if(!Array.isArray(e))throw new TypeError("requires an array");var r=arguments.length>1?arguments[1]:null;r||(r={});var n=r.hasOwnProperty("separator")?r.separator:", ",t=r.hasOwnProperty("finalWord")?r.finalWord:"and";t.length>0&&(t+=" ");var o,i=e.filter(function(e){return String(e).trim()});return o=2===i.length&&t.length>0?i.join(" "+t):i.length<3?i.join(n):i.slice(0,-1).concat(t+i[i.length-1]).join(n)};r.exports=t},{}]},{},[1])(1)});
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.fileSize=e()}}(function(){var e;return function e(t,n,r){function i(f,u){if(!n[f]){if(!t[f]){var d="function"==typeof require&&require;if(!u&&d)return d(f,!0);if(o)return o(f,!0);var s=new Error("Cannot find module '"+f+"'");throw s.code="MODULE_NOT_FOUND",s}var a=n[f]={exports:{}};t[f][0].call(a.exports,function(e){var n=t[f][1][e];return i(n?n:e)},a,a.exports,e,t,n,r)}return n[f].exports}for(var o="function"==typeof require&&require,f=0;f<r.length;f++)i(r[f]);return i}({1:[function(t,n,r){!function(t){return"undefined"!=typeof n&&n.exports?n.exports=t():"function"==typeof e&&e.amd?e([],t):void(this.filesize=t())}(function(){function e(e,t){return e&&e.toLowerCase()===t.toLowerCase()}var t="BKMGTPEZY".split("");return function(n,r){return n="number"==typeof n?n:0,r=r||{},r.fixed="number"==typeof r.fixed?r.fixed:2,r.spacer="string"==typeof r.spacer?r.spacer:" ",r.calculate=function(t){var i,o=e(t,"si")?["k","B"]:["K","iB"],f=e(t,"si")?1e3:1024,u=Math.log(n)/Math.log(f)|0,d=n/Math.pow(f,u),s=d.toFixed(r.fixed);return u-1<3&&!e(t,"si")&&e(t,"jedec")&&(o[1]="B"),i=u?(o[0]+"MGTPEZY")[u-1]+o[1]:1===(0|s)?"Byte":"Bytes",{suffix:i,magnitude:u,result:d,fixed:s,bits:{result:d/8,fixed:(d/8).toFixed(r.fixed)}}},r.to=function(r,i){var o=e(i,"si")?1e3:1024,f=t.indexOf("string"==typeof r?r[0].toUpperCase():"B"),u=n;if(f===-1||0===f)return u.toFixed(2);for(;f>0;f--)u/=o;return u.toFixed(2)},r.human=function(e){var t=r.calculate(e);return t.fixed+r.spacer+t.suffix},r}})},{}]},{},[1])(1)});
(function() {
  var _f, fail, getMeta, initUserscripts;

  fail = function() {
    return console.error(arguments);
  };

  setTimeout((_f = function() {
    $.get('https://img.shields.io/travis/Charcoal-SE/userscripts.json', function(reply) {
      return $('.build span').text(reply.value);
    });
    $.get({
      url: 'https://api.travis-ci.org/repos/Charcoal-SE/userscripts',
      headers: {
        Accept: 'application/vnd.travis-ci.2+json'
      }
    }).done(function(arg) {
      var repo;
      repo = arg.repo;
      return $('.build a').attr('href', 'https://travis-ci.org/Charcoal-SE/userscripts/builds/' + repo.last_build_id);
    });
    return $.get("https://api.github.com/repos/charcoal-se/userscripts/git/trees/master?recursive=1", initUserscripts).fail(function() {
      setTimeout(_f, 1000);
      return fail.apply(this, arguments);
    });
  }));

  initUserscripts = function(tree) {
    var $ul;
    $ul = $("ul.scripts").empty().css({
      listStyleType: "none",
      listStylePosition: "inside"
    });
    tree.tree.forEach(function(file) {
      var $li;
      if (!/\.user\.js$/.exec(file.path)) {
        return;
      }
      $li = $("<li/>").text("Loading " + file.path + " info…");
      $ul.append($li);
      return $.get(file.url, function(blob) {
        var authorInfo, authors, description, i, italicText, len, line, meta, ref, text;
        text = atob(blob.content);
        meta = userscriptParser(text);
        authors = (meta.author || []).concat(meta.contributor || []);
        authorInfo = authors.length ? " by " + (listify(authors)) : "";
        description = $("<em />").text("No description");
        meta.description = meta.description || meta.desc;
        if (meta.description.length) {
          description = $("<p />").css({
            marginLeft: "1em"
          });
          italicText = getMeta(meta, file, blob);
          if (italicText.length) {
            description.append($("<em />").text(italicText)).append($("<br />"));
          }
          ref = meta.description;
          for (i = 0, len = ref.length; i < len; i++) {
            line = ref[i];
            description.append(line).append($("<br />"));
          }
          description.children(":last-child").remove();
        }
        return $li.empty().append($("<p />").append($("<details />").append($("<summary />").append($("<a />").text(meta.name.join(", ") + authorInfo).attr("href", "https://github.com/Charcoal-SE/userscripts/raw/master/" + file.path).css({
          marginLeft: "0.5em"
        }))).append(description)));
      }).fail(fail);
    });
  };

  getMeta = function(meta, file) {
    var joiner, v;
    joiner = " • ";
    return [
      meta.version.length && [
        (function() {
          var i, len, ref, results;
          ref = meta.version;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            v = ref[i];
            results.push("v" + v);
          }
          return results;
        })()
      ].join(joiner), fileSize(file.size).human("si")
    ].filter(function(v) {
      return v;
    }).join(joiner);
  };

}).call(this);

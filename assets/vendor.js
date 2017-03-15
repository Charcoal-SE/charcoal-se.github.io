(function() {
  this.Turbolinks = {
    supported: (function() {
      return (window.history.pushState != null) && (window.requestAnimationFrame != null);
    })(),
    visit: function(location, options) {
      return Turbolinks.controller.visit(location, options);
    },
    clearCache: function() {
      return Turbolinks.controller.clearCache();
    }
  };

}).call(this);
(function() {
  var closest, match;

  Turbolinks.copyObject = function(object) {
    var key, result, value;
    result = {};
    for (key in object) {
      value = object[key];
      result[key] = value;
    }
    return result;
  };

  Turbolinks.closest = function(element, selector) {
    return closest.call(element, selector);
  };

  closest = (function() {
    var html, ref;
    html = document.documentElement;
    return (ref = html.closest) != null ? ref : function(selector) {
      var node;
      node = this;
      while (node) {
        if (node.nodeType === Node.ELEMENT_NODE && match.call(node, selector)) {
          return node;
        }
        node = node.parentNode;
      }
    };
  })();

  Turbolinks.defer = function(callback) {
    return setTimeout(callback, 1);
  };

  Turbolinks.dispatch = function(eventName, arg) {
    var cancelable, data, event, ref, target;
    ref = arg != null ? arg : {}, target = ref.target, cancelable = ref.cancelable, data = ref.data;
    event = document.createEvent("Events");
    event.initEvent(eventName, true, cancelable === true);
    event.data = data != null ? data : {};
    (target != null ? target : document).dispatchEvent(event);
    return event;
  };

  Turbolinks.match = function(element, selector) {
    return match.call(element, selector);
  };

  match = (function() {
    var html, ref, ref1, ref2;
    html = document.documentElement;
    return (ref = (ref1 = (ref2 = html.matchesSelector) != null ? ref2 : html.webkitMatchesSelector) != null ? ref1 : html.msMatchesSelector) != null ? ref : html.mozMatchesSelector;
  })();

  Turbolinks.uuid = function() {
    var i, j, result;
    result = "";
    for (i = j = 1; j <= 36; i = ++j) {
      if (i === 9 || i === 14 || i === 19 || i === 24) {
        result += "-";
      } else if (i === 15) {
        result += "4";
      } else if (i === 20) {
        result += (Math.floor(Math.random() * 4) + 8).toString(16);
      } else {
        result += Math.floor(Math.random() * 15).toString(16);
      }
    }
    return result;
  };

}).call(this);
(function() {
  Turbolinks.Location = (function() {
    var addTrailingSlash, getPrefixURL, stringEndsWith, stringStartsWith;

    Location.wrap = function(value) {
      if (value instanceof this) {
        return value;
      } else {
        return new this(value);
      }
    };

    function Location(url) {
      var anchorLength, linkWithAnchor;
      if (url == null) {
        url = "";
      }
      linkWithAnchor = document.createElement("a");
      linkWithAnchor.href = url.toString();
      this.absoluteURL = linkWithAnchor.href;
      anchorLength = linkWithAnchor.hash.length;
      if (anchorLength < 2) {
        this.requestURL = this.absoluteURL;
      } else {
        this.requestURL = this.absoluteURL.slice(0, -anchorLength);
        this.anchor = linkWithAnchor.hash.slice(1);
      }
    }

    Location.prototype.getOrigin = function() {
      return this.absoluteURL.split("/", 3).join("/");
    };

    Location.prototype.getPath = function() {
      var ref, ref1;
      return (ref = (ref1 = this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/)) != null ? ref1[1] : void 0) != null ? ref : "/";
    };

    Location.prototype.getPathComponents = function() {
      return this.getPath().split("/").slice(1);
    };

    Location.prototype.getLastPathComponent = function() {
      return this.getPathComponents().slice(-1)[0];
    };

    Location.prototype.getExtension = function() {
      var ref, ref1;
      return (ref = (ref1 = this.getLastPathComponent().match(/\.[^.]*$/)) != null ? ref1[0] : void 0) != null ? ref : "";
    };

    Location.prototype.isHTML = function() {
      return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/);
    };

    Location.prototype.isPrefixedBy = function(location) {
      var prefixURL;
      prefixURL = getPrefixURL(location);
      return this.isEqualTo(location) || stringStartsWith(this.absoluteURL, prefixURL);
    };

    Location.prototype.isEqualTo = function(location) {
      return this.absoluteURL === (location != null ? location.absoluteURL : void 0);
    };

    Location.prototype.toCacheKey = function() {
      return this.requestURL;
    };

    Location.prototype.toJSON = function() {
      return this.absoluteURL;
    };

    Location.prototype.toString = function() {
      return this.absoluteURL;
    };

    Location.prototype.valueOf = function() {
      return this.absoluteURL;
    };

    getPrefixURL = function(location) {
      return addTrailingSlash(location.getOrigin() + location.getPath());
    };

    addTrailingSlash = function(url) {
      if (stringEndsWith(url, "/")) {
        return url;
      } else {
        return url + "/";
      }
    };

    stringStartsWith = function(string, prefix) {
      return string.slice(0, prefix.length) === prefix;
    };

    stringEndsWith = function(string, suffix) {
      return string.slice(-suffix.length) === suffix;
    };

    return Location;

  })();

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Turbolinks.HttpRequest = (function() {
    HttpRequest.NETWORK_FAILURE = 0;

    HttpRequest.TIMEOUT_FAILURE = -1;

    HttpRequest.timeout = 60;

    function HttpRequest(delegate, location, referrer) {
      this.delegate = delegate;
      this.requestCanceled = bind(this.requestCanceled, this);
      this.requestTimedOut = bind(this.requestTimedOut, this);
      this.requestFailed = bind(this.requestFailed, this);
      this.requestLoaded = bind(this.requestLoaded, this);
      this.requestProgressed = bind(this.requestProgressed, this);
      this.url = Turbolinks.Location.wrap(location).requestURL;
      this.referrer = Turbolinks.Location.wrap(referrer).absoluteURL;
      this.createXHR();
    }

    HttpRequest.prototype.send = function() {
      var base;
      if (this.xhr && !this.sent) {
        this.notifyApplicationBeforeRequestStart();
        this.setProgress(0);
        this.xhr.send();
        this.sent = true;
        return typeof (base = this.delegate).requestStarted === "function" ? base.requestStarted() : void 0;
      }
    };

    HttpRequest.prototype.cancel = function() {
      if (this.xhr && this.sent) {
        return this.xhr.abort();
      }
    };

    HttpRequest.prototype.requestProgressed = function(event) {
      if (event.lengthComputable) {
        return this.setProgress(event.loaded / event.total);
      }
    };

    HttpRequest.prototype.requestLoaded = function() {
      return this.endRequest((function(_this) {
        return function() {
          var ref;
          if ((200 <= (ref = _this.xhr.status) && ref < 300)) {
            return _this.delegate.requestCompletedWithResponse(_this.xhr.responseText, _this.xhr.getResponseHeader("Turbolinks-Location"));
          } else {
            _this.failed = true;
            return _this.delegate.requestFailedWithStatusCode(_this.xhr.status, _this.xhr.responseText);
          }
        };
      })(this));
    };

    HttpRequest.prototype.requestFailed = function() {
      return this.endRequest((function(_this) {
        return function() {
          _this.failed = true;
          return _this.delegate.requestFailedWithStatusCode(_this.constructor.NETWORK_FAILURE);
        };
      })(this));
    };

    HttpRequest.prototype.requestTimedOut = function() {
      return this.endRequest((function(_this) {
        return function() {
          _this.failed = true;
          return _this.delegate.requestFailedWithStatusCode(_this.constructor.TIMEOUT_FAILURE);
        };
      })(this));
    };

    HttpRequest.prototype.requestCanceled = function() {
      return this.endRequest();
    };

    HttpRequest.prototype.notifyApplicationBeforeRequestStart = function() {
      return Turbolinks.dispatch("turbolinks:request-start", {
        data: {
          url: this.url,
          xhr: this.xhr
        }
      });
    };

    HttpRequest.prototype.notifyApplicationAfterRequestEnd = function() {
      return Turbolinks.dispatch("turbolinks:request-end", {
        data: {
          url: this.url,
          xhr: this.xhr
        }
      });
    };

    HttpRequest.prototype.createXHR = function() {
      this.xhr = new XMLHttpRequest;
      this.xhr.open("GET", this.url, true);
      this.xhr.timeout = this.constructor.timeout * 1000;
      this.xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml");
      this.xhr.setRequestHeader("Turbolinks-Referrer", this.referrer);
      this.xhr.onprogress = this.requestProgressed;
      this.xhr.onload = this.requestLoaded;
      this.xhr.onerror = this.requestFailed;
      this.xhr.ontimeout = this.requestTimedOut;
      return this.xhr.onabort = this.requestCanceled;
    };

    HttpRequest.prototype.endRequest = function(callback) {
      if (this.xhr) {
        this.notifyApplicationAfterRequestEnd();
        if (callback != null) {
          callback.call(this);
        }
        return this.destroy();
      }
    };

    HttpRequest.prototype.setProgress = function(progress) {
      var base;
      this.progress = progress;
      return typeof (base = this.delegate).requestProgressed === "function" ? base.requestProgressed(this.progress) : void 0;
    };

    HttpRequest.prototype.destroy = function() {
      var base;
      this.setProgress(1);
      if (typeof (base = this.delegate).requestFinished === "function") {
        base.requestFinished();
      }
      this.delegate = null;
      return this.xhr = null;
    };

    return HttpRequest;

  })();

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Turbolinks.ProgressBar = (function() {
    var ANIMATION_DURATION;

    ANIMATION_DURATION = 300;

    ProgressBar.defaultCSS = ".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width " + ANIMATION_DURATION + "ms ease-out, opacity " + (ANIMATION_DURATION / 2) + "ms " + (ANIMATION_DURATION / 2) + "ms ease-in;\n  transform: translate3d(0, 0, 0);\n}";

    function ProgressBar() {
      this.trickle = bind(this.trickle, this);
      this.stylesheetElement = this.createStylesheetElement();
      this.progressElement = this.createProgressElement();
    }

    ProgressBar.prototype.show = function() {
      if (!this.visible) {
        this.visible = true;
        this.installStylesheetElement();
        this.installProgressElement();
        return this.startTrickling();
      }
    };

    ProgressBar.prototype.hide = function() {
      if (this.visible && !this.hiding) {
        this.hiding = true;
        return this.fadeProgressElement((function(_this) {
          return function() {
            _this.uninstallProgressElement();
            _this.stopTrickling();
            _this.visible = false;
            return _this.hiding = false;
          };
        })(this));
      }
    };

    ProgressBar.prototype.setValue = function(value) {
      this.value = value;
      return this.refresh();
    };

    ProgressBar.prototype.installStylesheetElement = function() {
      return document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
    };

    ProgressBar.prototype.installProgressElement = function() {
      this.progressElement.style.width = 0;
      this.progressElement.style.opacity = 1;
      document.documentElement.insertBefore(this.progressElement, document.body);
      return this.refresh();
    };

    ProgressBar.prototype.fadeProgressElement = function(callback) {
      this.progressElement.style.opacity = 0;
      return setTimeout(callback, ANIMATION_DURATION * 1.5);
    };

    ProgressBar.prototype.uninstallProgressElement = function() {
      if (this.progressElement.parentNode) {
        return document.documentElement.removeChild(this.progressElement);
      }
    };

    ProgressBar.prototype.startTrickling = function() {
      return this.trickleInterval != null ? this.trickleInterval : this.trickleInterval = setInterval(this.trickle, ANIMATION_DURATION);
    };

    ProgressBar.prototype.stopTrickling = function() {
      clearInterval(this.trickleInterval);
      return this.trickleInterval = null;
    };

    ProgressBar.prototype.trickle = function() {
      return this.setValue(this.value + Math.random() / 100);
    };

    ProgressBar.prototype.refresh = function() {
      return requestAnimationFrame((function(_this) {
        return function() {
          return _this.progressElement.style.width = (10 + (_this.value * 90)) + "%";
        };
      })(this));
    };

    ProgressBar.prototype.createStylesheetElement = function() {
      var element;
      element = document.createElement("style");
      element.type = "text/css";
      element.textContent = this.constructor.defaultCSS;
      return element;
    };

    ProgressBar.prototype.createProgressElement = function() {
      var element;
      element = document.createElement("div");
      element.className = "turbolinks-progress-bar";
      return element;
    };

    return ProgressBar;

  })();

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Turbolinks.BrowserAdapter = (function() {
    var NETWORK_FAILURE, PROGRESS_BAR_DELAY, TIMEOUT_FAILURE, ref;

    ref = Turbolinks.HttpRequest, NETWORK_FAILURE = ref.NETWORK_FAILURE, TIMEOUT_FAILURE = ref.TIMEOUT_FAILURE;

    PROGRESS_BAR_DELAY = 500;

    function BrowserAdapter(controller) {
      this.controller = controller;
      this.showProgressBar = bind(this.showProgressBar, this);
      this.progressBar = new Turbolinks.ProgressBar;
    }

    BrowserAdapter.prototype.visitProposedToLocationWithAction = function(location, action) {
      return this.controller.startVisitToLocationWithAction(location, action);
    };

    BrowserAdapter.prototype.visitStarted = function(visit) {
      visit.issueRequest();
      visit.changeHistory();
      return visit.loadCachedSnapshot();
    };

    BrowserAdapter.prototype.visitRequestStarted = function(visit) {
      this.progressBar.setValue(0);
      if (visit.hasCachedSnapshot() || visit.action !== "restore") {
        return this.showProgressBarAfterDelay();
      } else {
        return this.showProgressBar();
      }
    };

    BrowserAdapter.prototype.visitRequestProgressed = function(visit) {
      return this.progressBar.setValue(visit.progress);
    };

    BrowserAdapter.prototype.visitRequestCompleted = function(visit) {
      return visit.loadResponse();
    };

    BrowserAdapter.prototype.visitRequestFailedWithStatusCode = function(visit, statusCode) {
      switch (statusCode) {
        case NETWORK_FAILURE:
        case TIMEOUT_FAILURE:
          return this.reload();
        default:
          return visit.loadResponse();
      }
    };

    BrowserAdapter.prototype.visitRequestFinished = function(visit) {
      return this.hideProgressBar();
    };

    BrowserAdapter.prototype.visitCompleted = function(visit) {
      return visit.followRedirect();
    };

    BrowserAdapter.prototype.pageInvalidated = function() {
      return this.reload();
    };

    BrowserAdapter.prototype.showProgressBarAfterDelay = function() {
      return this.progressBarTimeout = setTimeout(this.showProgressBar, PROGRESS_BAR_DELAY);
    };

    BrowserAdapter.prototype.showProgressBar = function() {
      return this.progressBar.show();
    };

    BrowserAdapter.prototype.hideProgressBar = function() {
      this.progressBar.hide();
      return clearTimeout(this.progressBarTimeout);
    };

    BrowserAdapter.prototype.reload = function() {
      return window.location.reload();
    };

    return BrowserAdapter;

  })();

}).call(this);
(function() {
  var pageLoaded,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageLoaded = false;

  addEventListener("load", function() {
    return Turbolinks.defer(function() {
      return pageLoaded = true;
    });
  }, false);

  Turbolinks.History = (function() {
    function History(delegate) {
      this.delegate = delegate;
      this.onPopState = bind(this.onPopState, this);
    }

    History.prototype.start = function() {
      if (!this.started) {
        addEventListener("popstate", this.onPopState, false);
        return this.started = true;
      }
    };

    History.prototype.stop = function() {
      if (this.started) {
        removeEventListener("popstate", this.onPopState, false);
        return this.started = false;
      }
    };

    History.prototype.push = function(location, restorationIdentifier) {
      location = Turbolinks.Location.wrap(location);
      return this.update("push", location, restorationIdentifier);
    };

    History.prototype.replace = function(location, restorationIdentifier) {
      location = Turbolinks.Location.wrap(location);
      return this.update("replace", location, restorationIdentifier);
    };

    History.prototype.onPopState = function(event) {
      var location, ref, restorationIdentifier, turbolinks;
      if (this.shouldHandlePopState()) {
        if (turbolinks = (ref = event.state) != null ? ref.turbolinks : void 0) {
          location = Turbolinks.Location.wrap(window.location);
          restorationIdentifier = turbolinks.restorationIdentifier;
          return this.delegate.historyPoppedToLocationWithRestorationIdentifier(location, restorationIdentifier);
        }
      }
    };

    History.prototype.shouldHandlePopState = function() {
      return pageLoaded === true;
    };

    History.prototype.update = function(method, location, restorationIdentifier) {
      var state;
      state = {
        turbolinks: {
          restorationIdentifier: restorationIdentifier
        }
      };
      return history[method + "State"](state, null, location);
    };

    return History;

  })();

}).call(this);
(function() {
  Turbolinks.Snapshot = (function() {
    Snapshot.wrap = function(value) {
      if (value instanceof this) {
        return value;
      } else {
        return this.fromHTML(value);
      }
    };

    Snapshot.fromHTML = function(html) {
      var element;
      element = document.createElement("html");
      element.innerHTML = html;
      return this.fromElement(element);
    };

    Snapshot.fromElement = function(element) {
      return new this({
        head: element.querySelector("head"),
        body: element.querySelector("body")
      });
    };

    function Snapshot(arg) {
      var body, head;
      head = arg.head, body = arg.body;
      this.head = head != null ? head : document.createElement("head");
      this.body = body != null ? body : document.createElement("body");
    }

    Snapshot.prototype.clone = function() {
      return new Snapshot({
        head: this.head.cloneNode(true),
        body: this.body.cloneNode(true)
      });
    };

    Snapshot.prototype.getRootLocation = function() {
      var ref, root;
      root = (ref = this.getSetting("root")) != null ? ref : "/";
      return new Turbolinks.Location(root);
    };

    Snapshot.prototype.getCacheControlValue = function() {
      return this.getSetting("cache-control");
    };

    Snapshot.prototype.hasAnchor = function(anchor) {
      try {
        return this.body.querySelector("[id='" + anchor + "']") != null;
      } catch (error) {}
    };

    Snapshot.prototype.isPreviewable = function() {
      return this.getCacheControlValue() !== "no-preview";
    };

    Snapshot.prototype.isCacheable = function() {
      return this.getCacheControlValue() !== "no-cache";
    };

    Snapshot.prototype.getSetting = function(name) {
      var element, ref;
      ref = this.head.querySelectorAll("meta[name='turbolinks-" + name + "']"), element = ref[ref.length - 1];
      return element != null ? element.getAttribute("content") : void 0;
    };

    return Snapshot;

  })();

}).call(this);
(function() {
  var slice = [].slice;

  Turbolinks.Renderer = (function() {
    var copyElementAttributes;

    function Renderer() {}

    Renderer.render = function() {
      var args, callback, delegate, renderer;
      delegate = arguments[0], callback = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      renderer = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(this, args, function(){});
      renderer.delegate = delegate;
      renderer.render(callback);
      return renderer;
    };

    Renderer.prototype.renderView = function(callback) {
      this.delegate.viewWillRender(this.newBody);
      callback();
      return this.delegate.viewRendered(this.newBody);
    };

    Renderer.prototype.invalidateView = function() {
      return this.delegate.viewInvalidated();
    };

    Renderer.prototype.createScriptElement = function(element) {
      var createdScriptElement;
      if (element.getAttribute("data-turbolinks-eval") === "false") {
        return element;
      } else {
        createdScriptElement = document.createElement("script");
        createdScriptElement.textContent = element.textContent;
        copyElementAttributes(createdScriptElement, element);
        return createdScriptElement;
      }
    };

    copyElementAttributes = function(destinationElement, sourceElement) {
      var i, len, name, ref, ref1, results, value;
      ref = sourceElement.attributes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ref1 = ref[i], name = ref1.name, value = ref1.value;
        results.push(destinationElement.setAttribute(name, value));
      }
      return results;
    };

    return Renderer;

  })();

}).call(this);
(function() {
  Turbolinks.HeadDetails = (function() {
    var elementIsScript, elementIsStylesheet, elementIsTracked, elementType;

    function HeadDetails(element1) {
      var base, data, element, i, key, len, ref;
      this.element = element1;
      this.elements = {};
      ref = this.element.childNodes;
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        if (!(element.nodeType === Node.ELEMENT_NODE)) {
          continue;
        }
        key = element.outerHTML;
        data = (base = this.elements)[key] != null ? base[key] : base[key] = {
          type: elementType(element),
          tracked: elementIsTracked(element),
          elements: []
        };
        data.elements.push(element);
      }
    }

    HeadDetails.prototype.hasElementWithKey = function(key) {
      return key in this.elements;
    };

    HeadDetails.prototype.getTrackedElementSignature = function() {
      var key, tracked;
      return ((function() {
        var ref, results;
        ref = this.elements;
        results = [];
        for (key in ref) {
          tracked = ref[key].tracked;
          if (tracked) {
            results.push(key);
          }
        }
        return results;
      }).call(this)).join("");
    };

    HeadDetails.prototype.getScriptElementsNotInDetails = function(headDetails) {
      return this.getElementsMatchingTypeNotInDetails("script", headDetails);
    };

    HeadDetails.prototype.getStylesheetElementsNotInDetails = function(headDetails) {
      return this.getElementsMatchingTypeNotInDetails("stylesheet", headDetails);
    };

    HeadDetails.prototype.getElementsMatchingTypeNotInDetails = function(matchedType, headDetails) {
      var elements, key, ref, ref1, results, type;
      ref = this.elements;
      results = [];
      for (key in ref) {
        ref1 = ref[key], type = ref1.type, elements = ref1.elements;
        if (type === matchedType && !headDetails.hasElementWithKey(key)) {
          results.push(elements[0]);
        }
      }
      return results;
    };

    HeadDetails.prototype.getProvisionalElements = function() {
      var elements, key, provisionalElements, ref, ref1, tracked, type;
      provisionalElements = [];
      ref = this.elements;
      for (key in ref) {
        ref1 = ref[key], type = ref1.type, tracked = ref1.tracked, elements = ref1.elements;
        if ((type == null) && !tracked) {
          provisionalElements.push.apply(provisionalElements, elements);
        } else if (elements.length > 1) {
          provisionalElements.push.apply(provisionalElements, elements.slice(1));
        }
      }
      return provisionalElements;
    };

    elementType = function(element) {
      if (elementIsScript(element)) {
        return "script";
      } else if (elementIsStylesheet(element)) {
        return "stylesheet";
      }
    };

    elementIsTracked = function(element) {
      return element.getAttribute("data-turbolinks-track") === "reload";
    };

    elementIsScript = function(element) {
      var tagName;
      tagName = element.tagName.toLowerCase();
      return tagName === "script";
    };

    elementIsStylesheet = function(element) {
      var tagName;
      tagName = element.tagName.toLowerCase();
      return tagName === "style" || (tagName === "link" && element.getAttribute("rel") === "stylesheet");
    };

    return HeadDetails;

  })();

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Turbolinks.SnapshotRenderer = (function(superClass) {
    extend(SnapshotRenderer, superClass);

    function SnapshotRenderer(currentSnapshot, newSnapshot) {
      this.currentSnapshot = currentSnapshot;
      this.newSnapshot = newSnapshot;
      this.currentHeadDetails = new Turbolinks.HeadDetails(this.currentSnapshot.head);
      this.newHeadDetails = new Turbolinks.HeadDetails(this.newSnapshot.head);
      this.newBody = this.newSnapshot.body;
    }

    SnapshotRenderer.prototype.render = function(callback) {
      if (this.trackedElementsAreIdentical()) {
        this.mergeHead();
        return this.renderView((function(_this) {
          return function() {
            _this.replaceBody();
            _this.focusFirstAutofocusableElement();
            return callback();
          };
        })(this));
      } else {
        return this.invalidateView();
      }
    };

    SnapshotRenderer.prototype.mergeHead = function() {
      this.copyNewHeadStylesheetElements();
      this.copyNewHeadScriptElements();
      this.removeCurrentHeadProvisionalElements();
      return this.copyNewHeadProvisionalElements();
    };

    SnapshotRenderer.prototype.replaceBody = function() {
      this.activateBodyScriptElements();
      this.importBodyPermanentElements();
      return this.assignNewBody();
    };

    SnapshotRenderer.prototype.trackedElementsAreIdentical = function() {
      return this.currentHeadDetails.getTrackedElementSignature() === this.newHeadDetails.getTrackedElementSignature();
    };

    SnapshotRenderer.prototype.copyNewHeadStylesheetElements = function() {
      var element, i, len, ref, results;
      ref = this.getNewHeadStylesheetElements();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        results.push(document.head.appendChild(element));
      }
      return results;
    };

    SnapshotRenderer.prototype.copyNewHeadScriptElements = function() {
      var element, i, len, ref, results;
      ref = this.getNewHeadScriptElements();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        results.push(document.head.appendChild(this.createScriptElement(element)));
      }
      return results;
    };

    SnapshotRenderer.prototype.removeCurrentHeadProvisionalElements = function() {
      var element, i, len, ref, results;
      ref = this.getCurrentHeadProvisionalElements();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        results.push(document.head.removeChild(element));
      }
      return results;
    };

    SnapshotRenderer.prototype.copyNewHeadProvisionalElements = function() {
      var element, i, len, ref, results;
      ref = this.getNewHeadProvisionalElements();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        results.push(document.head.appendChild(element));
      }
      return results;
    };

    SnapshotRenderer.prototype.importBodyPermanentElements = function() {
      var element, i, len, ref, replaceableElement, results;
      ref = this.getNewBodyPermanentElements();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        replaceableElement = ref[i];
        if (element = this.findCurrentBodyPermanentElement(replaceableElement)) {
          results.push(replaceableElement.parentNode.replaceChild(element, replaceableElement));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    SnapshotRenderer.prototype.activateBodyScriptElements = function() {
      var element, i, len, ref, replaceableElement, results;
      ref = this.getNewBodyScriptElements();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        replaceableElement = ref[i];
        element = this.createScriptElement(replaceableElement);
        results.push(replaceableElement.parentNode.replaceChild(element, replaceableElement));
      }
      return results;
    };

    SnapshotRenderer.prototype.assignNewBody = function() {
      return document.body = this.newBody;
    };

    SnapshotRenderer.prototype.focusFirstAutofocusableElement = function() {
      var ref;
      return (ref = this.findFirstAutofocusableElement()) != null ? ref.focus() : void 0;
    };

    SnapshotRenderer.prototype.getNewHeadStylesheetElements = function() {
      return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails);
    };

    SnapshotRenderer.prototype.getNewHeadScriptElements = function() {
      return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails);
    };

    SnapshotRenderer.prototype.getCurrentHeadProvisionalElements = function() {
      return this.currentHeadDetails.getProvisionalElements();
    };

    SnapshotRenderer.prototype.getNewHeadProvisionalElements = function() {
      return this.newHeadDetails.getProvisionalElements();
    };

    SnapshotRenderer.prototype.getNewBodyPermanentElements = function() {
      return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]");
    };

    SnapshotRenderer.prototype.findCurrentBodyPermanentElement = function(element) {
      return document.body.querySelector("#" + element.id + "[data-turbolinks-permanent]");
    };

    SnapshotRenderer.prototype.getNewBodyScriptElements = function() {
      return this.newBody.querySelectorAll("script");
    };

    SnapshotRenderer.prototype.findFirstAutofocusableElement = function() {
      return document.body.querySelector("[autofocus]");
    };

    return SnapshotRenderer;

  })(Turbolinks.Renderer);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Turbolinks.ErrorRenderer = (function(superClass) {
    extend(ErrorRenderer, superClass);

    function ErrorRenderer(html) {
      this.html = html;
    }

    ErrorRenderer.prototype.render = function(callback) {
      return this.renderView((function(_this) {
        return function() {
          _this.replaceDocumentHTML();
          _this.activateBodyScriptElements();
          return callback();
        };
      })(this));
    };

    ErrorRenderer.prototype.replaceDocumentHTML = function() {
      return document.documentElement.innerHTML = this.html;
    };

    ErrorRenderer.prototype.activateBodyScriptElements = function() {
      var element, i, len, ref, replaceableElement, results;
      ref = this.getScriptElements();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        replaceableElement = ref[i];
        element = this.createScriptElement(replaceableElement);
        results.push(replaceableElement.parentNode.replaceChild(element, replaceableElement));
      }
      return results;
    };

    ErrorRenderer.prototype.getScriptElements = function() {
      return document.documentElement.querySelectorAll("script");
    };

    return ErrorRenderer;

  })(Turbolinks.Renderer);

}).call(this);
(function() {
  Turbolinks.View = (function() {
    function View(delegate) {
      this.delegate = delegate;
      this.element = document.documentElement;
    }

    View.prototype.getRootLocation = function() {
      return this.getSnapshot().getRootLocation();
    };

    View.prototype.getSnapshot = function() {
      return Turbolinks.Snapshot.fromElement(this.element);
    };

    View.prototype.render = function(arg, callback) {
      var error, isPreview, snapshot;
      snapshot = arg.snapshot, error = arg.error, isPreview = arg.isPreview;
      this.markAsPreview(isPreview);
      if (snapshot != null) {
        return this.renderSnapshot(snapshot, callback);
      } else {
        return this.renderError(error, callback);
      }
    };

    View.prototype.markAsPreview = function(isPreview) {
      if (isPreview) {
        return this.element.setAttribute("data-turbolinks-preview", "");
      } else {
        return this.element.removeAttribute("data-turbolinks-preview");
      }
    };

    View.prototype.renderSnapshot = function(snapshot, callback) {
      return Turbolinks.SnapshotRenderer.render(this.delegate, callback, this.getSnapshot(), Turbolinks.Snapshot.wrap(snapshot));
    };

    View.prototype.renderError = function(error, callback) {
      return Turbolinks.ErrorRenderer.render(this.delegate, callback, error);
    };

    return View;

  })();

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Turbolinks.ScrollManager = (function() {
    function ScrollManager(delegate) {
      this.delegate = delegate;
      this.onScroll = bind(this.onScroll, this);
    }

    ScrollManager.prototype.start = function() {
      if (!this.started) {
        addEventListener("scroll", this.onScroll, false);
        this.onScroll();
        return this.started = true;
      }
    };

    ScrollManager.prototype.stop = function() {
      if (this.started) {
        removeEventListener("scroll", this.onScroll, false);
        return this.started = false;
      }
    };

    ScrollManager.prototype.scrollToElement = function(element) {
      return element.scrollIntoView();
    };

    ScrollManager.prototype.scrollToPosition = function(arg) {
      var x, y;
      x = arg.x, y = arg.y;
      return window.scrollTo(x, y);
    };

    ScrollManager.prototype.onScroll = function(event) {
      return this.updatePosition({
        x: window.pageXOffset,
        y: window.pageYOffset
      });
    };

    ScrollManager.prototype.updatePosition = function(position) {
      var ref;
      this.position = position;
      return (ref = this.delegate) != null ? ref.scrollPositionChanged(this.position) : void 0;
    };

    return ScrollManager;

  })();

}).call(this);
(function() {
  Turbolinks.SnapshotCache = (function() {
    var keyForLocation;

    function SnapshotCache(size) {
      this.size = size;
      this.keys = [];
      this.snapshots = {};
    }

    SnapshotCache.prototype.has = function(location) {
      var key;
      key = keyForLocation(location);
      return key in this.snapshots;
    };

    SnapshotCache.prototype.get = function(location) {
      var snapshot;
      if (!this.has(location)) {
        return;
      }
      snapshot = this.read(location);
      this.touch(location);
      return snapshot;
    };

    SnapshotCache.prototype.put = function(location, snapshot) {
      this.write(location, snapshot);
      this.touch(location);
      return snapshot;
    };

    SnapshotCache.prototype.read = function(location) {
      var key;
      key = keyForLocation(location);
      return this.snapshots[key];
    };

    SnapshotCache.prototype.write = function(location, snapshot) {
      var key;
      key = keyForLocation(location);
      return this.snapshots[key] = snapshot;
    };

    SnapshotCache.prototype.touch = function(location) {
      var index, key;
      key = keyForLocation(location);
      index = this.keys.indexOf(key);
      if (index > -1) {
        this.keys.splice(index, 1);
      }
      this.keys.unshift(key);
      return this.trim();
    };

    SnapshotCache.prototype.trim = function() {
      var i, key, len, ref, results;
      ref = this.keys.splice(this.size);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        results.push(delete this.snapshots[key]);
      }
      return results;
    };

    keyForLocation = function(location) {
      return Turbolinks.Location.wrap(location).toCacheKey();
    };

    return SnapshotCache;

  })();

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Turbolinks.Visit = (function() {
    var getHistoryMethodForAction;

    function Visit(controller, location, action1) {
      this.controller = controller;
      this.action = action1;
      this.performScroll = bind(this.performScroll, this);
      this.identifier = Turbolinks.uuid();
      this.location = Turbolinks.Location.wrap(location);
      this.adapter = this.controller.adapter;
      this.state = "initialized";
      this.timingMetrics = {};
    }

    Visit.prototype.start = function() {
      if (this.state === "initialized") {
        this.recordTimingMetric("visitStart");
        this.state = "started";
        return this.adapter.visitStarted(this);
      }
    };

    Visit.prototype.cancel = function() {
      var ref;
      if (this.state === "started") {
        if ((ref = this.request) != null) {
          ref.cancel();
        }
        this.cancelRender();
        return this.state = "canceled";
      }
    };

    Visit.prototype.complete = function() {
      var base;
      if (this.state === "started") {
        this.recordTimingMetric("visitEnd");
        this.state = "completed";
        if (typeof (base = this.adapter).visitCompleted === "function") {
          base.visitCompleted(this);
        }
        return this.controller.visitCompleted(this);
      }
    };

    Visit.prototype.fail = function() {
      var base;
      if (this.state === "started") {
        this.state = "failed";
        return typeof (base = this.adapter).visitFailed === "function" ? base.visitFailed(this) : void 0;
      }
    };

    Visit.prototype.changeHistory = function() {
      var actionForHistory, method;
      if (!this.historyChanged) {
        actionForHistory = this.location.isEqualTo(this.referrer) ? "replace" : this.action;
        method = getHistoryMethodForAction(actionForHistory);
        this.controller[method](this.location, this.restorationIdentifier);
        return this.historyChanged = true;
      }
    };

    Visit.prototype.issueRequest = function() {
      if (this.shouldIssueRequest() && (this.request == null)) {
        this.progress = 0;
        this.request = new Turbolinks.HttpRequest(this, this.location, this.referrer);
        return this.request.send();
      }
    };

    Visit.prototype.getCachedSnapshot = function() {
      var snapshot;
      if (snapshot = this.controller.getCachedSnapshotForLocation(this.location)) {
        if ((this.location.anchor == null) || snapshot.hasAnchor(this.location.anchor)) {
          if (this.action === "restore" || snapshot.isPreviewable()) {
            return snapshot;
          }
        }
      }
    };

    Visit.prototype.hasCachedSnapshot = function() {
      return this.getCachedSnapshot() != null;
    };

    Visit.prototype.loadCachedSnapshot = function() {
      var isPreview, snapshot;
      if (snapshot = this.getCachedSnapshot()) {
        isPreview = this.shouldIssueRequest();
        return this.render(function() {
          var base;
          this.cacheSnapshot();
          this.controller.render({
            snapshot: snapshot,
            isPreview: isPreview
          }, this.performScroll);
          if (typeof (base = this.adapter).visitRendered === "function") {
            base.visitRendered(this);
          }
          if (!isPreview) {
            return this.complete();
          }
        });
      }
    };

    Visit.prototype.loadResponse = function() {
      if (this.response != null) {
        return this.render(function() {
          var base, base1;
          this.cacheSnapshot();
          if (this.request.failed) {
            this.controller.render({
              error: this.response
            }, this.performScroll);
            if (typeof (base = this.adapter).visitRendered === "function") {
              base.visitRendered(this);
            }
            return this.fail();
          } else {
            this.controller.render({
              snapshot: this.response
            }, this.performScroll);
            if (typeof (base1 = this.adapter).visitRendered === "function") {
              base1.visitRendered(this);
            }
            return this.complete();
          }
        });
      }
    };

    Visit.prototype.followRedirect = function() {
      if (this.redirectedToLocation && !this.followedRedirect) {
        this.location = this.redirectedToLocation;
        this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation, this.restorationIdentifier);
        return this.followedRedirect = true;
      }
    };

    Visit.prototype.requestStarted = function() {
      var base;
      this.recordTimingMetric("requestStart");
      return typeof (base = this.adapter).visitRequestStarted === "function" ? base.visitRequestStarted(this) : void 0;
    };

    Visit.prototype.requestProgressed = function(progress) {
      var base;
      this.progress = progress;
      return typeof (base = this.adapter).visitRequestProgressed === "function" ? base.visitRequestProgressed(this) : void 0;
    };

    Visit.prototype.requestCompletedWithResponse = function(response, redirectedToLocation) {
      this.response = response;
      if (redirectedToLocation != null) {
        this.redirectedToLocation = Turbolinks.Location.wrap(redirectedToLocation);
      }
      return this.adapter.visitRequestCompleted(this);
    };

    Visit.prototype.requestFailedWithStatusCode = function(statusCode, response) {
      this.response = response;
      return this.adapter.visitRequestFailedWithStatusCode(this, statusCode);
    };

    Visit.prototype.requestFinished = function() {
      var base;
      this.recordTimingMetric("requestEnd");
      return typeof (base = this.adapter).visitRequestFinished === "function" ? base.visitRequestFinished(this) : void 0;
    };

    Visit.prototype.performScroll = function() {
      if (!this.scrolled) {
        if (this.action === "restore") {
          this.scrollToRestoredPosition() || this.scrollToTop();
        } else {
          this.scrollToAnchor() || this.scrollToTop();
        }
        return this.scrolled = true;
      }
    };

    Visit.prototype.scrollToRestoredPosition = function() {
      var position, ref;
      position = (ref = this.restorationData) != null ? ref.scrollPosition : void 0;
      if (position != null) {
        this.controller.scrollToPosition(position);
        return true;
      }
    };

    Visit.prototype.scrollToAnchor = function() {
      if (this.location.anchor != null) {
        this.controller.scrollToAnchor(this.location.anchor);
        return true;
      }
    };

    Visit.prototype.scrollToTop = function() {
      return this.controller.scrollToPosition({
        x: 0,
        y: 0
      });
    };

    Visit.prototype.recordTimingMetric = function(name) {
      var base;
      return (base = this.timingMetrics)[name] != null ? base[name] : base[name] = new Date().getTime();
    };

    Visit.prototype.getTimingMetrics = function() {
      return Turbolinks.copyObject(this.timingMetrics);
    };

    getHistoryMethodForAction = function(action) {
      switch (action) {
        case "replace":
          return "replaceHistoryWithLocationAndRestorationIdentifier";
        case "advance":
        case "restore":
          return "pushHistoryWithLocationAndRestorationIdentifier";
      }
    };

    Visit.prototype.shouldIssueRequest = function() {
      if (this.action === "restore") {
        return !this.hasCachedSnapshot();
      } else {
        return true;
      }
    };

    Visit.prototype.cacheSnapshot = function() {
      if (!this.snapshotCached) {
        this.controller.cacheSnapshot();
        return this.snapshotCached = true;
      }
    };

    Visit.prototype.render = function(callback) {
      this.cancelRender();
      return this.frame = requestAnimationFrame((function(_this) {
        return function() {
          _this.frame = null;
          return callback.call(_this);
        };
      })(this));
    };

    Visit.prototype.cancelRender = function() {
      if (this.frame) {
        return cancelAnimationFrame(this.frame);
      }
    };

    return Visit;

  })();

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Turbolinks.Controller = (function() {
    function Controller() {
      this.clickBubbled = bind(this.clickBubbled, this);
      this.clickCaptured = bind(this.clickCaptured, this);
      this.pageLoaded = bind(this.pageLoaded, this);
      this.history = new Turbolinks.History(this);
      this.view = new Turbolinks.View(this);
      this.scrollManager = new Turbolinks.ScrollManager(this);
      this.restorationData = {};
      this.clearCache();
    }

    Controller.prototype.start = function() {
      if (Turbolinks.supported && !this.started) {
        addEventListener("click", this.clickCaptured, true);
        addEventListener("DOMContentLoaded", this.pageLoaded, false);
        this.scrollManager.start();
        this.startHistory();
        this.started = true;
        return this.enabled = true;
      }
    };

    Controller.prototype.disable = function() {
      return this.enabled = false;
    };

    Controller.prototype.stop = function() {
      if (this.started) {
        removeEventListener("click", this.clickCaptured, true);
        removeEventListener("DOMContentLoaded", this.pageLoaded, false);
        this.scrollManager.stop();
        this.stopHistory();
        return this.started = false;
      }
    };

    Controller.prototype.clearCache = function() {
      return this.cache = new Turbolinks.SnapshotCache(10);
    };

    Controller.prototype.visit = function(location, options) {
      var action, ref;
      if (options == null) {
        options = {};
      }
      location = Turbolinks.Location.wrap(location);
      if (this.applicationAllowsVisitingLocation(location)) {
        if (this.locationIsVisitable(location)) {
          action = (ref = options.action) != null ? ref : "advance";
          return this.adapter.visitProposedToLocationWithAction(location, action);
        } else {
          return window.location = location;
        }
      }
    };

    Controller.prototype.startVisitToLocationWithAction = function(location, action, restorationIdentifier) {
      var restorationData;
      if (Turbolinks.supported) {
        restorationData = this.getRestorationDataForIdentifier(restorationIdentifier);
        return this.startVisit(location, action, {
          restorationData: restorationData
        });
      } else {
        return window.location = location;
      }
    };

    Controller.prototype.startHistory = function() {
      this.location = Turbolinks.Location.wrap(window.location);
      this.restorationIdentifier = Turbolinks.uuid();
      this.history.start();
      return this.history.replace(this.location, this.restorationIdentifier);
    };

    Controller.prototype.stopHistory = function() {
      return this.history.stop();
    };

    Controller.prototype.pushHistoryWithLocationAndRestorationIdentifier = function(location, restorationIdentifier1) {
      this.restorationIdentifier = restorationIdentifier1;
      this.location = Turbolinks.Location.wrap(location);
      return this.history.push(this.location, this.restorationIdentifier);
    };

    Controller.prototype.replaceHistoryWithLocationAndRestorationIdentifier = function(location, restorationIdentifier1) {
      this.restorationIdentifier = restorationIdentifier1;
      this.location = Turbolinks.Location.wrap(location);
      return this.history.replace(this.location, this.restorationIdentifier);
    };

    Controller.prototype.historyPoppedToLocationWithRestorationIdentifier = function(location, restorationIdentifier1) {
      var restorationData;
      this.restorationIdentifier = restorationIdentifier1;
      if (this.enabled) {
        restorationData = this.getRestorationDataForIdentifier(this.restorationIdentifier);
        this.startVisit(location, "restore", {
          restorationIdentifier: this.restorationIdentifier,
          restorationData: restorationData,
          historyChanged: true
        });
        return this.location = Turbolinks.Location.wrap(location);
      } else {
        return this.adapter.pageInvalidated();
      }
    };

    Controller.prototype.getCachedSnapshotForLocation = function(location) {
      var snapshot;
      snapshot = this.cache.get(location);
      if (snapshot) {
        return snapshot.clone();
      }
    };

    Controller.prototype.shouldCacheSnapshot = function() {
      return this.view.getSnapshot().isCacheable();
    };

    Controller.prototype.cacheSnapshot = function() {
      var snapshot;
      if (this.shouldCacheSnapshot()) {
        this.notifyApplicationBeforeCachingSnapshot();
        snapshot = this.view.getSnapshot();
        return this.cache.put(this.lastRenderedLocation, snapshot.clone());
      }
    };

    Controller.prototype.scrollToAnchor = function(anchor) {
      var element;
      if (element = document.getElementById(anchor)) {
        return this.scrollToElement(element);
      } else {
        return this.scrollToPosition({
          x: 0,
          y: 0
        });
      }
    };

    Controller.prototype.scrollToElement = function(element) {
      return this.scrollManager.scrollToElement(element);
    };

    Controller.prototype.scrollToPosition = function(position) {
      return this.scrollManager.scrollToPosition(position);
    };

    Controller.prototype.scrollPositionChanged = function(scrollPosition) {
      var restorationData;
      restorationData = this.getCurrentRestorationData();
      return restorationData.scrollPosition = scrollPosition;
    };

    Controller.prototype.render = function(options, callback) {
      return this.view.render(options, callback);
    };

    Controller.prototype.viewInvalidated = function() {
      return this.adapter.pageInvalidated();
    };

    Controller.prototype.viewWillRender = function(newBody) {
      return this.notifyApplicationBeforeRender(newBody);
    };

    Controller.prototype.viewRendered = function() {
      this.lastRenderedLocation = this.currentVisit.location;
      return this.notifyApplicationAfterRender();
    };

    Controller.prototype.pageLoaded = function() {
      this.lastRenderedLocation = this.location;
      return this.notifyApplicationAfterPageLoad();
    };

    Controller.prototype.clickCaptured = function() {
      removeEventListener("click", this.clickBubbled, false);
      return addEventListener("click", this.clickBubbled, false);
    };

    Controller.prototype.clickBubbled = function(event) {
      var action, link, location;
      if (this.enabled && this.clickEventIsSignificant(event)) {
        if (link = this.getVisitableLinkForNode(event.target)) {
          if (location = this.getVisitableLocationForLink(link)) {
            if (this.applicationAllowsFollowingLinkToLocation(link, location)) {
              event.preventDefault();
              action = this.getActionForLink(link);
              return this.visit(location, {
                action: action
              });
            }
          }
        }
      }
    };

    Controller.prototype.applicationAllowsFollowingLinkToLocation = function(link, location) {
      var event;
      event = this.notifyApplicationAfterClickingLinkToLocation(link, location);
      return !event.defaultPrevented;
    };

    Controller.prototype.applicationAllowsVisitingLocation = function(location) {
      var event;
      event = this.notifyApplicationBeforeVisitingLocation(location);
      return !event.defaultPrevented;
    };

    Controller.prototype.notifyApplicationAfterClickingLinkToLocation = function(link, location) {
      return Turbolinks.dispatch("turbolinks:click", {
        target: link,
        data: {
          url: location.absoluteURL
        },
        cancelable: true
      });
    };

    Controller.prototype.notifyApplicationBeforeVisitingLocation = function(location) {
      return Turbolinks.dispatch("turbolinks:before-visit", {
        data: {
          url: location.absoluteURL
        },
        cancelable: true
      });
    };

    Controller.prototype.notifyApplicationAfterVisitingLocation = function(location) {
      return Turbolinks.dispatch("turbolinks:visit", {
        data: {
          url: location.absoluteURL
        }
      });
    };

    Controller.prototype.notifyApplicationBeforeCachingSnapshot = function() {
      return Turbolinks.dispatch("turbolinks:before-cache");
    };

    Controller.prototype.notifyApplicationBeforeRender = function(newBody) {
      return Turbolinks.dispatch("turbolinks:before-render", {
        data: {
          newBody: newBody
        }
      });
    };

    Controller.prototype.notifyApplicationAfterRender = function() {
      return Turbolinks.dispatch("turbolinks:render");
    };

    Controller.prototype.notifyApplicationAfterPageLoad = function(timing) {
      if (timing == null) {
        timing = {};
      }
      return Turbolinks.dispatch("turbolinks:load", {
        data: {
          url: this.location.absoluteURL,
          timing: timing
        }
      });
    };

    Controller.prototype.startVisit = function(location, action, properties) {
      var ref;
      if ((ref = this.currentVisit) != null) {
        ref.cancel();
      }
      this.currentVisit = this.createVisit(location, action, properties);
      this.currentVisit.start();
      return this.notifyApplicationAfterVisitingLocation(location);
    };

    Controller.prototype.createVisit = function(location, action, arg) {
      var historyChanged, ref, restorationData, restorationIdentifier, visit;
      ref = arg != null ? arg : {}, restorationIdentifier = ref.restorationIdentifier, restorationData = ref.restorationData, historyChanged = ref.historyChanged;
      visit = new Turbolinks.Visit(this, location, action);
      visit.restorationIdentifier = restorationIdentifier != null ? restorationIdentifier : Turbolinks.uuid();
      visit.restorationData = Turbolinks.copyObject(restorationData);
      visit.historyChanged = historyChanged;
      visit.referrer = this.location;
      return visit;
    };

    Controller.prototype.visitCompleted = function(visit) {
      return this.notifyApplicationAfterPageLoad(visit.getTimingMetrics());
    };

    Controller.prototype.clickEventIsSignificant = function(event) {
      return !(event.defaultPrevented || event.target.isContentEditable || event.which > 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
    };

    Controller.prototype.getVisitableLinkForNode = function(node) {
      if (this.nodeIsVisitable(node)) {
        return Turbolinks.closest(node, "a[href]:not([target])");
      }
    };

    Controller.prototype.getVisitableLocationForLink = function(link) {
      var location;
      location = new Turbolinks.Location(link.getAttribute("href"));
      if (this.locationIsVisitable(location)) {
        return location;
      }
    };

    Controller.prototype.getActionForLink = function(link) {
      var ref;
      return (ref = link.getAttribute("data-turbolinks-action")) != null ? ref : "advance";
    };

    Controller.prototype.nodeIsVisitable = function(node) {
      var container;
      if (container = Turbolinks.closest(node, "[data-turbolinks]")) {
        return container.getAttribute("data-turbolinks") !== "false";
      } else {
        return true;
      }
    };

    Controller.prototype.locationIsVisitable = function(location) {
      return location.isPrefixedBy(this.view.getRootLocation()) && location.isHTML();
    };

    Controller.prototype.getCurrentRestorationData = function() {
      return this.getRestorationDataForIdentifier(this.restorationIdentifier);
    };

    Controller.prototype.getRestorationDataForIdentifier = function(identifier) {
      var base;
      return (base = this.restorationData)[identifier] != null ? base[identifier] : base[identifier] = {};
    };

    return Controller;

  })();

}).call(this);
(function() {
  var createController, installTurbolinks, moduleIsInstalled;

  Turbolinks.start = function() {
    if (installTurbolinks()) {
      if (Turbolinks.controller == null) {
        Turbolinks.controller = createController();
      }
      return Turbolinks.controller.start();
    }
  };

  installTurbolinks = function() {
    if (window.Turbolinks == null) {
      window.Turbolinks = Turbolinks;
    }
    return moduleIsInstalled();
  };

  createController = function() {
    var controller;
    controller = new Turbolinks.Controller;
    controller.adapter = new Turbolinks.BrowserAdapter(controller);
    return controller;
  };

  moduleIsInstalled = function() {
    return window.Turbolinks === Turbolinks;
  };

  if (moduleIsInstalled()) {
    Turbolinks.start();
  }

}).call(this);
(function() {
  var OldHttpRequest, preload,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldHttpRequest = Turbolinks.HttpRequest;

  Turbolinks.CachedHttpRequest = (function(superClass) {
    extend(CachedHttpRequest, superClass);

    function CachedHttpRequest(_, location, referrer) {
      CachedHttpRequest.__super__.constructor.call(this, this, location, referrer);
    }

    CachedHttpRequest.prototype.requestCompletedWithResponse = function(response, redirectedToLocation) {
      this.response = response;
      return this.redirect = redirectedToLocation;
    };

    CachedHttpRequest.prototype.requestFailedWithStatusCode = function(code) {
      return this.failCode = code;
    };

    CachedHttpRequest.prototype.oldSend = function() {
      var ref;
      if (this.xhr && !this.sent) {
        this.notifyApplicationBeforeRequestStart();
        this.setProgress(0);
        this.xhr.send();
        this.sent = true;
        return (ref = this.delegate) != null ? typeof ref.requestStarted === "function" ? ref.requestStarted() : void 0 : void 0;
      }
    };

    CachedHttpRequest.prototype.send = function() {
      if (this.failCode) {
        return this.delegate.requestFailedWithStatusCode(this.failCode, this.failText);
      } else if (this.response) {
        return this.delegate.requestCompletedWithResponse(this.response, this.redirect);
      } else {
        return this.oldSend();
      }
    };

    return CachedHttpRequest;

  })(Turbolinks.HttpRequest);

  Turbolinks.HttpRequest = (function() {
    function HttpRequest(delegate, location, referrer) {
      var cache;
      cache = Turbolinks.controller.cache.get("prefetch" + location);
      if (cache) {
        Turbolinks.controller.cache["delete"]("prefetch" + location);
        cache.delegate = delegate;
        return cache;
      } else {
        return new OldHttpRequest(delegate, location, referrer);
      }
    }

    return HttpRequest;

  })();

  (Turbolinks.Cache || Turbolinks.SnapshotCache).prototype["delete"] = function(location) {
    var key;
    key = Turbolinks.Location.wrap(location).toCacheKey();
    return delete this.snapshots[key];
  };

  preload = function(event) {
    var cache, link, location, method, request;
    if (link = Turbolinks.controller.getVisitableLinkForNode(event.target)) {
      if (location = Turbolinks.controller.getVisitableLocationForLink(link)) {
        if (Turbolinks.controller.applicationAllowsFollowingLinkToLocation(link, location)) {
          if (((method = link.attributes["data-method"]) != null) && method.value !== 'get') {
            return;
          }
          if (location.anchor || location.absoluteURL.endsWith("#")) {
            return;
          }
          if (location.absoluteURL === window.location.href) {
            return;
          }
          cache = Turbolinks.controller.cache.get(location);
          if (!cache) {
            cache = Turbolinks.controller.cache.get("prefetch" + location);
          }
          if (!cache) {
            request = new Turbolinks.CachedHttpRequest(null, location, window.location);
            Turbolinks.controller.cache.put("prefetch" + location, request);
            return request.send();
          }
        }
      }
    }
  };

  window.addEventListener('load', function() {
    document.addEventListener("touchstart", preload);
    return document.addEventListener("mouseover", preload);
  });

}).call(this);
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */


;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: 1
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, {
            transition: 'all ' + speed + 'ms linear',
            opacity: 0
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');

    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;

    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];

    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop,
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return;

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element.
   * The list is wrapped with a single space on each end to facilitate finding
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});

//  vendor/turbolinks/start is modified to start on page load.

//  vendor/turbolinks_prefetch is modified to start on page load.

;

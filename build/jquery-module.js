/**
 * Modules in this bundle
 * @license
 * 
 * jquery-module:
 *   license: MIT
 *   author: TSUMIKI INC.
 *   version: 1.0.2
 * 
 * events:
 *   license: MIT
 *   author: Irakli Gozalishvili <rfobic@gmail.com>
 *   maintainers: gozala <rfobic@gmail.com>, defunctzombie <shtylman@gmail.com>
 *   homepage: https://github.com/Gozala/events#readme
 *   version: 1.1.0
 * 
 * This header is generated by licensify (https://github.com/twada/licensify)
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$Module = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  Smoothscroll: _dereq_('./lib/smoothscroll'),
  Popup: _dereq_('./lib/popup'),
  ShareSNS: _dereq_('./lib/share-sns'),
  example: _dereq_('./lib/example'),
  es3: {
    Smoothscroll: _dereq_('./lib/es3-smoothscroll'),
    Rollover: _dereq_('./lib/es3-rollover'),
    Popup: _dereq_('./lib/es3-popup'),
    Modal: _dereq_('./lib/es3-modal'),
    Imagefit: _dereq_('./lib/es3-imagefit')
  }
};

},{"./lib/es3-imagefit":2,"./lib/es3-modal":3,"./lib/es3-popup":4,"./lib/es3-rollover":5,"./lib/es3-smoothscroll":6,"./lib/example":7,"./lib/popup":8,"./lib/share-sns":9,"./lib/smoothscroll":10}],2:[function(_dereq_,module,exports){
(function (global){
'use strict';

var $ = global.$;
var $window = $(window);

module.exports = (function () {
  function Imagefit(el, opts) {
    this._configure(el, opts);
  }

  Imagefit.prototype._configure = function (el, opts) {
    this.$el = $(el);
    this.option = $.extend({
      aspectRatio: 9 / 16
    }, opts);
    this.init();
  };

  Imagefit.prototype.init = function () {
    this.$el.css({
      position: 'absolute',
      top: '50%',
      left: '50%'
    });
    this.load();
    this.resize();
  };

  Imagefit.prototype.load = function () {
    this._loadWindow();
  };

  Imagefit.prototype.resize = function () {
    this._resizeWindow();
  };

  Imagefit.prototype._fit = function () {
    var containerWidth = $window.width();
    var containerHeight = $window.height();
    var currentAspectRatio = containerHeight / containerWidth;
    var width;
    var height;
    var marginTop;
    var marginLeft;

    if (this.option.aspectRatio > currentAspectRatio) {
      width = containerWidth;
    } else {
      width = containerHeight / this.option.aspectRatio;
    }
    height = width * this.option.aspectRatio;

    marginTop = -(height / 2);
    marginLeft = -(width / 2);

    this.$el.css({
      width: width,
      height: height,
      marginTop: marginTop,
      marginLeft: marginLeft
    });
  };

  Imagefit.prototype._loadWindow = function () {
    var _this = this;
    $(document).ready(function () {
      _this._fit();
    });
  };

  Imagefit.prototype._resizeWindow = function () {
    var _this = this;
    $window.on('resize.fit', function () {
      _this._fit();
    });
  };

  return Imagefit;
})();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(_dereq_,module,exports){
(function (global){
(function() {
  'use strict';
  var $, $body, DEFAULT_OPTS, EventEmitter, LABEL, Modal, anyOpend, modalHTML,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  EventEmitter = _dereq_('events').EventEmitter;

  $ = global.$;

  LABEL = 'modal';

  DEFAULT_OPTS = {
    width: 640,
    height: 360,
    isStylingModal: true,
    bodySelector: '.js-modal-body'
  };

  $body = $('body');

  modalHTML = '<div class="modal-wrapper js-modal-wrapper"> <div class="modal-bg js-modal-bg"></div> <div class="modal js-modal"> <div class="modal-inner js-modal-inner"> <div class="modal-close"> <a href="#" class="js-close-modal">x CLOSE</a> </div> <div class="modal-body js-modal-body"> </div> </div> </div> </div>';

  anyOpend = false;

  module.exports = Modal = (function(superClass) {
    extend(Modal, superClass);

    Modal.setBaseElement = function(el) {
      return modalHTML = el;
    };

    Modal.isAnyOpened = function() {
      return anyOpend;
    };

    function Modal(el1, opts) {
      this.el = el1;
      Modal.__super__.constructor.call(this);
      this._configure(this.el, opts);
      this.addOpenEvent();
    }

    Modal.prototype.render = function(el) {
      $(this.opts.bodySelector).append(el);
      return this;
    };

    Modal.prototype.open = function() {
      if (anyOpend) {
        return this;
      }
      this._opened = anyOpend = true;
      this._stylingBodyAtOpen();
      if (this.opts.isStylingModal) {
        this._stylingModalAtOpen();
      }
      this.addCloseEvent();
      this.emit('open', this.el, this);
      return this;
    };

    Modal.prototype.close = function() {
      this._opened = anyOpend = false;
      $('.js-modal').hide();
      $('.js-modal-wrapper').fadeOut().promise().done((function(_this) {
        return function() {
          return _this._removeModalWrapper();
        };
      })(this));
      this.emit('close', this.el, this);
      return this;
    };

    Modal.prototype.addOpenEvent = function() {
      this.$el.on("click." + LABEL + ":open", (function(_this) {
        return function(ev) {
          if (ev != null) {
            if (typeof ev.preventDefault === "function") {
              ev.preventDefault();
            }
          }
          return _this.open();
        };
      })(this));
      return this;
    };

    Modal.prototype.removeOpenEvent = function() {
      this.$el.off("click." + LABEL + ":open");
      return this;
    };

    Modal.prototype.addCloseEvent = function() {
      $('.js-close-modal, .js-modal-bg').on("click." + LABEL + ":close", (function(_this) {
        return function(ev) {
          if (ev != null) {
            if (typeof ev.preventDefault === "function") {
              ev.preventDefault();
            }
          }
          return _this.close();
        };
      })(this));
      return this;
    };

    Modal.prototype._configure = function(el, opts) {
      this.$el = $(el);
      return this.opts = $.extend({}, DEFAULT_OPTS, opts);
    };

    Modal.prototype._removeModalWrapper = function() {
      $('.js-modal-wrapper').remove();
      return this._stylingBodyDefault();
    };

    Modal.prototype._stylingBodyAtOpen = function() {
      var scrollBarWidth;
      scrollBarWidth = this._getScrollbarWidth();
      return $body.css('margin-right', scrollBarWidth).append(modalHTML).css('overflow', 'hidden');
    };

    Modal.prototype._stylingModalAtOpen = function() {
      return $('.js-modal').css({
        width: this.opts.width,
        height: this.opts.height,
        marginTop: -this.opts.height / 2,
        marginLeft: -this.opts.width / 2
      });
    };

    Modal.prototype._stylingBodyDefault = function() {
      return $body.css({
        marginRight: 0,
        overflow: 'visible'
      });
    };

    Modal.prototype._getScrollbarWidth = function() {
      var div, scrollbarWidth;
      div = document.createElement('div');
      div.style.width = '100px';
      div.style.height = '100px';
      div.style.overflow = 'scroll';
      div.style.position = 'absolute';
      div.style.top = '-9999px';
      document.body.appendChild(div);
      scrollbarWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      return scrollbarWidth;
    };

    return Modal;

  })(EventEmitter);

}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"events":11}],4:[function(_dereq_,module,exports){
(function (global){
(function() {
  'use strict';
  var $, DEFAULT_OPTS, LABEL, Popup;

  $ = global.$;

  LABEL = 'popup';

  DEFAULT_OPTS = {
    width: 640,
    height: 800,
    url: null,
    nameSuffix: '-popup'
  };

  module.exports = Popup = (function() {
    Popup.open = function(el) {
      return new Popup(el).open();
    };

    function Popup(el1, opts) {
      this.el = el1;
      this._configure(this.el, opts);
      this.bindClick();
    }

    Popup.prototype.open = function() {
      window.open(this._url, this._name, this._param);
      return this;
    };

    Popup.prototype.bindClick = function() {
      this.$el.on("click." + LABEL, (function(_this) {
        return function(ev) {
          if (ev != null) {
            ev.preventDefault();
          }
          return _this.open();
        };
      })(this));
      return this;
    };

    Popup.prototype.unbindClick = function() {
      this.$el.off("click." + LABEL);
      return this;
    };

    Popup.prototype._configure = function(el, opts) {
      var url;
      this.opts = $.extend({}, DEFAULT_OPTS, opts);
      this.$el = $(el);
      if ((url = this.el.getAttribute('href')) != null) {
        this._url = url;
      } else {
        this._url = this.opts.url;
      }
      this._name = "" + window.name + this.opts.nameSuffix;
      return this._setParam();
    };

    Popup.prototype._setParam = function() {
      var h, height, w, width, x, y;
      if ((w = this.el.getAttribute('data-popup-width')) != null) {
        width = w;
      } else {
        width = this.opts.width;
      }
      if ((h = this.el.getAttribute('data-popup-heigt')) != null) {
        height = h;
      } else {
        height = this.opts.height;
      }
      x = (window.screen.width - width) / 2;
      y = (window.screen.height - height) / 2;
      return this._param = ("screenX=" + x + ",screenY=" + y + ",left=" + x + ",top=" + y + ",width=" + width + ",height=" + height + ",") + "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes";
    };

    return Popup;

  })();

}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(_dereq_,module,exports){
(function (global){
(function() {
  'use strict';
  var $, DEFAULT_OPTS, LABEL, Rollover;

  $ = global.$;

  LABEL = 'rollover';

  DEFAULT_OPTS = {
    strOff: '_off',
    strOn: '_on',
    onlyChild: true,
    initializationOver: false
  };

  module.exports = Rollover = (function() {
    function Rollover(el1, opts) {
      this.el = el1;
      this._configure(this.el, opts);
      this._preload();
      this.events();
      if (this.opts.initializationOver) {
        this.toOver();
      }
    }

    Rollover.prototype.toOver = function() {
      this.$img.attr('src', this._srcOn);
      return this;
    };

    Rollover.prototype.toOut = function() {
      this.$img.attr('src', this._srcOff);
      return this;
    };

    Rollover.prototype.events = function() {
      this.$el.on("mouseenter." + LABEL, (function(_this) {
        return function() {
          return _this.toOver();
        };
      })(this));
      this.$el.on("mouseleave." + LABEL, (function(_this) {
        return function() {
          return _this.toOut();
        };
      })(this));
      return this;
    };

    Rollover.prototype.rmEvents = function() {
      this.$el.off("mouseenter." + LABEL);
      this.$el.off("mouseleave." + LABEL);
      return this;
    };

    Rollover.prototype._preload = function() {
      return $('<img />').attr('src', this._srcOn);
    };

    Rollover.prototype._configure = function(el, opts) {
      this.$el = $(el);
      this.opts = $.extend({}, DEFAULT_OPTS, opts);
      if (this.opts.onlyChild) {
        this.$img = this.$el.children('img');
      } else {
        this.$img = this.$el.find('img');
      }
      this._srcOff = this.$img.attr('src');
      return this._srcOn = this._srcOff.replace(this.opts.strOff, this.opts.strOn);
    };

    return Rollover;

  })();

}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(_dereq_,module,exports){
(function (global){
(function() {
  'use strict';
  var $, $body, DEFAULT_OPTS, LABEL, Smoothscroll,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = global.$;

  LABEL = 'smoothscroll';

  DEFAULT_OPTS = {
    speed: 700,
    easingName: 'swing',
    offset: 0,
    onScrollBefore: function(smoothscroll) {},
    onScrollAfter: function(smoothscroll) {}
  };

  $body = $('html, body');

  module.exports = Smoothscroll = (function() {
    Smoothscroll.addEasing = function(name, func) {
      return $.easing[name + ":" + LABEL] = func;
    };

    Smoothscroll.cancelScroll = function() {
      return $body.stop();
    };

    function Smoothscroll(el1, opts) {
      this.el = el1;
      this._handleClick = bind(this._handleClick, this);
      this._configure(this.el, opts);
      this.bindClick();
    }

    Smoothscroll.prototype.scroll = function() {
      var easingName, offset, onScrollAfter, onScrollBefore, ref, speed, val;
      if (this.$targetEl == null) {
        return this;
      }
      ref = this.opts, speed = ref.speed, easingName = ref.easingName, offset = ref.offset, onScrollBefore = ref.onScrollBefore, onScrollAfter = ref.onScrollAfter;
      onScrollBefore(this);
      val = this.$targetEl.offset().top - offset;
      this._onWheelCancel();
      $body.animate({
        scrollTop: val
      }, {
        duration: speed,
        easing: easingName === 'swing' ? easingName : easingName + ":" + LABEL
      }).promise().then((function(_this) {
        return function() {
          return onScrollAfter(_this);
        };
      })(this)).always((function(_this) {
        return function() {
          return _this._offWheelCancel();
        };
      })(this));
      return this;
    };

    Smoothscroll.prototype.bindClick = function() {
      this.$el.on("click." + LABEL, this._handleClick);
      return this;
    };

    Smoothscroll.prototype.unbindClick = function() {
      this.$el.off("click." + LABEL);
      return this;
    };

    Smoothscroll.prototype._configure = function(el, opts) {
      var href;
      this.$el = $(el);
      this.opts = $.extend({}, DEFAULT_OPTS, opts);
      href = this.$el.attr('href');
      if (href !== '#' && href !== '') {
        return this.$targetEl = $(href);
      }
    };

    Smoothscroll.prototype._handleClick = function(ev) {
      ev.preventDefault();
      return this.scroll();
    };

    Smoothscroll.prototype._onWheelCancel = function() {
      return $(window).on("wheel.cancel" + LABEL, Smoothscroll.cancelScroll);
    };

    Smoothscroll.prototype._offWheelCancel = function() {
      return $(window).off("wheel.cancel" + LABEL);
    };

    return Smoothscroll;

  })();

}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(_dereq_,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = example;
var $ = global.$;

function example(arg) {
  console.log($);
  console.log(arg);
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(_dereq_,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.$;

var LABEL = 'popup';

var DEFAULT_OPTS = {
  width: 640,
  height: 800,
  url: null,
  nameSuffix: '-popup'
};

var Popup = (function () {
  _createClass(Popup, null, [{
    key: 'open',
    value: function open(el) {
      new Popup(el).open();
    }
  }]);

  function Popup(el, opts) {
    _classCallCheck(this, Popup);

    this.el = el;
    this._configure(el, opts);
    this.bindClick();
  }

  _createClass(Popup, [{
    key: 'open',
    value: function open() {
      window.open(this._url, this._name, this._param);
      return this;
    }
  }, {
    key: 'bindClick',
    value: function bindClick() {
      var _this = this;

      this.$el.on('click.' + LABEL, function (ev) {
        if (ev) {
          ev.preventDefault();
        }
        _this.open();
      });
      return this;
    }
  }, {
    key: 'unbindClick',
    value: function unbindClick() {
      this.$el.off('click.' + LABEL);
      return this;
    }
  }, {
    key: '_configure',
    value: function _configure(el, opts) {
      this.opts = $.extend({}, DEFAULT_OPTS, opts);
      this.$el = $(el);

      var url = undefined;

      if (url = this.el.getAttribute('href')) {
        this._url = url;
      } else {
        this._url = this.opts.url;
      }

      this._name = '' + window.name + this.opts.nameSuffix;

      this._setParam();
    }
  }, {
    key: '_setParam',
    value: function _setParam() {
      var width = undefined;
      var height = undefined;
      var w = undefined;
      var h = undefined;

      if (w = this.el.getAttribute('data-popup-width')) {
        width = w;
      } else {
        width = this.opts.width;
      }

      if (h = this.el.getAttribute('data-popup-heigt')) {
        height = h;
      } else {
        height = this.opts.height;
      }

      var x = (window.screen.width - width) / 2;
      var y = (window.screen.height - height) / 2;

      this._param = 'screenX=' + x + ',screenY=' + y + ',left=' + x + ',top=' + y + ',width=' + width + ',height=' + height + ',' + 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes';
    }
  }]);

  return Popup;
})();

exports.default = Popup;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(_dereq_,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popup = _dereq_('./popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = global.$;

var DEFAULT_OPTS = {
  width: 640,
  height: 480,
  url: null,
  nameSuffix: '-popup',
  type: ''
};

var ShareSNS = (function (_Popup) {
  _inherits(ShareSNS, _Popup);

  function ShareSNS(el, opts) {
    _classCallCheck(this, ShareSNS);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShareSNS).call(this, el, $.extend({}, DEFAULT_OPTS, opts)));

    _this.el = el;
    _this._setShareURL();
    return _this;
  }

  _createClass(ShareSNS, [{
    key: '_setShareURL',
    value: function _setShareURL() {
      var type = this.opts.type;

      var title = undefined;
      var url = undefined;
      var ogtitle = undefined;
      var ogurl = undefined;

      if ((ogtitle = $('meta[property="og:title"]')).length > 0) {
        title = ogtitle.attr('content');
      } else {
        title = $('title').text();
      }

      if ((ogurl = $('meta[property="og:url"]')).length > 0) {
        url = ogurl.attr('content');
      } else {
        url = location.href;
      }

      if (type === 'twitter') {
        this._setTwitterURL(title, url);
      } else if (type === 'facebook') {
        this._setFacebookURL(url);
      } else if (type === 'google') {
        this._setGooglePlusURL(url);
      }
    }
  }, {
    key: '_setTwitterURL',
    value: function _setTwitterURL(title, url) {
      var maxLength = 140 - (url.length + 1);
      if (title.length > maxLength) {
        title = title.substr(0, maxLength - 3) + '...';
      }

      this._url = 'https://twitter.com/share?url=' + encodeURI(url) + '&text=' + encodeURI(title);
    }
  }, {
    key: '_setFacebookURL',
    value: function _setFacebookURL(url) {
      this._url = 'https://www.facebook.com/sharer.php?u=' + url;
    }
  }, {
    key: '_setGooglePlusURL',
    value: function _setGooglePlusURL(url) {
      url = url.replace(/.*?:\/\//g, '');
      this._url = 'https://plus.google.com/share?url=' + url;
    }
  }]);

  return ShareSNS;
})(_popup2.default);

exports.default = ShareSNS;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./popup":8}],10:[function(_dereq_,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.$;

var LABEL = 'smoothscroll';

var DEFAULT_OPTS = {
  speed: 700,
  easingName: 'swing',
  offset: 0,
  onScrollBefore: function onScrollBefore() /* smoothscroll */{},
  onScrollAfter: function onScrollAfter() /* smoothscroll */{}
};

var $body = $('html, body');

var Smoothscroll = (function () {
  _createClass(Smoothscroll, null, [{
    key: 'addEasing',
    value: function addEasing(name, func) {
      $.easing[name + ':' + LABEL] = func;
    }
  }, {
    key: 'cancelScroll',
    value: function cancelScroll() {
      $body.stop();
    }
  }]);

  function Smoothscroll(el, opts) {
    _classCallCheck(this, Smoothscroll);

    this.el = el;
    this._configure(el, opts);
    this.bindClick();
  }

  _createClass(Smoothscroll, [{
    key: 'scroll',
    value: function scroll() {
      var _this = this;

      if (!this.$targetEl) {
        return this;
      }

      var _opts = this.opts;
      var speed = _opts.speed;
      var easingName = _opts.easingName;
      var offset = _opts.offset;
      var onScrollBefore = _opts.onScrollBefore;
      var onScrollAfter = _opts.onScrollAfter;

      onScrollBefore(this);

      this._onWheelCancel();

      var val = this.$targetEl.offset().top - offset;

      $body.animate({
        scrollTop: val
      }, {
        duration: speed,
        easing: easingName === 'swing' ? easingName : easingName + ':' + LABEL
      }).promise().then(function () {
        onScrollAfter(_this);
      }).always(function () {
        _this._offWheelCancel();
      });

      return this;
    }
  }, {
    key: 'bindClick',
    value: function bindClick() {
      this.$el.on('click.' + LABEL, this._handleClick.bind(this));
      return this;
    }
  }, {
    key: 'unbindClick',
    value: function unbindClick() {
      this.$el.off('click.' + LABEL);
      return this;
    }
  }, {
    key: '_configure',
    value: function _configure(el, opts) {
      this.$el = $(el);
      this.opts = $.extend({}, DEFAULT_OPTS, opts);

      var href = this.$el.attr('href');
      if (href !== '#' && href !== '') {
        this.$targetEl = $(href);
      }
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(ev) {
      ev.preventDefault();
      this.scroll();
    }
  }, {
    key: '_onWheelCancel',
    value: function _onWheelCancel() {
      $(window).on('wheel.cancel' + LABEL, Smoothscroll.cancelScroll);
    }
  }, {
    key: '_offWheelCancel',
    value: function _offWheelCancel() {
      $(window).off('wheel.cancel' + LABEL);
    }
  }]);

  return Smoothscroll;
})();

exports.default = Smoothscroll;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[1])(1)
});
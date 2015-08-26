'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

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

    _get(Object.getPrototypeOf(ShareSNS.prototype), 'constructor', this).call(this, el, _jquery2['default'].extend({}, DEFAULT_OPTS, opts));
    this.el = el;
    this._setShareURL();
  }

  _createClass(ShareSNS, [{
    key: '_setShareURL',
    value: function _setShareURL() {
      var type = this.opts.type;

      var title = undefined,
          url = undefined,
          ogtitle = undefined,
          ogurl = undefined;

      if ((ogtitle = (0, _jquery2['default'])('meta[property="og:title"]')).length > 0) {
        title = ogtitle.attr('content');
      } else {
        title = (0, _jquery2['default'])('title').text();
      }

      if ((ogurl = (0, _jquery2['default'])('meta[property="og:url"]')).length > 0) {
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
      this._url = 'https://plus.google.com/share?url=' + url;
    }
  }]);

  return ShareSNS;
})(_popup2['default']);

exports['default'] = ShareSNS;
module.exports = exports['default'];
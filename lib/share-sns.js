'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShareSNS).call(this, el, _jquery2.default.extend({}, DEFAULT_OPTS, opts)));

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

      if ((ogtitle = (0, _jquery2.default)('meta[property="og:title"]')).length > 0) {
        title = ogtitle.attr('content');
      } else {
        title = (0, _jquery2.default)('title').text();
      }

      if ((ogurl = (0, _jquery2.default)('meta[property="og:url"]')).length > 0) {
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
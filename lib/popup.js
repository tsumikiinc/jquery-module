'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var LABEL = 'popup';

var DEFAULT_OPTS = {
  width: 640,
  height: 800,
  url: null,
  nameSuffix: '-popup'
};

var Popup = (function () {
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
      this.opts = _jquery2['default'].extend({}, DEFAULT_OPTS, opts);
      this.$el = (0, _jquery2['default'])(el);

      var url = undefined;

      if (url = this.el.getAttribute('href')) {
        this._url = url;
      } else {
        this._url = this.opts.url;
      }

      this._name = '' + window.name + '' + this.opts.nameSuffix;

      this._setParam();
    }
  }, {
    key: '_setParam',
    value: function _setParam() {
      var width = undefined,
          height = undefined,
          w = undefined,
          h = undefined;
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

      this._param = 'screenX=' + x + ',screenY=' + y + ',left=' + x + ',top=' + y + ',width=' + width + ',height=' + height + ',toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes';
    }
  }], [{
    key: 'open',
    value: function open(el) {
      new Popup(el).open();
    }
  }]);

  return Popup;
})();

exports['default'] = Popup;
module.exports = exports['default'];
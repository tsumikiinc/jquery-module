'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LABEL = 'smoothscroll';

var DEFAULT_OPTS = {
  speed: 700,
  easingName: 'swing',
  offset: 0,
  onScrollBefore: function onScrollBefore() /* smoothscroll */{},
  onScrollAfter: function onScrollAfter() /* smoothscroll */{}
};

var $body = (0, _jquery2.default)('html, body');

var Smoothscroll = (function () {
  _createClass(Smoothscroll, null, [{
    key: 'addEasing',
    value: function addEasing(name, func) {
      _jquery2.default.easing[name + ':' + LABEL] = func;
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
      this.$el = (0, _jquery2.default)(el);
      this.opts = _jquery2.default.extend({}, DEFAULT_OPTS, opts);

      var href = this.$el.attr('href');
      if (href !== '#' && href !== '') {
        this.$targetEl = (0, _jquery2.default)(href);
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
      (0, _jquery2.default)(window).on('wheel.cancel' + LABEL, Smoothscroll.cancelScroll);
    }
  }, {
    key: '_offWheelCancel',
    value: function _offWheelCancel() {
      (0, _jquery2.default)(window).off('wheel.cancel' + LABEL);
    }
  }]);

  return Smoothscroll;
})();

exports.default = Smoothscroll;
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = global.$;

var _defaults = {
  speed: 700,
  easingName: null,
  offset: 0,
  onScrollBefore: function onScrollBefore(el) {},
  onScrollAfter: function onScrollAfter(el) {}
};

var _$body = $('html, body');

var Smoothscroll = (function () {
  function Smoothscroll(el, opts) {
    _classCallCheck(this, Smoothscroll);

    this.el = el;
    this._configure(el, opts);
    this.events();
  }

  _createClass(Smoothscroll, [{
    key: 'scroll',
    value: function scroll() {
      var _this = this;

      if (!this.$target) {
        return this;
      }

      this.opts.onScrollBefore(this.el);

      var val = this.$target.offset().top - this.opts.offset;

      _$body.stop(true, true).animate({
        scrollTop: val
      }, {
        duration: this.opts.speed,
        easing: this.opts.easingName
      }).promise().done(function () {
        _this.opts.onScrollAfter(_this.el);
      });

      return this;
    }
  }, {
    key: 'events',
    value: function events() {
      this.$el.on('click.smoothscroll', this._handleClick.bind(this));
      return this;
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.$el.off('click.smoothScroll');
      return this;
    }
  }, {
    key: '_configure',
    value: function _configure(el, opts) {
      this.$el = $(el);
      this.opts = $.extend({}, _defaults, opts);
      if (this.$el.attr('href') !== '#') {
        this.$target = $(this.$el.attr('href'));
      }
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(ev) {
      ev.preventDefault();
      this.scroll();
    }
  }], [{
    key: 'addEasing',
    value: function addEasing(name, func) {
      $.easing[name] = func;
    }
  }, {
    key: 'canselScroll',
    value: function canselScroll() {
      _$body.stop();
    }
  }]);

  return Smoothscroll;
})();

exports['default'] = Smoothscroll;
module.exports = exports['default'];
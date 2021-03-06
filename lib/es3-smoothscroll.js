(function() {
  'use strict';
  var $, $body, DEFAULT_OPTS, LABEL, Smoothscroll,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require('jquery');

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

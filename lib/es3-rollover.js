(function() {
  'use strict';
  var $, DEFAULT_OPTS, LABEL, Rollover;

  $ = require('jquery');

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

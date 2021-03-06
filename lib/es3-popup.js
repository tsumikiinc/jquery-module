(function() {
  'use strict';
  var $, DEFAULT_OPTS, LABEL, Popup;

  $ = require('jquery');

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

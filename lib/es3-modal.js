(function() {
  'use strict';
  var $, $body, DEFAULT_OPTS, EventEmitter, LABEL, Modal, anyOpend, modalHTML,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  EventEmitter = require('events').EventEmitter;

  $ = require('jquery');

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

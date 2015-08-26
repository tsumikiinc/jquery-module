'use strict';

import $ from 'jquery';

const LABEL = 'smoothscroll';

const DEFAULT_OPTS = {
  speed: 700,
  easingName: 'swing',
  offset: 0,
  onScrollBefore: (/* smoothscroll */) => {},
  onScrollAfter: (/* smoothscroll */) => {}
};

let $body = $('html, body');

export default class Smoothscroll {

  static addEasing(name, func) {
    $.easing[`${name}:${LABEL}`] = func;
  }

  static cancelScroll() {
    $body.stop();
  }

  constructor(el, opts) {
    this.el = el;
    this._configure(el, opts);
    this.bindClick();
  }

  scroll() {
    if (!this.$targetEl) {
      return this;
    }

    const {
      speed,
      easingName,
      offset,
      onScrollBefore,
      onScrollAfter
    } = this.opts;

    onScrollBefore(this);

    this._onWheelCancel();

    let val = this.$targetEl.offset().top - offset;

    $body
    .animate({
      scrollTop: val
    }, {
      duration: speed,
      easing: (easingName === 'swing') ? easingName : `${easingName}:${LABEL}`
    })
    .promise()
    .then(() => {
      onScrollAfter(this);
    })
    .always(() => {
      this._offWheelCancel();
    });

    return this;
  }

  bindClick() {
    this.$el.on(`click.${LABEL}`, this._handleClick.bind(this));
    return this;
  }

  unbindClick() {
    this.$el.off(`click.${LABEL}`);
    return this;
  }

  _configure(el, opts) {
    this.$el = $(el);
    this.opts = $.extend({}, DEFAULT_OPTS, opts);

    let href = this.$el.attr('href');
    if (href !== '#' && href !== '') {
      this.$targetEl = $(href);
    }
  }

  _handleClick(ev) {
    ev.preventDefault();
    this.scroll();
  }

  _onWheelCancel() {
    $(window).on(`wheel.cancel${LABEL}`, Smoothscroll.cancelScroll);
  }

  _offWheelCancel() {
    $(window).off(`wheel.cancel${LABEL}`);
  }

}

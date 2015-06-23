"use strict";

import $ from 'jquery';

const LABEL = 'popup';

const DEFAULT_OPTS = {
  width: 640,
  height: 800,
  url: null,
  nameSuffix: '-popup'
};

export default class Popup {

  static open(el) {
    new Popup(el).open();
  }

  constructor(el, opts) {
    this.el = el;
    this._configure(el, opts);
    this.bindClick();
  }

  open() {
    window.open(this._url, this._name, this._param);
    return this;
  }

  bindClick() {
    this.$el.on(`click.${LABEL}`, ev => {
      if (ev) {
        ev.preventDefault();
      }
      this.open();
    });
    return this;
  }

  unbindClick() {
    this.$el.off(`click.${LABEL}`);
    return this;
  }

  _configure(el, opts) {
    this.opts = $.extend({}, DEFAULT_OPTS, opts);
    this.$el = $(el);

    let url;

    if ( (url = this.el.getAttribute('href')) ) {
      this._url = url;
    } else {
      this._url = this.opts.url;
    }

    this._name = `${window.name}${this.opts.nameSuffix}`;

    this._setParam();
  }

  _setParam() {
    let width, height, w, h;
    if ( (w = this.el.getAttribute('data-popup-width')) ) {
      width = w;
    } else {
      width = this.opts.width;
    }

    if ( (h = this.el.getAttribute('data-popup-heigt')) ) {
      height = h;
    } else {
      height = this.opts.height;
    }

    let x = (window.screen.width - width) / 2;
    let y = (window.screen.height - height) / 2;

    this._param = `screenX=${x},screenY=${y},left=${x},top=${y},width=${width},height=${height},toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes`;
  }

}

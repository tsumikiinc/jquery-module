'use strict';

import $ from 'jquery';
import Popup from './popup';

const DEFAULT_OPTS = {
  width: 640,
  height: 480,
  url: null,
  nameSuffix: '-popup',
  type: ''
};

export default class ShareSNS extends Popup {

  constructor(el, opts) {
    super(el, $.extend({}, DEFAULT_OPTS, opts));
    this.el = el;
    this._setShareURL();
  }

  _setShareURL() {
    const { type } = this.opts;

    let title, url, ogtitle, ogurl;

    if ((ogtitle = $('meta[property="og:title"]')).length > 0) {
      title = ogtitle.attr('content');
    } else {
      title = $('title').text();
    }

    if ((ogurl = $('meta[property="og:url"]')).length > 0) {
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

  _setTwitterURL(title, url) {
    let maxLength = 140 - (url.length + 1);
    if (title.length > maxLength) {
      title = `${title.substr(0, (maxLength - 3))}...`;
    }

    this._url = `https://twitter.com/share?url=${encodeURI(url)}&text=${encodeURI(title)}`;
  }

  _setFacebookURL(url) {
    this._url = `https://www.facebook.com/sharer.php?u=${url}`;
  }

  _setGooglePlusURL(url) {
    this._url = `https://plus.google.com/share?url=${url}`;
  }

}

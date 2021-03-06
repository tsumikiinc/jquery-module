(function() {
  'use strict';
  var $, DEFAULT_OPTS, Popup, ShareSNS,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  $ = require('jquery');

  Popup = require('./es3-popup');

  DEFAULT_OPTS = {
    width: 640,
    height: 480,
    url: null,
    nameSuffix: '-popup',
    type: ''
  };

  module.exports = ShareSNS = (function(superClass) {
    extend(ShareSNS, superClass);

    function ShareSNS(el, opts) {
      this.el = el;
      ShareSNS.__super__.constructor.call(this, this.el, $.extend({}, DEFAULT_OPTS, opts));
      this._setShareURL();
    }

    ShareSNS.prototype._setShareURL = function() {
      var ogtitle, ogurl, title, url;
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
      if (this.opts.type === 'twitter') {
        return this._setTwitterURL(title, url);
      } else if (this.opts.type === 'facebook') {
        return this._setFacebookURL(url);
      } else if (this.opts.type === 'google') {
        return this._setGooglePlusURL(url);
      }
    };

    ShareSNS.prototype._setTwitterURL = function(title, url) {
      var maxLength;
      maxLength = 140 - (url.length + 1);
      if (title.length > maxLength) {
        title = (title.substr(0, maxLength - 3)) + "...";
      }
      return this._url = "https://twitter.com/share?url=" + (encodeURI(url)) + "&text=" + (encodeURI(title));
    };

    ShareSNS.prototype._setFacebookURL = function(url) {
      return this._url = "https://www.facebook.com/sharer.php?u=" + url;
    };

    ShareSNS.prototype._setGooglePlusURL = function(url) {
      url = url.replace(/.*?:\/\//g, '');
      return this._url = "https://plus.google.com/share?url=" + url;
    };

    return ShareSNS;

  })(Popup);

}).call(this);

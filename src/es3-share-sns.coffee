"use strict"

$ = require 'jquery'
Popup = require './es3-popup'

DEFAULT_OPTS =
  width: 640
  height: 480
  url: null
  nameSuffix: '-popup'
  type: ''

module.exports =
class ShareSNS extends Popup

  constructor: (@el, opts) ->
    super @el, $.extend {}, DEFAULT_OPTS, opts
    @_setShareURL()

  _setShareURL: ->
    if (ogtitle = $('meta[property="og:title"]')).length > 0
      title = ogtitle.attr('content')
    else
      title = $('title').text()

    if (ogurl = $('meta[property="og:url"]')).length > 0
      url = ogurl.attr('content')
    else
      url = location.href

    if @opts.type is 'twitter'
      @_setTwitterURL title, url

    else if @opts.type is 'facebook'
      @_setFacebookURL url

    else if @opts.type is 'google'
      @_setGooglePlusURL url

  _setTwitterURL: (title, url) ->
    maxLength = 140 - (url.length + 1)
    if title.length > maxLength
      title = "#{title.substr(0, (maxLength - 3))}..."
    @_url = "https://twitter.com/share?url=#{encodeURI(url)}&text=#{encodeURI(title)}"

  _setFacebookURL: (url) ->
    @_url = "https://www.facebook.com/sharer.php?u=#{url}"

  _setGooglePlusURL: (url) ->
    url = url.replace /.*?:\/\//g, ''
    @_url = "https://plus.google.com/share?url=#{url}"

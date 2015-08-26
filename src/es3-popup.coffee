"use strict"

$ = require 'jquery'

LABEL = 'popup'

DEFAULT_OPTS =
  width: 640
  height: 800
  url: null
  nameSuffix: '-popup'

module.exports =
class Popup

  @open: (el) -> new Popup(el).open()

  constructor: (@el, opts) ->
    @_configure @el, opts
    @bindClick()

  open: ->
    window.open @_url, @_name, @_param
    return this

  bindClick: ->
    @$el.on "click.#{LABEL}", (ev) =>
      ev?.preventDefault()
      @open()
    return this

  unbindClick: ->
    @$el.off "click.#{LABEL}"
    return this

  _configure: (el, opts) ->
    @opts = $.extend {}, DEFAULT_OPTS, opts
    @$el = $(el)

    if (url = @el.getAttribute('href'))?
      @_url = url
    else
      @_url = @opts.url

    @_name = "#{window.name}#{@opts.nameSuffix}"

    @_setParam()

  _setParam: ->
    if (w = @el.getAttribute('data-popup-width'))?
      width = w
    else
      width = @opts.width

    if (h = @el.getAttribute('data-popup-heigt'))?
      height = h
    else
      height = @opts.height

    x = (window.screen.width - width) / 2
    y = (window.screen.height - height) / 2

    @_param = "screenX=#{x},screenY=#{y},left=#{x},top=#{y},width=#{width},height=#{height}," +
              "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes"

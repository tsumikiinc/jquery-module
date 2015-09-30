'use strict'

$ = require 'jquery'

LABEL = 'rollover'

DEFAULT_OPTS =
  strOff: '_off'
  strOn: '_on'
  onlyChild: true
  initializationOver: false

module.exports =
class Rollover

  constructor: (@el, opts) ->
    @_configure @el, opts
    @_preload()
    @events()
    if @opts.initializationOver then @toOver()

  toOver: ->
    @$img.attr 'src', @_srcOn
    return this

  toOut: ->
    @$img.attr 'src', @_srcOff
    return this

  events: ->
    @$el.on "mouseenter.#{LABEL}", => @toOver()
    @$el.on "mouseleave.#{LABEL}", => @toOut()
    return this

  rmEvents: ->
    @$el.off "mouseenter.#{LABEL}"
    @$el.off "mouseleave.#{LABEL}"
    return this

  _preload: -> $('<img />').attr 'src', @_srcOn

  _configure: (el, opts) ->
    @$el = $(el)
    @opts = $.extend {}, DEFAULT_OPTS, opts

    if @opts.onlyChild
      @$img = @$el.children 'img'
    else
      @$img = @$el.find 'img'

    @_srcOff = @$img.attr 'src'
    @_srcOn = @_srcOff.replace @opts.strOff, @opts.strOn

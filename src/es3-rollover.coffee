"use strict"

$ = global.$

module.exports =
class Rollover

  _defaults =
    strOff: '_off'
    strOn: '_on'
    onlyChild: true
    over: false

  _preload: -> $('<img />').attr 'src', @_srcOn

  _configure: (el, opts) ->
    @$el = $(el)
    @opts = $.extend {}, _defaults, opts

    if @opts.onlyChild
      @$img = @$el.children 'img'
    else
      @$img = @$el.find 'img'

    @_srcOff = @$img.attr 'src'
    @_srcOn = @_srcOff.replace @opts.strOff, @opts.strOn

  constructor: (el, opts) ->
    @_configure el, opts
    @_preload()
    @addEvents()
    if @opts.over then @toOver()

  toOver: ->
    @$img.attr 'src', @_srcOn
    return this

  toNormal: ->
    @$img.attr 'src', @_srcOff
    return this

  addEvents: ->
    @$el.on 'mouseenter.rollover', => @toOver()
    @$el.on 'mouseleave.rollover', => @toNormal()
    return this

  rmEvents: ->
    @$el.off 'mouseenter.rollover'
    @$el.off 'mouseleave.rollover'
    return this

  destroy: -> @$el.remove()

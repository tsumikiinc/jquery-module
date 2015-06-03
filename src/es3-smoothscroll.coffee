"use strict"

$ = require 'jquery'

module.exports =
class Smoothscroll

  @addEasing: (name, func) -> $.easing[name] = func

  @canselScroll: -> _$body.stop()

  _defaults =
    speed: 700
    easingName: null
    offset: 0
    onScrollBefore: (el) ->
    onScrollAfter: (el) ->

  _$body = $('html, body')

  _configure: (el, opts) ->
    @$el = $(el)
    @opts = $.extend {}, _defaults, opts
    if @$el.attr('href') isnt '#'
      @$target = $(@$el.attr('href'))

  constructor: (@el, opts) ->
    @_configure @el, opts
    @events()

  scroll: ->
    unless @$target? then return
    @opts.onScrollBefore? @el
    val = @$target.offset().top - @opts.offset
    _$body
      .stop true, true
      .animate
        scrollTop: val
      ,
        duration: @opts.speed
        easing: @opts.easingName
      .promise()
      .done => @opts.onScrollAfter? @el
    return this

  events: ->
    @$el.on 'click.smoothscroll', @_handleClick
    return this

  unbind: ->
    @$el.off 'click.smoothScroll'
    return this

  _handleClick: (ev) =>
    ev.preventDefault()
    @scroll()

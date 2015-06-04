"use strict"

$ = require 'jquery'

LABEL = 'smoothscroll'

DEFAULT_OPTS =
  speed: 700
  easingName: 'swing'
  offset: 0
  onScrollBefore: (smoothscroll) ->
  onScrollAfter: (smoothscroll) ->
  # onCancelScroll: (smoothscroll) ->

$body = $('html, body')

module.exports =
class Smoothscroll

  @addEasing: (name, func) -> $.easing["#{name}:#{LABEL}"] = func

  @cancelScroll: -> $body.stop()

  constructor: (@el, opts) ->
    @_configure @el, opts
    @bindClick()

  scroll: ->
    unless @$targetEl? then return this

    {
      speed
      easingName
      offset
      onScrollBefore
      onScrollAfter
    } = @opts

    onScrollBefore @

    val = @$targetEl.offset().top - offset

    @onWheelCancel()

    $body
    .animate
      scrollTop: val
    ,
      duration: speed
      easing: if easingName is 'swing' then easingName else "#{easingName}:#{LABEL}"
    .promise()
    .then => onScrollAfter @
    # .fail => onCancelScroll @
    .always => @offWheelCancel()

    return this

  bindClick: ->
    @$el.on "click.#{LABEL}", @_handleClick
    return this

  unbindClick: ->
    @$el.off "click.#{LABEL}"
    return this

  onWheelCancel: ->
    $(window).on "wheel.cancel#{LABEL}", Smoothscroll.cancelScroll

  offWheelCancel: ->
    $(window).on "wheel.cancel#{LABEL}"

  _configure: (el, opts) ->
    @$el = $(el)
    @opts = $.extend {}, DEFAULT_OPTS, opts
    href = @$el.attr 'href'
    @$targetEl = $(href) if href isnt '#' and href isnt ''

  _handleClick: (ev) =>
    ev.preventDefault()
    @scroll()

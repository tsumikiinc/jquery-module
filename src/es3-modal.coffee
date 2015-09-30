'use strict'

{ EventEmitter } = require 'events'
$ = require 'jquery'

LABEL = 'modal'

DEFAULT_OPTS =
  width: 640
  height: 360
  isStylingModal: true
  bodySelector: '.js-modal-body'

$body = $('body')

modalHTML = '<div class="modal-wrapper js-modal-wrapper">
              <div class="modal-bg js-modal-bg"></div>
              <div class="modal js-modal">
                <div class="modal-inner js-modal-inner">
                  <div class="modal-close">
                    <a href="#" class="js-close-modal">x CLOSE</a>
                  </div>
                  <div class="modal-body js-modal-body">
                  </div>
                </div>
              </div>
            </div>'

anyOpend = false

module.exports =
class Modal extends EventEmitter

  @setBaseElement: (el) -> modalHTML = el

  @isAnyOpened: -> anyOpend

  constructor: (@el, opts) ->
    super()
    @_configure @el, opts
    @addOpenEvent()

  render: (el) ->
    $(@opts.bodySelector).append el
    return this

  open: ->
    if anyOpend then return this
    @_opened = anyOpend = true

    @_stylingBodyAtOpen()

    @_stylingModalAtOpen() if @opts.isStylingModal

    @addCloseEvent()

    @emit 'open', @el, this
    return this

  close: ->
    @_opened = anyOpend = false
    $('.js-modal').hide()
    $('.js-modal-wrapper').fadeOut().promise().done =>
      @_removeModalWrapper()

    @emit 'close', @el, this
    return this

  addOpenEvent: ->
    @$el.on "click.#{LABEL}:open", (ev) =>
      ev?.preventDefault?()
      @open()
    return this

  removeOpenEvent: ->
    @$el.off "click.#{LABEL}:open"
    return this

  addCloseEvent: ->
    $('.js-close-modal, .js-modal-bg').on "click.#{LABEL}:close", (ev) =>
      ev?.preventDefault?()
      @close()
    return this

  _configure: (el, opts) ->
    @$el = $(el)
    @opts = $.extend {}, DEFAULT_OPTS, opts

  _removeModalWrapper: ->
    $('.js-modal-wrapper').remove()
    @_stylingBodyDefault()

  _stylingBodyAtOpen: ->
    scrollBarWidth = @_getScrollbarWidth()
    $body
      .css 'margin-right', scrollBarWidth
      .append modalHTML
      .css 'overflow', 'hidden'

  _stylingModalAtOpen: ->
    $('.js-modal').css
      width: @opts.width
      height: @opts.height
      marginTop: -@opts.height / 2
      marginLeft: -@opts.width / 2

  _stylingBodyDefault: ->
    $body.css
      marginRight: 0
      overflow: 'visible'

  _getScrollbarWidth: ->
    div = document.createElement 'div'
    div.style.width = '100px'
    div.style.height = '100px'
    div.style.overflow = 'scroll'
    div.style.position = 'absolute'
    div.style.top = '-9999px'
    document.body.appendChild div
    scrollbarWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild div
    return scrollbarWidth

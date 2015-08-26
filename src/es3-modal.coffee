"use strict"

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
    super
    @_configure @el, opts
    @bindClick()

  render: (el) ->
    $(@opts.bodySelector).append el
    return this

  open: ->
    if anyOpend then return
    @_opened = anyOpend = true
    scrollBarWidth = @_getScrollbarWidth()
    $body
      .css 'margin-right', scrollBarWidth
      .append modalHTML
      .css 'overflow', 'hidden'

    if @opts.isStylingModal
      $('.js-modal').css
        width: @opts.width
        height: @opts.height
        marginTop: -@opts.height / 2
        marginLeft: -@opts.width / 2

    @bindCloseModal()
    @emit 'open', @el, this
    return this

  close: ->
    @_opened = anyOpend = false

    $('.js-modal').hide()

    $('.js-modal-wrapper').fadeOut().promise().done ->
      $(this).remove()
      $body.css
        marginRight: 0
        overflow: 'visible'

    @emit 'close', @el, this
    return this

  bindClick: ->
    @$el.on "click.#{LABEL}", (ev) =>
      ev?.preventDefault?()
      @open()
    return this

  unbindClick: ->
    @$el.off "click.#{LABEL}"
    return this

  bindCloseModal: ->
    $('.js-close-modal, .js-modal-bg').on 'click', (ev) =>
      ev?.preventDefault?()
      @close()
    return this

  _configure: (el, opts) ->
    @$el = $(el)
    @opts = $.extend {}, DEFAULT_OPTS, opts

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

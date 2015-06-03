import $ from 'jquery';

let _defaults = {
  speed: 700,
  easingName: null,
  offset: 0,
  onScrollBefore: (el) => {},
  onScrollAfter: (el) => {}
};

let _$body = $('html, body');

export default class Smoothscroll {

  static addEasing(name, func) {
    $.easing[name] = func;
  }

  static canselScroll() {
    _$body.stop();
  }

  constructor(el, opts) {
    this.el = el;
    this._configure(el, opts);
    this.events();
  }

  scroll() {
    if (!this.$target) {
      return this;
    }

    this.opts.onScrollBefore(this.el);

    let val = this.$target.offset().top - this.opts.offset;

    _$body
    .stop(true, true)
    .animate({
      scrollTop: val
    }, {
      duration: this.opts.speed,
      easing: this.opts.easingName
    })
    .promise()
    .done(() => {
      this.opts.onScrollAfter(this.el);
    });

    return this;
  }

  events() {
    this.$el.on('click.smoothscroll', this._handleClick.bind(this));
    return this;
  }

  unbind() {
    this.$el.off('click.smoothScroll');
    return this;
  }

  _configure(el, opts) {
    this.$el = $(el);
    this.opts = $.extend({}, _defaults, opts);
    if (this.$el.attr('href') !== '#') {
      this.$target = $(this.$el.attr('href'));
    }
  }

  _handleClick(ev) {
    ev.preventDefault();
    this.scroll();
  }

}


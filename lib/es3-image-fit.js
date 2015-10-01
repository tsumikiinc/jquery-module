'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var $window = (0, _jquery2['default'])(window);

module.exports = (function () {

  function Imagefit(el) {
    this._configure(el);
  }

  Imagefit.prototype._configure = function (el) {
    this.$el = (0, _jquery2['default'])(el);
    this.option = _jquery2['default'].extend({
      aspectRatio: 9 / 16
    });
    this.init();
  };

  Imagefit.prototype.init = function () {
    this.$el.css({
      position: 'absolute',
      top: '50%',
      left: '50%'
    });
    this.load();
    this.resize();
  };

  Imagefit.prototype.load = function () {
    this._loadWindow();
  };

  Imagefit.prototype.resize = function () {
    this._resizeWindow();
  };

  Imagefit.prototype._fit = function (el) {
    var containerWidth = $window.width();
    var containerHeight = $window.height();
    var currentAspectRatio = containerHeight / containerWidth;
    var width;
    var height;
    var marginTop;
    var marginLeft;

    if (this.option.aspectRatio > currentAspectRatio) {
      width = containerWidth;
    } else {
      width = containerHeight / this.option.aspectRatio;
    }
    height = width * this.option.aspectRatio;

    marginTop = -(height / 2);
    marginLeft = -(width / 2);

    el.css({
      width: width,
      height: height,
      marginTop: marginTop,
      marginLeft: marginLeft
    });
    return this;
  };

  Imagefit.prototype._loadWindow = function () {
    var _this = this;
    (0, _jquery2['default'])(document).ready(function () {
      _this._fit(_this.$el);
    });
  };

  Imagefit.prototype._resizeWindow = function () {
    var _this = this;
    $window.on('resize.fit', function () {
      _this._fit(_this.$el);
    });
    return this;
  };

  return Imagefit;
})();
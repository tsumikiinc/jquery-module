# utiljs

[![Build Status][travis-image]][travis-url]

TSUMIKI INC. JavaScript utilities.

## インストール

npm でインストールします。（現状、npmレジストリへは公開していません）

```
npm install tsumikiinc/utiljs -S
```

## 利用方法

基本的には、 Browserify や webpack を利用し、 CommonJS の require スタイルで利用します。

利用例：

```js
var Smoothscroll = require('utiljs').Smoothscroll;
```

上記モジュールローダーが利用不可の場合は、 `<script>` で `build/util.js` を読み込みます。

`window.Util` から利用します。

```html
<script src="build/utiljs.js"></script>
<script>
  new window.Util.Smoothscroll(element);
</script>
```

### IE8 以下もサポートの場合

`es3` 以下の同名モジュールを利用します。

```js
var Smoothscroll = require('utiljs').es3.Smoothscroll;
```

```html
<script src="build/utiljs.js"></script>
<script>
  new window.Util.es3.Smoothscroll(element);
</script>
```


## モジュール追加の追加

**要編集**

* `./src/` に追加
* ES3対応の場合は、ファイル名に `es3-` プレフィックスをつける (`es3-name.js`)
* `./index.js` に以下の書式で追記する

```
module.exports = {
  Smoothscroll: require('./lib/smoothscroll'),
  example: require('./lib/example'),
  es3: {
    Smoothscroll: require('./lib/es3-smoothscroll'),
    Rollover: require('./lib/es3-rollover'),
  }
};
```

* なるべくテストも書く `./test/` `npm test`
* `npm run build` でビルド

## License

MIT

© TSUMIKI INC

[npm-image]: http://img.shields.io/npm/v/utiljs.svg
[npm-url]: https://www.npmjs.org/package/utiljs
[bower-image]: http://img.shields.io/bower/v/utiljs.svg
[bower-url]: http://bower.io/search/?q=utiljs
[travis-image]: http://img.shields.io/travis/tsumikiinc/utiljs/master.svg?branch=master
[travis-url]: https://travis-ci.org/tsumikiinc/utiljs
[gratipay-image]: http://img.shields.io/gratipay/tsumikiinc.svg
[gratipay-url]: https://gratipay.com/tsumikiinc/
[coveralls-image]: https://coveralls.io/repos/tsumikiinc/utiljs/badge.svg
[coveralls-url]: https://coveralls.io/r/tsumikiinc/utiljs
[github-ver-image]: https://badge.fury.io/gh/tsumikiinc%2Futiljs.svg
[github-ver-url]: http://badge.fury.io/gh/tsumikiinc%2Futiljs
[downloads-image]: http://img.shields.io/npm/dm/utiljs.svg
[dependencies-image]: http://img.shields.io/david/tsumikiinc/utiljs.svg

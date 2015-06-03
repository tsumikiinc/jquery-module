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
var Smoothscroll = require('utiljs/lib/smoothscroll');
```

上記モジュールローダーが利用不可の場合は、 `<script>` で `build/util.js` を読み込み、

`window.Util` 配下から利用します。

```html
<script src="build/utiljs.js"></script>
<script>
  new window.Util.Smoothscroll(element);
</script>
```

### IE8 以下もサポートの場合

`.es3` 以下の同名モジュールを利用します。

```js
var Smoothscroll = require('utiljs').es3.Smoothscroll;
```

もしくは `es3-` プレフィックスつきを require します。

```js
var Smoothscroll = require('utiljs/lib/es3-smoothscroll');
```

`build/utiljs.js` の場合は以下のように利用します。

```html
<script src="build/utiljs.js"></script>
<script>
  new window.Util.es3.Smoothscroll(element);
</script>
```

## モジュール追加方法

**※要ドキュメント化 Wikiに移行検討**

### ソースファイル作成

`./src` 以下にファイルを追加します。 `./src/my-module.js`

基本的には、ある程度まとまった機能毎に 1 ファイルにしましょう。

下記を参考に、なるべく ES6(ES2015) で書きましょう。

* http://babeljs.io/docs/learn-es2015/
* https://github.com/lukehoban/es6features

[Babel](http://babeljs.io/) で ES5 にトランスパイルするので、モダンブラウザと IE9 以上が対象となります。

IE8 以下もサポートの場合は、ファイル名に `es3-` プレフィックスをつけ、 (`es3-my-module.js`) ES3 で普通に書くか、 CoffeeScript などで書きます。

### `./index.js` に追記

`./index.js` に以下の書式で追記します。

```js
module.exports = {
  Smoothscroll: require('./lib/smoothscroll'),
  example: require('./lib/example'),
  es3: {
    Smoothscroll: require('./lib/es3-smoothscroll'),
    Rollover: require('./lib/es3-rollover'),
  }
};
```

### ビルド

`npm run build` コマンドで、ビルドします。

以下のタスクが順に実行されます。

* ES6, CoffeeScript の構文チェック
* ES6, CoffeeScript のコンパイル
* `$ = require 'jquery'` を `$ = global.$` にリプレイス（理由は後述）
* Browserify の standalone オプションで `<script>` 用のファイル生成
* `<script>` 用のファイルのミニファイ
* 上記リプレイスを戻す

### なるべくテストも書く

`./test` 以下に、対象のテストファイルを `.spec` サフィックスをつけて追加します。

`npm test` コマンドでテストが走ります。

現状で利用しているテストツールは以下です。

* [mocha](https://github.com/mochajs/mocha) テストフレームワーク
* [jsdom](https://github.com/tmpvar/jsdom) DOMシミュレータ
* [power-assert](https://github.com/power-assert-js/power-assert) アサーションライブラリ

できる範囲でテストも書いておくと楽かと思います。

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

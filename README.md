# jquery-module

[![Build Status][travis-image]][travis-url]

TSUMIKI INC. jQuery modules

## インストール

npm でインストールします。

```
npm install jquery-module -S
```

## 利用方法

基本的には、 Browserify や webpack などのモジュールローダーを利用します。

利用例：

```js
import Smoothscroll from 'jquery-module/lib/smoothscroll';
```

上記モジュールローダーが利用不可の場合は、以下のファイルを `<script>` で読み込み、 `window.$Module` 配下から利用します。

* [jquery-module.js](https://raw.githubusercontent.com/tsumikiinc/jquery-module/master/build/jquery-module.js)
* [jquery-module.min.js](https://raw.githubusercontent.com/tsumikiinc/jquery-module/master/build/jquery-module.min.js)

```html
<script src="jquery.js"></script>
<script src="jquery-module.js"></script>
<script>
  new $Module.Smoothscroll(element);
</script>
```

### IE8 以下もサポートの場合

```js
var Smoothscroll = require('jquery-module/lib/es3-smoothscroll');
```

もしくは `es3` 配下から利用します。

```js
var Smoothscroll = require('jquery-module').es3.Smoothscroll;
```

`build/jquery-module.js` の場合は以下のように利用します。

```html
<script src="jquery.js"></script>
<script src="jquery-module.js"></script>
<script>
  new $Module.es3.Smoothscroll(element);
</script>
```

## モジュール追加方法

**※要ドキュメント化 Wikiに移行検討**

### ソースファイル作成

`./src` 以下にファイルを追加します。 `./src/my-module.js`

基本的には、ある程度まとまった機能毎に 1 ファイルにしましょう。

下記を参考に、なるべく ES6 (ES2015) で書きましょう。

* http://babeljs.io/docs/learn-es2015/
* https://github.com/lukehoban/es6features

[Babel](http://babeljs.io/) で ES5 にトランスパイルするので、モダンブラウザと IE9 以上が対象となります。

IE8 以下もサポートするモジュールを作成する場合は、ファイル名に `es3-` プレフィックスをつけ、 (`es3-my-module.js`) ES3 で普通に書くか、 CoffeeScript などで書きます。

### `./index.js` に追記

`./index.js` に以下の書式で追記します。

```js
module.exports = {
  Smoothscroll: require('./lib/smoothscroll'),
  example: require('./lib/example'),
  es3: {
    Smoothscroll: require('./lib/es3-smoothscroll'),
    Rollover: require('./lib/es3-rollover')
  }
};
```

### ビルド

`npm run build` コマンドで、ビルドします。

以下のタスクが順に実行されます。

* ES6, CoffeeScript の構文チェック
* ES6, CoffeeScript のコンパイル
* `$ = require 'jquery'` を `$ = global.$` に置換（理由は後述）
* Browserify の standalone オプションで `<script>` 用のファイル生成
* `<script>` 用ファイルのミニファイ
* 上記置換を戻す

### なるべくテストも書く

`./test` 以下に、対象のテストファイルを `.spec` サフィックスをつけて追加します。

`npm test` でテストが走ります。

現状で利用しているテストツールは以下です。

* [mocha](https://github.com/mochajs/mocha) テストフレームワーク
* [jsdom](https://github.com/tmpvar/jsdom) DOMシミュレータ
* [power-assert](https://github.com/power-assert-js/power-assert) アサーションライブラリ

できる範囲でテストも書いておくと楽かと思います。

### ビルド時の `$ = require 'jquery'` 置換について

Browserify で `<script>` 用のファイルを生成した場合（standalone）、依存モジュールも全てまとめたものを生成してくれます。（`jquery-module.js`）

jQuery などのわりと大きなライブラリに依存したモジュールだと生成されたファイルのサイズが大きくなります。

また、 jQuery に依存したモジュールを利用するプロジェクトは、メインで書くファイルのほうでも jQuery で書く場合が多いかと思います。

以上の理由から、 `jquery-module.js` を利用する場合は、大きなサイズのライブラリは別で読み込む前提の仕様にするため、 グローバルに生やしたもの（`$ = global.$`）を利用するようにしてあります。

jQuery の例だと以下です。

```html
<script src="jquery.js"></script>
<script src="jquery-module.js"></script>
```

## License

MIT

© TSUMIKI INC

[npm-image]: http://img.shields.io/npm/v/jquery-module.svg
[npm-url]: https://www.npmjs.org/package/jquery-module
[bower-image]: http://img.shields.io/bower/v/jquery-module.svg
[bower-url]: http://bower.io/search/?q=jquery-module
[travis-image]: http://img.shields.io/travis/tsumikiinc/jquery-module/master.svg?branch=master
[travis-url]: https://travis-ci.org/tsumikiinc/jquery-module
[gratipay-image]: http://img.shields.io/gratipay/tsumikiinc.svg
[gratipay-url]: https://gratipay.com/tsumikiinc/
[coveralls-image]: https://coveralls.io/repos/tsumikiinc/jquery-module/badge.svg
[coveralls-url]: https://coveralls.io/r/tsumikiinc/jquery-module
[github-ver-image]: https://badge.fury.io/gh/tsumikiinc%2Fjquery-module.svg
[github-ver-url]: http://badge.fury.io/gh/tsumikiinc%2Fjquery-module
[downloads-image]: http://img.shields.io/npm/dm/jquery-module.svg
[dependencies-image]: http://img.shields.io/david/tsumikiinc/jquery-module.svg

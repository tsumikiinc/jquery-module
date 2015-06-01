import assert from 'power-assert';
import { jsdom } from 'jsdom';
global.document = jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

var $ = require('jquery');
global.$ = $;

var Rollover = require('../lib/es3-rollover');

describe('ES3 Rollover', () => {
  it('constructor()', () => {
    let a = document.createElement('a');
    let img = document.createElement('img');

    a.setAttribute('href', '#test');
    a.className = 'el';
    img.src = 'http://placehold.it/350x150';

    document.body.appendChild(a);
    a.appendChild(img);

    let s = new Rollover($('.el')[0]);

    assert(s);

  });
});

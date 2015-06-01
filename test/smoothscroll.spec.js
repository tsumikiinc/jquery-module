import assert from 'power-assert';
import { jsdom } from 'jsdom';
global.document = jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

var $ = require('jquery');
global.$ = $;

var Smoothscroll = require('../lib/smoothscroll');

describe('Smoothscroll', () => {
  it('constructor()', () => {
    let div = document.createElement('div');
    let a = document.createElement('a');
    div.id = 'test';
    a.setAttribute('href', '#test');
    a.className = 'el'
    document.body.appendChild(a);
    document.body.appendChild(div);

    let s = new Smoothscroll($('.el')[0]);
    assert(s);
  });
});

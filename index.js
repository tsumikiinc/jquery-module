"use strict";

module.exports = {
  Smoothscroll: require('./lib/smoothscroll'),
  Popup: require('./lib/popup'),
  ShareSNS: require('./lib/share-sns'),
  example: require('./lib/example'),
  es3: {
    Smoothscroll: require('./lib/es3-smoothscroll'),
    Rollover: require('./lib/es3-rollover'),
    Popup: require('./lib/es3-popup'),
    Modal: require('./lib/es3-modal')
  }
};

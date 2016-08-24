'use strict';

function Plugins() {
  this.pluginsManager = require('electron').remote.app.pluginsManager;
}

Plugins.prototype.load = function() {
  this.pluginsManager.getPlugins()
    .filter(p => p.style)
    .forEach(p => loadStyleSync(p.style));

  this.pluginsManager.getPlugins()
    .filter(p => p.script)
    .forEach(p => loadScriptSync(p.script));

  return this;
};

function loadStyleSync(href) {
  var s = document.createElement('link');
  s.href = href;
  s.rel = 'stylesheet';
  s.async = false;
  document.head.appendChild(s);
}

function loadScriptSync(src) {
  var s = document.createElement('script');
  s.src = src;
  s.type = 'text/javascript';
  s.async = false;
  document.body.appendChild(s);
}

module.exports = Plugins;
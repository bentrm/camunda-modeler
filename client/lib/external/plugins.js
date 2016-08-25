'use strict';

var remote = require('electron').remote;

/**
 * Provides access to externally loaded bundles for different app
 * integration layers.
 */
function Plugins() {
  this.pluginsManager = remote.app.pluginsManager;

  this.pluginsManager.getPlugins()
    .filter(p => p.style)
    .forEach(p => loadStyleSync(p.style));

  this.pluginsManager.getPlugins()
    .filter(p => p.script)
    .forEach(p => loadScriptSync(p.script));
}

/**
 * Returns all loaded plugins.
 *
 * @return {Array}
 */
Plugins.prototype.getAll = function() {
  var plugins = window.plugins || [];
  return plugins.slice(0);
};

/**
 * Gets an array of plugins of given type or an empty array.
 *
 * @param  {String} type
 * @return {Array}
 */
Plugins.prototype.get = function(type) {
  if (!type) {
    throw new Error('Plugin type is not provided!');
  }

  return this.getAll()
      .filter(p => p.type === type)
      .map(p => p.module);
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
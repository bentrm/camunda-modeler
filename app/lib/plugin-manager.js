'use strict';

var path = require('path'),
    glob = require('glob');

function PluginsManager(options = {}) {
  this.options = options;

  this.plugins = findPlugins(options.path)
    .map(p => {
      let descriptor = require(p);
      let pluginPath = path.dirname(p);

      let plugin = {};

      if (descriptor.style) {
        plugin.style = path.join(pluginPath, descriptor.style);
      }

      if (descriptor.script) {
        plugin.script = path.join(pluginPath, descriptor.script);
      }

      return plugin;
    });
}

PluginsManager.prototype.getPlugins = function() {
  return this.plugins;
};

function findPlugins(path) {

  var globOptions = {
    cwd: path,
    nodir: true,
    realpath: true
  };

  return glob.sync('**/camunda-modeler.js', globOptions);
}

module.exports = PluginsManager;
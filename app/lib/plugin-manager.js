'use strict';

var path = require('path'),
    glob = require('glob');


function PluginsManager(options = {}) {
  this.options = options;

  console.log('--> PluginsManager');

  this.plugins = findPlugins(options.path)
    .map(p => {
      let descriptor = require(p);

      let plugin = {};

      if (descriptor.style) {
        plugin.style = path.join(path.dirname(p), descriptor.style);
      }

      return plugin;
    });

  console.log(this.plugins);

  console.log('--> PluginsManager');
}

PluginsManager.prototype.getPlugins = function() {
  return this.plugins;
};

PluginsManager.prototype.getStyles = function() {
  return this.plugins
    .filter(p => p.style)
    .map(p => {
      return '<link rel="stylesheet" href="' + p.style + '" />';
    });
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
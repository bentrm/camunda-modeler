'use strict';

var notifier = require('node-notifier');
var http = require('http');
var path = require('path');

setInterval(() => {
  requestRandomWord((word) => {
    notifier.notify({
      title: 'I am soooo annoying!',
      message: word,
      icon: path.join(__dirname, 'tasmanian-devil.jpg'),
      sound: 'Purr'
    });
  });
}, 1000 + 20000 * Math.random());


function requestRandomWord(callback) {
  return http.get({
    host: 'www.setgetgo.com',
    path: '/randomword/get.php'
  }, function(response) {
    // Continuously update stream with data
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      callback(body);
    });
  });

}
module.exports = {};
'use strict';

var server = require('./server.js'),
    port = process.argv[2],
    CONTENT_DIR = 'src/server/content';

var homePage = CONTENT_DIR + '/homepage.html',
    notFoundPage = CONTENT_DIR + '/404.html';

server.start(homePage, notFoundPage, port, function () {
  console.log('Server started');
});
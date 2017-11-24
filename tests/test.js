var critical = require('../index.js');

var settings = {
  local: false, //exernal
  dest: 'dest/',
  minify: true,
  extract: true,
  timeout: 60000,
  ignore: [
    '@font-face',
    /url\(/,
    /print/,
    /animation/g,
    /interpolation/g,
    /-webkit/g,
    /-moz/g,
    /-ms/g,
    /speak/g,
    /list-style-image/g,
    /list-style-type/g
  ],
  ignoreOptions: {
    matchSelectors: true,
    matchTypes: true,
    matchDeclarationProperties: true,
    matchDeclarationValues: true,
    matchMedia: true
  },
  dimensions: [{
    height: 200,
    width: 500
  }, {
    height: 900,
    width: 1200
  }]
};


var pages = require('./critical.json');
critical.generate(settings, pages);

var pages = {
  base: 'http://example.com',
  pages: [
    {
      path: '/',
      filename: 'home'
    },
    {
      path: '/demopage',
      filename: 'Demopage'
    }
  ]
};
critical.generate(settings, pages);

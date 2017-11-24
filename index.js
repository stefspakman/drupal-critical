var criticalcss = require('critical'),
    _ = require('lodash'),
    bs = require("browser-sync").create(),
    log = require('fancy-log'),
    chalk = require('chalk');

exports.generate = function(settings, pages) {
  if (pages.pages[0].path === undefined || pages.pages[0].filename === undefined){
    log.error(chalk.red('Attention: This module has been updated, please update the keys inside your pages object'))
  }
  var port = 3011;
  if (settings.local) {
    log.info('Using local url');

    bs.init({
      open: false,
      ghostMode: false,
      port: port,
      proxy: 'localhost',
      notify: false,
      logLevel: "silent",
      ui: false,
      localOnly: true
    }, function(err, bs) {
      port = (bs.server._connectionKey).substr((bs.server._connectionKey).length - 4);
      if (err){
        log.error(chalk.red(err));
      }
      processPages(pages, settings);
    });
  } else {
    processPages(pages, settings);
  }

  function processPages(pages, settings) {
    var count = pages.pages.length;
    pages.pages.forEach(function(page) {
      var baseURL = pages.base;
      if (settings.local){
        baseURL = 'http://127.0.0.1:' + port
      }

      var pageSettings = mergeSettings(baseURL, page, settings);
      var criticalCss = generateCritical(pageSettings);
      criticalCss
        .then(function (response) {
          if (settings.local){
            count = stopBs(count);
          }
        })
        .catch(function (error) {
          log.error(chalk.red(pageSettings.src));
          log.error(chalk.red(error.message));
          if (settings.local){
            count = stopBs(count);
          }
        });
    })
  }



  function stopBs(count) {
    var newCount = count -1;
    if (newCount === 0) {
      bs.exit();
    }
    return newCount;
  }

  return
}

function generateCritical(settings) {
  corePromise = criticalcss.generate(settings).then(function (result) {
    log.info(chalk.green('Generating Critical CSS for: ' + settings.src));
    return result
  });
  return corePromise;
}

function mergeSettings(baseUrl, page, base) {
  var keys = [
    "folder",
    "css",
    "width",
    "height",
    "dimensions",
    "minify",
    "extract",
    "inlineImages",
    "assetPaths",
    "maxImageFileSize",
    "timeout",
    "pathPrefix",
    "include",
    "ignore",
    "ignoreOptions",
    "penthouse"
  ];
  var dest = base.dest + page.filename;
  if ( (page.filename).endsWith(".css")){
    dest = base.dest + 'critical-' + (page.filename).toLowerCase() + '.css'
  }
  var pageSettings = {
    src: baseUrl + page.path,
    dest: dest
  };
  var base = _.pick(base, keys);
  base['inline'] = false
  var settings = _.merge(pageSettings, base);
  return settings
}


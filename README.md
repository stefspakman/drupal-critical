# Drupal Critical [![NPM version][npm-image]][npm-url] [![dependencies Status][depstat-image]][depstat-url] [![devDependencies Status Status][devdepstat-image]][devdepstat-url]

Automated generation of Critical CSS for Drupal sites. 

*Note* Drupal module will be released shortly, in the meantime you can use this by manually configuring which pages to proces (see example below)

![](https://i.imgur.com/gaXnp02.png)

## Install

```
$ npm install --save critical
```

## Usage

Example:

```js
var critical = require('drupalcritical');

var settings = {
    inline: false,
    local: true,
    dest: 'dest/',
    extract: true,
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
```

Critical.json
```json
{
  "base": "http://www.google.nl",
  "pages": [
    {
      "url": "/",
      "name": "home"
    },
    {
      "url": "/services",
      "name": "services"
    }
  ]
}
```

### Options
*note:* Not all [critical](https://www.npmjs.com/package/critical) options are available, the list below includes all options

| Name             | Type               | Default | Description   |
| ---------------- | ------------------ | ------------- |------------- |
| css              | `array`            | `[]` | An array of paths to css files, or an array of [Vinyl](https://www.npmjs.com/package/vinyl) file objects.
| dest             | `string`           | `./` | Location of where to save the output of an operation (will be relative to base if no absolute path is set) |  
| local            | `string`           | `false` | Use local (development) url to generate Critical CSS, if false it uses the given base |  
| width            | `integer`          | `900`  | Width of the target viewport |
| height           | `integer`          | `1300` | Height of the target viewport |
| dimensions       | `array`            | `[]` | An array of objects containing height and width. Takes precedence over `width` and `height` if set
| minify           | `boolean`          | `false` | Enable minification of generated critical-path CSS |
| extract          | `boolean`          | `false` | Remove the inlined styles from any stylesheets referenced in the HTML. It generates new references based on extracted content so it's safe to use for multiple HTML files referencing the same stylesheet. Use with caution. Removing the critical CSS per page results in a unique async loaded CSS file for every page. Meaning you can't rely on cache across multiple pages |
| inlineImages     | `boolean`          | `false` | Inline images
| assetPaths       | `array`            | `[]` | List of directories/urls where the inliner should start looking for assets
| maxImageFileSize | `integer`          | `10240`| Sets a max file size (in bytes) for base64 inlined images
| timeout          | `integer`          | `30000`| Sets a maximum timeout for the operation
| pathPrefix       | `string`           | `/` | Path to prepend CSS assets with. You *must* make this path absolute if you are going to be using critical in multiple target files in disparate directory depths. (eg. targeting both `/index.html` and `/admin/index.html` would require this path to start with `/` or it wouldn't work.)
| include          | `array`            | `[]` | Force include CSS rules. See [`penthouse#usage`](https://github.com/pocketjoso/penthouse#usage-1).
| ignore           | `array`            | `[]` | Ignore CSS rules. See [`filter-css`](https://github.com/bezoerb/filter-css) for usage examples.
| ignoreOptions    | `object`           | `{}` | Ignore options. See [`filter-css#options`](https://github.com/bezoerb/filter-css#options).
| penthouse        | `object`           | `{}` | Configuration options for [`penthouse`](https://github.com/pocketjoso/penthouse).




[npm-url]: https://www.npmjs.com/package/drupalcritical
[npm-image]: https://img.shields.io/npm/v/drupalcritical.svg


[depstat-url]: https://david-dm.org/addyosmani/critical
[depstat-image]: https://david-dm.org/addyosmani/critical/status.svg

[devdepstat-url]: https://david-dm.org/addyosmani/critical?type=dev
[devdepstat-image]: https://david-dm.org/addyosmani/critical/dev-status.svg

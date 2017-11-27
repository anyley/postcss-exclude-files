'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _multimatch = require('multimatch');

var _multimatch2 = _interopRequireDefault(_multimatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = function error() {
  throw new TypeError('The postcssPlugin parameter must be function! or Array');
};

var postcssExcludeFiles = _postcss2.default.plugin('postcss-exclude-files', function (_ref) {
  var filter = _ref.filter,
      plugins = _ref.plugins;
  return function (root, result) {
    if (typeof filter !== 'string' && !Array.isArray(filter)) {
      throw new TypeError('The filter parameter must be a glob string or an array of glob strings!');
    }

    if ((0, _multimatch2.default)(root.source.input.file, filter).length === 0) {
      if (typeof plugins === 'function') {
        return (0, _postcss2.default)([plugins]).process(root).then(function (response) {
          return response.messages.forEach(function (msg) {
            return result.messages.push(msg);
          });
        });
      } else if (Array.isArray(plugins) || (typeof plugins === 'undefined' ? 'undefined' : _typeof(plugins)) === 'object') {
        return (0, _postcss2.default)(plugins).process(root).then(function (response) {
          return response.messages.forEach(function (msg) {
            return result.messages.push(msg);
          });
        });
      } else {
        error();
      }
    }

    result.messages.push({
      type: 'warning',
      text: 'File "' + root.source.input.file + '" excluded',
      plugin: 'postcss-exclude-files'
    });
  };
});

postcssExcludeFiles.process = function (css, opts) {
  opts = opts || { filter: '**/node_modules/**', plugins: [] };
  var processor = (0, _postcss2.default)([postcssExcludeFiles(opts)]);
  return processor.process(css, opts);
};

module.exports = postcssExcludeFiles;
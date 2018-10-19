"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postcss = _interopRequireDefault(require("postcss"));

var _multimatch = _interopRequireDefault(require("multimatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ERROR_PLUGIN_TYPE = 'The plugins parameter must be function or object or Array';
var ERROR_FILTER_ERROR = 'The filter parameter must be a glob string or an array of glob strings';

var getValueType = function getValueType(value) {
  var type = _typeof(value);

  if (type === 'object' && Array.isArray(value)) {
    type = 'array';
  }

  return {
    oneOf: function oneOf() {
      for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
        types[_key] = arguments[_key];
      }

      return types.includes(type);
    },
    is: function is(valType) {
      return valType === type;
    }
  };
};

var _default = _postcss.default.plugin('postcss-exclude-files', function (opts) {
  var filter = opts.filter,
      plugins = opts.plugins;

  if (!getValueType(filter).oneOf('string', 'array')) {
    throw new TypeError(ERROR_FILTER_ERROR);
  }

  var pluginType = getValueType(plugins);

  if (!plugins || !pluginType.oneOf('function', 'object', 'array')) {
    throw new TypeError(ERROR_PLUGIN_TYPE);
  }

  return function (root, result) {
    var path = root.source.input.file;

    if ((0, _multimatch.default)(path, filter).length === 0) {
      var handler = function handler(response) {
        return response.messages.forEach(function (msg) {
          return result.messages.push(msg);
        });
      };

      return (0, _postcss.default)(pluginType.is('function') ? [plugins] : plugins).process(root).then(handler);
    }
  };
});

exports.default = _default;
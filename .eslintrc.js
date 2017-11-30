module.exports = {
  globals: {
    '__dirname': true,
    'process': true
  },
  'env': {
    browser: false,
    commonjs: true,
    node: true,
    jest: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  plugins: [
    'import'
  ],
  rules: {
    'eqeqeq': 'error',
    'import/no-unresolved': [2, {'commonjs': true, 'amd': true}],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'indent': [
      'error',
      2,
      {
        'VariableDeclarator': 1,
        'outerIIFEBody': 1,
        'SwitchCase': 1,
        'flatTernaryExpressions': true,
        'ObjectExpression': 1,
        'ignoredNodes': ['MemberExpression', 'CallExpression', 'JSXElement', 'JSXElement *'],
        'FunctionDeclaration': {
          'parameters': 1,
          'body': 1
        },
        'FunctionExpression': {
          'parameters': 1,
          'body': 1
        },
        'CallExpression': {
          'arguments': 1
        },
        'ArrayExpression': 1
      }
    ],
    'newline-per-chained-call': [
      'error',
      {
        'ignoreChainWithDepth': 8
      }
    ],
    'no-whitespace-before-property': 'error',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'object-curly-spacing': [
      2,
      'always'
    ],
    'no-unused-vars': 1,
    'no-console': 1
  }
}

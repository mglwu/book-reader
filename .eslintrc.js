module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'off',
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'eol-last': 'off',
    camelcase: 'off',
    quotes: [1, 'single']
  },
};
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // 4 space indent
    'indent': ["error", 4],
    // use semi colons
    'semi': [2, "always"],
    // return from assignments return, e.g. return a = a + 2
    "no-return-assign": "off",
    // spaces are for fools
    "space-before-function-paren": ["error", "never"],
    //if() { ... }
    "keyword-spacing": ["error", {
      "after": false,
      "overrides": {
        "const": { "after": true, "before": true },
        "return": { "after": true, "before": true },
        "from": { "after": true, "before": true }
      }
    }],
    // empty lines
    "no-multiple-empty-lines": [2, {"max": 3, "maxEOF": 1}],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};

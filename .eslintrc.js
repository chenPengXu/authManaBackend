module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off', //process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 'off', //process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "comma-dangle": 0, //[2, "never"], // 对象字面量项尾不能有逗号
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "space-before-function-paren": [2, {"anonymous": "never", "named": "never"}], //函数定义时括号前的空格
    "dot-notation": ["off", {"allowKeywords": true, "allowPattern": ""}], //获取对象属性的时候使用点号
  }
}

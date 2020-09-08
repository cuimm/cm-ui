module.exports = {
  // env环境变量：每个环境都有自己预定义的全局变量，可以同时指定多个环境，不矛盾。
  // 指定一组环境变量就相当于引入了该环境下的一组全局变量。
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // ESLint支持使用第三方插件，在使用插件之前，必须使用npm安装它。
  // plugin与extend的区别：extend提供的是eslint现有规则的一系列预设
  // 而plugin则提供了除预设之外的自定义规则，当你在eslint的规则里找不到合适的的时候就可以借用插件来实现
  // 插件名称可以省略eslint-plugin-前缀：如引入插件es则代表是eslint-plugin-es
  plugins: [],
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  // 指定环境为我们提供了预置的全局变量，对于那些我们自定义的全局变量，可以用globals指定。
  // 设置每个变量等于true允许变量被重写，或false不允许被重写
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  // 具体规则配置
  // off / 0：关闭规则
  // warn / 1：开启规则，警告级别(不会导致程序退出)
  // error / 2：开启规则，错误级别(当被触发的时候，程序会退出)
  rules: {
    'no-undefined': 2,
    'prefer-const': 2,
    camelcase: 2,
    quotes: ['error', 'single'],
    'vue/this-in-template': 2,
    'vue/require-prop-types': 0,
    'vue/require-default-prop': 0,
    'vue/no-v-html': 0,
    // Only allow debugger in development
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Only allow `console.log` in development
    'no-console': 0, // ['error', { allow: ['warn', 'error'] }],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/singleline-html-element-content-newline': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/script-indent': ['error', 2, { baseIndent: 0, switchCase: 1 }],
    'vue/component-name-in-template-casing': 'off',
    'vue/html-self-closing': 'off',
  }
};

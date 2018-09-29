// module.exports = {
//     root: true,
//     env: {
//         node: true
//     },
//     // extends: ["plugin:vue/essential", "@vue/prettier"],
//     "extends": [
//         "plugin:vue/essential",
//         "plugin:prettier/recommended",
//         "eslint:recommended"
//     ],
//     rules: {
//         "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
//         "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
//         // allow paren-less arrow functions
//         'arrow-parens': 0,
//         // allow async-await
//         'generator-star-spacing': 0,
//         "prettier/prettier": ["error", {
//             "semi": false,
//             "singleQuote": true,
//             "trailingComma": "all",
//             "bracketSpacing": true,
//             "jsxBracketSameLine": true,
//             "requirePragma": false,
//             "parser": "flow"
//         }
//         ],
//         // 一个函数的复杂性不超过 10，所有分支、循环、回调加在一起，在一个函数里不超过 10 个
//         "complexity": [2, 10],
//         // 一个函数的嵌套不能超过 4 层，多个 for 循环，深层的 if-else，这些都是罪恶之源
//         "max-depth": [2, 4],
//         // 一个函数最多有 3 层 callback，使用 async/await
//         "max-nested-callbacks": [2, 3],
//         // 一个函数最多 5 个参数。参数太多的函数，意味着函数功能过于复杂，请拆分
//         "max-params": [2, 5],
//         // 一个函数最多有 50 行代码，如果超过了，请拆分之，或者精简之
//         "max-statements": [2, 50],
//         // 坚定的 semicolon-less 拥护者
//         "semi": [2, "never"],
//     },
//     parserOptions: {
//         parser: "babel-eslint",
//         //设置"script"（默认）或"module"如果你的代码是在ECMAScript中的模块。
//         sourceType: "module"
//     }
// };

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-useless-escape": 0,
    "no-multiple-empty-lines": [
      2,
      {
        max: 3
      }
    ],
    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        useTabs: true,
        singleQuote: true,
        semi: false,
        trailingComma: "none",
        bracketSpacing: true,
        jsxBracketSameLine: true,
        insertPragma: true,
        requirePragma: false
      }
    ],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: [2, "never"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
}

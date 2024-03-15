module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: "latest",
    sourceType: "module",
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react", "@babel"],
  rules: {
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/state-in-constructor": [2, "never"],
    "class-methods-use-this": [2, { exceptMethods: ["filteredTasks"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

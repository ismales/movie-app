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
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/prefer-stateless-function": 0,
    "react/state-in-constructor": [2, "never"],
    "class-methods-use-this": [0],
    "react/prop-types": "off",
    "no-plusplus": 0,
    "prefer-rest-params": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

module.exports = {
  extends: "airbnb",
  rules: {
    "react/jsx-filename-extension": 0,
    "react/destructuring-assignment": 0,
    "react/prop-types": 0,
    "object-curly-newline": 0,
    "no-undef": 0,
    "arrow-parens": 0,
    quotes: 0,
    "operator-linebreak": 0,
    "comma-dangle": 0,
    "no-use-before-define": 0,
    "no-param-reassign": 0,
    "no-console": 0,
  },
  globals: {
    document: 1,
  },
  parser: "babel-eslint",
  env: {
    es6: true,
    browser: 1,
  },
};

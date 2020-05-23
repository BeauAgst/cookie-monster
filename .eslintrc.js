module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
        bracketSpacing: true,
      },
    ],
  },
}

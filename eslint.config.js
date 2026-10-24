// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: ['dist/*', 'backend/node_modules/*'],
  },
  {
    rules: {
      // Erros e avisos continuam permitidos para diagnóstico; logs de debug não
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
]);

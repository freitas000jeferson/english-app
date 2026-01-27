import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import css from '@eslint/css';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      react,
      '@next/next': next,
      prettier: prettierPlugin,
    },

    settings: {
      react: { version: 'detect' },
    },

    rules: {
      'prettier/prettier': 'warn',
      
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* Next.js */
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...tseslint.configs.recommended,
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    extends: ['css/recommended'],
  },
  prettierConfig,
];
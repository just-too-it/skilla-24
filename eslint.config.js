import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import pretiier from 'prettier';

export default [
  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
      prettier: pretiier,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, 
      ...reactHooks.configs.recommended.rules, 
      '@typescript-eslint/no-unused-vars': 'warn', 
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/newline-after-import': 'warn', 
      'import/no-duplicates': 'warn', 
    },
  },

  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
];

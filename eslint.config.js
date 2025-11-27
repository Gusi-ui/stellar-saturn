import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Ignorar archivos y directorios
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '*.d.ts',
      'public/**',
      'build/**',
      '.netlify/**',
      'coverage/**',
      '*.min.js',
    ],
  },

  // Configuración base para JavaScript/TypeScript
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/alt-text': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Configuración específica para archivos Astro
  ...astroPlugin.configs.recommended,

  // Configuración para archivos JavaScript planos
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

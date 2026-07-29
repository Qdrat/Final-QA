import js from '@eslint/js'
import globals from 'globals'
import playwright from 'eslint-plugin-playwright'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    playwright.configs['flat/recommended'],

    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            sourceType: 'module',
        },
        rules: {
            'no-empty-pattern': [
                'error',
                { allowObjectPatternsAsParameters: true },
            ],
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
        },
    },

    {
        files: ['**/*.cjs'],
        languageOptions: { sourceType: 'commonjs' },
    },
    {
        ignores: [
            'node_modules/',
            'playwright-report/',
            'test-results/',
            'blob-report/',
            'allure-report/',
            'allure-results/',
        ],
    },
])

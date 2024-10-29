import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        ignores: ['node_modules', 'dist', '*.config.js'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                process: 'readonly',
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'no-unused-vars': 'error',
            'no-unused-expressions': 'error',
            'prefer-const': 'error',
            'no-console': 'warn',
            'no-undef': 'error',
        },
    },
]

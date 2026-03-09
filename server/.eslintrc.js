module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', 'prettier'],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // Import rules
    'import/order': [
      'error',
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
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off', // Turn off since we're not using TypeScript resolver

    // General code quality rules
    'no-console': 'off', // Allow console in Node.js
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', args: 'after-used' },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',
    'quote-props': ['error', 'as-needed'],

    // Express-specific best practices
    'no-process-exit': 'error',
    'no-sync': 'warn',
    'handle-callback-err': 'error',
  },
  overrides: [
    {
      files: ['*.config.js', '.eslintrc.js'],
      env: {
        node: true,
      },
    },
  ],
};

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'max-len': ['error',
      {
        'code': 100,
        'comments': 200,
      },
    ],
    'indent': ['error', 2],
    'new-cap': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-unused-vars': 0,
    'no-plusplus': 0,
    'require-jsdoc': 0,
    'object-curly-spacing': 0,
    'import/prefer-default-export': 0,
    'no-continue': 0,
    'consistent-return': 0,
    'semi': [2, 'never'],
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'src/**/*.spec.ts',
        'src/**/*.spec.js',
      ],
    }],
    'import/extensions': 0,
    'import/no-unresolved': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'google',
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}

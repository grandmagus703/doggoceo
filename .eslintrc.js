module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        rules: {
          '@typescript-eslint/no-shadow': ['error'],
          'no-shadow': 'off',
          'no-undef': 'off',
          'import/order': [
            1,
            {
              'newlines-between': 'always',
              groups: [
                'external',
                'builtin',
                'index',
                'internal',
                'sibling',
                'parent',
                'object',
                'type',
              ],
              pathGroups: [
                {
                  pattern: 'react**',
                  group: 'external',
                },
                {
                  pattern: '~services/**',
                  group: 'index',
                },
                {
                  pattern: '~components/**',
                  group: 'internal',
                },
                {
                  pattern: '~screens/**',
                  group: 'internal',
                },
                {
                  pattern: './**',
                  group: 'internal',
                  position: 'after',
                },
                {
                  pattern: '~hooks/**',
                  group: 'internal',
                  position: 'after',
                },
              ],
            },
          ],
        },
      },
    ],
  };
  
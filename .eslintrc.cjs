/**
 * ESLint configuration file.
 * For more info, pls refer: http://eslint.org/docs/user-guide/configuring.
 * @file The file is saved as `.eslintrc.cjs`.
 */
module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      plugins: ['@babel/plugin-syntax-import-attributes'],
    },
  },
  extends: [
    'airbnb',
    'plugin:css-modules/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'react-app',
    'plugin:storybook/recommended',
    'plugin:jsdoc/recommended',
  ],
  plugins: [
    'css-modules',
    'import',
    'jsx-a11y',
    'prettier',
    'react',
    'react-hooks',
    'storybook',
    'jsdoc',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    // rules regarding react plugin
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    // rules regarding react-hooks plugin
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    // rules regarding css-modules plugin
    'css-modules/no-unused-class': [2, { camelCase: true }],
    'css-modules/no-undef-class': [2, { camelCase: true }],
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [2, { packageDir: '.' }],
    'import/prefer-default-export': 0,
    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': [
      1,
      {
        endOfLine: 'lf',
      },
    ],
    // Ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 2,
    // rules regarding jsdoc
    'jsdoc/check-types': 2,
    'jsdoc/check-values': 2,
    'jsdoc/check-syntax': 2,
    'jsdoc/check-alignment': 2,
    'jsdoc/check-tag-names': 2,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-param-names': 2,
    'jsdoc/check-property-names': 2,
    'jsdoc/check-line-alignment': 2,
    'jsdoc/require-jsdoc': 2,
    'jsdoc/require-param': 2,
    'jsdoc/require-throws': 2,
    'jsdoc/require-yields': 2,
    'jsdoc/require-returns': 2,
    'jsdoc/require-example': 2,
    'jsdoc/require-template': 2,
    'jsdoc/require-property': 2,
    'jsdoc/require-param-type': 2,
    'jsdoc/require-param-name': 2,
    'jsdoc/require-description': 2,
    'jsdoc/require-returns-type': 2,
    'jsdoc/require-yields-check': 2,
    'jsdoc/require-file-overview': 2,
    'jsdoc/require-returns-check': 2,
    'jsdoc/require-property-name': 2,
    'jsdoc/require-property-type': 2,
    'jsdoc/require-asterisk-prefix': 2,
    'jsdoc/require-param-description': 2,
    'jsdoc/require-returns-description': 2,
    'jsdoc/require-property-description': 2,
    'jsdoc/require-description-complete-sentence': 2,
    'jsdoc/require-hyphen-before-param-description': 2,
    'jsdoc/sort-tags': 2,
    'jsdoc/tag-lines': 2,
    'jsdoc/valid-types': 2,
    // rules regarding no-console
    'no-console': 2,
    'no-debugger': 2,
    'no-unused-vars': 2,
    'prefer-destructuring': 2,
    'func-names': 2,
    camelcase: 0,
  },
  overrides: [
    {
      files: ['**/*.mdx', '**/*.md'],
      parser: 'eslint-mdx',
      extends: ['plugin:mdx/recommended'],
      plugins: ['mdx'],
      settings: {
        'mdx/code-blocks': true,
      },
      parserOptions: {
        extensions: ['.mdx', '.jsx', '.md', '.js'],
        markdownExtensions: ['.mdx', '.jsx', '.md', '.js'],
      },
      rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.mdx'] }],
        'jsdoc/require-file-overview': 0, // Disable this rule for MDX files
      },
    },
  ],
};

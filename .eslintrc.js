// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint');

module.exports = {
    extends: 'google',
    quotes: [2, 'single'],
    globals: {
      SwaggerEditor: false
    },
    env: {
      browser: true
    },
    rules:{
      "linebreak-style": 0
    }
};
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const removeImports = require('next-remove-imports')();

module.exports = (phase, { defaultConfig }) =>
  removeImports({
    ...defaultConfig,
  });

/* This file is not a real webpack config file.
 * It just use for JetBrains editor to active auto completion and remove editor warning (like jsconfig.json in VS Code).
 */

const path = require('path')

module.exports = {
  resolve: {
    // for JetBrains editor
    alias: {
      '@': path.resolve(__dirname),
      assets: path.resolve(__dirname, './assets'),
      '~assets': path.resolve(__dirname, './assets')
    }
  }
}

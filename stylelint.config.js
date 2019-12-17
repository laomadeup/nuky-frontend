module.exports = {
  // https://stylelint.io/user-guide/configuration
  plugins: ['stylelint-scss'],
  extends: 'stylelint-config-standard',
  rules: {
    'scss/dollar-variable-colon-space-after': 'always',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-pseudo-element-no-unknown': null
  }
}

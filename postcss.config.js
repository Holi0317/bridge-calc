const reactToolboxVariables = {
  'color-primary': 'var(--palette-pink-500)',
  'color-primary-dark': 'var(--palette-pink-700)',
  'color-primary-light': 'var(--palette-pink-500)',
  'color-accent': 'var(--palette-teal-a200)',
  'color-accent-dark': 'var(--palette-teal-700)',
  'color-primary-contrast': 'var(--color-dark-contrast)',
  'color-accent-contrast': 'var(--color-dark-contrast)'
}

module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables: reactToolboxVariables
        }
      }
    },
    'postcss-reporter': {
      clearReportedMessages: true
    }
  }
}

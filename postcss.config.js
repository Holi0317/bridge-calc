const reactToolboxVariables = {
  'color-primary': 'var(--palette-pink-500)',
  'color-primary-dark': 'var(--palette-pink-700)',
  'color-accent': 'var(--palette-teal-a200)',
  'color-accent-dark': 'var(--palette-teal-700)'
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
    }
  }
}

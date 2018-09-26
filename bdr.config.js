module.exports = {
  entry: {
    'picker': ['src/index.ts', 'VPicker']
  },
  format: 'es,cjs,umd,umd-min',
  typescript: require('typescript'),
  clear: false
}

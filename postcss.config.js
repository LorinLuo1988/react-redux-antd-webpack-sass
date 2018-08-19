module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 3 versions',
        'ie >= 10'
      ]
    })
  ]
}
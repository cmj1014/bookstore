module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.11.56.159:8090/',
        // target: 'http://47.100.225.183:8090/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

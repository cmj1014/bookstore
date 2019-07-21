module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://10.11.56.164:8090/',
        target: 'http://47.100.225.183:8090/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8081,
    disableHostCheck: true, // solve Invilid host header problem
    hotOnly: true, // 热更新
  },
};

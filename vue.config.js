module.exports = {
  lintOnSave: false,
  transpileDependencies: ['@kaokei/post-bridge'],
  devServer: {
    port: 8081,
    disableHostCheck: true, // solve Invilid host header problem
    hotOnly: true, // 热更新
  },
};

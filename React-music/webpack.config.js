module.exports = {
  entry: __dirname + "/app/root.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    port: 8088
  },
  module: {
    loaders: [
      //配置json格式的转换
      {
        test: /\.json$/,
        loader: "json-loader"
      }, {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
        //！的意思是同一个文件用两种方案去处理
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader?limit=8129"
      }
    ]
  }
}

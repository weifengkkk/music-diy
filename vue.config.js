module.exports = {
    /* 部署应用包的基本URL, 不设置可能会出现打包后项目找不到资源问题 */
    publicPath: '/',
    
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(html)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                }
            ]
        }
    },
    devServer: {
        proxy: {  //配置跨域
          '/api': {
            target: 'http://localhost:3000/',  
            changOrigin: true,  //允许跨域
            pathRewrite: {
             
              '^/api': '' 
            }
          },
        }
      },
}

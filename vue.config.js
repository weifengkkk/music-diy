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
            target: 'http://10.6.20.158:3000/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
            changOrigin: true,  //允许跨域
            pathRewrite: {
              /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
               */
              '^/api': '' 
            }
          },
        }
      },
}

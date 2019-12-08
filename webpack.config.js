const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
//这两个随便引入一个就行
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//或者
//const { VueLoaderPlugin } = require('vue-loader');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //提取css 打包资源
const devMode = process.env.NODE_ENV !== 'production';   //这个插件应该只用在 production 配置中，并且在loaders链中不使用 style-loader, 特别是在开发中使用HMR，因为这个插件暂时不支持HMR
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");  //压缩
module.exports = {
  entry: {
    main: './src/main.js',        //app main .js 入口
    //vendors: ['vue', 'vue-router', 'moment', 'axios', 'vue-preview']    //第三方库(vendor) 入口 打包分离
  },

  devServer:{
    contentBase: './src',
    port: 3030,
    hot: true,
  },
  devtool: 'inline-source-map',    //用来提示具体那里错误
  output: {
    //filename: 'bundle.js',
    filename: 'js/[name].[hash]:6.js',   //名字加6位hash
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/',
  },
  module: {
      rules: [   //这个数组用来处理 所有第三方文件的匹配和处理规则
          {
            test: /\.css$/,
            use: [       //webpack的处理规则 来这里找 loader 规则 能找到就调用对应的 loader 处理 这种文件类型 调用规则 use 数组 从后到前调用  
                         //调用结果层层传递调用完毕后 把处理结果交给 webpack 进行 打包合并 最终输出到bundle.js
                //'style-loader',   
                //'css-loader',   使用插件 提取css 代码  单独打包
                MiniCssExtractPlugin.loader,    //使用 MiniCssExtractPlugin 对css  less 单独打包
                { loader: "css-loader" }
            ]
          },
          {
            test: /\.less$/,
            use : [
                MiniCssExtractPlugin.loader,
                { loader: "css-loader" },
                { loader: "less-loader" }
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
           
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
              loader: 'file-loader',
              options: {
                limit: 4096, //4096字节以上生成文件，否则base6
                name: 'assets/[name].[ext]'}
            }]
          },
          {
            //配置babel 来转化个高级的es 语法
            //通过babel 可以帮我们将 高级语法转化为 低级的语法
            //1 webpack 2套 命令  安装两套包  去安装 babel 相关loader功能
            //@babel/core babel-loader @babel/plugin-transform-runtime这个负责转化 但是没有高级语法和低级语法的对应关系
            //babel-preset-env babel-parset-stage   这个语法关系 相当于一个哈希表
            test: /\.m?js$/, 
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',                      //多次使用babel-loader 就需要多次option
              // options: {
              //   presets: ['@babel/preset-env'],           //关键字
              //   plugins: [                                //函数
              //     '@babel/plugin-proposal-object-rest-spread',   
              //     '@babel/plugin-proposal-class-properties',
              //     '@babel/plugin-transform-runtime',
              //     [
              //       "component", {
              //         "libraryName": "mint-ui",
              //         "style": true
              //       }
              //     ] 
              //   ]
              // }
            }  
          },
          {
            test: /\.vue$/, use: 'vue-loader'
          },

          //缩略图
          {
            test: /vue-preview.src.*?js$/,
            loader: 'babel-loader',
            // options:{ 就需要多次option 建议使用.babelrc  在当前根目录即可

            // }
          }
      ]
  },

  // optimization: {
  //   chunks: "async",
  //   minSize: 30000,
  //   minChunks: 1,
  //   maxAsyncRequests: 5,
  //   maxInitialRequests: 3,
  //   name: true,
  //   minimizer: true, // [new UglifyJsPlugin({...})]
  //   splitChunks:{    //分割代码块
  //     cacheGroups:{  //缓存组
  //       common: {  //公共模块
  //         chunks: 'initial',
  //         minSize: 0,
  //         minChunks: 2,   
  //       },
  //       vendor:{
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'initial',
  //         minSize: 0,
  //         minChunks: 2
  //       }
  //     }
  //   }
  // },

  plugins: [  //插件的执行顺序是 依次的   we
    // new webpack.optimize.CommonsChunkPlugin({         //提取公共模块
    //   names: ['vendors', 'mainfest']                             //mainfest 清单 用来记录使用者和第三方包的依赖关系
    // }),  

    //压缩混淆代码
    // new UglifyJSPlugin(),
    new MiniCssExtractPlugin({     //提取css 代码的插件
      //filename: "css/common.css",   //输出目录的 文件路劲
      filename: 'css/style.[name].css',
      chunkFilename: 'css/style.[hash]:6.css'  // use contenthash 
    }),
    new webpack.HotModuleReplacementPlugin(),   //new 了一个热更新的模块对象  启用热更新
    //创建一个在内存中 生成html 页面对象的 一个插件
    new htmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),  // 指定模板页面, 将来会根据指定的页面路径, 去生成内存中的页面 将src下 template 属性配置的 output.paht将文件移到该目录
      filename: 'index.html',  // 指定生成内存中的页面
    }),
    new VueLoaderPlugin(),  //vue 使用   
  ],
  resolve: { //修改wue导入时候的包路劲
    //"vue$": ""
  },
 

};

// splitChunks: {
//   chunks: "async”,//默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
//   minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
//   minChunks: 1,  // 表示被引用次数，默认为1；
//   maxAsyncRequests: 5,  //所有异步请求不得超过5个
//   maxInitialRequests: 3,  //初始话并行请求不得超过3个
//  automaticNameDelimiter:'~',//名称分隔符，默认是~
//   name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
//   cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
//      common: {
//        name: 'common',  //抽取的chunk的名字
//        chunks(chunk) { //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
//        },
//        test(module, chunks) {  //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。自己尝试过程中发现不能提取出css，待进一步验证。
//        },
//       priority: 10,  //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
//      minChunks: 2,  //最少被几个chunk引用
//      reuseExistingChunk: true，//  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
//      enforce: true  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
//      }
//   }
// }



//  //抽取公共模块
//  optimization: {
//   splitChunks: {
//       cacheGroups: {    //可以自己设置一组一组的cache group来配对应的共享模块
//           commons: {
//               name: ['vendors'],
//               chunks: "initial",
//               minChunks: 2
//           },
          
//       }
//   }
// }
// }
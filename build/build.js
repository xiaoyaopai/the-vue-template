// 检查NodeJS和npm的版本
require('./check-versions')()

process.env.NODE_ENV = 'production'

// Elegant terminal spinner 优雅的终端器
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')

// 用于在控制台输出带颜色字体的插件
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start() // 开启loading动画

//递归删除旧的目标文件夹-》 输出文件的目标文件夹
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err

    // webpack编译
    webpack(webpackConfig, function(err, stats) {
        spinner.stop() // 停止loading动画
        if (err) throw err

        // 没有出错则输出相关信息
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})
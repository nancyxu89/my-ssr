/** @format */

// /** @format */
//
// module.exports = {
// 	baseUrl: '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
// 	outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
// 	assetsDir: 'assets', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
// 	indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
// 	pages: {
// 		//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
// 		index: {
// 			//除了 entry 之外都是可选的
// 			entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
// 			template: 'public/index.html', // 模板来源
// 			filename: 'index.html', // 在 dist/index.html 的输出
// 			title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
// 			chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
// 		}
// 	},
// 	lintOnSave: true, // 是否在保存的时候检查
// 	productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
// 	css: {
// 		extract: true, // 是否使用css分离插件 ExtractTextPlugin
// 		sourceMap: false, // 开启 CSS source maps
// 		loaderOptions: {}, // css预设器配置项
// 		modules: false // 启用 CSS modules for all css / pre-processor files.
// 	},
// 	devServer: {
// 		// 环境配置
// 		host: 'localhost',
// 		port: 28080,
// 		https: false,
// 		hotOnly: false,
// 		open: true, //配置自动启动浏览器
// 		proxy: undefined
// 		// proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
// 		//     '/api': {
// 		//         target: '<url>',
// 		//         ws: true,
// 		//         changeOrigin: true
// 		//     },
// 		//     '/foo': {
// 		//         target: '<other_url>'
// 		//     }
// 		// }
// 	},
// 	pluginOptions: {
// 		// 第三方插件配置
// 		// ...
// 	}
// }

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
	// baseUrl: '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
	// outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
	// assetsDir: 'assets', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
	// indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
	// pages: {
	// 	//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
	// 	index: {
	// 		//除了 entry 之外都是可选的
	// 		entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
	// 		template: 'public/index.html', // 模板来源
	// 		filename: 'index.html', // 在 dist/index.html 的输出
	// 		title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
	// 		chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
	// 	}
	// },
	lintOnSave: true, // 是否在保存的时候检查
	// productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
	// css: {
	// 	extract: true, // 是否使用css分离插件 ExtractTextPlugin
	// 	sourceMap: false, // 开启 CSS source maps
	// 	loaderOptions: {}, // css预设器配置项
	// 	modules: false // 启用 CSS modules for all css / pre-processor files.
	// },
	// devServer: {
	// 	// 环境配置
	// 	host: 'localhost',
	// 	port: 28080,
	// 	https: false,
	// 	hotOnly: false,
	// 	open: true, //配置自动启动浏览器
	// 	proxy: undefined
	// },
	configureWebpack: () => ({
		// 将 entry 指向应用程序的 server / client 文件
		entry: `./src/entry-${target}.js`,
		// 对 bundle renderer 提供 source map 支持
		devtool: 'source-map',
		target: TARGET_NODE ? 'node' : undefined,
		node: TARGET_NODE ? undefined : false,
		output: {
			libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
		},
		// https://webpack.js.org/configuration/externals/#function
		// https://github.com/liady/webpack-node-externals
		// 外置化应用程序依赖模块。可以使服务器构建速度更快，
		// 并生成较小的 bundle 文件。
		externals: TARGET_NODE
			? nodeExternals({
					// 不要外置化 webpack 需要处理的依赖模块。
					// 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
					// 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
					whitelist: [/\.css$/]
			  })
			: undefined,
		optimization: {
			splitChunks: TARGET_NODE
				? false
				: {
						chunks: 'async',
						minSize: 30000,
						minChunks: 2,
						maxAsyncRequests: 5,
						maxInitialRequests: 3
				  }
		},
		plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
	}),
	chainWebpack: config => {
		TARGET_NODE
			? config.plugins
					.delete('split-vendor')
					.delete('split-vendor-async')
					.delete('split-manifest')
					.delete('inline-manifest')
			: ''
		TARGET_NODE
			? config.module
					.rule('vue')
					.use('vue-loader')
					.tap(options =>
						merge(options, {
							optimizeSSR: false
						})
					)
			: ''
	}
	// ,
	// chainWebpack: config => {
	// 	config.module
	// 		.rule('vue')
	// 		.use('vue-loader')
	// 		.tap(options => {
	// 			merge(options, {
	// 				optimizeSSR: false
	// 			})
	// 		})
	// }
}

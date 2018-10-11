/** @format */

const fs = require('fs')
const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const app = new Koa()
//适配vue history的中间件
const historyApiFallback = require('koa2-connect-history-api-fallback')
const resolve = file => path.resolve(__dirname, file)
// 开放目录
app.use(historyApiFallback())
app.use(koaStatic(resolve('./dist')))

// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
	runInNewContext: false,
	template: fs.readFileSync(resolve('./public/index.temp.html'), 'utf-8'),
	clientManifest: clientManifest
})

function renderToString(context) {
	return new Promise((resolve, reject) => {
		renderer.renderToString(context, (err, html) => {
			err ? reject(err) : resolve(html)
		})
	})
}

// 第 3 步：添加一个中间件来处理所有请求,未进入?!
app.use(async (ctx, next) => {
	ctx.res.setHeader('Content-Type', 'text/html')
	const context = {
		title: 'ssr test',
		url: ctx.url
	}
	// 将 context 数据渲染为 HTML
	const html = await renderToString(context)
	ctx.body = html
})

module.exports = app
let devServerPort = '22300'
app.listen(devServerPort, function() {
	console.log(`server started at localhost:${devServerPort}`)
})

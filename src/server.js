/** @format */

const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')
const resolve = file => path.resolve(__dirname, file)
app.use('/', express.static(resolve('../dist')))
// 设置静态文件目录
app.use(history())
// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
	runInNewContext: false,
	template: fs.readFileSync(resolve('../public/index.temp.html'), 'utf-8'),
	clientManifest: clientManifest
})

function renderToString(context) {
	return new Promise((resolve, reject) => {
		renderer.renderToString(context, (err, html) => {
			err ? reject(err) : resolve(html)
		})
	})
}

// 第 3 步：添加一个中间件来处理所有请求
app.use('*', async (req, res) => {
	const context = {
		title: 'ssr test',
		url: req.url
	}
	// 将 context 数据渲染为 HTML
	const html = await renderToString(context)
	res.send(html)
})

app.listen(18900, () => {
	console.log('localhost:18900, 服务器已启动！')
})

module.exports = app

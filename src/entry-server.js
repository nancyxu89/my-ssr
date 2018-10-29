/** @format */

import { createApp } from '../src/main'

export default context => {
	return new Promise((resolve, reject) => {
		const app = createApp()

		// 更改路由
		app.$router.push(context.url)

		// 等到 router 将可能的异步组件和钩子函数解析完
		app.$router.onReady(() => {
			const matchedComponents = app.$router.getMatchedComponents()
			// 匹配不到的路由，执行 reject 函数，并返回 404
			if (!matchedComponents.length) {
				return reject({
					code: 404
				})
			}
			// Promise 应该 resolve 应用程序实例，以便它可以渲染
			resolve(app)
		}, reject)

		// // 获取相应路由下的组件
		// const matchedComponents = app.$router.getMatchedComponents()
		//
		// // 如果没有组件，说明该路由不存在，报错404
		// if (!matchedComponents.length) {
		// 	return reject({ code: 404 })
		// }
		//
		// resolve(app)
	})
}

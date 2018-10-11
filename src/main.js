/** @format */

import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)

export function createApp() {
	const router = createRouter()
	const store = createStore()
	const app = new Vue({
		// 注入 router 到根 Vue 实例
		router,
		store,
		render: h => h(App)
	})

	return app
}

/** @format */

import Vue from 'vue'
import Router from 'vue-router'
// import App from './App.vue'
import Layout from './views/Layout.vue'
import Home from './views/Home.vue'
import Drag from './views/Drag.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'layout',
			component: Layout,
			children: [
				{
					path: '',
					component: Home
				},
				{
					path: 'drag',
					name: 'Drag',
					component: Drag
				},
				{
					path: 'about',
					name: 'about',
					component: () => import('./views/About.vue')
				}
			]
		}
	]
})

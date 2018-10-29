<!-- @format -->

<template>
    <header id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>|
        <router-link to="/drag">Drag</router-link>
		<button id="btn" @click="computeCount">test btn</button>
		<p id="p">test p</p>
		<slot></slot>
		<slot name="loginInfo"></slot>
    </header>
</template>
<script>
export default {
	name: 'header',
	data() {
		return {
			count: 0
		}
	},
	methods: {
		computeCount() {
			this.count++
		}
	}
}
</script>
<style lang="scss" scoped>
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>

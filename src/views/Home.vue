<!-- @format -->

<template>
  <div class="home">
      <div>{{ homeInfo }}</div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'home',
	components: {
		HelloWorld
	},
	serverRequest(store) {
		return store.dispatch('getHomeInfo')
	},
	mounted() {},
	computed: {
		homeInfo() {
			return this.$store.state.homeInfo
		}
	}
}
</script>

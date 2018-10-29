<!-- @format -->

<template>
  <div id="app">
	  <c-header></c-header>
    <router-view/>
  </div>
</template>

<script>
import CHeader from '@/components/Header.vue'
export default {
	data() {
		return {}
	},
	components: { CHeader }
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>

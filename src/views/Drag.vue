<!-- @format -->

<template>
    <div>
        <div class="toggle-container"><i class="el-icon-menu" @click="toggleCollapse"></i></div>
        <div class="drag-left-wrap">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    @open="handleOpen"
                    @close="handleClose" unique-opened>
                <el-submenu v-for="(menu,index) in menus" :key="menu.name" :index="menu.name+index">
                    <template slot="title">
                        <i :class="menu.iconClass"></i>
                        <span>{{menu.name}}</span>
                    </template>
                    <el-menu-item v-if="menu.children" v-for="(subItem,idx) in menu.children" :key="subItem.name" :index="index+'_'+idx">
                        <div @dragstart="dragStart($event, subItem)" @dragend="dragEnd($event)" draggable="true">{{subItem.name}}</div></el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div id="dragRContainer" class="drag-right-wrap" :style="!isCollapse?'margin-left:201px':'margin-left:65px'"
             @dragenter="dragEnter" @dragover.prevent="dragOver($event)" @dragleave="dragLeave($event)" @drop.prevent="drop($event)">
            <el-tag
                    v-for="tag in tags"
                    :key="tag.name"
                    @close="handleTagClose(tag)"
                    closable>
                {{tag.name}}
            </el-tag>
        </div>
    </div>
</template>
<script>
export default {
	data() {
		return {
			tags: [],
			ids: [],
			isCollapse: false,
			menus: [
				{
					name: '仪表盘',
					iconClass: 'el-icon-rank',
					children: [{ name: '仪表盘1', id: 11 }, { name: '仪表盘2', id: 12 }]
				},
				{
					name: '表单',
					iconClass: 'el-icon-tickets',
					children: [
						{ name: '常规元素', id: 21 },
						{ name: '高级元素', id: 22 },
						{ name: '编辑', id: 23 }
					]
				},
				{
					name: '多级菜单',
					iconClass: 'el-icon-menu',
					children: [
						{ name: '一级菜单', id: 31 },
						{ name: '二级菜单', id: 32 },
						{ name: '三级菜单', id: 33 },
						{ name: '四级菜单', id: 34 }
					]
				}
			]
		}
	},
	methods: {
		dragStart(evt, item) {
			console.info('dragStart', evt.dataTransfer)
			evt.dataTransfer.setData('Text', item.name + ',' + item.id)
		},
		dragEnd(evt) {
			console.info('dragEnd', evt)
			evt.dataTransfer.clearData()
		},
		dragEnter() {
			//			console.info('dragEnter', evt)
		},
		dragOver() {
			//			console.info('dragOver', evt)
		},
		dragLeave(evt) {
			console.info('dragLeave', evt)
		},
		drop(evt) {
			//			evt.preventDefault()
			let data = evt.dataTransfer.getData('Text')
			let arr = data.split(',')
			let elem = document.createElement('span')
			elem.setAttribute('class', 'drag-tag')
			elem.setAttribute(
				'style',
				'display:inline-block;color:red;padding:2px 4px;'
			)
			elem.innerText = arr[0]
			let isHas = this.ids.indexOf(arr[1]) !== -1
			if (!isHas) {
				this.ids.push(arr[1])
				this.tags.push({ name: arr[0], id: arr[1] })
			}
		},
		handleTagClose(tag) {
			let index = this.ids.indexOf(tag.id)
			this.ids.splice(index, 1)
			this.tags.splice(index, 1)
		},
		handleOpen() {},
		handleClose() {},
		toggleCollapse() {
			this.isCollapse = !this.isCollapse
		}
	}
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}

.toggle-container {
	text-align: right;
	i {
		display: inline-block;
		cursor: pointer;
	}
}

.drag-left-wrap {
	position: absolute;
	top: 0;
	left: 0;
	margin-top: 112px;
	z-index: 1998;
}

.drag-right-wrap {
	width: 100%;
	height: calc(100vh - 200px);
	background-color: #ccc;
	text-align: left;
	z-index: 1999;
	transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
}

.drag-span {
	display: inline-block;
	color: red;
	line-height: 20px;
}
</style>

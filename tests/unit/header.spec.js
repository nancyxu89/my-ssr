/** @format */

import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import CHeader from '@/components/Header.vue'
import Vue from 'vue'

describe('CHeader', () => {
	it('test header', () => {
		const wrapper = shallowMount(CHeader)
		expect(wrapper.attributes().id).to.equal('nav')
	})

	it('test header 2', () => {
		const wrapper = mount(CHeader)
		expect(wrapper.find('p').name()).to.equal('p')
	})

	it('button click should increment the count', () => {
		const wrapper = mount(CHeader)
		expect(wrapper.vm.count).to.equal(0)
		const button = wrapper.find('#btn')
		button.trigger('click')
		expect(wrapper.vm.count).to.equal(1)
	})

	it('test slot', () => {
		const wrapper = shallowMount(CHeader, {
			slots: {
				default: '<span>default slot</span>',
				loginInfo: '<div><span class="name">nancyxu</span></div>'
			}
		})

		console.info(wrapper.html())
		expect(wrapper.find('.name')).to.not.be.null
	})

	// it('will time out', (done) => {
	//     Vue.nextTick(() => {
	//         expect(true).to.equal(false)
	//         done()
	//     })
	// })
	//
	// it('will catch the error using done', (done) => {
	//     Vue.config.errorHandler = done
	//     Vue.nextTick(() => {
	//         expect(true).to.equal(false)
	//         done()
	//     })
	// })
	//
	// it('will catch the error using a promise', () => {
	//     return Vue.nextTick()
	//         .then(function () {
	//             expect(true).to.equal(false)
	//         })
	// })
})

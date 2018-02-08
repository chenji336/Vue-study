/**
 * @file app.vue的测试用例
 * @author  mabei_chen 
 */

import Vue from 'vue';
import app from '../../src/App.vue';

describe('test app.vue',() => {

	it('组件加载后，title应该是hello world',() => {
		let vm = new Vue(app).$mount();
		expect(vm.title).toEqual('Hello world');
	});

});

describe('appComponent', () => {
  // 检查原始组件选项
  it('has a created hook', () => {
    expect(typeof app.created).toBe('function')
  })
});

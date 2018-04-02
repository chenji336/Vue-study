import Vue from 'vue'
import App from './app.vue'

// 最开始测试使用的，为了验证url-loader以及css-loader、stylus-loader
/*import './assets/images/bg.jpeg'
import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'*/

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

console.log('process.env.NODE_ENV-indexjs:',process.env.NODE_ENV)

new Vue({
	render: (h) => h(App)
}).$mount(root)
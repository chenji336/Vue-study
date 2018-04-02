import Vue from 'vue'
import App from './app.vue'

import './assets/images/bg.jpeg'
import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'

const root = document.createElement('div')
document.body.appendChild(root)

console.log('process.env.NODE_ENV-indexjs:',process.env.NODE_ENV)

new Vue({
	render: (h) => h(App)
}).$mount(root)
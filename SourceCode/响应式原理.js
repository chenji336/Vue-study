// node 响应式原理.js
console.log('------start----------')

class Vue {
	constructor(options) {
		console.log('constructor')
		// 必须先赋值，否则_data就是undefined
		this._data = options.data
		// 优化 使用代理，以后就可以直接vm.text了，否则还需要vm._data.text这样进行赋值
		_proxy(this, options.data)
		observer(options.data, options.render)
	}
}

function observer(value, cb) {
	Object.keys(value).forEach((key) => {
		console.log('observer');
		defineReactive(value, key, value[key], cb);
	})
}

function defineReactive(obj, key, val, cb) {
	console.log('defineReactive')
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: () => {
			console.log('defineReactive-get')
			/*....依赖收集等....*/
      /*Github:https://github.com/answershuto*/
		},
		set: newVal => {
			console.log('defineReactive-set')
			cb();/*订阅者收到消息的回调*/
		}
	})
	console.log('end')
}

var vm = new Vue({
	el: '#app',
	data: {
		text: '123'
	},
	render() {
		console.log('render')
	}
})

// 给text赋值，触发setter
// vm._data.text = '456'

// 但是每次赋值需要vm._data，很不方便
// 使用代理proxy

function _proxy(target, data) {
	Object.keys(data).forEach((key) => {
		Object.defineProperty(target, key, {
			configurable: true,
			enumerable: true,
			get: () => {
				return target._data[key]
			},
			set: (newVal) => {
				target._data[key] = newVal
			}
		})
	})
}

vm.text = '456'
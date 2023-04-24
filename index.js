const process = require('process')
const axios = require('axios')
const { RequestArgs, ShellCommands } = require('./lib')
// console.log(process.argv)

// const readline = require('readline').createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// })

// // shell mode 持续监听用户输入
// readline.on(`line`, (input) => {
// 	console.log(input)
// 	if (input === ':q') {
// 		// console.log('terminate...')
// 		readline.close()
// 	}
// })

process.on('beforeExit', (code) => {
	console.log('Process beforeExit event with code: ', code)
})

process.on('exit', (code) => {
	console.log('Process exit event with code: ', code)
})

var request_args = new RequestArgs(process.argv)

console.log('input: ', request_args)


axios.post('http://127.0.0.1:8000/translate', request_args).then(res => {
	if (res.status === 200) {
		console.log(res.data)
	}
}).catch(err => console.log('出错了: ', err))


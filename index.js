import process from 'process'
import colors from 'colors'
import open from 'open'
import axios from 'axios'

import player from 'sound-play'

import downloadMp3 from './DownloadFile.js'

import RequestArgs from './RequestArgs.js'
import ShellCommand from './ShellCommand.js'
// console.log(process.argv)

const shellCommand = new ShellCommand(process.argv)
// console.log(shellCommand)

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

// process.on('beforeExit', (code) => {
// 	console.log('Process beforeExit event with code: ', code)
// })

// process.on('exit', (code) => {
// 	console.log('Process exit event with code: ', code)
// })

const request_args = new RequestArgs(process.argv)
// console.log('input: ', request_args)

axios
	.post('http://trans.ppwq.work/translate', request_args)
	.then(async (res) => {
		if (res.status === 200) {
			// console.log(res.data)
			let data = res.data.data
			// console.log(data)
			await outputTranslateResult(data)
		}
	})
	.catch((err) => console.log('出错了: ', err))

// 向命令行输出结果
async function outputTranslateResult(data) {
	const webdictUrl = data.webdict.url // web 中查看结果
	const speakTargetLanguageUrl = data.tSpeakUrl // 播放结果音频
	const speakOriginLanguageUrl = data.speakUrl // 播放源语言音频
	const translation = data.translation // 翻译结果 Array

	if (typeof webdictUrl != 'undefined' && shellCommand.viewInWeb) {
		open(webdictUrl)
	}

	const basic = {}

	if (data.hasOwnProperty('basic')) {
		// console.log('有basic属性')
		Object.assign(basic, {
			speakUrl: data.basic.speakUrl, // 源读音
			ukSpeach: data.basic['uk-speech'], // 英式发音
			usSpeach: data.basic['us-speech'], // 美式发音
			phonetic: data.basic.phonetic, // 音标
			explains: data.basic.explains, // 解释、说明
		})
	}

	// console.log('basic: ', basic)

	// console.log(speakTargetLanguageUrl)

	if (shellCommand.speakTarget) {
		let url = speakTargetLanguageUrl || basic.speakUrl

		if (typeof url == 'undefined') {
			url = basic.ukSpeach ? basic.ukSpeach : ''
		}

		if (typeof url != 'undefined') {
			console.log('\n url: ', url)
			const tempFilePath = await downloadMp3(url)
			console.log('tempFilePath: ', tempFilePath)
			tempFilePath != null &&
				player.play(tempFilePath).then(() => {
					// TO DO
					// console.log('音频播放完成')
				})
		}
	} else if (shellCommand.speakOrigin) {
		if (typeof speakOriginLanguageUrl != 'undefined') {
			const tempFilePath = await downloadMp3(speakOriginLanguageUrl)
			// console.log('tempFilePath: ', tempFilePath)
			tempFilePath != null &&
				player.play(tempFilePath).then(() => {
					// TO DO
					// console.log('音频播放完成')
				})
		}
	}

	console.log('\n')

	if (translation.length > 0) {
		for (let i = 0; i < translation.length; i++) {
			console.log(colors.yellow(translation[i]))
		}
		console.log('\n')

		typeof phonetic != 'undefined' && console.log(`(${phonetic})`)
	}
}

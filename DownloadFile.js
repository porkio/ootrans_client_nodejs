const fs = require('fs')
const download = require('download')

// 下载 mp3 文件到本地
const downloadMp3 = async (mp3Url) => {
	// console.log('URL: ', mp3Url)
	if (typeof mp3Url == 'undefined' || typeof mp3Url != 'string') return null
	const timestamp = new Date().getTime()

	const fileName = `./tmp/ootrans_audio_${timestamp}.mp3`
	fs.writeFileSync(fileName, await download(mp3Url, './tmp'))

	return fileName
}

downloadMp3(
	'https://openapi.youdao.com/ttsapi?q=%E6%88%91%E8%83%BD%E6%80%8E%E4%B9%88%E5%8A%9E%EF%BC%9F&langType=zh-CHS&sign=F877B6C54858980B9C2652A3958C6C3F&salt=1682417975079&voice=4&format=mp3&appKey=331359da4a350f3e&ttsVoiceStrict=false'
)

module.exports = downloadMp3

// examples
// ;(async () => {
// 	await download('http://unicorn.com/foo.jpg', 'dist')

// 	fs.writeFileSync(
// 		'dist/foo.jpg',
// 		await download('http://unicorn.com/foo.jpg')
// 	)

// 	download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'))

// 	await Promise.all(
// 		['unicorn.com/foo.jpg', 'cats.com/dancing.gif'].map((url) =>
// 			download(url, 'dist')
// 		)
// 	)
// })()

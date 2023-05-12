const fs = require('fs')
const download = require('download')

// 下载 mp3 文件到本地
const downloadMp3 = async (mp3Url) => {
	// console.log('URL: ', mp3Url)
	if (typeof mp3Url == 'undefined' || typeof mp3Url != 'string') return null
	const timestamp = new Date().getTime()

	const fileName = `~/Code/Nodejs/ootrans/tmp/ootrans_audio_${timestamp}.mp3`
	fs.writeFileSync(fileName, await download(mp3Url, './tmp'))

	return fileName
}

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

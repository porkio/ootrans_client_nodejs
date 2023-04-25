// import { NodeSound } from 'node-sound'
// const player = NodeSound.getDefaultPlayer()
import player from 'sound-play'
import downloadMp3 from './DownloadFile.js'
const start = async () => {
	// const tempFilePath = await downloadMp3(
	// 	'https://openapi.youdao.com/ttsapi?q=%E6%88%91%E6%80%8E%E4%B9%88%E8%BF%99%E4%B9%88%E5%A4%A7%3F&langType=zh-CHS&sign=D712EEA4C8F6567FC70FC0A71673C82E&salt=1682416311223&voice=4&format=mp3&appKey=331359da4a350f3e&ttsVoiceStrict=false'
	// )
	// console.log('mp3: ', tempFilePath)
	// player.play(tempFilePath).then(() => {
	// 	console.log('play completed...')
	// })

	player.play('tmp/origin.mp3')
}

start()

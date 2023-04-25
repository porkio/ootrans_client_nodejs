/**
 * @description 用户命令识别
 * @param args : Array []
 * @prop isShellMode '-shell' 对话模式翻译
 * @prop speakResult '-sp' 语音播放结果
 * */
class ShellCommand {
	constructor(args) {
		if (typeof args !== 'object' || !(args instanceof Array)) {
			throw new Error('Input args error!')
		}
		this.isShellMode = args.indexOf('-shell') > -1 // 是否为shell交互模式
		this.speakTarget = args.indexOf('-spt') > -1 // 发音翻译结果
		this.speakOrigin = args.indexOf('-spo') > -1 // 发音源输入语言
		this.viewInWeb = args.indexOf('-web') > -1 // 是否在web浏览器中查看结果
	}
}

export default ShellCommand

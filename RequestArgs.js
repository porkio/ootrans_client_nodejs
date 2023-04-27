// 是否包含某种语言代码
function isContain(code) {
	// console.log('isContain: ', code)
	const langList = require('./LangList')
	let state = false
	for (let i = 0; i < langList.length; i++) {
		if (
			typeof langList[i].code === 'string' &&
			langList[i].code?.toLowerCase()?.indexOf(code) > -1
		) {
			state = true
		}
	}
	return state
}

/**
 * @description 通过用户输入参数解析成请求参数类
 * @param args: Array []
 * @prop q 查询内容
 * @prop from 源语言
 * @prop to 目标语言
 */
class RequestArgs {
	constructor(args) {
		if (typeof args !== 'object' || !(args instanceof Array)) {
			throw new Error('Input args error!')
		}
		this.q = this._getQuery(args)
		this.to = this._parseLanguage(args, 'to')
		this.from = this._parseLanguage(args, 'from')
		this.voice = false
		this.speak_origin_language = false
		this.speak_target_language = false
	}

	// 解析源语言和用户目标语言
	_parseLanguage(args, field) {
		let tmp = args.filter((arg) => arg.indexOf(':') > -1)

		if (tmp.length > 1) {
			if (field === 'from') {
				tmp = tmp.filter(
					(arg) => arg.indexOf(':') > -1 && arg.indexOf(':') !== 0
				)
				// console.log(tmp) 这里依然有可能得到两条数据，优先取第一条
			} else {
				tmp = tmp.filter((arg) => arg.indexOf(':') === 0)
			}
		}

		tmp = tmp.pop()

		if (!tmp || typeof tmp == undefined) {
			return ''
		}

		let s = ''

		switch (field) {
			case 'to':
				if (tmp.indexOf(':') === 0) {
					s = tmp.substr(1, undefined)
				} else {
					s = tmp.slice(tmp.indexOf(':') + 1, undefined)
				}
				// console.log('to: ', s)
				return isContain(s) ? s : ''
			case 'from':
				if (tmp.indexOf(':') === 0) {
					return ''
				} else {
					s = tmp.slice(0, tmp.indexOf(':'))
					console.log('from1: ', s)
					return isContain(s) ? s : ''
				}
			default:
				return s
		}
	}

	// 获取用户输入的预翻译内容
	_getQuery(args) {
		args = args.slice(2, undefined)

		let tmpArr = args
			.filter((arg) => arg[0] !== ':')
			.filter((arg) => arg[0] !== '-')

		if (tmpArr.length > 0) {
			return tmpArr[0]
		}
		return ''
	}
}

module.exports = RequestArgs

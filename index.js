'use strict'

module.exports = function noTrailingSlash() {
	return function *(next) {
		const url = this.request.url
		const querystring = this.request.querystring
		if (!querystring && url != '/' && /\/$/.test(url)) {
			this.response.status = 301
			this.response.redirect(url.slice(0, url.length - 1))
			return
		}

		yield next
	}
}()

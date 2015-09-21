module.exports = function noTrailingSlash() {
	return function *(next) {
		var url = this.request.url
		yield next
		if (url != '/' && /\/$/.test(url)) {
			var trailingSlashPosition = url.length - 1
			this.response.status = 301
			this.response.redirect(url.slice(0, trailingSlashPosition))
		}
	}
}()

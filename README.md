Koa middleware that redirects all requests to an URL with a trailing slash to the same URL without it, ignoring the query string (key and value).

## Usage

	const app = require('koa')()
	app.use(reuire('koa-no-trailing-slash'))
	app.use(function *(next) {
	   this.response.body = 'Did this URL had a trailing slash?'
	})
	app.listen(8000)

## Related module

[koa-lowercase-url](https://www.npmjs.com/package/koa-lowercase-url)

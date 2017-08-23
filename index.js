'use strict'

module.exports = function noTrailingSlash () {
  return function noTrailingSlash (ctx, next) {
    const {originalUrl, search} = ctx.request
    const pathUrl = originalUrl.slice(0, originalUrl.length - search.length)

    if (pathUrl !== '/' && pathUrl.endsWith('/')) {
      const redirectUrl = pathUrl.slice(0, pathUrl.length - 1) + search
      ctx.response.status = 301
      ctx.redirect(redirectUrl)
      return
    }

    return next()
  }
}

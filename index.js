
module.exports = function noTrailingSlash () {
  return function noTrailingSlash (ctx, next) {
    const {path, search} = ctx.request

    if (path !== '/' && path.slice(-1) === '/') {
      const redirectUrl = path.slice(0, -1) + search
      ctx.response.status = 301
      ctx.redirect(redirectUrl)
      return
    }

    return next()
  }
}

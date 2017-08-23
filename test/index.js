/* eslint-env mocha */

const Koa = require('koa')
const supertest = require('supertest')
const middleware = require('..')

describe('middleware', function () {
  const server = new Koa()
  const request = supertest(server.listen())
  server.use(middleware())
  server.use(function (ctx) {
    ctx.status = 200
  })

  it('should work with "/" requests', function () {
    return request
      .get('/')
      .expect(200)
  })
  it('should work with urls which have query strings', function () {
    return request
      .get('/foo?bar=test')
      .expect(200)
  })
  it('should work with urls without trailing slashes', function () {
    return request
      .get('/test')
      .expect(200)
  })
  it('should work with urls with trailing slashes', function () {
    const PATH = '/test'
    return request
      .get(PATH + '/')
      .expect('Location', PATH)
      .expect(301)
  })
})

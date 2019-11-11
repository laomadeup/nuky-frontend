const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('mockdb.js')
const middlewares = jsonServer.defaults()

router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}

server.use(
  jsonServer.rewriter({
    '/api/article-api/articles/page/:number':
      '/articles?_page=:number&_limit=5',
    '/api/article-api/article/:id': '/articles?id=:id'
  })
)

server.use(middlewares)
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})

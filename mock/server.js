import pause from 'connect-pause'
import jsonServer from 'json-server'
import data from './mockdb'
import wrapper from './wrapper'
import config from './config.json'
import routes from './route.json'

const server = jsonServer.create()
const router = jsonServer.router(data)
const middlewares = jsonServer.defaults()

router.render = (req, res) => {
  wrapper(req, res)
}

server.use(jsonServer.rewriter(routes))
if (config.delay && config.delay > 0) {
  server.use(pause(config.delay))
}

server.use(middlewares)
server.use(jsonServer.bodyParser)
/* server.use(function (req, res, next) {
  if (req.body.pageNumber!=null) {
    req.query = req.body
    req.query._page=req.body.pageNumber
    req.query._sort=req.body.sort
    req.query._order=req.body.order
    let pageNumber = 1
    if (req.body.pageNumber !== 0) {
      pageNumber = req.body.pageNumber
    }
    req.url = `${req.url}&_page=${pageNumber}`
  }
  next()
}) */
server.use(router)
server.listen(config.port, () => {
  console.log('JSON Server is running')
  console.log(`http://localhost:${config.port}`)
})

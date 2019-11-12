const jsonServer = require('json-server')
const server = jsonServer.create()
const db = require('./mockdb')
const wrapper = require('./wrapper')
const config = require('./config.json')
const routes = require('./route.json')
const router = jsonServer.router(db())
const middlewares = jsonServer.defaults()

router.render = (req, res) => {
  wrapper(req, res)
}

server.use(jsonServer.rewriter(routes))

server.use(middlewares)
server.use(router)
server.listen(config.port, () => {
  console.log('JSON Server is running')
  console.log(`http://localhost:${config.port}`)
})

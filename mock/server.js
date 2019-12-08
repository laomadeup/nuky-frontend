import jsonServer from 'json-server'
import pause from 'connect-pause'
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
server.use(pause(config.delay))
server.use(middlewares)
server.use(router)
server.listen(config.port, () => {
  console.log('JSON Server is running')
  console.log(`http://localhost:${config.port}`)
})

const path = require('path')
const jsonServer = require('json-server')

// Create the mock server
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

// // Add custom routes before JSON Server router
// server.get('/test', (req, res) => {
//     res.jsonp(req.query)
// })

// // To handle POST, PUT and PATCH you need to use a body-parser
// // You can use the one used by JSON Server
// server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

server.use('/', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

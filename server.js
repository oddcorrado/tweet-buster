'use strict'

const http = require('http')
const app = require('./app')
const config = require('./config')
const debug = require('debug')('server')

const server = http.createServer(app)

module.exports = server

server.listen(config.port, () => {
  debug('Server ready', server.address())
})


server.on('error', (error) => {
  debug('Error:', error)
  process.exit(1)
})

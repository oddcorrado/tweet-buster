'use strict'

const express = require('express')
const debug = require('debug')('app')
const app = express()
const twitterClient = require('./lib/twitterClient')
const socketioBroadcaster = require('./lib/socketioBroadcaster')
const _ = require('lodash')
const config = require('./config')

module.exports = app

// TODO more security coming later
app.disable('x-powered-by')

// npm install serve-static
app.use(express.static(__dirname + '/public'))

// Well a very basic 404 ...
app.use((req, res) => {
  debug('Page not found...')
  res.sendStatus(404)
})

// create the hashstream -- this will be moved just for quick test purpose
debug('Starting hashstream')
let hashStream = twitterClient.stream('statuses/filter', {track: config.hashtag})
hashStream.on('data', function (event) {
  // TODO just to make sure this is really a tweet, might need more insight later
  if(event && _.conformsTo(event, {id_str: _.isString, text: _.isString}))
  {
    debug(event.text)
    // simply tell socketioCaster to broadcast the message
    socketioBroadcaster.broadcast(event.text)
  }
})

hashStream.on('error', function (error) {
  debug('could not start twitter client')
  debug('Error:', error)
  throw error
})

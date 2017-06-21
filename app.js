'use strict'

const express = require('express')
const debug = require('debug')('app')
const debugTweets = require('debug')('app:tweets')
const app = express()
const twitterClient = require('./lib/twitterClient')
const socketioBroadcaster = require('./lib/socketioBroadcaster')
const _ = require('lodash')
const config = require('./config')
const events = require('events')

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

// Creating an event Emitter for the broadcaster so that we only stream if necessary
// the broadcaster will emit an  activate event when it is active
// and a deactivate event when it is inactive
let socketioBroadcasterEmitter = new events.EventEmitter()
let hashStream = null

// Register this emitter to the broacast emitter
socketioBroadcaster.registerEmitter(socketioBroadcasterEmitter)

// When the broacaster is active start the tweeter stream
socketioBroadcasterEmitter.on('activate',() => {
  // create the hashstream
  debug('Starting hashstream')
  hashStream = twitterClient.stream('statuses/filter', {track: config.hashtag})
  hashStream.on('data', function (event) {
    // TODO just to make sure this is really a tweet, might need more insight later
    if(event && _.conformsTo(event, {id_str: _.isString, text: _.isString}))
    {
      debugTweets(event.text)
      // simply tell socketioCaster to broadcast the message
      socketioBroadcaster.broadcast(event.text)
    }
  })

  hashStream.on('error', function (error) {
    debug('could not start twitter client')
    debug('Error:', error)
    throw error
  })
})

// When the broacaster is inactive destroy the tweeter stream
socketioBroadcasterEmitter.on('deactivate',() => {
  debug('Destroying hashstream')
  hashStream.destroy()
})

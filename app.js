'use strict'

const express = require('express')
const debug = require('debug')('app')
const app = express()
const twitterClient = require('./lib/twitterClient')
const _ = require('lodash')

module.exports = app

// TODO more security coming later
app.disable('x-powered-by')

// A basic smoketest ...
app.get('/', (req, res) => {
  debug('Root request')
  res.send('WIP stay tuned....')
})

// Well a very basic 404 ...
app.use((req, res) => {
  debug('Page not found...')
  res.sendStatus(404)
})

// create the hashstream -- this will be moved just for quick test purpose
debug('Starting hashstream')
let hashStream = twitterClient.stream('statuses/filter', {track: '#trump'})
hashStream.on('data', function(event) {
  // TODO just to make sure this is really a tweet, might need more insight later
  if(event && _.conformsTo(event, {id_str: _.isString, text: _.isString}))
  {
    debug("*************")
    debug(event.text)
  }
})

hashStream.on('error', function(error) {
  debug('could not start twitter client')
  debug('Error:', error)
  throw error;
})

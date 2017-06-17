'use strict'

const express = require('express')
const debug = require('debug')('app')
const app = express()

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

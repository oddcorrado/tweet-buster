
'use strict'

const twitter = require('twitter')
const debug = require('debug')('app:twitterClient')

// Get the keys and token
// they can be specified either in the secret config file or in the environment
debug('Getting keys and tokens')
let secret = {}
try {
  // first try to get them fromthe secret config file
  secret = require('../config/secret/twitter')
} catch(e) {
  // if they were not found inthe secret config file try to get them from the environment variables
  debug('could not find secret in config, reverting to ENV values')
  secret = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  }
}

debug('Starting client')
const client = new twitter(secret)

module.exports = client

tweet-buster
============

`tweet-buster` is an exercise I am currently building for an internship contest

This a work-in-progress... stay tuned

Install
-------
```
npm install
```

Usage
-----

You will need valid Twitter developer credentials in the form of a set of consumer and access tokens/keys.  You can get these [here](https://apps.twitter.com/).  For this app you only need to set-up read permissions.

You can provide your credentials either through environment variables in:
```
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN_KEY
TWITTER_ACCESS_TOKEN_SECRET
```

Or you can provide them in the secret config folder : simply create a twitter.js file in config/secret with the following content and set your keys/tokens accordingly:
```
module.exports = {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
}
```


You can configure some of the app behaviour from the environment variables and/or by overriding settings in config/index.js, please note environment takes precedence over config file settings:
1.  port number is configured in the `SERVER_PORT` environment variable
2.  hashtag to filter is configured in the `HASHTAG` environment variable

Launch
-------
```
npm run start
```

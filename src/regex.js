const hashtags = require('hashtag-regex')

const entry = /^\s*([\d\.]+)(\s+(.+))?/
const tags = hashtags()

module.exports = { entry, tags }

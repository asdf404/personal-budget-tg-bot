const sinon = require('sinon')

function create () {
  return {
    sendMessage: sinon.spy()
  }
}

module.exports = create

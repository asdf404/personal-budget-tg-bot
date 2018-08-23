const Enum = require('enum')

const Currencies = new Enum({
  RUB: 'RUB',
  USD: 'USD',
  EUR: 'EUR'
})

module.exports = {
  Currencies
}

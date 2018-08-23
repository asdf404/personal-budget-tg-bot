const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(TELEGRAM_TOKEN, {
  polling: true
})
const handlers = require('./handlers')
const regex = require('./regex')

bot.onText(/\/start/, handlers.start(bot))
bot.onText(/\/help/, handlers.help(bot))
bot.onText(/\/revert/, handlers.revert(bot))
bot.onText(/\/report/, handlers.report(bot))
// bot.onText(/\/dump/, handlers.dump(bot))
bot.onText(regex.entry, handlers.add(bot))

module.exports = bot

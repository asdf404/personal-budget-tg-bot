const interval = setInterval(() => {}, 100000)

function stop () {
  clearInterval(interval)
  process.exit(0)
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)

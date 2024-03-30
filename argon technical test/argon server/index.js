const app = require('./src/app')
const port = process.env.PORT
const env = process.env.NODE_ENV || 'local'

const server = app.listen(port, () => {
    console.log('INFO', `> Ready on ${port} [${env}]`)
})

server.timeout = 30 * 1000
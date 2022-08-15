const { authToken } = require('./src/middleware/auth')
const routerMap = [
    {path: '/', fileName: './src/router'},
    {path: '/auth', fileName: './src/router/auth'},
    {path: '/super-admin', fileName: './src/router/super-admin', middleware:[authToken]},
    {path: '/vender', fileName: './src/router/vender', middleware:[authToken]}

]

module.exports = routerMap

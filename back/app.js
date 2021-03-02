require('dotenv').config()
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const productoRouter = require('./controllers/productos')
const categoriaRouter = require('./controllers/categorias')
const pedidoRouter = require('./controllers/pedidos')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(()=>{
    logger.info('connected to MongoDB')
})
.catch((error)=>{
    logger.error('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/productos',productoRouter)
app.use('/api/categorias',categoriaRouter)
app.use('/api/pedidos', pedidoRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
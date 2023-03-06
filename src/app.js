const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const contentsRouter = require('./routes/contents')

const app = express()

// Configuração do middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Definição das rotas
app.use('/api/contents', contentsRouter)

// Configuração do middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
})

module.exports = app

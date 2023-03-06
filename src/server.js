const app = require('./app')
const db = require('./db')

// Define a porta que o servidor irá escutar
const PORT = process.env.PORT || 3000

// Conexão com o banco de dados
db.on('open', () => {
  console.log('Conectado ao banco de dados SQLite.')
})

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`)
})

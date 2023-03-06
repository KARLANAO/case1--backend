const sqlite3 = require('sqlite3').verbose()

// Abre a conexão com o banco de dados
const db = new sqlite3.Database('./database.sqlite')

// Cria a tabela de conteúdos, caso ainda não exista
db.run(`CREATE TABLE IF NOT EXISTS contents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed INTEGER NOT NULL
)`)

module.exports = db

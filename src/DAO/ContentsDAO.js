const sqlite3 = require('sqlite3').verbose()

class ContentsDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
        this.db.run(`CREATE TABLE IF NOT EXISTS contents (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          description TEXT,
          completed INTEGER
        )`)
      }
    })
  }

  create(title, description, completed, callback) {
    this.db.run(`INSERT INTO contents (title, description, completed)
      VALUES (?, ?, ?)`, [title, description, completed], function(err) {
      if (err) {
        return console.log(err.message)
      }
      console.log(`A new content was added with id ${this.lastID}`)
      callback(this.lastID)
    })
  }

  getAll(callback) {
    this.db.all(`SELECT * FROM contents`, [], (err, rows) => {
      if (err) {
        return console.log(err.message)
      }
      callback(rows)
    })
  }

  getById(id, callback) {
    this.db.get(`SELECT * FROM contents WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return console.log(err.message)
      }
      callback(row)
    })
  }

  update(id, title, description, completed, callback) {
    this.db.run(`UPDATE contents SET title = ?, description = ?, completed = ?
      WHERE id = ?`, [title, description, completed, id], (err) => {
      if (err) {
        return console.log(err.message)
      }
      console.log(`Content with id ${id} was updated`)
      callback()
    })
  }

  delete(id, callback) {
    this.db.run(`DELETE FROM contents WHERE id = ?`, [id], function(err) {
      if (err) {
        return console.log(err.message)
      }
      console.log(`Content with id ${id} was deleted`)
      callback()
    })
  }
}

module.exports = ContentsDAO

const sqlite3 = require('sqlite3').verbose();

// cria ou abre o banco de dados
const db = new sqlite3.Database('./data/lists.db');

// cria a tabela de listas
db.run(`
  CREATE TABLE IF NOT EXISTS lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// cria a tabela de tarefas
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    list_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    is_completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (list_id) REFERENCES lists(id)
  )
`);

// busca todas as listas de tarefas cadastradas
exports.getAllLists = (req, res) => {
  db.all('SELECT * FROM lists', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
};

// busca todas as tarefas de uma lista específica
exports.getTasksByListId = (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM tasks WHERE list_id = ?', [id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
};

// cria uma nova lista de tarefas
exports.createList = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
  } else {
    db.run('INSERT INTO lists (name) VALUES (?)', [name], function(err) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ id: this.lastID, name });
      }
    });
  }
};

// cria uma nova tarefa
exports.createTask = (req, res) => {
  const { list_id, description } = req.body;
  if (!list_id || !description) {
    res.status(400).json({ error: 'List ID and description are required' });
  } else {
    db.run('INSERT INTO tasks (list_id, description) VALUES (?, ?)', [list_id, description], function(err) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ id: this.lastID, list_id, description, is_completed: 0 });
      }
    });
  }
};

// atualiza uma tarefa existente
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { is_completed } = req.body;
  db.run('UPDATE tasks SET is_completed = ? WHERE id = ?', [is_completed, id], function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json({ id, is_completed });
    }
  });
};

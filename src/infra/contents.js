const express = require('express')
const ContentsController = require('../controllers/contentsController')

const router = express.Router()

const contentsController = new ContentsController()

// Rota para criar um novo conteúdo
router.post('/', (req, res) => {
  const { title, description, completed } = req.body
  contentsController.create(title, description, completed, (id) => {
    res.status(201).json({ id })
  })
})

// Rota para obter todos os conteúdos
router.get('/', (req, res) => {
  contentsController.getAll((contents) => {
    res.json(contents)
  })
})

// Rota para obter um conteúdo específico
router.get('/:id', (req, res) => {
  const { id } = req.params
  contentsController.getById(id, (content) => {
    if (content) {
      res.json(content)
    } else {
      res.status(404).end()
    }
  })
})

// Rota para atualizar um conteúdo existente
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title, description, completed } = req.body
  contentsController.update(id, title, description, completed, () => {
    res.status(204).end()
  })
})

// Rota para excluir um conteúdo existente
router.delete('/:id', (req, res) => {
  const { id } = req.params
  contentsController.delete(id, () => {
    res.status(204).end()
  })
})

module.exports = router

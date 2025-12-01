const express = require('express');
const {
  criarDisciplina,
  listarDisciplinas,
  atualizarDisciplina,
  removerDisciplina
} = require('../controllers/disciplinaController');

const router = express.Router();

router.post('/', criarDisciplina);
router.get('/', listarDisciplinas);
router.put('/:id', atualizarDisciplina);
router.delete('/:id', removerDisciplina);

module.exports = router;
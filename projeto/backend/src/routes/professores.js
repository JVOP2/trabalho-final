const express = require('express');
const {
  criarProfessor,
  listarProfessores,
  atualizarProfessor,
  removerProfessor
} = require('../controllers/professorController');

const router = express.Router();

router.post('/', criarProfessor);
router.get('/', listarProfessores);
router.put('/:id', atualizarProfessor);
router.delete('/:id', removerProfessor);

module.exports = router;
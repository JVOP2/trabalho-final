const express = require('express');
const {
  criarCurso,
  listarCursos,
  atualizarCurso,
  removerCurso
} = require('../controllers/cursoController');

const router = express.Router();

router.post('/', criarCurso);
router.get('/', listarCursos);
router.put('/:id', atualizarCurso);
router.delete('/:id', removerCurso);

module.exports = router;
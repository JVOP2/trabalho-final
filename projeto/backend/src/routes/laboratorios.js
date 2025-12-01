const express = require('express');
const {
  criarLaboratorio,
  listarLaboratorios,
  atualizarLaboratorio,
  removerLaboratorio
} = require('../controllers/laboratorioController');

const router = express.Router();

router.post('/', criarLaboratorio);
router.get('/', listarLaboratorios);
router.put('/:id', atualizarLaboratorio);
router.delete('/:id', removerLaboratorio);

module.exports = router;
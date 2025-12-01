const express = require('express');
const {
  criarBloco,
  listarBlocos,
  atualizarBloco,
  removerBloco
} = require('../controllers/blocoController');

const router = express.Router();

router.post('/', criarBloco);
router.get('/', listarBlocos);
router.put('/:id', atualizarBloco);
router.delete('/:id', removerBloco);

module.exports = router;
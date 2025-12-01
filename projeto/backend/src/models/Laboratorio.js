const mongoose = require('mongoose');

const laboratorioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
  },
  capacidade: {
    type: Number,
    required: [true, 'Capacidade é obrigatória'],
    min: [1, 'Capacidade deve ser maior que 0']
  },
  equipamentos: {
    type: String,
    trim: true,
    maxlength: [500, 'Equipamentos deve ter no máximo 500 caracteres']
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'laboratorios'
});

const Laboratorio = mongoose.model('Laboratorio', laboratorioSchema);
module.exports = Laboratorio;
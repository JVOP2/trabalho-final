const mongoose = require('mongoose');

const blocoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
  },
  numero: {
    type: String,
    required: [true, 'Número é obrigatório'],
    unique: true,
    trim: true
  },
  laboratorios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laboratorio'
  }],
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'blocos'
});

const Bloco = mongoose.model('Bloco', blocoSchema);
module.exports = Bloco;
const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email deve ter um formato válido']
  },
  telefone: {
    type: String,
    trim: true
  },
  especialidade: {
    type: String,
    required: [true, 'Especialidade é obrigatória'],
    trim: true
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'professores'
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;
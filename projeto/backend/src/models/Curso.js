const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
  },
  codigo: {
    type: String,
    required: [true, 'Código é obrigatório'],
    unique: true,
    trim: true
  },
  instituicao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instituicao',
    required: [true, 'Instituição é obrigatória']
  },
  cargaHoraria: {
    type: Number,
    required: [true, 'Carga horária é obrigatória'],
    min: [1, 'Carga horária deve ser maior que 0']
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'cursos'
});

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;
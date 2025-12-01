const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
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
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: [true, 'Curso é obrigatório']
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
  collection: 'disciplinas'
});

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);
module.exports = Disciplina;
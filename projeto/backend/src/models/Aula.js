/**
 * Modelo de Aula
 * @module Models/Aula
 */

const mongoose = require('mongoose');

const aulaSchema = new mongoose.Schema({
  semestre: {
    type: String,
    required: [true, 'Semestre é obrigatório'],
    trim: true
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: [true, 'Curso é obrigatório']
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciplina',
    required: [true, 'Disciplina é obrigatória']
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: [true, 'Professor é obrigatório']
  },
  laboratorio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laboratorio',
    required: [true, 'Laboratório é obrigatório']
  },
  diaSemana: {
    type: String,
    required: [true, 'Dia da semana é obrigatório'],
    enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  },
  blocos: [{
    type: String,
    required: true
  }],
  dataInicio: {
    type: Date,
    required: [true, 'Data de início é obrigatória']
  },
  dataFim: {
    type: Date,
    required: [true, 'Data de fim é obrigatória']
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para otimizar consultas de conflito
aulaSchema.index({ laboratorio: 1, diaSemana: 1, blocos: 1 });
aulaSchema.index({ professor: 1, diaSemana: 1, blocos: 1 });

module.exports = mongoose.model('Aula', aulaSchema);

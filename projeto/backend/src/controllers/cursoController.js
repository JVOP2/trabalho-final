const Curso = require('../models/Curso');

const criarCurso = async (req, res, next) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    next(error);
  }
};

const listarCursos = async (req, res, next) => {
  try {
    const { ativo, nome, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (ativo !== undefined) {
      filter.ativo = ativo === 'true';
    }

    if (nome) {
      filter.nome = { $regex: nome, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const cursos = await Curso.find(filter)
      .populate('instituicao', 'nome')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ nome: 1 });

    res.json(cursos);
  } catch (error) {
    next(error);
  }
};

const atualizarCurso = async (req, res, next) => {
  try {
    const curso = await Curso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('instituicao', 'nome');

    if (!curso) {
      return res.status(404).json({
        message: 'Curso não encontrado'
      });
    }

    res.json(curso);
  } catch (error) {
    next(error);
  }
};

const removerCurso = async (req, res, next) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);

    if (!curso) {
      return res.status(404).json({
        message: 'Curso não encontrado'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criarCurso,
  listarCursos,
  atualizarCurso,
  removerCurso
};
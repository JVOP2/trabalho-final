const Disciplina = require('../models/Disciplina');

const criarDisciplina = async (req, res, next) => {
  try {
    const disciplina = await Disciplina.create(req.body);
    res.status(201).json(disciplina);
  } catch (error) {
    next(error);
  }
};

const listarDisciplinas = async (req, res, next) => {
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
    const disciplinas = await Disciplina.find(filter)
      .populate('curso', 'nome codigo')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ nome: 1 });

    res.json(disciplinas);
  } catch (error) {
    next(error);
  }
};

const atualizarDisciplina = async (req, res, next) => {
  try {
    const disciplina = await Disciplina.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('curso', 'nome codigo');

    if (!disciplina) {
      return res.status(404).json({
        message: 'Disciplina não encontrada'
      });
    }

    res.json(disciplina);
  } catch (error) {
    next(error);
  }
};

const removerDisciplina = async (req, res, next) => {
  try {
    const disciplina = await Disciplina.findByIdAndDelete(req.params.id);

    if (!disciplina) {
      return res.status(404).json({
        message: 'Disciplina não encontrada'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criarDisciplina,
  listarDisciplinas,
  atualizarDisciplina,
  removerDisciplina
};
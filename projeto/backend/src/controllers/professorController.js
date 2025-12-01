const Professor = require('../models/Professor');

const criarProfessor = async (req, res, next) => {
  try {
    const professor = await Professor.create(req.body);
    res.status(201).json(professor);
  } catch (error) {
    next(error);
  }
};

const listarProfessores = async (req, res, next) => {
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
    const professores = await Professor.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ nome: 1 });

    res.json(professores);
  } catch (error) {
    next(error);
  }
};

const atualizarProfessor = async (req, res, next) => {
  try {
    const professor = await Professor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!professor) {
      return res.status(404).json({
        message: 'Professor não encontrado'
      });
    }

    res.json(professor);
  } catch (error) {
    next(error);
  }
};

const removerProfessor = async (req, res, next) => {
  try {
    const professor = await Professor.findByIdAndDelete(req.params.id);

    if (!professor) {
      return res.status(404).json({
        message: 'Professor não encontrado'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criarProfessor,
  listarProfessores,
  atualizarProfessor,
  removerProfessor
};
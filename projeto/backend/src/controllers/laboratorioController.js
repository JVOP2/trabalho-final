const Laboratorio = require('../models/Laboratorio');

const criarLaboratorio = async (req, res, next) => {
  try {
    const laboratorio = await Laboratorio.create(req.body);
    res.status(201).json(laboratorio);
  } catch (error) {
    next(error);
  }
};

const listarLaboratorios = async (req, res, next) => {
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
    const laboratorios = await Laboratorio.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ nome: 1 });

    res.json(laboratorios);
  } catch (error) {
    next(error);
  }
};

const atualizarLaboratorio = async (req, res, next) => {
  try {
    const laboratorio = await Laboratorio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!laboratorio) {
      return res.status(404).json({
        message: 'Laboratório não encontrado'
      });
    }

    res.json(laboratorio);
  } catch (error) {
    next(error);
  }
};

const removerLaboratorio = async (req, res, next) => {
  try {
    const laboratorio = await Laboratorio.findByIdAndDelete(req.params.id);

    if (!laboratorio) {
      return res.status(404).json({
        message: 'Laboratório não encontrado'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criarLaboratorio,
  listarLaboratorios,
  atualizarLaboratorio,
  removerLaboratorio
};
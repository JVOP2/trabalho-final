const Bloco = require('../models/Bloco');

const criarBloco = async (req, res, next) => {
  try {
    const bloco = await Bloco.create(req.body);
    res.status(201).json(bloco);
  } catch (error) {
    next(error);
  }
};

const listarBlocos = async (req, res, next) => {
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
    const blocos = await Bloco.find(filter)
      .populate('laboratorios', 'nome capacidade')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ nome: 1 });

    res.json(blocos);
  } catch (error) {
    next(error);
  }
};

const atualizarBloco = async (req, res, next) => {
  try {
    const bloco = await Bloco.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('laboratorios', 'nome capacidade');

    if (!bloco) {
      return res.status(404).json({
        message: 'Bloco não encontrado'
      });
    }

    res.json(bloco);
  } catch (error) {
    next(error);
  }
};

const removerBloco = async (req, res, next) => {
  try {
    const bloco = await Bloco.findByIdAndDelete(req.params.id);

    if (!bloco) {
      return res.status(404).json({
        message: 'Bloco não encontrado'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criarBloco,
  listarBlocos,
  atualizarBloco,
  removerBloco
};
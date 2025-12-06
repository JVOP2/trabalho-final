/**
 * Controller de Aulas
 * @module Controllers/Aula
 */

const Aula = require('../models/Aula');

/**
 * Verifica conflitos de laboratório e professor
 */
async function verificarConflitos(aulaData, aulaId = null) {
  const { laboratorio, professor, diaSemana, blocos } = aulaData;
  
  const query = {
    diaSemana,
    blocos: { $in: blocos },
    ativo: true
  };
  
  if (aulaId) {
    query._id = { $ne: aulaId };
  }

  // Verifica conflito de laboratório
  const conflitoLab = await Aula.findOne({
    ...query,
    laboratorio
  }).populate('disciplina professor laboratorio');

  if (conflitoLab) {
    return {
      conflito: true,
      tipo: 'laboratorio',
      mensagem: `Laboratório já ocupado no ${diaSemana} nos blocos ${blocos.join(', ')}`,
      aula: conflitoLab
    };
  }

  // Verifica conflito de professor
  const conflitoProf = await Aula.findOne({
    ...query,
    professor
  }).populate('disciplina professor laboratorio');

  if (conflitoProf) {
    return {
      conflito: true,
      tipo: 'professor',
      mensagem: `Professor já alocado no ${diaSemana} nos blocos ${blocos.join(', ')}`,
      aula: conflitoProf
    };
  }

  return { conflito: false };
}

/**
 * Criar nova aula
 */
exports.criar = async (req, res) => {
  try {
    const conflito = await verificarConflitos(req.body);
    
    if (conflito.conflito) {
      return res.status(409).json({
        sucesso: false,
        mensagem: conflito.mensagem,
        tipo: conflito.tipo,
        aulaConflitante: conflito.aula
      });
    }

    const aula = await Aula.create(req.body);
    const aulaPopulada = await Aula.findById(aula._id)
      .populate('curso disciplina professor laboratorio');

    res.status(201).json({
      sucesso: true,
      mensagem: 'Aula criada com sucesso',
      dados: aulaPopulada
    });
  } catch (erro) {
    res.status(400).json({
      sucesso: false,
      mensagem: erro.message
    });
  }
};

/**
 * Listar aulas com filtros
 */
exports.listar = async (req, res) => {
  try {
    const { 
      laboratorioId, 
      professorId, 
      cursoId, 
      disciplinaId, 
      diaSemana,
      semestre,
      page = 1, 
      limit = 50 
    } = req.query;

    const filtro = {};
    
    if (laboratorioId) filtro.laboratorio = laboratorioId;
    if (professorId) filtro.professor = professorId;
    if (cursoId) filtro.curso = cursoId;
    if (disciplinaId) filtro.disciplina = disciplinaId;
    if (diaSemana) filtro.diaSemana = diaSemana;
    if (semestre) filtro.semestre = semestre;

    const skip = (page - 1) * limit;

    const aulas = await Aula.find(filtro)
      .populate('curso disciplina professor laboratorio')
      .sort({ diaSemana: 1, blocos: 1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Aula.countDocuments(filtro);

    res.json({
      sucesso: true,
      dados: aulas,
      paginacao: {
        total,
        pagina: parseInt(page),
        limite: parseInt(limit),
        paginas: Math.ceil(total / limit)
      }
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: erro.message
    });
  }
};

/**
 * Buscar aula por ID
 */
exports.buscarPorId = async (req, res) => {
  try {
    const aula = await Aula.findById(req.params.id)
      .populate('curso disciplina professor laboratorio');

    if (!aula) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Aula não encontrada'
      });
    }

    res.json({
      sucesso: true,
      dados: aula
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: erro.message
    });
  }
};

/**
 * Atualizar aula
 */
exports.atualizar = async (req, res) => {
  try {
    const conflito = await verificarConflitos(req.body, req.params.id);
    
    if (conflito.conflito) {
      return res.status(409).json({
        sucesso: false,
        mensagem: conflito.mensagem,
        tipo: conflito.tipo,
        aulaConflitante: conflito.aula
      });
    }

    const aula = await Aula.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('curso disciplina professor laboratorio');

    if (!aula) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Aula não encontrada'
      });
    }

    res.json({
      sucesso: true,
      mensagem: 'Aula atualizada com sucesso',
      dados: aula
    });
  } catch (erro) {
    res.status(400).json({
      sucesso: false,
      mensagem: erro.message
    });
  }
};

/**
 * Remover aula
 */
exports.remover = async (req, res) => {
  try {
    const aula = await Aula.findByIdAndDelete(req.params.id);

    if (!aula) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Aula não encontrada'
      });
    }

    res.json({
      sucesso: true,
      mensagem: 'Aula removida com sucesso'
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: erro.message
    });
  }
};

/**
 * Obter grade semanal
 */
exports.gradeSemanal = async (req, res) => {
  try {
    const { laboratorioId, professorId, semestre } = req.query;
    
    const filtro = { ativo: true };
    if (laboratorioId) filtro.laboratorio = laboratorioId;
    if (professorId) filtro.professor = professorId;
    if (semestre) filtro.semestre = semestre;

    const aulas = await Aula.find(filtro)
      .populate('curso disciplina professor laboratorio')
      .sort({ diaSemana: 1, blocos: 1 });

    // Organizar em grade
    const grade = {
      'Segunda': [],
      'Terça': [],
      'Quarta': [],
      'Quinta': [],
      'Sexta': [],
      'Sábado': []
    };

    aulas.forEach(aula => {
      grade[aula.diaSemana].push(aula);
    });

    res.json({
      sucesso: true,
      dados: grade
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: erro.message
    });
  }
};

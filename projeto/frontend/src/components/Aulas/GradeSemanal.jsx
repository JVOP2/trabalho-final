import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import api from '../../services/api';

const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const blocos = ['M1', 'M2', 'M3', 'M4', 'T1', 'T2', 'T3', 'T4', 'N1', 'N2', 'N3', 'N4'];

export default function GradeSemanal() {
  const [grade, setGrade] = useState({});
  const [laboratorios, setLaboratorios] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [filtroLab, setFiltroLab] = useState('');
  const [filtroProf, setFiltroProf] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarFiltros();
  }, []);

  useEffect(() => {
    carregarGrade();
  }, [filtroLab, filtroProf]);

  const carregarFiltros = async () => {
    try {
      const [labRes, profRes] = await Promise.all([
        api.get('/laboratorios'),
        api.get('/professores')
      ]);
      setLaboratorios(labRes.data.dados || []);
      setProfessores(profRes.data.dados || []);
    } catch (error) {
      console.error('Erro ao carregar filtros:', error);
    }
  };

  const carregarGrade = async () => {
    setLoading(true);
    setErro('');
    try {
      const params = {};
      if (filtroLab) params.laboratorioId = filtroLab;
      if (filtroProf) params.professorId = filtroProf;

      const response = await api.get('/aulas/grade-semanal', { params });
      setGrade(response.data.dados || {});
    } catch (error) {
      setErro('Erro ao carregar grade semanal');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAulaPorDiaBloco = (dia, bloco) => {
    const aulasDia = grade[dia] || [];
    return aulasDia.find(aula => aula.blocos.includes(bloco));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Grade Semanal de Aulas
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Laboratório</InputLabel>
          <Select
            value={filtroLab}
            onChange={(e) => setFiltroLab(e.target.value)}
            label="Laboratório"
          >
            <MenuItem value="">Todos</MenuItem>
            {laboratorios.map(lab => (
              <MenuItem key={lab._id} value={lab._id}>
                {lab.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Professor</InputLabel>
          <Select
            value={filtroProf}
            onChange={(e) => setFiltroProf(e.target.value)}
            label="Professor"
          >
            <MenuItem value="">Todos</MenuItem>
            {professores.map(prof => (
              <MenuItem key={prof._id} value={prof._id}>
                {prof.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: 80 }}>Bloco</TableCell>
                {diasSemana.map(dia => (
                  <TableCell key={dia} sx={{ fontWeight: 'bold' }}>
                    {dia}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {blocos.map(bloco => (
                <TableRow key={bloco}>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                    {bloco}
                  </TableCell>
                  {diasSemana.map(dia => {
                    const aula = getAulaPorDiaBloco(dia, bloco);
                    return (
                      <TableCell 
                        key={`${dia}-${bloco}`}
                        sx={{ 
                          bgcolor: aula ? '#e3f2fd' : 'inherit',
                          fontSize: '0.75rem',
                          p: 0.5
                        }}
                      >
                        {aula && (
                          <Box>
                            <Typography variant="caption" display="block" fontWeight="bold">
                              {aula.disciplina?.nome}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {aula.professor?.nome}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.secondary">
                              {aula.laboratorio?.nome}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

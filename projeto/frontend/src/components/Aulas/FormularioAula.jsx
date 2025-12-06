import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  Chip,
  OutlinedInput
} from '@mui/material';
import api from '../../services/api';

const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const blocosDisponiveis = ['M1', 'M2', 'M3', 'M4', 'T1', 'T2', 'T3', 'T4', 'N1', 'N2', 'N3', 'N4'];

export default function FormularioAula({ open, onClose, onSalvar, aulaEditar }) {
  const [formData, setFormData] = useState({
    semestre: '',
    curso: '',
    disciplina: '',
    professor: '',
    laboratorio: '',
    diaSemana: '',
    blocos: [],
    dataInicio: '',
    dataFim: ''
  });
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (open) {
      carregarDados();
      if (aulaEditar) {
        setFormData({
          semestre: aulaEditar.semestre,
          curso: aulaEditar.curso._id,
          disciplina: aulaEditar.disciplina._id,
          professor: aulaEditar.professor._id,
          laboratorio: aulaEditar.laboratorio._id,
          diaSemana: aulaEditar.diaSemana,
          blocos: aulaEditar.blocos,
          dataInicio: aulaEditar.dataInicio.split('T')[0],
          dataFim: aulaEditar.dataFim.split('T')[0]
        });
      }
    }
  }, [open, aulaEditar]);

  const carregarDados = async () => {
    try {
      const [cursosRes, disciplinasRes, professoresRes, laboratoriosRes] = await Promise.all([
        api.get('/cursos'),
        api.get('/disciplinas'),
        api.get('/professores'),
        api.get('/laboratorios')
      ]);
      setCursos(cursosRes.data.dados || []);
      setDisciplinas(disciplinasRes.data.dados || []);
      setProfessores(professoresRes.data.dados || []);
      setLaboratorios(laboratoriosRes.data.dados || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    
    try {
      if (aulaEditar) {
        await api.put(`/aulas/${aulaEditar._id}`, formData);
      } else {
        await api.post('/aulas', formData);
      }
      onSalvar();
      handleClose();
    } catch (error) {
      if (error.response?.status === 409) {
        setErro(error.response.data.mensagem);
      } else {
        setErro('Erro ao salvar aula');
      }
    }
  };

  const handleClose = () => {
    setFormData({
      semestre: '',
      curso: '',
      disciplina: '',
      professor: '',
      laboratorio: '',
      diaSemana: '',
      blocos: [],
      dataInicio: '',
      dataFim: ''
    });
    setErro('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{aulaEditar ? 'Editar Aula' : 'Nova Aula'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Semestre"
              value={formData.semestre}
              onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
              required
              fullWidth
            />

            <FormControl fullWidth required>
              <InputLabel>Curso</InputLabel>
              <Select
                value={formData.curso}
                onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                label="Curso"
              >
                {cursos.map(curso => (
                  <MenuItem key={curso._id} value={curso._id}>
                    {curso.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Disciplina</InputLabel>
              <Select
                value={formData.disciplina}
                onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
                label="Disciplina"
              >
                {disciplinas.map(disc => (
                  <MenuItem key={disc._id} value={disc._id}>
                    {disc.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Professor</InputLabel>
              <Select
                value={formData.professor}
                onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                label="Professor"
              >
                {professores.map(prof => (
                  <MenuItem key={prof._id} value={prof._id}>
                    {prof.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Laboratório</InputLabel>
              <Select
                value={formData.laboratorio}
                onChange={(e) => setFormData({ ...formData, laboratorio: e.target.value })}
                label="Laboratório"
              >
                {laboratorios.map(lab => (
                  <MenuItem key={lab._id} value={lab._id}>
                    {lab.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Dia da Semana</InputLabel>
              <Select
                value={formData.diaSemana}
                onChange={(e) => setFormData({ ...formData, diaSemana: e.target.value })}
                label="Dia da Semana"
              >
                {diasSemana.map(dia => (
                  <MenuItem key={dia} value={dia}>
                    {dia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Blocos</InputLabel>
              <Select
                multiple
                value={formData.blocos}
                onChange={(e) => setFormData({ ...formData, blocos: e.target.value })}
                input={<OutlinedInput label="Blocos" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {blocosDisponiveis.map((bloco) => (
                  <MenuItem key={bloco} value={bloco}>
                    {bloco}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Data Início"
              type="date"
              value={formData.dataInicio}
              onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Data Fim"
              type="date"
              value={formData.dataFim}
              onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

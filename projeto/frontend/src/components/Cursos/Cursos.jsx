import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Snackbar, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import api from '../../services/api';

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ nome: '', codigo: '', instituicao: '', cargaHoraria: '' });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [cursosRes, instRes] = await Promise.all([
        api.get('/cursos'),
        api.get('/instituicoes')
      ]);
      setCursos(cursosRes.data.dados || []);
      setInstituicoes(instRes.data.dados || []);
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao carregar dados', severity: 'error' });
    }
  };

  const abrirDialog = (curso = null) => {
    if (curso) {
      setEditingId(curso._id);
      setFormData({ nome: curso.nome, codigo: curso.codigo, instituicao: curso.instituicao?._id || '', cargaHoraria: curso.cargaHoraria });
    } else {
      setEditingId(null);
      setFormData({ nome: '', codigo: '', instituicao: '', cargaHoraria: '' });
    }
    setDialogOpen(true);
  };

  const salvar = async () => {
    try {
      if (editingId) {
        await api.put(`/cursos/${editingId}`, formData);
        setSnackbar({ open: true, message: 'Curso atualizado', severity: 'success' });
      } else {
        await api.post('/cursos', formData);
        setSnackbar({ open: true, message: 'Curso criado', severity: 'success' });
      }
      setDialogOpen(false);
      carregarDados();
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao salvar', severity: 'error' });
    }
  };

  const remover = async (id) => {
    if (window.confirm('Remover curso?')) {
      try {
        await api.delete(`/cursos/${id}`);
        setSnackbar({ open: true, message: 'Curso removido', severity: 'success' });
        carregarDados();
      } catch (error) {
        setSnackbar({ open: true, message: 'Erro ao remover', severity: 'error' });
      }
    }
  };

  const filtrados = cursos.filter(c => c.nome?.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => abrirDialog()}>Novo Curso</Button>
          <TextField size="small" placeholder="Filtrar..." value={filtro} onChange={(e) => setFiltro(e.target.value)} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Instituição</TableCell>
              <TableCell>Carga Horária</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrados.map(curso => (
              <TableRow key={curso._id}>
                <TableCell>{curso.nome}</TableCell>
                <TableCell>{curso.codigo}</TableCell>
                <TableCell>{curso.instituicao?.nome}</TableCell>
                <TableCell>{curso.cargaHoraria}h</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => abrirDialog(curso)} color="primary"><EditIcon /></IconButton>
                  <IconButton size="small" onClick={() => remover(curso._id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Editar Curso' : 'Novo Curso'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Nome *" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} fullWidth required />
            <TextField label="Código *" value={formData.codigo} onChange={(e) => setFormData({ ...formData, codigo: e.target.value })} fullWidth required />
            <FormControl fullWidth required>
              <InputLabel>Instituição</InputLabel>
              <Select value={formData.instituicao} onChange={(e) => setFormData({ ...formData, instituicao: e.target.value })} label="Instituição">
                {instituicoes.map(inst => <MenuItem key={inst._id} value={inst._id}>{inst.nome}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Carga Horária" type="number" value={formData.cargaHoraria} onChange={(e) => setFormData({ ...formData, cargaHoraria: e.target.value })} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={salvar} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

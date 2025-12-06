import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Snackbar, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import api from '../../services/api';

export default function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ nome: '', codigo: '', curso: '', cargaHoraria: '' });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [discRes, cursosRes] = await Promise.all([api.get('/disciplinas'), api.get('/cursos')]);
      setDisciplinas(discRes.data.dados || []);
      setCursos(cursosRes.data.dados || []);
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao carregar', severity: 'error' });
    }
  };

  const abrirDialog = (disc = null) => {
    if (disc) {
      setEditingId(disc._id);
      setFormData({ nome: disc.nome, codigo: disc.codigo, curso: disc.curso?._id || '', cargaHoraria: disc.cargaHoraria });
    } else {
      setEditingId(null);
      setFormData({ nome: '', codigo: '', curso: '', cargaHoraria: '' });
    }
    setDialogOpen(true);
  };

  const salvar = async () => {
    try {
      if (editingId) {
        await api.put(`/disciplinas/${editingId}`, formData);
        setSnackbar({ open: true, message: 'Disciplina atualizada', severity: 'success' });
      } else {
        await api.post('/disciplinas', formData);
        setSnackbar({ open: true, message: 'Disciplina criada', severity: 'success' });
      }
      setDialogOpen(false);
      carregarDados();
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao salvar', severity: 'error' });
    }
  };

  const remover = async (id) => {
    if (window.confirm('Remover disciplina?')) {
      try {
        await api.delete(`/disciplinas/${id}`);
        setSnackbar({ open: true, message: 'Disciplina removida', severity: 'success' });
        carregarDados();
      } catch (error) {
        setSnackbar({ open: true, message: 'Erro ao remover', severity: 'error' });
      }
    }
  };

  const filtrados = disciplinas.filter(d => d.nome?.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => abrirDialog()}>Nova Disciplina</Button>
          <TextField size="small" placeholder="Filtrar..." value={filtro} onChange={(e) => setFiltro(e.target.value)} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Carga Horária</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrados.map(disc => (
              <TableRow key={disc._id}>
                <TableCell>{disc.nome}</TableCell>
                <TableCell>{disc.codigo}</TableCell>
                <TableCell>{disc.curso?.nome}</TableCell>
                <TableCell>{disc.cargaHoraria}h</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => abrirDialog(disc)} color="primary"><EditIcon /></IconButton>
                  <IconButton size="small" onClick={() => remover(disc._id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Editar Disciplina' : 'Nova Disciplina'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Nome *" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} fullWidth required />
            <TextField label="Código *" value={formData.codigo} onChange={(e) => setFormData({ ...formData, codigo: e.target.value })} fullWidth required />
            <FormControl fullWidth required>
              <InputLabel>Curso</InputLabel>
              <Select value={formData.curso} onChange={(e) => setFormData({ ...formData, curso: e.target.value })} label="Curso">
                {cursos.map(c => <MenuItem key={c._id} value={c._id}>{c.nome}</MenuItem>)}
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

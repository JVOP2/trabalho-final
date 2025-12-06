import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Snackbar, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import api from '../../services/api';

export default function Professores() {
  const [professores, setProfessores] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', especialidade: '' });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await api.get('/professores');
      setProfessores(res.data.dados || []);
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao carregar', severity: 'error' });
    }
  };

  const abrirDialog = (prof = null) => {
    if (prof) {
      setEditingId(prof._id);
      setFormData({ nome: prof.nome, email: prof.email, telefone: prof.telefone, especialidade: prof.especialidade });
    } else {
      setEditingId(null);
      setFormData({ nome: '', email: '', telefone: '', especialidade: '' });
    }
    setDialogOpen(true);
  };

  const salvar = async () => {
    try {
      if (editingId) {
        await api.put(`/professores/${editingId}`, formData);
        setSnackbar({ open: true, message: 'Professor atualizado', severity: 'success' });
      } else {
        await api.post('/professores', formData);
        setSnackbar({ open: true, message: 'Professor criado', severity: 'success' });
      }
      setDialogOpen(false);
      carregarDados();
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao salvar', severity: 'error' });
    }
  };

  const remover = async (id) => {
    if (window.confirm('Remover professor?')) {
      try {
        await api.delete(`/professores/${id}`);
        setSnackbar({ open: true, message: 'Professor removido', severity: 'success' });
        carregarDados();
      } catch (error) {
        setSnackbar({ open: true, message: 'Erro ao remover', severity: 'error' });
      }
    }
  };

  const filtrados = professores.filter(p => p.nome?.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => abrirDialog()}>Novo Professor</Button>
          <TextField size="small" placeholder="Filtrar..." value={filtro} onChange={(e) => setFiltro(e.target.value)} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Especialidade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrados.map(prof => (
              <TableRow key={prof._id}>
                <TableCell>{prof.nome}</TableCell>
                <TableCell>{prof.email}</TableCell>
                <TableCell>{prof.telefone}</TableCell>
                <TableCell>{prof.especialidade}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => abrirDialog(prof)} color="primary"><EditIcon /></IconButton>
                  <IconButton size="small" onClick={() => remover(prof._id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Editar Professor' : 'Novo Professor'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Nome *" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} fullWidth required />
            <TextField label="Email *" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} fullWidth required />
            <TextField label="Telefone" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} fullWidth />
            <TextField label="Especialidade" value={formData.especialidade} onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })} fullWidth />
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

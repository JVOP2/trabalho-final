import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Snackbar, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import api from '../../services/api';

export default function Blocos() {
  const [blocos, setBlocos] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ nome: '', numero: '' });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await api.get('/blocos');
      setBlocos(res.data.dados || []);
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao carregar', severity: 'error' });
    }
  };

  const abrirDialog = (bloco = null) => {
    if (bloco) {
      setEditingId(bloco._id);
      setFormData({ nome: bloco.nome, numero: bloco.numero });
    } else {
      setEditingId(null);
      setFormData({ nome: '', numero: '' });
    }
    setDialogOpen(true);
  };

  const salvar = async () => {
    try {
      if (editingId) {
        await api.put(`/blocos/${editingId}`, formData);
        setSnackbar({ open: true, message: 'Bloco atualizado', severity: 'success' });
      } else {
        await api.post('/blocos', formData);
        setSnackbar({ open: true, message: 'Bloco criado', severity: 'success' });
      }
      setDialogOpen(false);
      carregarDados();
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao salvar', severity: 'error' });
    }
  };

  const remover = async (id) => {
    if (window.confirm('Remover bloco?')) {
      try {
        await api.delete(`/blocos/${id}`);
        setSnackbar({ open: true, message: 'Bloco removido', severity: 'success' });
        carregarDados();
      } catch (error) {
        setSnackbar({ open: true, message: 'Erro ao remover', severity: 'error' });
      }
    }
  };

  const filtrados = blocos.filter(b => b.nome?.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => abrirDialog()}>Novo Bloco</Button>
          <TextField size="small" placeholder="Filtrar..." value={filtro} onChange={(e) => setFiltro(e.target.value)} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrados.map(bloco => (
              <TableRow key={bloco._id}>
                <TableCell>{bloco.nome}</TableCell>
                <TableCell>{bloco.numero}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => abrirDialog(bloco)} color="primary"><EditIcon /></IconButton>
                  <IconButton size="small" onClick={() => remover(bloco._id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Editar Bloco' : 'Novo Bloco'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Nome *" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} fullWidth required />
            <TextField label="Número *" value={formData.numero} onChange={(e) => setFormData({ ...formData, numero: e.target.value })} fullWidth required />
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

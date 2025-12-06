import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Snackbar, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import api from '../../services/api';

export default function Laboratorios() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ nome: '', capacidade: '', equipamentos: [] });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await api.get('/laboratorios');
      setLaboratorios(res.data.dados || []);
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao carregar', severity: 'error' });
    }
  };

  const abrirDialog = (lab = null) => {
    if (lab) {
      setEditingId(lab._id);
      setFormData({ nome: lab.nome, capacidade: lab.capacidade, equipamentos: lab.equipamentos || [] });
    } else {
      setEditingId(null);
      setFormData({ nome: '', capacidade: '', equipamentos: [] });
    }
    setDialogOpen(true);
  };

  const salvar = async () => {
    try {
      const data = { ...formData, equipamentos: formData.equipamentos.length ? formData.equipamentos : [] };
      if (editingId) {
        await api.put(`/laboratorios/${editingId}`, data);
        setSnackbar({ open: true, message: 'Laboratório atualizado', severity: 'success' });
      } else {
        await api.post('/laboratorios', data);
        setSnackbar({ open: true, message: 'Laboratório criado', severity: 'success' });
      }
      setDialogOpen(false);
      carregarDados();
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao salvar', severity: 'error' });
    }
  };

  const remover = async (id) => {
    if (window.confirm('Remover laboratório?')) {
      try {
        await api.delete(`/laboratorios/${id}`);
        setSnackbar({ open: true, message: 'Laboratório removido', severity: 'success' });
        carregarDados();
      } catch (error) {
        setSnackbar({ open: true, message: 'Erro ao remover', severity: 'error' });
      }
    }
  };

  const filtrados = laboratorios.filter(l => l.nome?.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => abrirDialog()}>Novo Laboratório</Button>
          <TextField size="small" placeholder="Filtrar..." value={filtro} onChange={(e) => setFiltro(e.target.value)} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Capacidade</TableCell>
              <TableCell>Equipamentos</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrados.map(lab => (
              <TableRow key={lab._id}>
                <TableCell>{lab.nome}</TableCell>
                <TableCell>{lab.capacidade}</TableCell>
                <TableCell>{lab.equipamentos?.join(', ')}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => abrirDialog(lab)} color="primary"><EditIcon /></IconButton>
                  <IconButton size="small" onClick={() => remover(lab._id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Editar Laboratório' : 'Novo Laboratório'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Nome *" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} fullWidth required />
            <TextField label="Capacidade" type="number" value={formData.capacidade} onChange={(e) => setFormData({ ...formData, capacidade: e.target.value })} fullWidth />
            <TextField label="Equipamentos (separados por vírgula)" value={formData.equipamentos.join(', ')} onChange={(e) => setFormData({ ...formData, equipamentos: e.target.value.split(',').map(s => s.trim()) })} fullWidth />
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

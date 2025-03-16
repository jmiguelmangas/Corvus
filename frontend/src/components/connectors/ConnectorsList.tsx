import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Typography,
  Chip,
  Alert,
  Snackbar,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { connectorsApi, Connector, ConnectorCreate } from '../../api/connectors';
import { ConnectorDialog } from './ConnectorDialog';

const statusColors = {
  active: 'success',
  inactive: 'default',
  error: 'error',
  configuring: 'warning',
};

export const ConnectorsList = () => {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    loadConnectors();
  }, []);

  const loadConnectors = async () => {
    setLoading(true);
    try {
      const data = await connectorsApi.list();
      setConnectors(data);
    } catch (error) {
      console.error('Error loading connectors:', error);
      setError('Error al cargar los conectores. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este conector?')) {
      try {
        await connectorsApi.delete(id);
        loadConnectors();
      } catch (error) {
        console.error('Error deleting connector:', error);
        setError('Error al eliminar el conector');
      }
    }
  };

  const handleTestConnection = async (id: number) => {
    try {
      const result = await connectorsApi.testConnection(id);
      if (result.status === 'active') {
        await loadConnectors();
        setError(null);
      }
    } catch (error) {
      if (error instanceof Error) {
      console.error('Error testing connection:', error);
        setError('Error al probar la conexión: ' + error.message);
      } else {
        setError('Error al probar la conexión');
      }
    }
  };

  const handleEdit = (connector: Connector) => {
    setSelectedConnector(connector);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedConnector(null);
    setDialogMode('create');
    setIsDialogOpen(true);
  };

  const handleSubmit = async (data: ConnectorCreate) => {
    try {
      if (dialogMode === 'edit' && selectedConnector) {
        await connectorsApi.update(selectedConnector.id, data);
      } else {
        await connectorsApi.create(data);
      }
      setIsDialogOpen(false);
      loadConnectors();
    } catch (error) {
      console.error('Error saving connector:', error);
      throw error;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Conectores</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nuevo Conector
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Última Actualización</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? connectors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : connectors
            ).map((connector) => (
              <TableRow key={connector.id}>
                <TableCell>{connector.name}</TableCell>
                <TableCell>{connector.type}</TableCell>
                <TableCell>
                  <Chip
                    label={connector.status}
                    color={statusColors[connector.status] as 'success' | 'default' | 'error' | 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(connector.updated_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(connector)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(connector.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {connector.status === 'configuring' && (
                    <IconButton 
                      size="small"
                      onClick={() => handleTestConnection(connector.id)}
                      color="primary"
                      title="Probar conexión"
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      )}

      <TablePagination
        component="div"
        count={connectors.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />

      <ConnectorDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        connector={selectedConnector || undefined}
        mode={dialogMode}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

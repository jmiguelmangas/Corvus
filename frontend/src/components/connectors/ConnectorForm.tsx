import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import { ConnectorCreate, Connector } from '../../api/connectors';

interface ConnectorFormProps {
  initialData?: Connector;
  onSubmit: (data: ConnectorCreate) => Promise<void>;
  onCancel: () => void;
}

export const ConnectorForm = ({
  initialData,
  onSubmit,
  onCancel,
}: ConnectorFormProps) => {
  const [formData, setFormData] = useState<ConnectorCreate>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    type: initialData?.type || 'postgresql',
    config: initialData?.config || {},
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting form:', error.message);
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? 'Editar Conector' : 'Nuevo Conector'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="name"
              label="Nombre"
              value={formData.name}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="description"
              label="Descripción"
              value={formData.description}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Conector</InputLabel>
              <Select
                name="type"
                value={formData.type}
                label="Tipo de Conector"
                onChange={handleSelectChange}
              >
                <MenuItem value="postgresql">PostgreSQL</MenuItem>
                <MenuItem value="mysql">MySQL</MenuItem>
                <MenuItem value="mongodb">MongoDB</MenuItem>
                <MenuItem value="elasticsearch">Elasticsearch</MenuItem>
                <MenuItem value="rest_api">REST API</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="config"
              label="Configuración (JSON)"
              value={JSON.stringify(formData.config, null, 2)}
              onChange={(e) => {
                try {
                  const config = JSON.parse(e.target.value);
                  setFormData((prev) => ({ ...prev, config }));
                } catch {
                  // Los errores de parsing son esperados mientras el usuario escribe
                  // No necesitamos manejar el error específicamente
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                {initialData ? 'Actualizar' : 'Crear'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

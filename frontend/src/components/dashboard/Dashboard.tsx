import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { connectorsApi } from '../../api/connectors';

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      title: 'Conectores Activos',
      value: 0,
      icon: <StorageIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Fuentes de Datos',
      value: 0,
      icon: <QueryStatsIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Configuraciones',
      value: 0,
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const connectors = await connectorsApi.list();
        const activeConnectors = connectors.filter(c => c.status === 'active').length;
        const totalConnectors = connectors.length;
        const configuringConnectors = connectors.filter(c => c.status === 'configuring').length;

        setStats([
          {
            title: 'Conectores Activos',
            value: activeConnectors,
            icon: <StorageIcon sx={{ fontSize: 40 }} />,
            color: '#1976d2',
          },
          {
            title: 'Total Conectores',
            value: totalConnectors,
            icon: <QueryStatsIcon sx={{ fontSize: 40 }} />,
            color: '#2e7d32',
          },
          {
            title: 'En Configuración',
            value: configuringConnectors,
            icon: <SettingsIcon sx={{ fontSize: 40 }} />,
            color: '#9c27b0',
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
      
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${stat.color}15`,
                  color: stat.color,
                  mb: 2,
                }}
              >
                {stat.icon}
              </Box>
              <Typography variant="h4" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography color="text.secondary">{stat.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Bienvenido a Corvus
        </Typography>
        <Typography paragraph>
          Esta es tu plataforma centralizada para la gestión y análisis de datos.
          Comienza configurando tus conectores para integrar tus fuentes de datos.
        </Typography>
      </Box>
    </Box>
  );
};

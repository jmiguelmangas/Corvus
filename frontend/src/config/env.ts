// Configuración del entorno
const config: { API_URL: string } = {
  API_URL: process.env.NODE_ENV === 'test'
    ? 'http://localhost:8001'
    : (process.env.VITE_API_URL || 'http://localhost:8001')
};

export { config };
export const { API_URL } = config;

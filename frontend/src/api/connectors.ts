import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

export interface Connector {
  id: number;
  name: string;
  description?: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'elasticsearch' | 'rest_api';
  config: Record<string, any>;
  status: 'active' | 'inactive' | 'error' | 'configuring';
  created_at: string;
  updated_at: string;
}

export interface ConnectorCreate {
  name: string;
  description?: string;
  type: Connector['type'];
  config: Record<string, any>;
}

export const connectorsApi = {
  list: async (): Promise<Connector[]> => {
    const response = await axios.get(`${API_URL}/api/connectors/`);
    return response.data;
  },

  get: async (id: number): Promise<Connector> => {
    const response = await axios.get(`${API_URL}/api/connectors/${id}/`);
    return response.data;
  },

  create: async (connector: ConnectorCreate): Promise<Connector> => {
    const response = await axios.post(`${API_URL}/api/connectors/`, connector);
    return response.data;
  },

  update: async (id: number, connector: Partial<ConnectorCreate>): Promise<Connector> => {
    const response = await axios.put(`${API_URL}/api/connectors/${id}/`, connector);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/connectors/${id}/`);
  },

  testConnection: async (id: number): Promise<{ message: string; status: string }> => {
    const response = await axios.post(`${API_URL}/api/connectors/${id}/test/`);
    return response.data;
  },
};

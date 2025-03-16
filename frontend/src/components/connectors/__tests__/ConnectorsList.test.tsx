import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ConnectorsList } from '../ConnectorsList';
import { connectorsApi } from '../../../api/connectors';

// Mock del módulo de API
jest.mock('../../../api/connectors');

describe('ConnectorsList', () => {
  const mockConnectors = [
    {
      id: 1,
      name: 'Test Connector',
      type: 'postgresql',
      status: 'configuring',
      config: {},
      created_at: '2025-03-16T12:00:00Z',
      updated_at: '2025-03-16T12:00:00Z',
    },
  ];

  beforeEach(() => {
    // Reset de los mocks antes de cada test
    jest.clearAllMocks();
    // Mock de la función list
    (connectorsApi.list as jest.Mock).mockResolvedValue(mockConnectors);
  });

  test('renders connector list', async () => {
    await act(async () => {
      render(<ConnectorsList />);
    });
    
    // Verificar que se muestra el título
    expect(screen.getByText('Conectores')).toBeInTheDocument();
    
    // Esperar a que se carguen los conectores
    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText('Test Connector')).toBeInTheDocument();
      });
    });
  });

  test('opens create dialog when clicking new connector button', async () => {
    await act(async () => {
      render(<ConnectorsList />);
    });
    
    await act(async () => {
      // Click en el botón de nuevo conector
      fireEvent.click(screen.getByText('Nuevo Conector'));
    });
    
    // Verificar que se abre el diálogo
    await act(async () => {
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  test('shows loading state', async () => {
    // Mock de la función list para que tarde en responder
    (connectorsApi.list as jest.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));

    await act(async () => {
      render(<ConnectorsList />);
    });

    // Verificar que se muestra el indicador de carga
    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  test('handles pagination', async () => {
    await act(async () => {
      render(<ConnectorsList />);
    });
    
    // Esperar a que se carguen los datos
    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText('Test Connector')).toBeInTheDocument();
      });
    });
    
    // Verificar que se muestra la paginación
    expect(screen.getByText('1-1 de 1')).toBeInTheDocument();
  });
});

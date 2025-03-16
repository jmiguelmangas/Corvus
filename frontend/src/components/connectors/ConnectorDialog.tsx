import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { ConnectorForm } from './ConnectorForm';
import { Connector, ConnectorCreate } from '../../api/connectors';

interface ConnectorDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ConnectorCreate) => Promise<void>;
  connector?: Connector;
  mode?: 'create' | 'edit';
}

export const ConnectorDialog = ({ open, onClose, onSubmit, connector, mode = 'create' }: ConnectorDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{mode === 'create' ? 'Nuevo Conector' : 'Editar Conector'}</DialogTitle>
      <DialogContent>
        <ConnectorForm 
          onSubmit={onSubmit} 
          onCancel={onClose} 
          initialData={connector}
        />
      </DialogContent>
    </Dialog>
  );
};

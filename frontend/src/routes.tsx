import { Routes, Route } from 'react-router-dom';
import { ConnectorsList } from './components/connectors/ConnectorsList';
import { Dashboard } from './components/dashboard/Dashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/connectors" element={<ConnectorsList />} />
    </Routes>
  );
};

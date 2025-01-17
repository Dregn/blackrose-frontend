import React from 'react';
import EditableTable from '../components/Table/EditableTable';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import Navbar from '../components/Shared/Navbar';

const CsvRecordsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Navbar />
        <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
          <EditableTable />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CsvRecordsPage;

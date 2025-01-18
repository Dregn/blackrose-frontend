import React from 'react';
import Navbar from '../components/Shared/Navbar';
import RealTimeChart from '../components/Chart/RealTimeChart';
import DynamicTable from '../components/Table/DynamicTable';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { WebSocketProvider, useWebSocketContext } from "../contexts/WebSocketContext";

const Dashboard = () => {
  return (
    <Box className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                backgroundColor: 'background.paper',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Real-Time Candlestick Chart
              </Typography>
              <RealTimeChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                backgroundColor: 'background.paper',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Dynamic Table
              </Typography>
              <DynamicTable />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const DashboardPage = () => (
  <WebSocketProvider endpoint="/ohlc-stream/">
    <Dashboard />
  </WebSocketProvider>
);

export default DashboardPage;

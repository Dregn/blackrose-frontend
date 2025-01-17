import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme'; // Import the centralized theme
import routesConfig from './routes/routesConfig';
import ProtectedRoute from './routes/ProtectedRoute';
import { WebSocketProvider } from './contexts/WebSocketContext';

const AppRoutes = (routes) => {
  const renderRoutes = (routes) =>
    routes.map((route) => {
      const element = route.isProtected ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : (
        route.element
      );

      return route.children ? (
        <Route key={route.path} path={route.path} element={element}>
          {renderRoutes(route.children)}
        </Route>
      ) : (
        <Route
          key={route.path}
          path={route.path}
          element={
            <div>
              {element}
            </div>
          }
        />
      );
    });

  return renderRoutes(routesConfig);
};

const App = () => {
  return (
    <WebSocketProvider endpoint="/ohlc-stream/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>{AppRoutes(routesConfig)}</Routes>
        </Router>
      </ThemeProvider>
      </WebSocketProvider>
  );
};

export default App;

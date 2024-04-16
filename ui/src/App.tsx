import React, { useEffect, useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';

import axios from 'axios';
import { Route } from 'react-router-dom';
import Router from './Router';
import { QueryClient, QueryClientProvider } from 'react-query';

const healthCheckPing = async (
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await axios.get('/_health');
    const message = response.data;
    setMessage(message);
  } catch (error) {
    setMessage(
      'Unable to check health of server. Please check that the server is started and that the proxy port matches the server port'
    );
  }
};

function App() {
  const [loading, setLoading] = useState(false);
  const [healthCheckMessage, setHealthCheckMessage] = useState('Loading...');

  const queryClient = new QueryClient();


  useEffect(() => {
    healthCheckPing(setHealthCheckMessage, setLoading);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <Router />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;

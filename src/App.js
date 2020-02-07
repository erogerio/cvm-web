import React, { useState, useCallback, useMemo } from 'react';
import Fundos from './Fundos';
import Status from './Status';
import AppContext from './AppContext';
import api from './services/api';

function App() {
  const [fundos, setFundos] = useState([]);

  const getFounds = useCallback(async () => {
    try {
      const result = await api.get('quotes');
      setFundos(result.data.response);
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error);
      }
    }
  }, []);

  const providerValue = useMemo(() => (
    { fundos, setFundos, getFounds }),
  [fundos, setFundos, getFounds]);

  return (
    <div className="App">
      <header className="App-header">
        <AppContext.Provider value={providerValue}>
          <Status />
          <Fundos />
        </AppContext.Provider>
      </header>
    </div>
  );
}

export default App;

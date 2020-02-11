import React, { useState, useCallback, useMemo } from 'react';
import Fundos from './Fundos';
import Status from './Status';
import Historico from './Historico';
import AppContext from './AppContext';
import api from './services/api';

function App() {
  const [fundos, setFundos] = useState([]);
  const [lista, setLista] = useState([]);
  const [historico, setHistorico] = useState([]);

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

  const getLista = useCallback(async () => {
    try {
      const result = await api.get('getfounds');
      setLista(result.data);
    } catch (err) {
      if (err.data.error) {
        console.log(err.data.error);
      }
    }
  }, []);

  const getHistorico = useCallback(async (formatedCnpj) => {
    try {
      const number = formatedCnpj.replace(/[^0-9]+/g, '').substring(0, 14);
      const result = await api.get(`historico/${number}`);
      setHistorico(result.data);
    } catch (err) {
      if (err.data.error) {
        console.log(err.data.error);
      }
    }
  }, []);

  const providerValue = useMemo(() => (
    {
      fundos, setFundos, getFounds, lista, setLista, getLista, getHistorico, historico,
    }),
  [fundos, setFundos, getFounds, lista, setLista, getLista, getHistorico, historico]);

  return (
    <div className="App">
      <header className="App-header">
        <AppContext.Provider value={providerValue}>
          <Status />
          <Fundos />
          <Historico />
        </AppContext.Provider>
      </header>
    </div>
  );
}

export default App;

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
  const [cadastro, setCadastro] = useState([]);

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
      console.log(number);
      console.log(formatedCnpj);
      if (number.length > 0) {
        const result = await api.get(`historico/${number}`);
        console.log(result.data);
        setHistorico(result.data);
      } else {
        setHistorico(null);
      }
    } catch (err) {
      if (err.data && err.data.error) {
        console.log(err.data.error);
      }
    }
  }, []);

  const getCadastro = useCallback(async (descricao) => {
    try {
      if (descricao.length > 0) {
        const result = await api.get(`cadastro/?descricao=${descricao}`);
        setCadastro(result.data);
        console.log(`${result.data.length} resigstros encontrados para${descricao}`);
      } else {
        setCadastro([]);
      }
    } catch (err) {
      if (err.data.error) {
        console.log(err.data.error);
      }
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      fundos,
      setFundos,
      getFounds,
      lista,
      setLista,
      getLista,
      getHistorico,
      historico,
      setHistorico,
      cadastro,
      getCadastro,
    }),
    [
      fundos,
      setFundos,
      getFounds,
      lista,
      setLista,
      getLista,
      getHistorico,
      historico,
      setHistorico,
      cadastro,
      getCadastro,
    ],
  );

  return (
    <div className="App">
      <header className="App-header">
        <AppContext.Provider value={providerValue}>
          <Status />
          <Fundos />
          <Historico />
        </AppContext.Provider>
        {/* <div style={{
          bottom: 0, position: 'sticky',
        }}
        >
b
        </div> */}
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import api from './services/api';


// moment.suppressDeprecationWarnings = true;

moment.createFromInputFallback = (config) => {
  // eslint-disable-next-line no-underscore-dangle, no-param-reassign
  config._d = new Date(NaN);
};

export default function Status() {
  const [status, setStatus] = useState({});
  const [novoArquivo, setNovoNArquivo] = useState('');

  useEffect(() => {
    const getStatus = async () => {
      const response = await api.get('/info');
      setStatus(response.data.response);
    };
    getStatus();
  }, []);

  const atualizarInforme = async () => {
    try {
      const response = await api.post('/update', { novoArquivo });
      console.log(response.data.response);
      setStatus(response.data.response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {status
        ? (
          <div className="limiter">
            <div className="container-table100 status">
              <div className="wrap-table100">
                <div className="table">
                  <div className="row header">
                    <div className="cell">Data CVM</div>
                    <div className="cell">Último download</div>
                    <div className="cell">Último Arquivo</div>
                    <div className="cell">Novo Arquivo</div>
                    <div className="cell" />
                  </div>
                  <div className="row" key={status.dt_ultima_atualizacao_cvm}>
                    <div className="cell" data-title="Data CVM">
                      {(!status.dt_ultima_atualizacao_cvm
                      || status.dt_ultima_atualizacao_cvm === '')
                      || <Moment format="DD/MM/YYYY HH:mm" date={status.dt_ultima_atualizacao_cvm} />}
                    </div>
                    <div className="cell" data-title="Último Download">
                      {!status.dt_ultimo_download || (status.dt_ultimo_download === ''
                      || <Moment format="DD/MM/YYYY HH:mm" date={status.dt_ultimo_download} />)}
                    </div>
                    <div className="cell" data-title="Último Arquivo">
                      {status.ultimo_arquivo_baixado}
                    </div>
                    <div className="cell" data-title="Novo Arquivo">
                      <input type="text" value={novoArquivo} onChange={(e) => setNovoNArquivo(e.target.value)} />
                    </div>
                    <div className="cell" data-title="Atualizar">
                      <button type="button" onClick={atualizarInforme}>Atualizar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        : <div />}
    </>
  );
}

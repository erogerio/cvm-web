import React, { useState, useEffect } from 'react';
import api from './services/api';
import './table.css';

export default function Fundos() {
  const [fundos, setFundos] = useState([]);
  const [showNames, setShowNames] = useState(true);

  useEffect(() => {
    const getFounds = async () => {
      try {
        const result = await api.get('quotes');
        setFundos(result.data.response);
      } catch (err) {
        if (err.response.data.error) {
          console.log(err.response.data.error);
        }
      }
    };
    getFounds();
  }, []);

  const toggleNames = () => {
    setShowNames(!showNames);
  };

  return (
    <>

      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table">
              <div className="row header">
                {!showNames || <div className="cell">Fundo</div>}
                <div className="cell">Data</div>
                <div className="cell">
                  Cotação
                  {' '}
                  <label className="switch toggleNames" htmlFor="toggleInput">
                    <input type="checkbox" defaultChecked onClick={toggleNames} id="toggleInput" />
                    <span className="slider round" />
                  </label>
                </div>

              </div>
              {fundos.map((f) => (
                <div className="row" key={f.nome}>
                  {!showNames || (
                  <div className="cell" data-title="Fundo">
                    {f.nome}
                  </div>
                  )}
                  <div className="cell" data-title="Data">
                    {f.data}
                  </div>
                  <div className="cell" data-title="Cotação">
                    {f.cotacao}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

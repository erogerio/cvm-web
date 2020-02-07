import React, { useState, useEffect, useContext } from 'react';
import AppContext from './AppContext';

import './table.css';

export default function Fundos() {
  const [showNames, setShowNames] = useState(true);
  const { getFounds, fundos } = useContext(AppContext);

  useEffect(() => {
    getFounds();
  }, [getFounds]);

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
              {fundos && fundos.map((f) => (
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

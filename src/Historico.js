import React, { useContext, useEffect } from 'react';
import AppContext from './AppContext';

import './historico.css';


export default function Historico() {
  const {
    lista, getLista, getHistorico, historico,
  } = useContext(AppContext);

  useEffect(() => {
    getLista();
  }, [getLista]);

  useEffect(() => {
    if (lista.length > 0) {
      getHistorico(lista[0].cnpj);
    }
  }, [lista, getHistorico]);

  const onSelect = (event) => {
    const { selectedIndex } = event.target.options;
    const cnpj = event.target.options[selectedIndex].getAttribute('data-key');
    getHistorico(cnpj);
  };

  return (
    <>
      <form>
        <select onChange={onSelect}>
          {lista.map((l) => (<option key={l.cnpj} data-key={l.cnpj}>{l.nome}</option>))}
        </select>
        <ul>
          {historico
           && historico.map((h) => (
             <li key={h.DT_COMPTC}>
               {h.CNPJ_FUNDO}
               -
               {h.DT_COMPTC}
                -
               { h.VL_QUOTA}
             </li>
           ))}
        </ul>
      </form>
    </>
  );
}

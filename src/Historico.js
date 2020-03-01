import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppContext from './AppContext';

import './historico.css';

export default function Historico() {
  const [cnpj, setCnpj] = useState('');
  const [fundoFavorito, setFundoFavorito] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [fundoSelecionado, setFundoSelecionado] = useState(null);
  const {
    lista, getLista, getHistorico, historico, cadastro, getCadastro,
  } = useContext(AppContext);

  useEffect(() => {
    getLista();
  }, [getLista]);

  // useEffect(() => {
  //   getHistorico(cnpj);
  //   setDescricao('');
  //   setFundoSelecionado(null);
  //   console.log('222');
  // }, [cnpj, getHistorico]);

  const onSelect = (event) => {
    const { selectedIndex } = event.target.options;
    const cnpjSelecionado = event.target.options[selectedIndex].getAttribute('data-key');
    setCnpj(cnpjSelecionado);
    getHistorico(cnpjSelecionado);
    setFundoFavorito(event.target.value);
  };

  const handlerCnpj = (e) => {
    if (e.key === 'Enter') {
      getHistorico(cnpj);
    }
  };

  const handlerDescricao = (e) => {
    if (e.key === 'Enter') {
      setCnpj('');
      getCadastro(descricao);
    }
  };

  // useEffect(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

  useEffect(() => {
    getCadastro(' ');
  }, [getCadastro]);

  const onAutoCompleteChange = (e, v) => {
    getHistorico(v ? v.CNPJ_FUNDO : '');
    setFundoSelecionado(v);
    setCnpj('');
    console.log(v);
  };

  return (
    <>
      <div className="historico">
        <form>
          <select onChange={onSelect} value={fundoFavorito}>
            <option key="0" value="" data-key="">Selecione</option>
            {lista.map((l) => (<option key={l.cnpj} data-key={l.cnpj}>{l.nome}</option>))}
          </select>
          <input type="text" name="cnpj" placeholder="CNPJ" onKeyDown={handlerCnpj} value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
          <input type="text" name="descricao" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} onKeyDown={handlerDescricao} />
          <Autocomplete
            id="combo-box-demo"
            options={cadastro}
            freeSolo
            autoHighlight
            disableOpenOnFocus
            ListboxProps={{ bla: 1 }}
            getOptionLabel={(option) => `${option.DENOM_SOCIAL} - ${option.CNPJ_FUNDO}`}
            value={fundoSelecionado}
            // style={{ width: 300 }}
            onChange={onAutoCompleteChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${cadastro.length} fundos encontrados`}
                variant="outlined"
                fullWidth
                bla={params.CNPJ_FUNDO}
              />
            )}
          />
          <hr />
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
      </div>
    </>
  );
}

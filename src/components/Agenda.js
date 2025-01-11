import React, { useState } from 'react';

function Agenda() {
  const [planejamento, setPlanejamento] = useState({
    objetivos: '',
    pendencias: '',
    pessoas: '',
    projetos: '',
    prioridades: '',
    outros: ''
  });

  const [diasDaSemana, setDiasDaSemana] = useState({
    'Segunda-Feira': [],
    'Terça-Feira': [],
    'Quarta-Feira': [],
    'Quinta-Feira': [],
    'Sexta-Feira': [],
    'Sábado': []
  });

  const [dadosDia, setDadosDia] = useState({
    atendimentosAtivos: 0,
    atendimentosPassivos: 0,
    indicados: 0,
    matriculasAtivas: 0,
    matriculasPassivas: 0,
    prospeccao: 0
  });

  const [diasFinalizados, setDiasFinalizados] = useState({});
  const [popupOpcoesAberto, setPopupOpcoesAberto] = useState(false);
  const [popupFinalizarDia, setPopupFinalizarDia] = useState(false);
  const [popupRemoverLinha, setPopupRemoverLinha] = useState(false);
  const [linhaAtual, setLinhaAtual] = useState({ dia: '', index: null });
  const [linhaParaRemover, setLinhaParaRemover] = useState({ dia: '', index: null });
  const [diaAtual, setDiaAtual] = useState('');

  const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  const semanaAtual = getWeekNumber(new Date());

  const abrirPopupOpcoes = (dia, index) => {
    setLinhaAtual({ dia, index });
    setPopupOpcoesAberto(true);
  };

  const fecharPopupOpcoes = () => {
    setPopupOpcoesAberto(false);
  };

  const abrirPopupFinalizarDia = (dia) => {
    setDiaAtual(dia);
    setPopupFinalizarDia(true);
  };

  const fecharPopupFinalizarDia = () => {
    setPopupFinalizarDia(false);
  };

  const abrirPopupRemoverLinha = (dia, index) => {
    setLinhaParaRemover({ dia, index });
    setPopupRemoverLinha(true);
  };

  const fecharPopupRemoverLinha = () => {
    setPopupRemoverLinha(false);
  };

  const handleRemoverLinha = () => {
    const { dia, index } = linhaParaRemover;
    setDiasDaSemana((prev) => {
      const linhasAtualizadas = prev[dia].filter((_, i) => i !== index);
      return { ...prev, [dia]: linhasAtualizadas };
    });
    fecharPopupRemoverLinha();
  };

  const handleSalvarDia = () => {
    setDiasFinalizados((prev) => ({ ...prev, [diaAtual]: true }));
    alert(`Dados do dia ${diaAtual} salvos com sucesso!`);
    fecharPopupFinalizarDia();
  };

  const handleEditarDia = (dia) => {
    setDiasFinalizados((prev) => ({ ...prev, [dia]: false }));
  };

  const handleAdicionarLinha = (dia) => {
    const novaLinha = { texto: '', status: 'pendente', opcao: '' };
    setDiasDaSemana((prev) => ({
      ...prev,
      [dia]: [...prev[dia], novaLinha]
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Agenda Semanal - Semana {semanaAtual}</h1>

      {/* Planejamento Semanal */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Planejamento</h2>
        {Object.keys(planejamento).map((campo) => (
          <div key={campo} style={{ marginBottom: '10px' }}>
            <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
            <textarea
              value={planejamento[campo]}
              onChange={(e) =>
                setPlanejamento({ ...planejamento, [campo]: e.target.value })
              }
              rows="3"
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
        ))}
      </div>

      {/* Agendamentos por dia da semana */}
      <div>
        <h2>Agendamentos da Semana</h2>
        {Object.keys(diasDaSemana).map((dia) => (
          <div key={dia} style={{ marginBottom: '20px' }}>
            <h3>{dia}</h3>
            {diasDaSemana[dia].map((linha, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <input
                  type="text"
                  value={linha.texto}
                  onChange={(e) => {
                    const novoTexto = e.target.value;
                    setDiasDaSemana((prev) => {
                      const linhasAtualizadas = prev[dia].map((linha, i) =>
                        i === index ? { ...linha, texto: novoTexto } : linha
                      );
                      return { ...prev, [dia]: linhasAtualizadas };
                    });
                  }}
                  style={{ flex: 1, padding: '10px' }}
                  disabled={diasFinalizados[dia]}
                />
                <span style={{ marginLeft: '10px' }}>{linha.opcao}</span>
                <button
                  onClick={() => abrirPopupOpcoes(dia, index)}
                  style={{
                    marginLeft: '10px',
                    padding: '5px 10px',
                    backgroundColor: 'orange',
                    color: 'white',
                    border: 'none',
                    cursor: diasFinalizados[dia] ? 'not-allowed' : 'pointer'
                  }}
                  disabled={diasFinalizados[dia]}
                >
                  +
                </button>
                <button
                  onClick={() => abrirPopupRemoverLinha(dia, index)}
                  style={{
                    marginLeft: '10px',
                    padding: '5px 10px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  disabled={diasFinalizados[dia]}
                >
                  -
                </button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px' }}>
              {!diasFinalizados[dia] ? (
                <button
                  onClick={() => abrirPopupFinalizarDia(dia)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Finalizar Dia
                </button>
              ) : (
                <button
                  onClick={() => handleEditarDia(dia)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ffc107',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Editar Dia
                </button>
              )}
              {!diasFinalizados[dia] && (
                <button
                  onClick={() => handleAdicionarLinha(dia)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Adicionar Linha
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up para escolher opções */}
      {popupOpcoesAberto && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}
        >
          <h3>Selecione uma opção</h3>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {['Rede Social', 'Indicados', 'Prospecção', 'Passivo'].map(
              (opcao) => (
                <button
                  key={opcao}
                  onClick={() => {
                    setDiasDaSemana((prev) => {
                      const linhasAtualizadas = prev[linhaAtual.dia].map(
                        (linha, i) =>
                          i === linhaAtual.index
                            ? { ...linha, opcao, status: 'pendente' }
                            : linha
                      );
                      return { ...prev, [linhaAtual.dia]: linhasAtualizadas };
                    });
                    fecharPopupOpcoes();
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {opcao}
                </button>
              )
            )}
          </div>
          <button
            onClick={fecharPopupOpcoes}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Pop-up para confirmar remoção de linha */}
      {popupRemoverLinha && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}
        >
          <h3>Confirmar exclusão</h3>
          <p>Tem certeza que deseja excluir esta linha?</p>
          <button
            onClick={handleRemoverLinha}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Sim, excluir
          </button>
          <button
            onClick={fecharPopupRemoverLinha}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Pop-up para finalizar o dia */}
      {popupFinalizarDia && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}
        >
          <h3>Finalizar o dia: {diaAtual}</h3>
          <div style={{ marginBottom: '10px' }}>
            <label>Atendimentos Ativos</label>
            <input
              type="number"
              value={dadosDia.atendimentosAtivos}
              onChange={(e) =>
                setDadosDia({ ...dadosDia, atendimentosAtivos: e.target.value })
              }
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Atendimentos Passivos</label>
            <input
              type="number"
              value={dadosDia.atendimentosPassivos}
              onChange={(e) =>
                setDadosDia({
                  ...dadosDia,
                  atendimentosPassivos: e.target.value
                })
              }
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Indicados</label>
            <input
              type="number"
              value={dadosDia.indicados}
              onChange={(e) =>
                setDadosDia({ ...dadosDia, indicados: e.target.value })
              }
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Matrículas Ativas</label>
            <input
              type="number"
              value={dadosDia.matriculasAtivas}
              onChange={(e) =>
                setDadosDia({ ...dadosDia, matriculasAtivas: e.target.value })
              }
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Matrículas Passivas</label>
            <input
              type="number"
              value={dadosDia.matriculasPassivas}
              onChange={(e) =>
                setDadosDia({
                  ...dadosDia,
                  matriculasPassivas: e.target.value
                })
              }
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Prospecção</label>
            <input
              type="number"
              value={dadosDia.prospeccao}
              onChange={(e) =>
                setDadosDia({ ...dadosDia, prospeccao: e.target.value })
              }
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
          <button
            onClick={handleSalvarDia}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Salvar
          </button>
          <button
            onClick={fecharPopupFinalizarDia}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default Agenda;

import React from 'react';

interface SelectTreinamentosProps {
  treinamentos: { id: number; nome: string }[];
  onChange: (selectedTreinamentoId: number) => void;
}

const SelectTreinamentos: React.FC<SelectTreinamentosProps> = ({ treinamentos, onChange }) => {
  return (
    <div>
      <label htmlFor="treinamentos">Selecione um treinamento:</label>
      <select
        id="treinamentos"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="">Selecione...</option>
        {treinamentos.map((treinamento) => (
          <option key={treinamento.id} value={treinamento.id}>
            {treinamento.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTreinamentos;

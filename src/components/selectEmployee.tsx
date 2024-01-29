import React from 'react';

interface SelectFuncionariosProps {
  funcionarios: { id: number; nome: string }[];
  onChange: (selectedFuncionarioId: number) => void;
}

const SelectFuncionarios: React.FC<SelectFuncionariosProps> = ({ funcionarios, onChange }) => {
  return (
    <div>
      <label htmlFor="funcionarios">Selecione um funcionário:</label>
      <select
        id="funcionarios"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="">Selecione...</option>
        {funcionarios.map((funcionario) => (
          <option key={funcionario.id} value={funcionario.id}>
            {funcionario.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFuncionarios;

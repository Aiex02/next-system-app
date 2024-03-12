import React, { useState } from "react";
import { Funcionario } from "@/types/types";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

interface FuncionariosTableProps {
  funcionarios: Funcionario[];
  onEdit: (id: number) => void;
}

const FuncionariosTable: React.FC<FuncionariosTableProps> = ({
  funcionarios,
  onEdit,
}) => {
  const [funcionarioSelecionado, setFuncionarioSelecionado] =
    useState<Funcionario | null>(null);

  const handleView = (funcionario: Funcionario) => {
    setFuncionarioSelecionado(funcionario);
  };

  const handleCloseModal = () => {
    setFuncionarioSelecionado(null);
  };

  return (
    <div className="bouder rounded-lg p-2 mt-4">
      <table className="w-5/6 mx-auto border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 text-center font-bold">Matrícula</th>
            <th className="border p-2 text-center font-bold">Nome</th>
            <th className="border p-2 text-center font-bold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td className="border p-2 text-center">
                {funcionario.matricula}
              </td>
              <td className="border p-2 text-center">{funcionario.nome}</td>
              <td className="border p-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(funcionario.id)}
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white px-2 py-1">
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => handleView(funcionario)}
                  className="bg-green-500 text-white px-2 py-1"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {funcionarioSelecionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              Detalhes do Funcionário
            </h2>
            <p>
              <span className="font-semibold">Matrícula:</span>{" "}
              {funcionarioSelecionado.matricula}
            </p>
            <p>
              <span className="font-semibold">Nome:</span>{" "}
              {funcionarioSelecionado.nome}
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-4 py-2 mt-4 inline-block"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuncionariosTable;

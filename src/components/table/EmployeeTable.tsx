import React, { useState } from "react";
import { Funcionario } from "@/types/types";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

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
    <div className="p-2 mt-4 overflow-x-auto">
      <div className="max-w-4xl mx-auto">
        <Table className="border-collapse border rounded mt-8 w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="border p-2 text-center font-bold">
                Matrícula
              </TableHead>
              <TableHead className="border p-2 text-center font-bold">
                Nome
              </TableHead>
              <TableHead className="border p-2 text-center font-bold">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funcionarios.map((funcionario) => (
              <TableRow key={funcionario.id}>
                <TableCell className="border px-4 py-2 text-center">
                  {funcionario.matricula}
                </TableCell>
                <TableCell className="border px-4 py-2 text-center">
                  {funcionario.nome}
                </TableCell>
                <TableCell className="border px-4 py-2 text-center">
                  <div className="flex justify-center items-center space-x-1 md:space-x-2">
                    <button
                      onClick={() => onEdit(funcionario.id)}
                      className="bg-yellow-500 text-white px-2 py-1 md:px-3 md:py-2"
                    >
                      <FaEdit />
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-2">
                      <FaTrashAlt />
                    </button>
                    <button
                      onClick={() => handleView(funcionario)}
                      className="bg-green-500 text-white px-2 py-1 md:px-3 md:py-2"
                    >
                      <FaEye />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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

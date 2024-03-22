import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Treinamento } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TreinamentosTableProps {
  treinamentos: Treinamento[];
  onEdit: (id: string) => void;
}

const TreinamentosTable: React.FC<TreinamentosTableProps> = ({
  treinamentos,
  onEdit,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Table className="border-collapse border rounded mt-8 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="border p-2 text-center font-bold">Nome</TableHead>
            <TableHead className="border p-2 text-center font-bold">NR</TableHead>
            <TableHead className="border p-2 text-center font-bold">
              Validade
            </TableHead>
            <TableHead className="border p-2 text-center font-bold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treinamentos.map((treinamento) => (
            <TableRow key={treinamento.id}>
              <TableCell className="border px-4 py-2 text-center">
                {treinamento.nome}
              </TableCell>
              <TableCell className="border px-4 py-2 text-center">
                {treinamento.nr}
              </TableCell>
              <TableCell className="border px-4 py-2 text-center">
                {`${treinamento.validade} meses`}
              </TableCell>
              <TableCell className="border px-4 py-2 text-center">
                <div className="flex justify-center items-center space-x-1 md:space-x-2">
                  <button
                    onClick={() => onEdit(treinamento.id)}
                    className="bg-yellow-500 text-white px-2 py-1 md:px-3 md:py-2"
                  >
                    <FaEdit />
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-2">
                    <FaTrashAlt />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TreinamentosTable;

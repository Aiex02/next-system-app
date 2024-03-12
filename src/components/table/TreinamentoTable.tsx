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
    <Table className="w-5/6 border-collapse border mt-4 mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2">Nome</TableHead>
          <TableHead className="border px-4 py-2">NR</TableHead>
          <TableHead className="border px-4 py-2">Validade</TableHead>
          <TableHead className="border px-4 py-2">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {treinamentos.map((treinamento) => (
          <TableRow key={treinamento.id}>
            <TableCell className="border px-4 py-2">
              {treinamento.nome}
            </TableCell>
            <TableCell className="border px-4 py-2">{treinamento.nr}</TableCell>
            <TableCell className="border px-4 py-2">{`${treinamento.validade} meses`}</TableCell>
            <TableCell className="border p-2 text-center space-x-1">
              <button
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
                onClick={() => onEdit(treinamento.id)}
              >
                <FaEdit />
              </button>
              <button className="bg-red-500 text-white px-2 py-1">
                <FaTrashAlt />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TreinamentosTable;

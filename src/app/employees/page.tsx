'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import FuncionarioForm from "@/components/form/EmployeeForm";
import FuncionariosTable from "@/components/table/EmployeeTable";
import { Funcionario } from "@/types/types";

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [funcionarioEditavel, setFuncionarioEditavel] = useState<Funcionario>({ id: 0, nome: "", matricula: "" });
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get("http://localhost:3333/funcionarios");
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const handleFormSubmit = async (data: Funcionario) => {
    try {
      let updatedFuncionarios;
      if (modoEdicao) {
        await axios.put(
          `http://localhost:3333/funcionarios/${funcionarioEditavel.id}`,
          data
        );
        updatedFuncionarios = funcionarios.map((f) =>
          f.id === funcionarioEditavel.id ? data : f
        );
      } else {
        const response = await axios.post(
          "http://localhost:3333/funcionarios",
          data
        );
        updatedFuncionarios = [...funcionarios, response.data];
      }
      setFuncionarios(updatedFuncionarios);
      setModoEdicao(false);
      setFuncionarioEditavel({ id: 0, nome: "", matricula: "" });
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
    }
  };

  const handleEdit = (id: number) => {
    const funcionarioParaEditar = funcionarios.find((f) => f.id === id);
    if (funcionarioParaEditar) {
      setFuncionarioEditavel(funcionarioParaEditar);
      setModoEdicao(true);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="p-4 mt-14">
      <h1 className="text-center font-bold text-xl">Funcionarios: </h1>
      <FuncionarioForm
        initialData={funcionarioEditavel}
        onSubmit={handleFormSubmit}
        modoEdicao={modoEdicao}
      />
      <FuncionariosTable funcionarios={funcionarios} onEdit={handleEdit} />
    </div>
  );
};

export default Funcionarios;

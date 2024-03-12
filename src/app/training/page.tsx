"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TreinamentoForm from "@/components/form/TreinamentoForm";
import TreinamentosTable from "@/components/table/TreinamentoTable";
import { Treinamento } from "@/types/types";

const Treinamentos = () => {
  const [treinamentos, setTreinamentos] = useState<Treinamento[]>([]);
  const [treinamentoEditavel, setTreinamentoEditavel] = useState<Treinamento>({
    id: "",
    nome: "",
    nr: "",
    validade: 0,
  });
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    async function fetchTreinamentos() {
      try {
        const response = await axios.get("http://localhost:3333/treinamentos");
        setTreinamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar treinamentos:", error);
      }
    }

    fetchTreinamentos();
  }, []);

  const handleFormSubmit = async (data: Treinamento) => {
    try {
      let updatedTreinamentos;
      if (modoEdicao) {
        await axios.put(
          `http://localhost:3333/treinamentos/${treinamentoEditavel.id}`,
          data
        );
        updatedTreinamentos = treinamentos.map((t) =>
          t.id === treinamentoEditavel.id ? data : t
        );
      } else {
        const response = await axios.post(
          "http://localhost:3333/treinamentos",
          data
        );
        updatedTreinamentos = [...treinamentos, response.data];
      }
      setTreinamentos(updatedTreinamentos);
      setModoEdicao(false);
      setTreinamentoEditavel({ id: "", nome: "", nr: "", validade: 0 });
    } catch (error) {
      console.error("Erro ao salvar treinamento:", error);
    }
  };

  const handleEdit = (id: string) => {
    const treinamentoParaEditar = treinamentos.find((t) => t.id === id);
    if (treinamentoParaEditar) {
      setTreinamentoEditavel(treinamentoParaEditar);
      setModoEdicao(true);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="p-4 mt-14">
      <h1 className="text-center font-bold text-xl">Treinamentos: </h1>
      <TreinamentoForm
        initialData={treinamentoEditavel}
        onSubmit={handleFormSubmit}
        modoEdicao={modoEdicao}
      />
      <TreinamentosTable treinamentos={treinamentos} onEdit={handleEdit} />
    </div>
  );
};

export default Treinamentos;

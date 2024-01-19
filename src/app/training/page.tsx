"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export interface Treinamento {
  id: string;
  nome: string;
  nr: string;
  validade: number;
}

export default function Treinamentos() {
  const [treinamento, setTreinamento] = useState({
    id: "",
    nome: "",
    nr: "",
    validade: 0,
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [allTreinamentos, setAllTreinamentos] = useState<Treinamento[]>([]);

  useEffect(() => {
    const fetchTreinamentos = async () => {
      try {
        const response = await axios.get("http://localhost:3333/treinamentos");
        setAllTreinamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar treinamentos:", error);
      }
    };

    fetchTreinamentos();
  }, []);

  const formik = useFormik({
    initialValues: {
      nome: "",
      nr: "",
      validade: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("O nome é obrigatório"),
      nr: Yup.string().required("O NR é obrigatório"),
      validade: Yup.number().required("A validade é obrigatória"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const updatedTreinamentos = modoEdicao
          ? await axios.put(
              `http://localhost:3333/treinamentos/${treinamento.id}`,
              { ...values, validade: Number(values.validade) }
            )
          : await axios.post("http://localhost:3333/treinamentos", {
              ...values,
              validade: Number(values.validade),
            });

        setAllTreinamentos(updatedTreinamentos.data);
        setModoEdicao(false);
        setTreinamento({
          id: "",
          nome: "",
          nr: "",
          validade: 0,
        });
        resetForm();

        window.location.reload();
      } catch (error) {
        console.error("Erro ao salvar treinamento:", error);
      }
    },
  });

  const handleEdit = (id: string) => {
    const treinamentoParaEditar = allTreinamentos.find((t) => t.id === id);
    if (treinamentoParaEditar) {
      setTreinamento(treinamentoParaEditar);
      setModoEdicao(true);
    }
  };

  return (
    <div className="p-4 mt-14">
      <h1 className="text-center font-bold text-xl">Treinamentos</h1>
      <form onSubmit={formik.handleSubmit} className="mb-4 mx-auto max-w-xl">
        <div className="mb-4">
          <label className="block mb-1">Nome:</label>
          <input
            type="text"
            name="nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            className="border p-1 w-full"
          />
          {formik.touched.nome && formik.errors.nome && (
            <div className="text-red-500">{formik.errors.nome}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">NR:</label>
          <input
            type="text"
            name="nr"
            value={formik.values.nr}
            onChange={formik.handleChange}
            className="border p-1 w-full"
          />
          {formik.touched.nr && formik.errors.nr && (
            <div className="text-red-500">{formik.errors.nr}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Validade:</label>
          <input
            type="text"
            name="validade"
            value={formik.values.validade}
            onChange={formik.handleChange}
            className="border p-1 w-full"
          />
          {formik.touched.validade && formik.errors.validade && (
            <div className="text-red-500">{formik.errors.validade}</div>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {modoEdicao ? "Editar Treinamento" : "Adicionar Treinamento"}
        </button>
      </form>
      <table className="w-5/6 border-collapse border mx-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">NR</th>
            <th className="border px-4 py-2">Validade</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          {allTreinamentos.map((treinamento) => (
            <tr key={treinamento.id}>
              <td className="border px-4 py-2">{treinamento.nome}</td>
              <td className="border px-4 py-2">{treinamento.nr}</td>
              <td className="border px-4 py-2">{`${treinamento.validade} meses`}</td>
              <td className="border p-2 text-center space-x-1">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  onClick={() => handleEdit(treinamento.id)}
                >
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white px-2 py-1">
                <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

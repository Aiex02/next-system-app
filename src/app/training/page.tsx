"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Treinamento {
  id: number;
  nome: string;
  nr: string;
  validade: string;
}

export default function Treinamentos() {
  const [treinamento, setTreinamento] = useState<Treinamento>({
    id: 0,
    nome: "",
    nr: "",
    validade: "",
  });

  const [treinamentos, setTreinamentos] = useState<Treinamento[]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      nr: "",
      validade: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("O nome é obrigatório"),
      nr: Yup.string()
        .matches(/^[0-9]+$/, "Apenas números são permitidos")
        .required("O NR é obrigatório"),
      validade: Yup.string().required("A validade é obrigatória"),
    }),
    onSubmit: (values, { resetForm }) => {
      const updatedTreinamentos = modoEdicao
        ? treinamentos.map((t) =>
            t.id === treinamento.id
              ? {
                  ...treinamento,
                  ...values,
                }
              : t
          )
        : [
            ...treinamentos,
            {
              ...values,
              id: Date.now(),
            },
          ];

      setTreinamentos(updatedTreinamentos);
      setModoEdicao(false);

      setTreinamento({
        id: 0,
        nome: "",
        nr: "",
        validade: "",
      });
      resetForm();
    },
  });

  const handleEdit = (id: number) => {
    const treinamentoParaEditar = treinamentos.find((t) => t.id === id);
    if (treinamentoParaEditar) {
      setTreinamento(treinamentoParaEditar);
      setModoEdicao(true);
    }
  };

  const handleDelete = (id: number) => {
    const updatedTreinamentos = treinamentos.filter((t) => t.id !== id);
    setTreinamentos(updatedTreinamentos);
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

      <table className="w-full border-collapse border mx-auto max-w-xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nome</th>
            <th className="border p-2">NR</th>
            <th className="border p-2">Validade</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {treinamentos.map((t) => (
            <tr key={t.id}>
              <td className="border p-2 text-center">{t.nome}</td>
              <td className="border p-2 text-center">{t.nr}</td>
              <td className="border p-2 text-center">{t.validade}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(t.id)}
                  className="bg-yellow-500 text-white px-3 py-1 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-500 text-white px-3 py-1 mr-2"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

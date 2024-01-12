"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

interface Funcionario {
  id: number;
  nome: string;
  sobrenome: string;
  matricula: string;
  email: string;
  salario: string;
  nomeCompleto?: string;
}

export default function Employees() {
  const [funcionario, setFuncionario] = useState<Funcionario>({
    id: 0,
    nome: "",
    sobrenome: "",
    matricula: "",
    email: "",
    salario: "",
  });

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      sobrenome: "",
      matricula: "",
      email: "",
      salario: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("O nome é obrigatório"),
      sobrenome: Yup.string().required("O sobrenome é obrigatório"),
      matricula: Yup.string().required("A matrícula é obrigatória"),
      email: Yup.string()
        .email("Formato de email inválido")
        .required("O email é obrigatório"),
      salario: Yup.string().required("O salário é obrigatório"),
    }),
    onSubmit: (values, {resetForm}) => {
      const updatedFuncionarios = modoEdicao
        ? funcionarios.map((f) =>
            f.id === funcionario.id
              ? {
                  ...funcionario,
                  ...values,
                  nomeCompleto: `${values.nome} ${values.sobrenome}`,
                }
              : f
          )
        : [
            ...funcionarios,
            {
              ...values,
              id: Date.now(),
              nomeCompleto: `${values.nome} ${values.sobrenome}`,
            },
          ];

      setFuncionarios(updatedFuncionarios);
      setModoEdicao(false);

      setFuncionario({
        id: 0,
        nome: "",
        sobrenome: "",
        matricula: "",
        email: "",
        salario: "",
      });
      resetForm();
    },
  });

  const handleEdit = (id: number) => {
    const funcionarioParaEditar = funcionarios.find((f) => f.id === id);
    if (funcionarioParaEditar) {
      setFuncionario(funcionarioParaEditar);
      setModoEdicao(true);
    }
  };

  const handleDelete = (id: number) => {
    const updatedFuncionarios = funcionarios.filter((f) => f.id !== id);
    setFuncionarios(updatedFuncionarios);
  };

  const openModal = (f: Funcionario) => {
    setFuncionario(f);
    setModalAberto(true);
  };

  const closeModal = () => {
    setModalAberto(false);
  };

  return (
    <div className="p-4 mt-14">
      <h1 className="text-center font-bold text-xl">Funcionários</h1>
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
          <label className="block mb-1">Sobrenome:</label>
          <input
            type="text"
            name="sobrenome"
            value={formik.values.sobrenome}
            onChange={formik.handleChange}
            className="border p-1 w-full"
          />
          {formik.touched.sobrenome && formik.errors.sobrenome && (
            <div className="text-red-500">{formik.errors.sobrenome}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Matrícula:</label>
          <input
            type="text"
            name="matricula"
            value={formik.values.matricula}
            onChange={formik.handleChange}
            className="border p-1 w-full"
          />
          {formik.touched.matricula && formik.errors.matricula && (
            <div className="text-red-500">{formik.errors.matricula}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="border p-1 w-full"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Salário:</label>
          <input
            type="text"
            name="salario"
            value={formik.values.salario}
            onChange={formik.handleChange}
            className="border p-1 w-full"
          />
          {formik.touched.salario && formik.errors.salario && (
            <div className="text-red-500">{formik.errors.salario}</div>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {modoEdicao ? "Editar Funcionário" : "Adicionar Funcionário"}
        </button>
      </form>

      <table className="w-full border-collapse border mx-auto max-w-xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Matrícula</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.id}>
              <td className="border p-2 text-center">{f.matricula}</td>
              <td className="border p-2 text-center">{f.nomeCompleto}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(f.id)}
                  className="bg-yellow-500 text-white px-3 py-1 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="bg-red-500 text-white px-3 py-1 mr-2"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => openModal(f)}
                  className="bg-green-500 text-white px-3 py-1"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalAberto}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        shouldCloseOnOverlayClick={true}
      >
        <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Detalhes do Funcionário
          </h2>
          <p>
            <span className="font-semibold">Matrícula:</span>{" "}
            {funcionario.matricula}
          </p>
          <p>
            <span className="font-semibold">Nome:</span>{" "}
            {funcionario.nomeCompleto}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {funcionario.email}
          </p>
          <p>
            <span className="font-semibold">Salário:</span>{" "}
            {funcionario.salario}
          </p>
          <button
            onClick={closeModal}
            className="bg-blue-500 text-white px-4 py-2 mt-4 inline-block"
          >
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  );
}

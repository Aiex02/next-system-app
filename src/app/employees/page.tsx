"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEdit, FaTrashAlt, FaEye, FaSearch } from "react-icons/fa";
import axios from "axios";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Funcionario {
  id: number;
  nome: string;
  matricula: string;
}

export default function Funcionarios() {
  const [funcionario, setFuncionario] = useState<Funcionario>({
    id: 0,
    nome: "",
    matricula: "",
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [allEmployees, setAllEmployees] = useState<Funcionario[]>([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:3333/funcionarios");
        console.log(response.data)
        setAllEmployees(response.data);
      } catch (error) {
        console.error("Erro ao buscar treinamentos:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  const formik = useFormik({
    initialValues: {
      nome: "",
      matricula: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("O nome é obrigatório"),
      matricula: Yup.string().required("A matrícula é obrigatória"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const updatedFuncionarios = modoEdicao
          ? await axios.put(
              `http://localhost:3333/funcionarios/${funcionario.id}`,
              { ...values, nomeCompleto: values.nome }
            )
          : await axios.post("http://localhost:3333/funcionarios", {
              ...values,
              id: Date.now(),
              nomeCompleto: values.nome,
            });

        setAllEmployees([...allEmployees, updatedFuncionarios.data]);
        setModoEdicao(false);
        setFuncionario({
          id: 0,
          nome: "",
          matricula: "",
        });
        resetForm();
      } catch (error) {
        console.error("Erro ao salvar funcionário:", error);
      }
    },
  });

  const openModal = (f: Funcionario) => {
    setFuncionario(f);
    setModalAberto(true);
  };

  const closeModal = () => {
    setModalAberto(false);
  };

  const handleEdit = (id: number) => {
    const funcionarioParaEditar = allEmployees.find((f) => f.id === id);
    if (funcionarioParaEditar) {
      console.log(funcionarioParaEditar.nome)
      setFuncionario(funcionarioParaEditar);
      setModoEdicao(true);
      formik.setValues({
        nome: funcionarioParaEditar.nome,
        matricula: funcionarioParaEditar.matricula,
      });
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="p-4 mt-14">
      <h1 className="text-center font-bold text-xl">Funcionários</h1>
      <form onSubmit={formik.handleSubmit} className="mb-4 mx-auto max-w-xl mt-6">
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {modoEdicao ? "Editar Funcionário" : "Adicionar Funcionário"}
        </button>
      </form>
      <div className="flex flex-col items-center justify-between mt-20">
        <form className=" flex gap-2">
          <Input name="matricula" placeholder="Matricula do Funcionario"/>
          <Input name="name" placeholder="Nome do Funcionario"/>
          <Button type="submit" variant="link" className="gap-2">
            <FaSearch />
            Filtrar Resultados
          </Button>
        </form>
      </div>
      <div className="bouder rounded-lg p-2 mt-4">
        <Table className="w-5/6 mx-auto border-collapse border">
        <TableHeader>
          <TableRow>
            <TableHead className="border p-2 text-center font-bold">Matrícula</TableHead>
            <TableHead className="border p-2 text-center font-bold">Nome</TableHead>
            <TableHead className="border p-2 text-center font-bold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allEmployees.map((funcionario) => (
            <TableRow key={funcionario.id}>
              <TableCell className="border p-2 text-center">{funcionario.matricula}</TableCell>
              <TableCell className="border p-2 text-center">{funcionario.nome}</TableCell>
              <TableCell className="border p-2 text-center space-x-2">
                <button
                  onClick={() => handleEdit(funcionario.id)}
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white px-2 py-1">
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => openModal(funcionario)}
                  className="bg-green-500 text-white px-2 py-1"
                >
                  <FaEye />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
            </Table>
      </div>

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
            <span className="font-semibold">Nome:</span> {funcionario.nome}
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

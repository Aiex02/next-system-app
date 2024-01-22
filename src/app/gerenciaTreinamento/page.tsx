'use client'
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

interface Funcionario {
  id: number;
  nome: string;
}

interface Treinamento {
  id: number;
  nome: string;
}

interface Associacao {
  funcionarioId: number;
  treinamentoId: number;
  dataTreinamento: Date; 
}

export default function TreunaFunc() {
  const [associacoes, setAssociacoes] = useState<Associacao[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [treinamentos, setTreinamentos] = useState<Treinamento[]>([]);

  const formik = useFormik({
    initialValues: {
      funcionarioId: '',
      treinamentoId: '',
      dataTreinamento: '',
    },
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:3333/treinamentos-funcionario', values);

        const responseAssociacoes = await axios.get('http://localhost:3333/treinamentos-funcionario');
        setAssociacoes(responseAssociacoes.data);

        formik.resetForm();
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
      }
    },
  });

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const responseFuncionarios = await axios.get('http://localhost:3333/funcionarios');
        setFuncionarios(responseFuncionarios.data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    const fetchTreinamentos = async () => {
      try {
        const responseTreinamentos = await axios.get('http://localhost:3333/treinamentos');
        setTreinamentos(responseTreinamentos.data);
      } catch (error) {
        console.error('Erro ao buscar treinamentos:', error);
      }
    };

    const fetchAssociacoes = async () => {
      try {
        const responseAssociacoes = await axios.get('http://localhost:3333/treinamentos-funcionario');
        setAssociacoes(responseAssociacoes.data);
      } catch (error) {
        console.error('Erro ao buscar associações:', error);
      }
    };

    fetchFuncionarios();
    fetchTreinamentos();
    fetchAssociacoes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Associações de Funcionários e Treinamentos</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="funcionarioId" className="block text-sm font-medium text-gray-700">
              Funcionário
            </label>
            <select
              id="funcionarioId"
              name="funcionarioId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.funcionarioId}
              className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            >
              <option value="" label="Selecione um funcionário" />
              {funcionarios.map((funcionario) => (
                <option key={funcionario.id} value={funcionario.id}>
                  {funcionario.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="treinamentoId" className="block text-sm font-medium text-gray-700">
              Treinamento
            </label>
            <select
              id="treinamentoId"
              name="treinamentoId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.treinamentoId}
              className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            >
              <option value="" label="Selecione um treinamento" />
              {treinamentos.map((treinamento) => (
                <option key={treinamento.id} value={treinamento.id}>
                  {treinamento.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dataTreinamento" className="block text-sm font-medium text-gray-700">
              Data do Treinamento
            </label>
            <input
              type="date"
              id="dataTreinamento"
              name="dataTreinamento"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dataTreinamento}
              className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 active:bg-blue-800"
        >
          Enviar
        </button>
      </form>
      <table className="min-w-full border rounded overflow-hidden mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Funcionário ID</th>
            <th className="border px-4 py-2">Funcionário Nome</th>
            <th className="border px-4 py-2">Treinamento ID</th>
            <th className="border px-4 py-2">Treinamento Nome</th>
          </tr>
        </thead>
        <tbody>
          {associacoes.map((associacao) => {
            const funcionario = funcionarios.find((f) => f.id === associacao.funcionarioId);
            const treinamento = treinamentos.find((t) => t.id === associacao.treinamentoId);

            return (
              <tr key={`${associacao.funcionarioId}-${associacao.treinamentoId}`}>
                <td className="border px-4 py-2">{associacao.funcionarioId}</td>
                <td className="border px-4 py-2">{funcionario?.nome || 'Não encontrado'}</td>
                <td className="border px-4 py-2">{associacao.treinamentoId}</td>
                <td className="border px-4 py-2">{treinamento?.nome || 'Não encontrado'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
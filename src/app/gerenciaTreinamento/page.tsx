'use client'
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Funcionario {
  id: number;
  nome: string;
  matricula: string;
}

interface Treinamento {
  id: number;
  nome: string;
  nr: string;
  validade: number;
}

interface Associacao {
  funcionarioId: number;
  treinamentoId: number;
  dataTreinamento: Date; 
}


export default function TreinaFunc() {

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

        const isoDate = new Date(values.dataTreinamento).toISOString();

        await axios.post('http://localhost:3333/treinamentos-funcionario', {
          ...values,
          dataTreinamento: isoDate,
        });

        const responseAssociacoes = await axios.get('http://localhost:3333/treinamentos-funcionario');
        setAssociacoes(responseAssociacoes.data);

        formik.resetForm();
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [funcionariosData, treinamentosData, associacoesData] = await Promise.all([
          axios.get('http://localhost:3333/funcionarios'),
          axios.get('http://localhost:3333/treinamentos'),
          axios.get('http://localhost:3333/treinamentos-funcionario'),
        ]);

        setFuncionarios(funcionariosData.data);
        setTreinamentos(treinamentosData.data);
        setAssociacoes(associacoesData.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
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
      <Table className="min-w-full border rounded overflow-hidden mt-4">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="border px-4 py-2">Matrícula</TableHead>
            <TableHead className="border px-4 py-2">Funcionário Nome</TableHead>
            <TableHead className="border px-4 py-2">Nr</TableHead>
            <TableHead className="border px-4 py-2">Treinamento Nome</TableHead>
            <TableHead className="border px-4 py-2">Data Treinamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {associacoes.map((associacao) => {
            const funcionario = funcionarios.find((f) => f.id === associacao.funcionarioId);
            const treinamento = treinamentos.find((t) => t.id === associacao.treinamentoId);

            return (
              <TableRow key={`${associacao.funcionarioId}-${associacao.treinamentoId}`}>
                <TableCell className="border px-4 py-2">{funcionario?.matricula || 'Não encontrado'}</TableCell>
                <TableCell className="border px-4 py-2">{funcionario?.nome || 'Não encontrado'}</TableCell>
                <TableCell className="border px-4 py-2">{treinamento?.nr || 'Não encontrado'}</TableCell>
                <TableCell className="border px-4 py-2">{treinamento?.nome || 'Não encontrado'}</TableCell>
                <TableCell className="border px-4 py-2">{associacao.dataTreinamento ? new Date(associacao.dataTreinamento).toLocaleDateString() : 'Não encontrado'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
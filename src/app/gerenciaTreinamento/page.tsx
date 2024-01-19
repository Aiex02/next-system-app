"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TreunaFunc(){ 
  const [associacoes, setAssociacoes] = useState<{ funcionarioId: number; treinamentoId: number }[]>([]);
  const [funcionarios, setFuncionarios] = useState<{ id: number; nome: string }[]>([]);
  const [treinamentos, setTreinamentos] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    const fetchAssociacoes = async () => {
      try {
        const responseAssociacoes = await axios.get('http://localhost:3333/treinamentos-funcionario');
        setAssociacoes(responseAssociacoes.data);
      } catch (error) {
        console.error('Erro ao buscar associações:', error);
      }
    };

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

    fetchAssociacoes();
    fetchFuncionarios();
    fetchTreinamentos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Associações de Funcionários e Treinamentos</h2>
      <table className="min-w-full border rounded overflow-hidden">
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
};


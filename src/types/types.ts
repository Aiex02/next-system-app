export interface Treinamento {
    id: string;
    nome: string;
    nr: string;
    validade: number;
  }

export interface Funcionario {
  id: number;
  nome: string;
  matricula: string;
}

export interface GerenciaTreinamento {
  funcionarioId: string;
  treinamentoId: string;
  dataTreinamento: Date;
}
import Link from 'next/link';
import { FaUser, FaBook, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex items-center justify-center mt-52">
      <div className="grid grid-cols-3 gap-4 text-center content-center">
        <Link href="/employees" className="bg-green-500 hover:bg-green-600 text-white font-bold py-16 px-20 rounded flex flex-col items-center justify-center space-y-3">
          <FaUser size={45} />
          Funcionários
        </Link>
        <Link href="/training" className="bg-green-500 hover:bg-green-600 text-white font-bold py-16 px-20 rounded flex flex-col items-center justify-center space-y-3">
          <FaBook size={45} />
          Treinamento
        </Link>
        <Link href="/gerenciaTreinamento" className="bg-green-500 hover:bg-green-600 text-white font-bold py-16 px-20 rounded flex flex-col items-center justify-center space-y-3">
          <FaChalkboardTeacher size={45} />
          Gerenciamento de Treinamentos
        </Link>
        <Link href="/gerenciaUsuarios" className="bg-green-500 hover:bg-green-600 text-white font-bold py-16 px-20 rounded flex flex-col items-center justify-center space-y-3">
          <FaUsers size={45} />
          Gerenciamento de Usuários
        </Link>
      </div>
    </div>
  );
}

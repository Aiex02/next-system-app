import Link from "next/link";
import { FaUser, FaBook, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex items-center justify-center mt-12 md:mt-24 lg:mt-52">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center content-center">
        <Link
          href="/employees"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-8 px-10 md:py-20 md:px-16 rounded flex flex-col items-center justify-center space-y-2 md:space-y-3"
        >
          <FaUser size="30" />
          Funcionários
        </Link>
        <Link
          href="/training"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-8 px-10 md:py-12 md:px-16 rounded flex flex-col items-center justify-center space-y-2 md:space-y-3"
        >
          <FaBook size="30" />
          Treinamento
        </Link>
        <Link
          href="/gerenciaTreinamento"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-8 px-10 md:py-12 md:px-16 rounded flex flex-col items-center justify-center space-y-2 md:space-y-3"
        >
          <FaChalkboardTeacher size="30" />
          Gerenciamento de Treinamentos
        </Link>
        <Link
          href="/gerenciaUsuarios"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-8 px-10 md:py-20 md:px-16 rounded flex flex-col items-center justify-center space-y-2 md:space-y-3"
        >
          <FaUsers size="30" />
          Gerenciamento de Usuários
        </Link>
      </div>
    </div>
  );
}

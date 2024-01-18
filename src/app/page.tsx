import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex mt-24 space-x-4">
        <Link href="/employees">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-10 rounded-lg text-center relative">
            Funcionários
            <span className="absolute top-2 left-0 right-0 text-center text-lg font-bold">*ICON*</span>
          </button>
        </Link>
        <Link href="/training">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-10 px-10 rounded-lg text-center relative">
            Treinamento
            <span className="absolute top-2 left-0 right-0 text-center text-lg font-bold">*ICON*</span>
          </button>
        </Link>
        <Link href="/gerenciaTreinamento">
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-10 px-10 rounded-lg text-center relative">
            Gerenciamento de Treinamentos
            <span className="absolute top-2 left-0 right-0 text-center text-lg font-bold">*ICON*</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

;"use client";
import Link from "next/link";

export default function Dropdown() {
  return (
    <aside className="bg-slate-200 text-black w-64 min-h-screen ">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/">
              <button className="block w-full text-left text-black bg-transparent hover:bg-green-500 hover:text-white py-2 px-4 rounded-md focus:outline-none">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link href="/employees">
              <button className="block w-full text-left text-black bg-transparent hover:bg-green-500 hover:text-white py-2 px-4 rounded-md focus:outline-none">
                Funcionários
              </button>
            </Link>
          </li>
          <li>
            <Link href="/training">
              <button className="block w-full text-left text-black bg-transparent hover:bg-green-500 hover:text-white py-2 px-4 rounded-md focus:outline-none">
                Treinamentos
              </button>
            </Link>
          </li>
          <li>
            <Link href="/gerenciaTreinamento">
              <button className="block w-full text-left text-black bg-transparent hover:bg-green-500 hover:text-white py-2 px-4 rounded-md focus:outline-none">
                Gerenciamento de Treinamentos
              </button>
            </Link>
            <Link href="/gerenciaUsuarios">
              <button className="block w-full text-left text-black bg-transparent hover:bg-green-500 hover:text-white py-2 px-4 rounded-md focus:outline-none">
                Gerenciamento de Usuários
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

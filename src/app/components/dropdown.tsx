'use client'
import Link from 'next/link';

export default function Dropdown() {
  return (
    <aside className="bg-slate-200 text-black w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
        <li>
            <Link href="/">
              <button className="block w-full text-left text-black bg-transparent hover:bg-orange-600 py-2 px-4 rounded-md focus:outline-none">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link href="/employees">
              <button className="block w-full text-left text-black bg-transparent hover:bg-orange-600 py-2 px-4 rounded-md focus:outline-none">
                Funcionários
              </button>
            </Link>
          </li>
          <li>
            <Link href="#">
              <button className="block w-full text-left text-black bg-transparent hover:bg-orange-600 py-2 px-4 rounded-md focus:outline-none">
                Dados da empresa
              </button>
            </Link>
          </li>
          <li>
            <Link href="#">
              <button className="block w-full text-left text-black bg-transparent hover:bg-orange-600 py-2 px-4 rounded-md focus:outline-none">
                Qualquer outra coisa
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};



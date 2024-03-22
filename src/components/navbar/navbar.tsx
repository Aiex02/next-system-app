"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav className="bg-slate-200 p-4 flex justify-between items-center">
        <button onClick={toggleSidebar}>
          <FaAlignJustify className="text-xl" />
        </button>

        <h1 className="text-black font-bold text-xl absolute left-1/2 transform -translate-x-1/2">
          Alfa System
        </h1>

        <div className="opacity-0">
          <FaAlignJustify className="text-xl" />
        </div>
      </nav>

      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } fixed z-50 left-0 top-0 w-64 h-full bg-white shadow-lg overflow-auto`}
      >
        <button
          className="p-4 text-left text-lg font-bold"
          onClick={toggleSidebar}
        >
          Close
        </button>
        <div className="p-4">
          <ul>
            <li className="mb-2">
              <Link href="/home">
                <button className="w-full text-left p-2 rounded hover:bg-green-500 hover:text-white focus:outline-none">
                  Home
                </button>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/employees">
                <button className="w-full text-left p-2 rounded hover:bg-green-500 hover:text-white focus:outline-none">
                  Funcionários
                </button>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/training">
                <button className="w-full text-left p-2 rounded hover:bg-green-500 hover:text-white focus:outline-none">
                  Treinamentos
                </button>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/gerenciaTreinamento">
                <button className="w-full text-left p-2 rounded hover:bg-green-500 hover:text-white focus:outline-none">
                  Gerência Treinamento
                </button>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/gerenciaUsuarios">
                <button className="w-full text-left p-2 rounded hover:bg-green-500 hover:text-white focus:outline-none">
                  Gerência Usuário
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;

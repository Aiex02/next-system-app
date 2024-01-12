'use client'
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function Login() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Campo de Email obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Campo de Senha obrigatório'),
  });

  const handleLogin = (values: { email: string; password: string }) => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);

      console.log('Valores do formulário:', values);
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-image1 bg-center bg-cover bg-no-repeat filter blur-sm"></div>
      <div className="w-full max-w-xs z-10">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative z-10">
            <h2 className="text-2xl mb-6 text-center text-black font-bold">*LOGO*</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Senha
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Senha"
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-xs italic" />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline ${
                  isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

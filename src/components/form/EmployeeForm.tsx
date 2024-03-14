import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Funcionario } from "@/types/types";

interface FuncionarioFormProps {
  initialData: Funcionario;
  onSubmit: (data: Funcionario) => void;
  modoEdicao: boolean;
}

const FuncionarioForm: React.FC<FuncionarioFormProps> = ({
  initialData,
  onSubmit,
  modoEdicao,
}) => {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      nome: Yup.string().required("O nome é obrigatório"),
      matricula: Yup.string().required("A matrícula é obrigatória"),
    }),
    onSubmit,
    enableReinitialize: true, 
  });

  useEffect(() => {
    formik.resetForm({ values: initialData });
  }, [initialData, formik.resetForm]);

  return (
    <form onSubmit={formik.handleSubmit} className="mb-4 mx-auto max-w-xl">
      <div className="mb-4">
        <label htmlFor="nome" className="block mb-1">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nome}
          className="border p-1 w-full"
        />
        {formik.touched.nome && formik.errors.nome ? (
          <div className="text-red-500">{formik.errors.nome}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="matricula" className="block mb-1">
          Matrícula
        </label>
        <input
          id="matricula"
          name="matricula"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.matricula}
          className="border p-1 w-full"
        />
        {formik.touched.matricula && formik.errors.matricula ? (
          <div className="text-red-500">{formik.errors.matricula}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
      >
        {modoEdicao ? "Editar Funcionário" : "Adicionar Funcionário"}
      </button>
    </form>
  );
};

export default FuncionarioForm;

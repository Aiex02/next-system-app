import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Treinamento } from "@/types/types";

interface TreinamentoFormProps {
  initialData: Treinamento;
  onSubmit: (data: Treinamento) => void;
  modoEdicao: boolean;
}
const TreinamentoForm: React.FC<TreinamentoFormProps> = ({
  initialData,
  onSubmit,
  modoEdicao,
}) => {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      nome: Yup.string().required("O nome é obrigatório"),
      nr: Yup.string().required("O NR é obrigatório"),
      validade: Yup.number().required("A validade é obrigatória"),
    }),
    onSubmit,
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
        <label htmlFor="nr" className="block mb-1">
          NR
        </label>
        <input
          id="nr"
          name="nr"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nr}
          className="border p-1 w-full"
        />
        {formik.touched.nr && formik.errors.nr ? (
          <div className="text-red-500">{formik.errors.nr}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="validade" className="block mb-1">
          Validade
        </label>
        <input
          id="validade"
          name="validade"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.validade}
          className="border p-1 w-full"
        />
        {formik.touched.validade && formik.errors.validade ? (
          <div className="text-red-500">{formik.errors.validade}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
      >
        {modoEdicao ? "Editar Treinamento" : "Adicionar Treinamento"}
      </button>
    </form>
  );
};

export default TreinamentoForm;

import React from "react";
import { useForm } from "react-hook-form";
import commonClassNames from "../../../components/common.module.scss";
import { Nfe } from "../../../store/nfe/nfeTypes";
import classNames from "./RegisterNfeForm.module.scss";

export type RegisterNfeFormValues = Nfe;

interface RegisterNfeFormProps {
  onSubmit: (values: RegisterNfeFormValues) => void;
}

const RegisterNfeForm: React.FC<RegisterNfeFormProps> = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm<RegisterNfeFormValues>();

  return (
    <form
      className={`${classNames.form} ${commonClassNames.card}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={commonClassNames.field}>
        <label htmlFor="cnpj">CNPJ</label>
        <input type="text" {...register("cnpj", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="companyName">Nome da Empresa</label>
        <input type="text" {...register("companyName", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="businessName">Razão Social</label>
        <input type="text" {...register("businessName", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="value">Valor</label>
        <input type="text" {...register("value", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="id">Número NFE</label>
        <input type="text" {...register("id", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="description">Descrição</label>
        <input type="text" {...register("description", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="date">Data</label>
        <input type="date" {...register("date", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="compensationDate">Data de recebimento</label>
        <input
          type="date"
          {...register("compensationDate", { required: true })}
        />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default RegisterNfeForm;

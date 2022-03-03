import React from "react";
import { useForm } from "react-hook-form";
import commonClassNames from "../../../components/common.module.scss";
import { Nfe } from "../../../store/nfe/nfeTypes";
import classNames from "./RegisterNfeForm.module.scss";
import { transformDate } from "../../../app/util";

interface RegisterNfeFormValues extends Omit<Nfe, "date" | "compensationDate"> {
  date: string;
  compensationDate: string;
}

interface RegisterNfeFormProps {
  onSubmit: (values: Nfe) => void;
  handleGoBack?: () => void;
}

const RegisterNfeForm: React.FC<RegisterNfeFormProps> = ({
  onSubmit,
  handleGoBack,
}) => {
  const { handleSubmit, register, reset } = useForm<RegisterNfeFormValues>({
    defaultValues: {},
  });
  const parseValues = (values: RegisterNfeFormValues): Nfe => ({
    ...values,
    date: transformDate(values.date),
    compensationDate: transformDate(values.compensationDate),
  });

  return (
    <form
      className={`${classNames.form} ${commonClassNames.card}`}
      onSubmit={handleSubmit((values) => {
        onSubmit(parseValues(values));
        reset();
      })}
    >
      <button
        type="button"
        className={classNames.goBackBtn}
        onClick={handleGoBack}
      >
        Go back
      </button>
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
        <input
          type="text"
          {...register("value", { required: true, valueAsNumber: true })}
        />
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

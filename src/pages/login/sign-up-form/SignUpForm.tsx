import React from "react";
import { useForm } from "react-hook-form";
import classNames from "./SignUpForm.module.scss";
import commonClassNames from "../../../components/common.module.scss";
import { User } from "../../../store/auth/authTypes";

export interface SignUpFormValues
  extends Omit<User, "date" | "compensationDate"> {
  date: string;
  compensationDate: string;
}

interface SignUpFormProps {
  handleGoBack?: () => void;
  onSubmit: (values: SignUpFormValues) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleGoBack, onSubmit }) => {
  const { handleSubmit, register } = useForm<SignUpFormValues>();

  return (
    <form
      className={`${classNames.form} ${commonClassNames.card}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <button
        type="button"
        className={classNames.goBackBtn}
        onClick={handleGoBack}
      >
        Go back
      </button>
      <div className={commonClassNames.field}>
        <label htmlFor="email">E-mail</label>
        <input type="email" {...register("email", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="name">Nome</label>
        <input type="text" {...register("name", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="cnpj">CNPJ</label>
        <input type="text" {...register("cnpj", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="companyName">Nome da empresa</label>
        <input type="text" {...register("companyName", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="password">Senha</label>
        <input type="password" {...register("password", { required: true })} />
      </div>

      <button type="submit">Cadastrar-se</button>
    </form>
  );
};

export default SignUpForm;

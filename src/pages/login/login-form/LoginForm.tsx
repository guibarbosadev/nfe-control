import React from "react";
import { useForm } from "react-hook-form";
import classNames from "./LoginForm.module.scss";
import commonClassNames from "../../../components/common.module.scss";
import { Link } from "react-router-dom";

export type LoginOption = "facebook" | "google";
export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleSocialLogin?: (option: LoginOption) => void;
  onSubmit: (values: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSocialLogin,
  onSubmit,
}) => {
  const { handleSubmit, register } = useForm<LoginFormValues>();
  const createOnClickFunc = (option: LoginOption) => () =>
    handleSocialLogin?.(option);

  return (
    <form
      className={`${classNames.form} ${commonClassNames.card}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={commonClassNames.field}>
        <label htmlFor="email">E-mail</label>
        <input type="email" {...register("email", { required: true })} />
      </div>

      <div className={commonClassNames.field}>
        <label htmlFor="password">Senha</label>
        <input type="password" {...register("password", { required: true })} />
      </div>

      <button type="submit">Entrar</button>

      <div className={classNames["social-login"]}>
        <button type="button" onClick={createOnClickFunc("facebook")}>
          Autenticar-se via facebook
        </button>
        <button type="button" onClick={createOnClickFunc("google")}>
          Autenticar-se via Google
        </button>
      </div>

      <Link to="signup">Cadastrar-se usando e-mail e senha</Link>
    </form>
  );
};

export default LoginForm;

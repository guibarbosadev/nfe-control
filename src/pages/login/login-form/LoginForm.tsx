import React from "react";
import { useForm } from "react-hook-form";
import classNames from "./LoginForm.module.scss";

export type LoginOption = "facebook" | "google";
export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleSocialLogin?: (option: LoginOption) => void;
  handleLogin: (values: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSocialLogin,
  handleLogin,
}) => {
  const { handleSubmit, register } = useForm<LoginFormValues>();
  const createOnClickFunc = (option: LoginOption) => () =>
    handleSocialLogin?.(option);

  return (
    <form className={classNames.form} onSubmit={handleSubmit(handleLogin)}>
      <label htmlFor="email">E-mail</label>
      <input type="email" {...register("email", { required: true })} />

      <label htmlFor="password">Senha</label>
      <input type="password" {...register("password", { required: true })} />

      <button type="submit">Entrar</button>

      <div className={classNames["social-login"]}>
        <button type="button" onClick={createOnClickFunc("facebook")}>
          Autenticar-se via facebook
        </button>
        <button type="button" onClick={createOnClickFunc("google")}>
          Autenticar-se via Google
        </button>
      </div>

      <a href="signup">Cadastrar-se usando e-mail e senha</a>
    </form>
  );
};

export default LoginForm;

import React from "react";
import classNames from "./LoginMenu.module.scss";

export type LoginOption = "facebook" | "google" | "email";

interface LoginMenuProps {
  handleSelect: (option: LoginOption) => void;
}

const LoginMenu: React.FC<LoginMenuProps> = ({ handleSelect }) => {
  const createOnClickFunc = (option: LoginOption) => () => handleSelect(option);

  return (
    <form className={classNames.form}>
      <button type="button" onClick={createOnClickFunc("facebook")}>
        Cadastro/Login via facebook
      </button>
      <button type="button" onClick={createOnClickFunc("google")}>
        Cadastro/Login via Google
      </button>
      <button type="button" onClick={createOnClickFunc("email")}>
        Cadastro através de email e senha
      </button>
    </form>
  );
};

export default LoginMenu;

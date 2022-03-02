import React from "react";
import LoginForm, { LoginFormValues } from "./login-form/LoginForm";
import classNames from "./LoginPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../store/authActions";
import { SyncLoader } from "react-spinners";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.status === "loading");

  const handleLogin = (values: LoginFormValues) => {
    dispatch(login(values));
  };

  return (
    <div className={classNames.container}>
      {isLoading ? (
        <SyncLoader loading color="#36D7B7" />
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default LoginPage;

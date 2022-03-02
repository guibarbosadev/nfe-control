import React from "react";
import LoginForm, { LoginFormValues } from "./login-form/LoginForm";
import classNames from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  const handleLogin = (values: LoginFormValues) => {
    // TODO: authenticate user
    console.log(values);
  };

  return (
    <div className={classNames.container}>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;

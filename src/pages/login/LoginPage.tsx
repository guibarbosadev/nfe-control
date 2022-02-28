import React from "react";
import LoginMenu, { LoginOption } from "./login-menu/LoginMenu";
import classNames from "./LoginPage.module.scss";
import SignUpForm from "./sign-up-form/SignUpForm";

const LoginPage: React.FC = () => {
  const [isSigningUp, setIsSigninUp] = React.useState(false);

  const handleSelect = (option: LoginOption) => {
    switch (option) {
      case "email":
        setIsSigninUp(true);
        break;
      default:
        // TODO: handle facebook/google login/signup
        break;
    }
  };

  const quitSignUpForm = () => setIsSigninUp(false);

  return (
    <div className={classNames.container}>
      {isSigningUp ? (
        <SignUpForm handleGoBack={quitSignUpForm} />
      ) : (
        <LoginMenu handleSelect={handleSelect} />
      )}
    </div>
  );
};

export default LoginPage;

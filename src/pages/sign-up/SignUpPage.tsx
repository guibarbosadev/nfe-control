import React from "react";
import SignUpForm from "../login/sign-up-form/SignUpForm";
import classNames from "./SignUpPage.module.scss";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    const PREVIOUS_PAGE = -1;

    navigate(PREVIOUS_PAGE);
  };

  return (
    <div className={classNames.container}>
      <SignUpForm handleGoBack={goBack} />
    </div>
  );
};

export default SignUpPage;

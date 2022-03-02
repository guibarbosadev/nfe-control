import React from "react";
import SignUpForm, { SignUpFormValues } from "../login/sign-up-form/SignUpForm";
import classNames from "./SignUpPage.module.scss";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    const PREVIOUS_PAGE = -1;

    navigate(PREVIOUS_PAGE);
  };

  const submit = (values: SignUpFormValues) => {
    console.log(values);
    // TODO: sign up user
  };

  return (
    <div className={classNames.container}>
      <SignUpForm onSubmit={submit} handleGoBack={goBack} />
    </div>
  );
};

export default SignUpPage;

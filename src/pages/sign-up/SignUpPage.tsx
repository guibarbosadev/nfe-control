import React from "react";
import SignUpForm, { SignUpFormValues } from "../login/sign-up-form/SignUpForm";
import classNames from "./SignUpPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { signUp } from "../../store/authActions";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goBack = () => {
    const PREVIOUS_PAGE = -1;

    navigate(PREVIOUS_PAGE);
  };

  const submit = (values: SignUpFormValues) => {
    dispatch(signUp(values));
  };

  return (
    <div className={classNames.container}>
      <SignUpForm onSubmit={submit} handleGoBack={goBack} />
    </div>
  );
};

export default SignUpPage;

import React from "react";
import RegisterNfeForm from "./register-nfe-form/RegisterNfeForm";
import classNames from "./RegisterNfePage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerNfe } from "../../store/nfe/nfeActions";
import { Nfe } from "../../store/nfe/nfeTypes";

const RegisterNfePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.user?.email ?? "");

  const onSubmit = (nfe: Nfe) => {
    dispatch(registerNfe({ email, nfe }));
  };

  const goBack = () => {
    const previousPage = -1;

    navigate(previousPage);
  };

  return (
    <div className={classNames.container}>
      <RegisterNfeForm onSubmit={onSubmit} handleGoBack={goBack} />
    </div>
  );
};

export default RegisterNfePage;

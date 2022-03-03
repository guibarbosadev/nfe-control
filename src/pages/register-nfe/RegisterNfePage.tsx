import React from "react";
import RegisterNfeForm, {
  RegisterNfeFormValues,
} from "./register-nfe-form/RegisterNfeForm";
import classNames from "./RegisterNfePage.module.scss";
import { useNavigate } from "react-router-dom";

const RegisterNfePage: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch =
  const onSubmit = (values: RegisterNfeFormValues) => {
    console.log(values);
    // TODO: register nfe
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

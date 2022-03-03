import React from "react";
import RegisterNfeForm, {
  RegisterNfeFormValues,
} from "./register-nfe-form/RegisterNfeForm";
import classNames from "./RegisterNfePage.module.scss";

const RegisterNfePage: React.FC = () => {
  // const dispatch = dispath
  const onSubmit = (values: RegisterNfeFormValues) => {
    console.log(values);
    // TODO: register nfe
  };

  return (
    <div className={classNames.container}>
      <RegisterNfeForm onSubmit={onSubmit} />
    </div>
  );
};

export default RegisterNfePage;

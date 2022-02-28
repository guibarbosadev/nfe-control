import React from "react";

interface SignUpFormProps {
  handleGoBack?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleGoBack }) => (
  <div>
    <div>SignUpForm</div>
    <button type="button" onClick={handleGoBack}>
      Go back
    </button>
  </div>
);

export default SignUpForm;
